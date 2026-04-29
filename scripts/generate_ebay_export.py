#!/usr/bin/env python3
import csv
import re
from pathlib import Path


BASE = Path(__file__).resolve().parents[1]
PRODUCTS_CSV = BASE / 'products.csv'
SKIP_FILE = Path(__file__).resolve().parent / 'ebay_skip_patterns.txt'
TEMPLATE_FILE = BASE / 'eBay-category-listing-template-Mar-22-2026-14-53-20.csv'
# also look in parent directory (Downloads) where the user-attached template may exist
if not TEMPLATE_FILE.exists():
    # try to find any matching template in the parent folder
    for p in BASE.parent.glob('eBay-category-listing-template*.csv'):
        TEMPLATE_FILE = p
        break
EXPORTS_DIR = BASE / 'exports'
EXPORTS_DIR.mkdir(exist_ok=True)

def load_skip_patterns():
    patterns = []
    if SKIP_FILE.exists():
        for line in SKIP_FILE.read_text(encoding='utf-8').splitlines():
            s = line.strip()
            if s:
                patterns.append(s.lower())
    return patterns

def extract_sku(notes: str):
    # Try to extract text after 'SKU' up to ';' or end
    if not notes:
        return ''
    m = re.search(r'SKU\s*([^;\n\r]+)', notes, re.IGNORECASE)
    if m:
        return m.group(1).strip()
    return ''

DESC_TEMPLATE = (
    """{title}\n\n"
    "High-quality pharmacy prescription bags featuring the classic design. Strong, dependable paper bags built for everyday pharmacy and retail use.\n\n"
    "📦 Product Details\n"
    "Design: {design}\n"
    "Size: {size}\n"
    "Quantity: {quantity}\n"
    "Material: Durable paper\n"
    "Condition: Brand new\n"
    "Country of Manufacture: Made in the USA 🇺🇸\n\n"
    "🚚 Shipping\n"
    "Flat $10 shipping per case.\n"
    "Orders ship within 2 business days — most ship same or next business day.\n\n"
    "💼 Better Pricing Available\n"
    "Contact bagsupplyco directly for a cheaper rate — even if you are ordering just one case.\n\n"
    "✔ Sold as a full case only\n"
    "✔ Reliable supply for pharmacies and medical offices\n\n"
    "Please message with any questions.\n"""
)

def parse_size_and_design(product_key: str, notes: str):
    # Try to extract size inside parentheses from product_key
    size = ''
    design = ''
    m = re.search(r"\(([^)]+)\)", product_key)
    if m:
        size = m.group(1)
    # design heuristics
    if 'gs design' in product_key.lower():
        design = 'GS'
    elif 'ty design' in product_key.lower() or 'thank you' in product_key.lower():
        design = 'Thank You'
    elif 'vb' in product_key.lower() or 'veterinary' in product_key.lower():
        design = 'Veterinary'
    else:
        # fallback to SKU from notes
        sku = extract_sku(notes)
        design = sku or ''
    return size, design

def main():
    patterns = load_skip_patterns()
    exported = []
    skipped = []

    with PRODUCTS_CSV.open(newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            key = (row.get('product_key') or '').strip()
            notes = (row.get('notes') or '').strip()
            lower = key.lower()
            if any(p in lower for p in patterns):
                skipped.append(key)
                continue
            try:
                cost = float(row.get('cost') or 0)
            except Exception:
                cost = 0.0
            price = round(cost * 1.15, 2)
            qty = row.get('quantity') or '1'
            sku = extract_sku(notes) or re.sub(r'[\n,\\"]+', ' ', key)[:40]
            size, design = parse_size_and_design(key, notes)
            desc = DESC_TEMPLATE.format(title=key, design=design or 'N/A', size=size or 'N/A', quantity=qty)
            exported.append({
                'CustomLabel': sku,
                'Title': key,
                'Description': desc,
                'StartPrice': f"{price:.2f}",
                'Quantity': qty,
                'PictureURL': row.get('image_url',''),
                'ShippingCost': '10.00'
            })

    out_file = EXPORTS_DIR / 'ebay_file_exchange.csv'
    sample_file = EXPORTS_DIR / 'ebay_file_exchange_sample.csv'
    # If the eBay template exists, use its header to produce a full File Exchange CSV
    if TEMPLATE_FILE.exists():
        # read template header lines to find the header row starting with '*Action'
        header_cols = None
        for line in TEMPLATE_FILE.read_text(encoding='utf-8').splitlines():
            if line.startswith('*Action') or line.startswith('Action') or '*Action' in line:
                # split on comma but preserve empty fields
                header_cols = [c for c in csv.reader([line]).__next__()]
                break

        if header_cols is None:
            header_cols = ['CustomLabel','Title','Description','StartPrice','Quantity','PicURL']

        full_out = EXPORTS_DIR / 'ebay_file_exchange_full.csv'
        with full_out.open('w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=header_cols, extrasaction='ignore')
            writer.writeheader()
            for r in exported:
                row = {col: '' for col in header_cols}
                # Action column (find the exact header that starts with '*Action')
                action_col = next((c for c in header_cols if c.startswith('*Action') or c.startswith('Action')), None)
                if action_col:
                    row[action_col] = 'Add'

                # Category
                category_col = next((c for c in header_cols if c.strip().startswith('*Category') or c.strip() == '*Category' or c == 'Category'), None)
                if category_col:
                    row[category_col] = '52533'

                # Custom label
                custom_col = next((c for c in header_cols if 'CustomLabel' in c), None)
                if custom_col:
                    row[custom_col] = r['CustomLabel']

                # Title
                title_col = next((c for c in header_cols if c.strip() == '*Title' or c.strip() == 'Title'), None)
                if title_col:
                    row[title_col] = r['Title']

                # Description: sanitize to avoid unquoted newlines which can break File Exchange
                desc_col = next((c for c in header_cols if '*Description' in c or c.strip() == 'Description'), None)
                if desc_col:
                    desc = r.get('Description','') or ''
                    # normalize newlines, trim lines and collapse empty lines
                    desc = desc.replace('\r\n','\n').replace('\r','\n')
                    lines = [ln.strip() for ln in desc.split('\n') if ln.strip()]
                    desc = '<br/>'.join(lines)
                    # remove problematic double double-quotes
                    desc = desc.replace('""','"')
                    row[desc_col] = desc

                # StartPrice
                sp_col = next((c for c in header_cols if 'StartPrice' in c), None)
                if sp_col:
                    row[sp_col] = r['StartPrice']

                # Quantity
                qty_col = next((c for c in header_cols if c.strip().startswith('*Quantity') or c.strip() == 'Quantity'), None)
                if qty_col:
                    row[qty_col] = r['Quantity']

                # Picture URL (PicURL or PicURL)
                pic_col = next((c for c in header_cols if 'PicURL' in c or 'Picture' in c or 'Pic' in c), None)
                if pic_col:
                    row[pic_col] = r.get('PictureURL') or r.get('PictureURL') or r.get('Picture') or r.get('PicURL') or r.get('PictureURL')

                # Format & Duration
                fmt_col = next((c for c in header_cols if c.strip() == '*Format' or c.strip() == 'Format'), None)
                if fmt_col:
                    row[fmt_col] = 'FixedPrice'
                # eBay may expect Duration in different column names; set common variants
                dur_col = next((c for c in header_cols if c.strip() == '*Duration' or c.strip() == 'Duration'), None)
                listing_duration_col = next((c for c in header_cols if 'ListingDuration' in c or '*ListingDuration' in c), None)
                duration_value = 'GTC'
                if dur_col:
                    row[dur_col] = duration_value
                if listing_duration_col:
                    row[listing_duration_col] = duration_value

                # Condition
                cond_col = next((c for c in header_cols if 'ConditionID' in c), None)
                if cond_col:
                    row[cond_col] = '1000'

                # Shipping
                shiptype_col = next((c for c in header_cols if c.strip() == 'ShippingType' or 'ShippingType' in c), None)
                if shiptype_col:
                    row[shiptype_col] = 'Flat'
                ship1_col = next((c for c in header_cols if 'ShippingService-1:Option' in c), None)
                ship1_cost_col = next((c for c in header_cols if 'ShippingService-1:Cost' in c), None)
                if ship1_col:
                    row[ship1_col] = 'USPSPriority'
                if ship1_cost_col:
                    row[ship1_cost_col] = '10.00'

                dispatch_col = next((c for c in header_cols if 'DispatchTimeMax' in c), None)
                if dispatch_col:
                    row[dispatch_col] = '2'

                location_col = next((c for c in header_cols if c.strip() == '*Location' or c.strip() == 'Location'), None)
                if location_col:
                    row[location_col] = 'United States'

                # Returns - use canonical File Exchange enum values and also populate possible return profile fields
                ret_col = next((c for c in header_cols if 'ReturnsAcceptedOption' in c), None)
                if ret_col:
                    row[ret_col] = 'ReturnsAccepted'
                # eBay sometimes expects 'Days_30' instead of '30 Days'
                ret_within = next((c for c in header_cols if 'ReturnsWithinOption' in c), None)
                if ret_within:
                    row[ret_within] = 'Days_30'
                refund_col = next((c for c in header_cols if 'RefundOption' in c), None)
                if refund_col:
                    row[refund_col] = 'MoneyBack'
                ship_paid_by = next((c for c in header_cols if 'ShippingCostPaidByOption' in c), None)
                if ship_paid_by:
                    row[ship_paid_by] = 'Buyer'

                # If the template uses business policy IDs, try to populate ReturnProfileID or similar columns
                rp_col = next((c for c in header_cols if 'ReturnProfileID' in c or 'ReturnProfile' in c), None)
                if rp_col and not row.get(rp_col):
                    # leave blank; user likely needs to supply their own profile IDs — but set a fallback name if allowed
                    row[rp_col] = ''

                # Brand
                brand_col = next((c for c in header_cols if 'C:Brand' in c), None)
                if brand_col:
                    row[brand_col] = 'bagsupplyco'

                # Country of Origin
                coo_col = next((c for c in header_cols if 'C:Country of Origin' in c or 'Country of Origin' in c), None)
                if coo_col:
                    row[coo_col] = 'United States'

                # write the row
                writer.writerow(row)

        print(f"Exported {len(exported)} items to {full_out}")
        print(f"Sample (first 20) written to {sample_file}")
        print(f"Skipped {len(skipped)} items (matching skip patterns). Example skipped items:")
        for s in skipped[:20]:
            print(' -', s)
    else:
        # fallback to simpler CSV
        fieldnames = ['CustomLabel','Title','Description','StartPrice','Quantity','PictureURL','ShippingCost']
        with out_file.open('w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for r in exported:
                writer.writerow(r)

        # write a smaller sample
        with sample_file.open('w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for r in exported[:20]:
                writer.writerow(r)

        print(f"Exported {len(exported)} items to {out_file}")
        print(f"Sample (first 20) written to {sample_file}")
        print(f"Skipped {len(skipped)} items (matching skip patterns). Example skipped items:")
        for s in skipped[:20]:
            print(' -', s)


if __name__ == '__main__':
    main()

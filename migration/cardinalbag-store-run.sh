#!/usr/bin/env bash
set -euo pipefail
ROOT="/Users/marccastella/Downloads/bagco-1"
OUT="$ROOT/migration/cardinalbag-store"
mkdir -p "$OUT"

curl -s https://cardinalbag.store/sitemap.xml -o "$OUT/sitemap-index.xml"

perl -ne 'if (/<loc>([^<]+)<\/loc>/) { print "$1\n"; }' "$OUT/sitemap-index.xml" > "$OUT/sitemap-files.txt"

: > "$OUT/image-manifest.txt"
while IFS= read -r sm; do
  [ -z "$sm" ] && continue
  tmp="$OUT/tmp.xml"
  curl -s "$sm" -o "$tmp"
  perl -ne '
    if (/<loc>([^<]+)<\/loc>/ && $_ !~ /<image:loc>/) {
      $p=$1;
      $p =~ s{^https?://cardinalbag\.store/?}{};
      $p =~ s{^https?://www\.cardinalbag\.store/?}{};
      $p =~ s/\?.*$//;
      $p = "home" if $p eq "";
      $p =~ s{/}{-}g;
      $p =~ s/[^A-Za-z0-9._-]/-/g;
      $current=$p;
    }
    if (/<image:loc>([^<]+)<\/image:loc>/ && $current ne "") {
      print "$current|$1\n";
    }
  ' "$tmp" >> "$OUT/image-manifest.txt"
done < "$OUT/sitemap-files.txt"

sort -u "$OUT/image-manifest.txt" -o "$OUT/image-manifest.txt"
wc -l "$OUT/image-manifest.txt"
sed -n '1,10p' "$OUT/image-manifest.txt"

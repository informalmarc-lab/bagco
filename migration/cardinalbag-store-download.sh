#!/usr/bin/env bash
set -euo pipefail
ROOT="/Users/marccastella/Downloads/bagco-1"
MAN="$ROOT/migration/cardinalbag-store/image-manifest.txt"
DST="$ROOT/public/gallery/imported/cardinalbag-store"
LOG="$ROOT/migration/cardinalbag-store/failed-downloads.txt"
mkdir -p "$DST"
: > "$LOG"

while IFS='|' read -r page url; do
  [ -z "$page" ] && continue
  outdir="$DST/$page"
  mkdir -p "$outdir"
  base=$(basename "${url%%\?*}")
  [ -z "$base" ] && base="image.jpg"
  case "$base" in *.*) ;; *) base="$base.jpg" ;; esac
  safe=$(printf '%s' "$base" | tr ' ' '-' | tr '+' '-' | tr -cd '[:alnum:]._-')
  hash=$(printf '%s' "$url" | shasum | awk '{print $1}' | cut -c1-10)
  out="$outdir/${hash}_$safe"
  [ -f "$out" ] && continue
  curl -L --max-time 20 --retry 1 --silent --show-error --fail "$url" -o "$out" || {
    echo "$page|$url" >> "$LOG"
    rm -f "$out"
  }
done < "$MAN"

printf 'downloaded: '
find "$DST" -type f | wc -l
printf 'failed: '
sort -u "$LOG" | wc -l

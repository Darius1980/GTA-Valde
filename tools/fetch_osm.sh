#!/usr/bin/env bash
# Descarga de OpenStreetMap los datos de Val de Santa María (Zamora).
set -euo pipefail
OUT=${1:-data}
mkdir -p "$OUT"
Q='[out:json][timeout:120];
node["place"]["name"="Val de Santa María"]->.c;
( way(around.c:1200);
  node(around.c:1200)[~"."~"."];
  relation(around.c:1200)["type"="multipolygon"]; );
(._;>;);
out body;'
for url in https://overpass-api.de/api/interpreter https://overpass.kumi.systems/api/interpreter https://maps.mail.ru/osm/tools/overpass/api/interpreter; do
  if curl -sSf -m 180 --data-urlencode "data=$Q" "$url" -o "$OUT/osm.json"; then
    echo "OK from $url"; break
  fi
done
python3 -c "import json;d=json.load(open('$OUT/osm.json'));print(len(d['elements']),'elements')"

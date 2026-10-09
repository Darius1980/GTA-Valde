"""Consulta capacidades de servicios para elegir fuentes de datos (se ejecuta en Actions)."""
import os, urllib.request
os.makedirs("data/probe", exist_ok=True)
URLS = {
    "mdt_caps.xml": "https://servicios.idee.es/wcs-inspire/mdt?SERVICE=WCS&REQUEST=GetCapabilities",
    "mds_caps.xml": "https://servicios.idee.es/wcs-inspire/mds?SERVICE=WCS&REQUEST=GetCapabilities",
    "mdsn_caps.xml": "https://servicios.idee.es/wcs-inspire/mdsn?SERVICE=WCS&REQUEST=GetCapabilities",
    "geoeuskadi_wcs.xml": "https://www.geo.euskadi.eus/WCS_KARTOGRAFIA?SERVICE=WCS&REQUEST=GetCapabilities",
    "geoeuskadi_wms.xml": "https://www.geo.euskadi.eus/WMS_KARTOGRAFIA?SERVICE=WMS&REQUEST=GetCapabilities",
}
for name, url in URLS.items():
    try:
        b = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "GTA-Valde"}), timeout=60).read()
        open("data/probe/" + name, "wb").write(b[:3_000_000]); print(name, len(b))
    except Exception as e:
        print(name, "fail", e)

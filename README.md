# GTA Valde

Juego de mundo abierto en 3D para el navegador ambientado en **Val de Santa María (Zamora)**, reconstruido a escala real con datos abiertos.

## Jugar

- Ordenador: WASD o flechas para moverte, ratón para la cámara (clic para capturarlo), Shift para correr, Espacio para saltar o frenar, E para subir o bajar del coche.
- Móvil: joystick a la izquierda, arrastra la pantalla para girar la cámara, botones 🚪 (coche), ⤒ (saltar/frenar) y 🏃 (correr).

## Desarrollo

```bash
npm install
npm run dev            # servidor local
npm run build          # genera dist/
python3 tools/build_world.py   # regenera public/world/ a partir de data/
```

Los datos de `data/` se descargan con el workflow *Fetch map data* (`tools/fetch_data.py`).

## Fuentes de datos

- Calles: © colaboradores de OpenStreetMap (ODbL).
- Edificios y número de plantas: Dirección General del Catastro (INSPIRE).
- Ortofoto PNOA y Modelo Digital del Terreno: © Instituto Geográfico Nacional (CC BY 4.0, scne.es).

"""Junta lo que Darío dibujó en el plano (base de datos del artefacto, guardada en data/valde/plano)
en public/world/valde/plano.json, que el juego aplica al cargar."""
import glob, json, os, sys
m = sys.argv[1] if len(sys.argv) > 1 else 'valde'
src = f'data/{m}/plano'
docs = lambda c: [json.load(open(f)) for f in sorted(glob.glob(f'{src}/{c}/*.json'))]
gone = {os.path.basename(f)[:-5] for f in glob.glob(f'{src}/quitar_tapia/*.json')}
key = lambda w: 'w%d_%d_%d_%d' % (round(w['p'][0][0] * 10), round(w['p'][0][1] * 10), round(w['p'][-1][0] * 10), round(w['p'][-1][1] * 10))
todas = (docs('ajuste') and any(d.get('todas') for d in docs('ajuste')))
foto = json.load(open(f'{src}/ajuste/foto.json')) if os.path.exists(f'{src}/ajuste/foto.json') else {}
auto = json.load(open(f'{src}/plano_data.json'))['w']
lines = [] if todas else [{'kind': 'ruin' if w['r'] else 'wall', 'xy': [v for p in w['p'] for v in p]} for w in auto if key(w) not in gone]
tr = sorted(docs('trazos'), key=lambda d: d.get('at', 0))
out = {
    'foto': {k: foto.get(k, d) for k, d in (('dx', 0), ('dz', 0), ('scale', 1), ('rot', 0))},
    'quitar': [{'id': d['id'], 'c': [d['cx'], d['cz']]} for d in docs('quitar')],
    'lineas': lines + [{'kind': d['kind'], 'xy': d['xy']} for d in tr if d['kind'] in ('wall', 'ruin')],
    'edificios': [{'xy': d['xy'], 'f': d.get('floors') or 1} for d in tr if d['kind'] == 'building'],
    'arboledas': [d['xy'] for d in tr if d['kind'] == 'grove'],
    'claros': [d['xy'] for d in tr if d['kind'] == 'clear'],
}
json.dump(out, open(f'public/world/{m}/plano.json', 'w'), separators=(',', ':'))
print({k: len(v) for k, v in out.items() if isinstance(v, list)}, out['foto'])

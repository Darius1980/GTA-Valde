// Captura de pantalla automatizada del juego: node tools/shot.mjs <url> <salida.png> [acciones]
import { chromium } from 'playwright';
const [url, out, script = '', w = 1280, h = 720] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
const logs = [];
page.on('console', m => logs.push(m.type() + ': ' + m.text()));
page.on('pageerror', e => logs.push('pageerror: ' + e.message));
await page.goto(url);
await page.waitForFunction(() => document.getElementById('loading')?.classList.contains('done'), null, { timeout: 120000 }).catch(() => logs.push('timeout loading'));
for (const step of script.split('|').filter(Boolean)) {
  const i = step.indexOf(':'), cmd = step.slice(0, i), rest = step.slice(i + 1);
  const [arg, ms] = cmd === 'eval' ? [rest] : rest.split(':');
  if (cmd === 'wait') await page.waitForTimeout(+arg);
  if (cmd === 'hold') { await page.keyboard.down(arg); await page.waitForTimeout(+ms); await page.keyboard.up(arg); }
  if (cmd === 'press') await page.keyboard.press(arg);
  if (cmd === 'eval') await page.evaluate(arg);
}
await page.waitForTimeout(1500);
const t0 = Date.now(); await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))); logs.push('frame ms ~' + (Date.now() - t0) / 2);
await page.screenshot({ path: out, timeout: 180000 });
console.log(logs.slice(0, 30).join('\n'));
await browser.close();

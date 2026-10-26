import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const colors = fs.readFileSync(new URL('../src/colors.css', import.meta.url), 'utf8');
const tokens = Object.fromEntries([...colors.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(match => [match[1], match[2].trim()]));
function resolve(name) {
  assert.ok(tokens[name], `Token sin definir: ${name}`);
  const alias = tokens[name].match(/^var\(([^)]+)\)$/);
  return alias ? resolve(alias[1]) : tokens[name];
}
function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
function contrast(foreground, background) {
  const a = luminance(resolve(foreground)), b = luminance(resolve(background));
  return (Math.max(a,b) + .05) / (Math.min(a,b) + .05);
}

test('paleta MVP 1.4: textos, acciones y estados mantienen contraste AA', () => {
  const textPairs = [];
  for (const background of ['--background', '--surface', '--surface-alt', '--surface-input']) {
    for (const foreground of ['--text','--text-muted','--text-accent','--text-action']) textPairs.push([foreground, background]);
    for (const foreground of ['--focus','--border-control']) assert.ok(contrast(foreground, background) >= 3, `${foreground}/${background}`);
  }
  textPairs.push(['--on-action','--action'], ['--on-action','--action-hover'], ['--on-dark','--dark-surface'], ['--on-dark-muted','--dark-surface']);
  for (const [foreground, background] of textPairs) assert.ok(contrast(foreground, background) >= 4.5, `${foreground}/${background}: ${contrast(foreground, background)}`);
  console.log(`Contraste mínimo de texto: ${Math.min(...textPairs.map(pair => contrast(...pair))).toFixed(2)}:1; ${textPairs.length} combinaciones de texto.`);
});

test('la interfaz usa SVG en lugar de flechas y controles Unicode', () => {
  const root = new URL('../src/', import.meta.url);
  for (const folder of ['components','pages']) {
    for (const file of fs.readdirSync(new URL(`${folder}/`, root)).filter(file => file.endsWith('.jsx'))) {
      const source = fs.readFileSync(new URL(`${folder}/${file}`, root), 'utf8');
      assert.ok(!/[↗→←−×✳]/u.test(source), `Icono Unicode en ${folder}/${file}`);
      assert.ok(!/>\s*\+\s*</u.test(source), `Control + sin SVG en ${folder}/${file}`);
    }
  }
});

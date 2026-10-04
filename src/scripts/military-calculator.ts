import { calculate, exactDisplay, formatRatio } from '../lib/math.ts';
import type { Locale, Measurements } from '../lib/math.ts';
import { boundaryCheck, chestMeasurement, physique } from '../lib/military.ts';
import type { Table } from '../lib/military.ts';
import { healthGuidance } from '../lib/health-guidance.ts';
import { copy, inputError } from '../lib/military-copy.ts';
import {
  adviceText,
  bmiConclusion,
  bmiThresholds,
  callupSummary,
  callupScope,
  gradeExplanation,
  physiqueConclusion,
  scoreLines,
  thresholdDistance,
} from '../lib/presentation.ts';

function node<T extends HTMLElement>(id: string, type: { new (): T }): T {
  const element = document.getElementById(id);
  if (!(element instanceof type)) throw new Error(`Missing ${id}`);
  return element;
}
const lang: Locale = document.documentElement.lang === 'en' ? 'en' : 'vi';
const c = copy[lang];
const form = node('bmi-form', HTMLFormElement);
const clear = node('clear', HTMLButtonElement);
const tableMale = node('table-male', HTMLInputElement);
const tableFemale = node('table-female', HTMLInputElement);
const inputs = {
  height: node('height', HTMLInputElement),
  weight: node('weight', HTMLInputElement),
  chest: node('chest', HTMLInputElement),
};
const result = node('result', HTMLDivElement);
const details = node('result-details', HTMLElement);
const empty = node('empty-result', HTMLDivElement);
const status = node('status', HTMLParagraphElement);
const dynamicIds = [
  'bmi-value',
  'exact-bmi',
  'category',
  'conclusion-scope',
  'score-list',
  'drivers',
  'physique-criterion',
  'bmi-criterion',
  'threshold-distance',
  'boundary-warning',
  'weight-range',
  'weight-distance',
  'weight-change',
  'health-advice',
] as const;
const validated = new Set<HTMLInputElement>();
let composing = false;
let clearing = false;
clear.addEventListener('pointerdown', () => {
  clearing = true;
});
window.addEventListener('pointerup', () => {
  window.setTimeout(() => {
    clearing = false;
  }, 0);
});
window.addEventListener('pointercancel', () => {
  clearing = false;
});
function set(id: string, value: string): void {
  node(id, HTMLElement).textContent = value;
}
function selectedTable(): Table {
  return tableFemale.checked ? 'female' : 'male';
}
function clearErrors(group: typeof inputs, prefix = ''): void {
  for (const key of ['height', 'weight', 'chest'] as const) {
    group[key].removeAttribute('aria-invalid');
    const error = node(prefix + key + '-error', HTMLParagraphElement);
    error.textContent = '';
    error.hidden = true;
  }
}
function invalidate(message = ''): void {
  result.hidden = true;
  details.hidden = true;
  empty.hidden = false;
  for (const id of dynamicIds) set(id, '');
  clearErrors(inputs);
  status.textContent = message;
  status.removeAttribute('data-state');
}
function read(
  group: typeof inputs,
  prefix = '',
  validateAll = false,
): { measurements: Measurements; chest: bigint | null } | null {
  clearErrors(group, prefix);
  const answer = calculate(group.height.value, group.weight.value);
  const chest = chestMeasurement(group.chest.value, selectedTable());
  let first: HTMLInputElement | undefined;
  for (const key of ['height', 'weight', 'chest'] as const) {
    if (validateAll) validated.add(group[key]);
    const error =
      key === 'chest'
        ? typeof chest === 'string'
          ? chest
          : undefined
        : !answer.ok
          ? answer.errors[key]
          : undefined;
    if (error && validated.has(group[key])) {
      group[key].setAttribute('aria-invalid', 'true');
      const p = node(prefix + key + '-error', HTMLParagraphElement);
      p.hidden = false;
      p.textContent = inputError(lang, error, key);
      first ??= group[key];
    }
  }
  if (!answer.ok || typeof chest === 'string') {
    if (validateAll) first?.focus();
    return null;
  }
  return { measurements: answer.measurements, chest };
}
function refresh(validateAll = false): void {
  invalidate();
  if (composing) return;
  const answer = read(inputs, '', validateAll);
  if (!answer) {
    if (
      Object.values(inputs).some((input) => input.hasAttribute('aria-invalid'))
    ) {
      status.textContent = c.error;
      status.dataset['state'] = 'error';
    }
    return;
  }
  const { measurements, chest } = answer;
  const scored = physique(measurements, selectedTable(), chest);
  set('bmi-value', formatRatio(measurements.bmi, lang));
  set('exact-bmi', exactDisplay(measurements.bmi, bmiThresholds, lang));
  set('category', callupSummary(scored, lang));
  set('conclusion-scope', callupScope(scored, lang));
  const list = node('score-list', HTMLUListElement);
  for (const line of scoreLines(scored, lang)) {
    const item = document.createElement('li');
    item.textContent = line;
    list.append(item);
  }
  set('drivers', gradeExplanation(scored, lang));
  node('missing-chest', HTMLElement).hidden = !scored.missingChest;
  node('low-gap', HTMLElement).hidden = !scored.lowBmiGap;
  node('table-gap', HTMLElement).hidden = !scored.tableGap;
  set('physique-criterion', physiqueConclusion(scored, lang));
  set('bmi-criterion', bmiConclusion(scored, lang));
  const boundary = boundaryCheck(measurements);
  set(
    'threshold-distance',
    `BMI 18${lang === 'vi' ? ',0' : '.0'} ${lang === 'vi' ? 'tương ứng' : 'corresponds to'} ${thresholdDistance(boundary.lowerWeight, measurements.weight, lang)}. BMI ${lang === 'vi' ? '29,9' : '29.9'} ${lang === 'vi' ? 'tương ứng' : 'corresponds to'} ${thresholdDistance(boundary.upperWeight, measurements.weight, lang)}.`,
  );
  set('boundary-warning', boundary.borderline ? c.borderline : c.stable);
  const guidance = healthGuidance(measurements, lang);
  set('weight-range', guidance.range);
  set('weight-distance', guidance.distance);
  set('weight-change', guidance.change);
  set('health-advice', adviceText(measurements.bmi, lang));
  empty.hidden = true;
  result.hidden = false;
  details.hidden = false;
  status.textContent = `BMI ${formatRatio(measurements.bmi, lang)}. ${c.done}`;
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  refresh(true);
});
for (const input of Object.values(inputs)) {
  input.addEventListener('input', () => {
    validated.delete(input);
    refresh();
  });
  input.addEventListener('blur', (event) => {
    if (clearing || event.relatedTarget === clear) return;
    validated.add(input);
    refresh();
  });
  input.addEventListener('compositionstart', () => {
    composing = true;
    invalidate();
  });
  input.addEventListener('compositionend', () => {
    composing = false;
    refresh();
  });
}
function updateTable(): void {
  const female = selectedTable() === 'female';
  node('chest-field', HTMLElement).hidden = female;
  inputs.chest.disabled = female;
  if (female) inputs.chest.value = '';
  refresh();
}
for (const table of [tableMale, tableFemale])
  table.addEventListener('change', updateTable);
function resetAll(): void {
  clearing = false;
  composing = false;
  validated.clear();
  tableMale.checked = true;
  tableFemale.checked = false;
  for (const key of ['height', 'weight', 'chest'] as const)
    inputs[key].value = '';
  updateTable();
  invalidate();
}
form.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
    event.preventDefault();
    if (!event.isComposing) form.requestSubmit();
  }
});
form.addEventListener('reset', () => {
  resetAll();
  window.setTimeout(() => {
    inputs.height.focus();
  }, 0);
});
window.addEventListener('pagehide', resetAll);
window.addEventListener('pageshow', (event) => {
  if (event.persisted) resetAll();
});
resetAll();
for (const input of [...Object.values(inputs), tableMale, tableFemale])
  input.disabled = false;
for (const id of ['clear']) node(id, HTMLButtonElement).disabled = false;
for (const submit of document.querySelectorAll<HTMLButtonElement>(
  '[data-enter-submit]',
))
  submit.disabled = false;
form.dataset['ready'] = 'true';

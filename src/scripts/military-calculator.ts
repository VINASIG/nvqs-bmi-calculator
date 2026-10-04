import {
  calculate,
  compare,
  displayMeasurement,
  exactDisplay,
  formatRatio,
} from '../lib/math.ts';
import type { Locale, Measurements } from '../lib/math.ts';
import {
  boundaryCheck,
  chestMeasurement,
  healthyReference,
  physique,
} from '../lib/military.ts';
import type { Table } from '../lib/military.ts';
import { installMeasurementDate } from './measurement-date.ts';
import { copy, indicatorLabels, inputError } from '../lib/military-copy.ts';
import {
  adviceText,
  bmiConclusion,
  bmiThresholds,
  gradeLabel,
  measurementRecord,
  outcome,
  physiqueConclusion,
  scoreLines,
  signedMeasurement,
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
const recordForm = node('comparison-form', HTMLFormElement);
const clear = node('clear', HTMLButtonElement);
const tableMale = node('table-male', HTMLInputElement);
const tableFemale = node('table-female', HTMLInputElement);
const measurementDate = installMeasurementDate(lang);
const inputs = {
  height: node('height', HTMLInputElement),
  weight: node('weight', HTMLInputElement),
  chest: node('chest', HTMLInputElement),
};
const records = {
  height: node('record-height', HTMLInputElement),
  weight: node('record-weight', HTMLInputElement),
  chest: node('record-chest', HTMLInputElement),
};
const result = node('result', HTMLDivElement);
const details = node('result-details', HTMLElement);
const empty = node('empty-result', HTMLDivElement);
const status = node('status', HTMLParagraphElement);
const recordStatus = node('comparison-status', HTMLParagraphElement);
const comparison = node('comparison-result', HTMLElement);
const sheet = node('print-sheet', HTMLElement);
const date = node('measurement-date', HTMLInputElement);
const witness = node('witness', HTMLInputElement);
const method = node('method', HTMLTextAreaElement);
const dynamicIds = [
  'bmi-value',
  'exact-bmi',
  'category',
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
function invalidateComparison(): void {
  comparison.hidden = true;
  for (const id of [
    'measurement-differences',
    'self-outcome',
    'record-outcome',
  ])
    set(id, '');
  recordStatus.textContent = '';
  clearErrors(records, 'record-');
}
function invalidate(message = ''): void {
  result.hidden = true;
  details.hidden = true;
  empty.hidden = false;
  for (const id of dynamicIds) set(id, '');
  clearErrors(inputs);
  status.textContent = message;
  status.removeAttribute('data-state');
  invalidateComparison();
  sheet.hidden = true;
  set('sheet-content', '');
  set('print-status', '');
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
    refreshComparison();
    return;
  }
  const { measurements, chest } = answer;
  const scored = physique(measurements, selectedTable(), chest);
  set('bmi-value', formatRatio(measurements.bmi, lang));
  set('exact-bmi', exactDisplay(measurements.bmi, bmiThresholds, lang));
  set('category', gradeLabel(scored, lang));
  const list = node('score-list', HTMLUListElement);
  for (const line of scoreLines(scored, lang)) {
    const item = document.createElement('li');
    item.textContent = line;
    list.append(item);
  }
  set(
    'drivers',
    scored.drivers.length
      ? `${c.drivers} - ${scored.drivers.map((key) => indicatorLabels[lang][key]).join(', ')}.`
      : c.uncertain,
  );
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
  const reference = healthyReference(measurements);
  set(
    'weight-range',
    `${displayMeasurement(reference.lower, lang)}-${displayMeasurement(reference.upper, lang)} kg`,
  );
  set(
    'weight-distance',
    `${c.distance} ${lang === 'vi' ? 'tới' : 'to'} BMI ${lang === 'vi' ? '18,5' : '18.5'} ${lang === 'vi' ? 'là' : 'is'} ${displayMeasurement(reference.distanceToLower, lang)} kg. ${c.distance} ${lang === 'vi' ? 'tới' : 'to'} BMI ${lang === 'vi' ? '24,9' : '24.9'} ${lang === 'vi' ? 'là' : 'is'} ${displayMeasurement(reference.distanceToUpper, lang)} kg.`,
  );
  set(
    'weight-change',
    compare(measurements.bmi, 185n) < 0
      ? `${c.gain} ${displayMeasurement(reference.increaseToLower, lang)} kg.`
      : compare(measurements.bmi, 250n) >= 0
        ? `${c.lose} ${displayMeasurement(reference.decreaseToUpper, lang)} kg.`
        : c.maintain,
  );
  set('health-advice', adviceText(measurements.bmi, lang));
  empty.hidden = true;
  result.hidden = false;
  details.hidden = false;
  status.textContent = `BMI ${formatRatio(measurements.bmi, lang)}. ${c.done}`;
  refreshComparison();
}
function refreshComparison(validateAll = false): void {
  invalidateComparison();
  if (composing) return;
  const own = read(inputs, '', validateAll);
  const recorded = read(records, 'record-', validateAll);
  if (!own || !recorded) {
    if (
      Object.values(records).some((input) => input.hasAttribute('aria-invalid'))
    )
      recordStatus.textContent = c.error;
    else if (Object.values(records).some((input) => input.value))
      recordStatus.textContent = c.comparisonWaiting;
    return;
  }
  const differences = [
    `${indicatorLabels[lang].height} ${signedMeasurement(recorded.measurements.height - own.measurements.height, lang)} cm`,
    `${indicatorLabels[lang].weight} ${signedMeasurement(recorded.measurements.weight - own.measurements.weight, lang)} kg`,
  ];
  const chestComplete = own.chest !== null && recorded.chest !== null;
  if (own.chest !== null && recorded.chest !== null)
    differences.push(
      `${indicatorLabels[lang].chest} ${signedMeasurement(recorded.chest - own.chest, lang)} cm`,
    );
  set('measurement-differences', differences.join('. '));
  node('comparison-missing', HTMLElement).hidden =
    selectedTable() === 'female' || chestComplete;
  set(
    'self-outcome',
    `${c.self}. ${outcome(own.measurements, selectedTable(), own.chest, lang)}`,
  );
  set(
    'record-outcome',
    `${c.record}. ${outcome(recorded.measurements, selectedTable(), recorded.chest, lang)}`,
  );
  comparison.hidden = false;
  recordStatus.textContent = `${c.done} ${differences.join('. ')}.`;
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  refresh(true);
});
recordForm.addEventListener('submit', (event) => {
  event.preventDefault();
  refreshComparison(true);
});
for (const inputForm of [form, recordForm])
  inputForm.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      event.preventDefault();
      if (!event.isComposing) inputForm.requestSubmit();
    }
  });
function prepareRecord(): string | null {
  const answer = read(inputs, '', true);
  if (!answer) {
    set('print-status', c.error);
    status.textContent = c.error;
    return null;
  }
  if (!measurementDate.validate()) {
    set('print-status', c.error);
    return null;
  }
  const text = measurementRecord(
    answer.measurements,
    selectedTable(),
    answer.chest,
    lang,
    { date: date.value, witness: witness.value, method: method.value },
  );
  set('sheet-content', text.split('\n\n').slice(2).join('\n\n'));
  sheet.hidden = false;
  set('print-status', c.done);
  return text;
}
node('print', HTMLButtonElement).addEventListener('click', () => {
  if (prepareRecord() !== null) window.print();
});
node('download', HTMLButtonElement).addEventListener('click', () => {
  const text = prepareRecord();
  if (text === null) return;
  const url = URL.createObjectURL(
    new Blob([text], { type: 'text/plain;charset=utf-8' }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = 'vinasig-self-measurements.txt';
  link.click();
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
});
for (const [group, update] of [
  [inputs, refresh],
  [records, refreshComparison],
] as const)
  for (const input of Object.values(group)) {
    input.addEventListener('input', () => {
      validated.delete(input);
      update();
    });
    input.addEventListener('blur', (event) => {
      if (clearing || event.relatedTarget === clear) return;
      validated.add(input);
      update();
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
for (const input of [date, witness, method])
  input.addEventListener('input', () => {
    sheet.hidden = true;
    set('sheet-content', '');
    set('print-status', '');
  });
function updateTable(): void {
  const female = selectedTable() === 'female';
  for (const prefix of ['', 'record-']) {
    node(prefix + 'chest-field', HTMLElement).hidden = female;
    const input = node(prefix + 'chest', HTMLInputElement);
    input.disabled = female;
    if (female) input.value = '';
  }
  refresh();
}
for (const table of [tableMale, tableFemale])
  table.addEventListener('change', updateTable);
function resetAll(): void {
  clearing = false;
  composing = false;
  validated.clear();
  recordForm.reset();
  date.value = '';
  witness.value = '';
  method.value = '';
  tableMale.checked = true;
  tableFemale.checked = false;
  measurementDate.reset();
  for (const key of ['height', 'weight', 'chest'] as const)
    inputs[key].value = '';
  updateTable();
  invalidate();
}
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
for (const input of [
  ...Object.values(inputs),
  ...Object.values(records),
  tableMale,
  tableFemale,
])
  input.disabled = false;
for (const id of ['clear', 'print', 'download'])
  node(id, HTMLButtonElement).disabled = false;
for (const submit of document.querySelectorAll<HTMLButtonElement>(
  '[data-enter-submit]',
))
  submit.disabled = false;
form.dataset['ready'] = 'true';
recordForm.dataset['ready'] = 'true';

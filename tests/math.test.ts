import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  calculate,
  compare,
  displayMeasurement,
  exactDisplay,
  formatRatio,
  parseMeasurement,
  roundMeasurement,
} from '../src/lib/math.ts';
await test('formula and decimal input preserve exact arithmetic', () => {
  const result = calculate('170', '65');
  assert(result.ok);
  assert.deepEqual(result.measurements.bmi, {
    numerator: 650_000_000_000n,
    denominator: 28_900_000_000n,
  });
  assert.equal(formatRatio(result.measurements.bmi, 'en'), '22.5');
  assert.equal(formatRatio(result.measurements.bmi, 'vi'), '22,5');
  assert.deepEqual(
    calculate(' 170,125 ', '65,875'),
    calculate('170.125', '65.875'),
  );
  assert.equal(displayMeasurement(170_125n, 'vi'), '170,125');
  assert.equal(displayMeasurement(65_500n, 'en'), '65.5');
});
for (const raw of [
  '',
  '  ',
  '-1',
  '+170',
  '0',
  '1e2',
  'Infinity',
  'NaN',
  '1,700.0',
  '170 cm',
  '170.1234',
  '1 70',
  '<script>',
  '170\n0',
])
  await test(`reject invalid height ${JSON.stringify(raw)}`, () => {
    assert.equal(calculate(raw, '65').ok, false);
  });
await test('missing fields have independent errors and technical guards preserve boundaries', () => {
  assert.deepEqual(calculate('', ''), {
    ok: false,
    errors: { height: 'required', weight: 'required' },
  });
  assert.deepEqual(calculate('170', 'abc'), {
    ok: false,
    errors: { weight: 'decimal' },
  });
  assert.equal(parseMeasurement('50', 'height'), 50_000n);
  assert.equal(parseMeasurement('300', 'height'), 300_000n);
  assert.equal(parseMeasurement('1', 'weight'), 1000n);
  assert.equal(parseMeasurement('1000', 'weight'), 1_000_000n);
  for (const raw of ['49.999', '300.001'])
    assert.equal(parseMeasurement(raw, 'height'), 'range');
  for (const raw of ['0.999', '1000.001'])
    assert.equal(parseMeasurement(raw, 'weight'), 'range');
});
await test('exact comparison text preserves every boundary relation in a broad sample', () => {
  const thresholds = [
    180n,
    185n,
    249n,
    250n,
    269n,
    270n,
    299n,
    300n,
    349n,
    350n,
    399n,
    400n,
  ];
  for (const h of ['50', '150.123', '170', '199.999', '200', '275.125', '300'])
    for (let w = 1; w <= 1000; w += 7) {
      const result = calculate(h, String(w));
      assert(result.ok);
      const ratio = result.measurements.bmi;
      for (const lang of ['vi', 'en'] as const) {
        const [whole = '', fraction = ''] = exactDisplay(
          ratio,
          thresholds,
          lang,
        )
          .replace(',', '.')
          .split('.');
        const presented = {
          numerator: BigInt(whole + fraction),
          denominator: 10n ** BigInt(fraction.length),
        };
        for (const boundary of thresholds)
          assert.equal(compare(presented, boundary), compare(ratio, boundary));
      }
    }
});
await test('physical measurements round halves upward, independently of BMI', () => {
  for (const [raw, rounded] of [
    [152_500n, 153n],
    [158_490n, 158n],
    [46_500n, 47n],
    [51_490n, 51n],
    [82_500n, 83n],
    [79_490n, 79n],
  ]) {
    assert(raw !== undefined && rounded !== undefined);
    assert.equal(roundMeasurement(raw), rounded);
  }
});

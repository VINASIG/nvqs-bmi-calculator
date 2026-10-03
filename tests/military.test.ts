import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bmiRatio, calculate, compare } from '../src/lib/math.ts';
import {
  bmiScore,
  boundaryCheck,
  chestMeasurement,
  healthyReference,
  measurementScore,
  militaryCategory,
  physique,
  sourceTable,
} from '../src/lib/military.ts';
import {
  bmiConclusion,
  measurementRecord,
  physiqueConclusion,
} from '../src/lib/presentation.ts';
import { copy } from '../src/lib/military-copy.ts';
for (const [h, w, table, grade, outside] of [
  ['170', '50', 'male', 4, true],
  ['171', '52', 'male', 4, true],
  ['170', '44', 'male', 4, true],
  ['170', '55', 'male', 1, false],
  ['160', '50', 'male', 2, false],
  ['176', '95', 'male', 4, true],
  ['170', '52.6', 'male', 4, false],
  ['155', '45', 'female', 2, false],
] as const)
  await test(`physique fixture ${table} ${h}cm/${w}kg`, () => {
    const answer = calculate(h, w);
    assert(answer.ok);
    const result = physique(answer.measurements, table);
    assert.equal(result.grade, grade);
    assert.equal(result.outsideBmi, outside);
    if (w === '52.6') {
      assert(result.lowBmiGap);
      assert.match(bmiConclusion(result, 'vi'), /không bị loại trực tiếp/);
      assert.match(physiqueConclusion(result, 'vi'), /không đáp ứng/);
    }
  });
for (const [tenths, score] of [
  [180n, 4],
  [1849n, 4],
  [185n, 1],
  [249n, 1],
  [250n, 2],
  [269n, 2],
  [270n, 3],
  [299n, 3],
  [300n, 4],
  [350n, 5],
  [400n, 6],
] as const)
  await test(`BMI score at ${String(tenths)}`, () => {
    const ratio = {
      numerator: tenths,
      denominator: tenths === 1849n ? 100n : 10n,
    };
    assert.equal(bmiScore(ratio), score);
  });
await test('literal decimal gaps are explicit and never silently filled', () => {
  for (const value of [2495n, 2695n, 2995n, 3495n, 3995n])
    assert.equal(bmiScore({ numerator: value, denominator: 100n }), null);
  const answer = calculate('200', '99.8');
  assert(answer.ok);
  const result = physique(answer.measurements, 'male');
  assert.equal(result.grade, null);
  assert.equal(result.minimum, 1);
  assert.equal(result.maximum, 2);
  assert(result.tableGap);
  assert.equal(result.physiqueEligible, true);
});
await test('all male/female height, weight and chest cutoffs including half rounding', () => {
  for (const cutoffs of [
    [163n, 160n, 157n, 155n, 153n],
    [51n, 47n, 43n, 41n, 40n],
    [81n, 78n, 75n, 73n, 71n],
    [154n, 152n, 150n, 148n, 147n],
    [48n, 44n, 42n, 40n, 38n],
  ])
    for (const [index, cutoff] of cutoffs.entries()) {
      assert.equal(measurementScore(cutoff * 1000n, cutoffs), index + 1);
      assert.equal(measurementScore(cutoff * 1000n - 500n, cutoffs), index + 1);
      assert.equal(measurementScore(cutoff * 1000n - 501n, cutoffs), index + 2);
    }
  assert.equal(sourceTable.length, 6);
  assert.equal(sourceTable[3][6], '<18,5 hoặc 30,0 - 34,9');
});
await test('highest score decides grade and chest is optional and male-only', () => {
  const answer = calculate('170', '55');
  assert(answer.ok);
  assert.equal(physique(answer.measurements, 'male', 70_000n).grade, 6);
  assert.deepEqual(physique(answer.measurements, 'male', 70_000n).drivers, [
    'chest',
  ]);
  assert.equal(physique(answer.measurements, 'female', 70_000n).grade, 1);
  assert(physique(answer.measurements, 'male').missingChest);
  assert.equal(chestMeasurement('', 'male'), null);
  assert.equal(chestMeasurement('abc', 'female'), null);
  assert.equal(chestMeasurement('abc', 'male'), 'decimal');
});
for (const [w, criterion] of [
  ['71.999', 'below'],
  ['72', 'within'],
  ['72.001', 'within'],
  ['119.599', 'within'],
  ['119.6', 'within'],
  ['119.601', 'above'],
] as const)
  await test(`exact BMI enlistment threshold 200cm/${w}kg`, () => {
    const answer = calculate('200', w);
    assert(answer.ok);
    assert.equal(militaryCategory(answer.measurements.bmi), criterion);
  });
await test('illustrative uncertainty detects crossings, not a legal tolerance', () => {
  for (const weight of ['52', '119.6']) {
    const answer = calculate(weight === '52' ? '170' : '200', weight);
    assert(answer.ok);
    assert(boundaryCheck(answer.measurements).borderline);
  }
  const answer = calculate('170', '55');
  assert(answer.ok);
  assert.equal(boundaryCheck(answer.measurements).borderline, false);
});
await test('safe health-reference weights and local personal record', () => {
  for (const h of ['50', '155.499', '170', '170.125', '200', '300']) {
    const answer = calculate(h, '50');
    assert(answer.ok);
    const range = healthyReference(answer.measurements);
    assert(
      compare(bmiRatio(answer.measurements.height, range.lower), 185n) >= 0,
    );
    assert(
      compare(bmiRatio(answer.measurements.height, range.upper), 249n) <= 0,
    );
  }
  const answer = calculate('170', '50');
  assert(answer.ok);
  const record = measurementRecord(answer.measurements, 'male', null, 'vi', {
    date: '2026-10-03',
    witness: '<test>',
    method: 'Measured twice',
  });
  assert.match(record, /2026-10-03/);
  assert.match(record, /<test>/);
  assert.match(record, /không phải phiếu khám chính thức/);
  assert.match(copy.vi.underAdvice, /Không tiếp tục giảm cân/);
  assert.match(copy.en.underAdvice, /Do not continue losing weight/);
});

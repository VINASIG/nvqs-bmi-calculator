import {
  bmiRatio,
  compare,
  parseDecimal,
  roundMeasurement,
  quantize,
  weightAtBmi,
} from './math.ts';
import type { InputError, Measurements, Ratio } from './math.ts';
export type Table = 'male' | 'female';
export type Score = 1 | 2 | 3 | 4 | 5 | 6;
export type Criterion = 'below' | 'within' | 'above';
export type Indicator = 'height' | 'weight' | 'chest' | 'bmi';
export const sourceTable = [
  ['1', '≥ 163', '≥ 51', '≥ 81', '≥ 154', '≥ 48', '18,5 - 24,9'],
  [
    '2',
    '160 - 162',
    '47 - 50',
    '78 - 80',
    '152 - 153',
    '44 - 47',
    '25,0 - 26,9',
  ],
  [
    '3',
    '157 - 159',
    '43 - 46',
    '75 - 77',
    '150 - 151',
    '42 - 43',
    '27,0 - 29,9',
  ],
  [
    '4',
    '155 - 156',
    '41 - 42',
    '73 - 74',
    '148 - 149',
    '40 - 41',
    '<18,5 hoặc 30,0 - 34,9',
  ],
  ['5', '153 - 154', '40', '71 - 72', '147', '38 - 39', '35,0 - 39,9'],
  ['6', '≤ 152', '≤ 39', '≤ 70', '≤ 146', '≤ 37', '≥ 40'],
] as const;
export function militaryCategory(bmi: Ratio): Criterion {
  return compare(bmi, 180n) < 0
    ? 'below'
    : compare(bmi, 299n) > 0
      ? 'above'
      : 'within';
}
export function measurementScore(
  value: bigint,
  thresholds: readonly bigint[],
): Score {
  const recorded = roundMeasurement(value);
  const index = thresholds.findIndex((threshold) => recorded >= threshold);
  return (index === -1 ? 6 : index + 1) as Score;
}
export function bmiScore(bmi: Ratio): Score | null {
  if (compare(bmi, 185n) < 0) return 4;
  if (compare(bmi, 249n) <= 0) return 1;
  if (compare(bmi, 250n) >= 0 && compare(bmi, 269n) <= 0) return 2;
  if (compare(bmi, 270n) >= 0 && compare(bmi, 299n) <= 0) return 3;
  if (compare(bmi, 300n) >= 0 && compare(bmi, 349n) <= 0) return 4;
  if (compare(bmi, 350n) >= 0 && compare(bmi, 399n) <= 0) return 5;
  if (compare(bmi, 400n) >= 0) return 6;
  // The printed table leaves sub-tenth gaps. Do not invent a legal rounding rule.
  return null;
}
function bmiScoreBounds(bmi: Ratio): readonly [Score, Score] {
  const score = bmiScore(bmi);
  if (score !== null) return [score, score];
  if (compare(bmi, 250n) < 0) return [1, 2];
  if (compare(bmi, 270n) < 0) return [2, 3];
  if (compare(bmi, 300n) < 0) return [3, 4];
  if (compare(bmi, 350n) < 0) return [4, 5];
  return [5, 6];
}
export function chestMeasurement(
  raw: string,
  table: Table,
): bigint | InputError | null {
  if (table === 'female' || !raw.trim()) return null;
  return parseDecimal(raw, 10_000n, 300_000n);
}
export function physique(
  measurements: Measurements,
  table: Table,
  chest: bigint | null = null,
) {
  const height = measurementScore(
    measurements.height,
    table === 'male'
      ? [163n, 160n, 157n, 155n, 153n]
      : [154n, 152n, 150n, 148n, 147n],
  );
  const weight = measurementScore(
    measurements.weight,
    table === 'male' ? [51n, 47n, 43n, 41n, 40n] : [48n, 44n, 42n, 40n, 38n],
  );
  const chestScore =
    table === 'male' && chest !== null
      ? measurementScore(chest, [81n, 78n, 75n, 73n, 71n])
      : null;
  const bmi = bmiScore(measurements.bmi);
  const scores: {
    indicator: Indicator;
    score: Score | null;
    value: bigint | Ratio;
  }[] = [
    { indicator: 'height', score: height, value: measurements.height },
    { indicator: 'weight', score: weight, value: measurements.weight },
    { indicator: 'bmi', score: bmi, value: measurements.bmi },
  ];
  if (chestScore !== null && chest !== null)
    scores.push({ indicator: 'chest', score: chestScore, value: chest });
  const known = Math.max(height, weight, chestScore ?? 1) as Score;
  const [bmiMinimum, bmiMaximum] = bmiScoreBounds(measurements.bmi);
  const minimum = Math.max(known, bmiMinimum) as Score;
  const maximum = Math.max(known, bmiMaximum) as Score;
  const grade = minimum === maximum ? minimum : null;
  const criterion = militaryCategory(measurements.bmi);
  const physiqueEligible = maximum <= 3 ? true : minimum >= 4 ? false : null;
  return {
    scores,
    grade,
    minimum,
    maximum,
    drivers: scores
      .filter((item) => item.score === maximum)
      .map((item) => item.indicator),
    criterion,
    physiqueEligible,
    outsideBmi: criterion !== 'within',
    eligibleOnKnownCriteria:
      criterion === 'within' && physiqueEligible === true,
    missingChest: table === 'male' && chest === null,
    tableGap: bmi === null,
    lowBmiGap:
      compare(measurements.bmi, 180n) >= 0 &&
      compare(measurements.bmi, 185n) < 0,
  };
}
export function boundaryCheck({ height, weight }: Measurements) {
  const low = bmiRatio(height + 500n, weight - 500n);
  const high = bmiRatio(height - 500n, weight + 500n);
  const crossed = [180n, 299n].filter(
    (threshold) =>
      compare(low, threshold) <= 0 && compare(high, threshold) >= 0,
  );
  const lowerWeight = weightAtBmi(height, 180n);
  const upperWeight = weightAtBmi(height, 299n);
  return {
    low,
    high,
    crossed,
    borderline: crossed.length > 0,
    lowerWeight,
    upperWeight,
  };
}
export function healthyReference({ height, weight }: Measurements) {
  const lower = quantize(weightAtBmi(height, 185n), 1, 'ceil') * 100n;
  const upper = quantize(weightAtBmi(height, 249n), 1, 'floor') * 100n;
  return {
    lower,
    upper,
    increaseToLower: lower > weight ? lower - weight : 0n,
    decreaseToUpper: weight > upper ? weight - upper : 0n,
    distanceToLower: weight > lower ? weight - lower : lower - weight,
    distanceToUpper: weight > upper ? weight - upper : upper - weight,
  };
}

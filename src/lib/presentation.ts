import {
  compare,
  displayMeasurement,
  exactDisplay,
  formatRatio,
  roundMeasurement,
} from './math.ts';
import type { Locale, Measurements, Ratio } from './math.ts';
import { copy, indicatorLabels, sources } from './military-copy.ts';
import { physique } from './military.ts';
import type { Table } from './military.ts';

export const bmiThresholds = [
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
] as const;
export function gradeLabel(
  result: ReturnType<typeof physique>,
  lang: Locale,
): string {
  const value =
    result.grade === null
      ? `${String(result.minimum)}–${String(result.maximum)}`
      : String(result.grade);
  return `${copy[lang].grade}: ${value}${result.grade === null ? ' (?)' : ''}`;
}
export function scoreLines(
  result: ReturnType<typeof physique>,
  lang: Locale,
): string[] {
  const c = copy[lang];
  return result.scores.map((item) => {
    const label = indicatorLabels[lang][item.indicator];
    const score = item.score === null ? '?' : String(item.score);
    if (typeof item.value !== 'bigint')
      return `${label} ${exactDisplay(item.value, bmiThresholds, lang)} → ${c.score} ${score}`;
    const unit = item.indicator === 'weight' ? 'kg' : 'cm';
    return `${label} ${displayMeasurement(item.value, lang)} ${unit} → ${c.score} ${score} (${c.rounded}: ${String(roundMeasurement(item.value))} ${unit})`;
  });
}
export function physiqueConclusion(
  result: ReturnType<typeof physique>,
  lang: Locale,
): string {
  return result.physiqueEligible === true
    ? copy[lang].eligible
    : result.physiqueEligible === false
      ? copy[lang].ineligible
      : copy[lang].uncertain;
}
export function bmiConclusion(
  result: ReturnType<typeof physique>,
  lang: Locale,
): string {
  return result.outsideBmi ? copy[lang].bmiOutside : copy[lang].bmiWithin;
}
export function signedMeasurement(value: bigint, lang: Locale): string {
  return (
    (value < 0n ? '−' : value > 0n ? '+' : '') +
    displayMeasurement(value < 0n ? -value : value, lang)
  );
}
export function thresholdDistance(
  threshold: Ratio,
  weight: bigint,
  lang: Locale,
): string {
  const difference =
    threshold.numerator * 1000n - weight * threshold.denominator;
  const magnitude = {
    numerator: difference < 0n ? -difference : difference,
    denominator: threshold.denominator * 1000n,
  };
  return `${formatRatio(threshold, lang, 3)} kg (${copy[lang].distance}: ≈ ${formatRatio(magnitude, lang, 3)} kg)`;
}
export function adviceText(bmi: Ratio, lang: Locale): string {
  return compare(bmi, 185n) < 0
    ? copy[lang].underAdvice
    : compare(bmi, 250n) >= 0
      ? copy[lang].overAdvice
      : copy[lang].normalAdvice;
}
export function outcome(
  measurements: Measurements,
  table: Table,
  chest: bigint | null,
  lang: Locale,
): string {
  const result = physique(measurements, table, chest);
  return `BMI ${exactDisplay(measurements.bmi, bmiThresholds, lang)}. ${gradeLabel(result, lang)}. ${physiqueConclusion(result, lang)} ${bmiConclusion(result, lang)}${result.lowBmiGap ? ' ' + copy[lang].lowGap : ''}${result.tableGap ? ' ' + copy[lang].tableGap : ''}${result.missingChest ? ' ' + copy[lang].missing : ''}`;
}
export function measurementRecord(
  measurements: Measurements,
  table: Table,
  chest: bigint | null,
  lang: Locale,
  details: { date: string; witness: string; method: string },
): string {
  const c = copy[lang];
  return [
    c.sheetTitle,
    c.recordNotice,
    `${c.date}: ${details.date || c.blank}`,
    `${c.table}: ${table === 'male' ? c.male : c.female}`,
    `${c.height}: ${displayMeasurement(measurements.height, lang)}`,
    `${c.weight}: ${displayMeasurement(measurements.weight, lang)}`,
    `${c.chest}: ${chest === null ? c.blank : displayMeasurement(chest, lang)}`,
    `BMI: ${exactDisplay(measurements.bmi, bmiThresholds, lang)}`,
    c.rounding,
    `${c.witness}: ${details.witness.trim() || c.blank}`,
    `${c.method}: ${details.method.trim() || c.methodDefault}`,
    c.limitation,
    sources.physique,
    sources.recruitment,
  ].join('\n\n');
}

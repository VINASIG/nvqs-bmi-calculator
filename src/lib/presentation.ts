import {
  compare,
  displayMeasurement,
  exactDisplay,
  formatRatio,
  roundMeasurement,
} from './math.ts';
import type { Locale, Ratio } from './math.ts';
import { copy, indicatorLabels } from './military-copy.ts';
import type { physique } from './military.ts';

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
export function gradeExplanation(
  result: ReturnType<typeof physique>,
  lang: Locale,
): string {
  if (result.grade === null)
    return lang === 'vi'
      ? `Bảng quy định chưa ghi rõ điểm cho số BMI này, nên phần thể lực có thể là loại ${String(result.minimum)} hoặc ${String(result.maximum)}. Công cụ không tự chốt một loại.`
      : `The table does not clearly assign a score to this BMI, so the physical grade could be ${String(result.minimum)} or ${String(result.maximum)}. The tool does not choose a grade without a stated rule.`;
  const score = String(result.grade);
  if (result.drivers.length === result.scores.length)
    return lang === 'vi'
      ? `Các số đo đã nhập đều được chấm ${score} điểm, tương ứng loại ${score} về thể lực.`
      : `All entered measurements receive ${score} ${score === '1' ? 'point' : 'points'}, giving physical grade ${score}.`;
  const labels = result.drivers.map((key) => {
    const label = indicatorLabels[lang][key];
    return key === 'bmi' ? label : label.toLocaleLowerCase(lang);
  });
  const subject = new Intl.ListFormat(lang, { type: 'conjunction' }).format(
    labels,
  );
  const sentence = subject.charAt(0).toLocaleUpperCase(lang) + subject.slice(1);
  return lang === 'vi'
    ? `${sentence} được chấm ${score} điểm. Đây là số điểm cao nhất, nên phần thể lực tương ứng loại ${score}.`
    : `${sentence} ${labels.length === 1 ? 'receives' : 'receive'} ${score} points. This is the highest score, giving physical grade ${score}.`;
}
export function callupSummary(
  result: ReturnType<typeof physique>,
  lang: Locale,
): string {
  return result.eligibleOnKnownCriteria
    ? copy[lang].callupMet
    : copy[lang].callupRejected;
}
export function callupScope(
  result: ReturnType<typeof physique>,
  lang: Locale,
): string {
  return result.eligibleOnKnownCriteria
    ? copy[lang].callupMetScope
    : copy[lang].callupRejectedScope;
}
export function scoreLines(
  result: ReturnType<typeof physique>,
  lang: Locale,
): string[] {
  const c = copy[lang];
  return result.scores.map((item) => {
    const label = indicatorLabels[lang][item.indicator];
    const score =
      item.score === null
        ? lang === 'vi'
          ? 'chưa có điểm được ghi rõ trong bảng'
          : 'no score explicitly assigned in the table'
        : lang === 'vi'
          ? `được chấm ${String(item.score)} điểm`
          : `receives ${String(item.score)} points`;
    if (typeof item.value !== 'bigint')
      return `${label} ${exactDisplay(item.value, bmiThresholds, lang)} ${score}.`;
    const unit = item.indicator === 'weight' ? 'kg' : 'cm';
    return `${label} ${displayMeasurement(item.value, lang)} ${unit} ${score}. ${c.rounded} ${String(roundMeasurement(item.value))} ${unit}.`;
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
  return `${formatRatio(threshold, lang, 3)} kg. ${copy[lang].distance} ≈ ${formatRatio(magnitude, lang, 3)} kg`;
}
export function adviceText(bmi: Ratio, lang: Locale): string {
  return compare(bmi, 185n) < 0
    ? copy[lang].underAdvice
    : compare(bmi, 250n) >= 0
      ? copy[lang].overAdvice
      : copy[lang].normalAdvice;
}

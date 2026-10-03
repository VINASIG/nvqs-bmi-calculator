export type Locale = 'vi' | 'en';
export type Field = 'height' | 'weight';
export type InputError = 'required' | 'decimal' | 'range';
export interface Ratio {
  numerator: bigint;
  denominator: bigint;
}
export interface Measurements {
  height: bigint;
  weight: bigint;
  bmi: Ratio;
}
export type MeasurementResult =
  | { ok: true; measurements: Measurements }
  | { ok: false; errors: Partial<Record<Field, InputError>> };

export function parseDecimal(
  raw: string,
  minimum: bigint,
  maximum: bigint,
): bigint | InputError {
  const input = raw.trim();
  if (!input) return 'required';
  if (input.length > 12 || !/^\d{1,4}(?:[.,]\d{1,3})?$/.test(input))
    return 'decimal';
  const [whole = '', fraction = ''] = input.replace(',', '.').split('.');
  const value = BigInt(whole) * 1000n + BigInt(fraction.padEnd(3, '0'));
  return value < minimum || value > maximum ? 'range' : value;
}
export function parseMeasurement(
  raw: string,
  field: Field,
): bigint | InputError {
  return field === 'height'
    ? parseDecimal(raw, 50_000n, 300_000n)
    : parseDecimal(raw, 1_000n, 1_000_000n);
}
export function bmiRatio(height: bigint, weight: bigint): Ratio {
  return { numerator: weight * 10_000_000n, denominator: height * height };
}
export function calculate(height: string, weight: string): MeasurementResult {
  const h = parseMeasurement(height, 'height');
  const w = parseMeasurement(weight, 'weight');
  const errors: Partial<Record<Field, InputError>> = {};
  if (typeof h !== 'bigint') errors.height = h;
  if (typeof w !== 'bigint') errors.weight = w;
  if (typeof h !== 'bigint' || typeof w !== 'bigint')
    return { ok: false, errors };
  return {
    ok: true,
    measurements: { height: h, weight: w, bmi: bmiRatio(h, w) },
  };
}
export function compare(ratio: Ratio, thresholdTenths: bigint): -1 | 0 | 1 {
  const difference =
    ratio.numerator * 10n - ratio.denominator * thresholdTenths;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}
export function quantize(
  ratio: Ratio,
  places: number,
  rounding: 'nearest' | 'ceil' | 'floor' = 'nearest',
): bigint {
  const numerator = ratio.numerator * 10n ** BigInt(places);
  if (rounding === 'ceil')
    return (numerator + ratio.denominator - 1n) / ratio.denominator;
  if (rounding === 'floor') return numerator / ratio.denominator;
  return (numerator * 2n + ratio.denominator) / (ratio.denominator * 2n);
}
export function formatRatio(
  ratio: Ratio,
  locale: Locale,
  places = 1,
  rounding: 'nearest' | 'ceil' | 'floor' = 'nearest',
): string {
  const value = quantize(ratio, places, rounding);
  if (places === 0) return value.toString();
  const digits = value.toString().padStart(places + 1, '0');
  return (
    digits.slice(0, -places) +
    (locale === 'vi' ? ',' : '.') +
    digits.slice(-places)
  );
}
export function displayMeasurement(value: bigint, locale: Locale): string {
  return formatRatio({ numerator: value, denominator: 1000n }, locale, 3)
    .replace(/0+$/, '')
    .replace(/[.,]$/, '');
}
export function exactDisplay(
  bmi: Ratio,
  thresholds: readonly bigint[],
  locale: Locale,
): string {
  for (let places = 2; places <= 12; places++) {
    const presented = {
      numerator: quantize(bmi, places),
      denominator: 10n ** BigInt(places),
    };
    if (
      thresholds.every(
        (threshold) =>
          compare(presented, threshold) === compare(bmi, threshold),
      )
    )
      return formatRatio(bmi, locale, places);
  }
  throw new Error('Display precision cannot preserve a boundary comparison');
}
export function weightAtBmi(height: bigint, tenths: bigint): Ratio {
  return { numerator: height * height * tenths, denominator: 100_000_000_000n };
}
export function roundMeasurement(value: bigint): bigint {
  return (value + 500n) / 1000n;
}

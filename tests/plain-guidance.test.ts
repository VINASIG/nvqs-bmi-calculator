import assert from 'node:assert/strict';
import { test } from 'node:test';
import { healthGuidance } from '../src/lib/health-guidance.ts';
import { copy } from '../src/lib/military-copy.ts';
import { calculate } from '../src/lib/math.ts';

for (const lang of ['vi', 'en'] as const) {
  for (const [height, weight, band] of [
    ['170', '50', 'under'],
    ['170', '65', 'healthy'],
    ['170', '85', 'over'],
    ['200', '99.999', 'healthy'],
    ['200', '74', 'healthy'],
    ['200', '73.999', 'under'],
  ] as const) {
    await test(`plain military guidance ${lang} ${height}cm ${weight}kg`, () => {
      const answer = calculate(height, weight);
      assert(answer.ok);
      const result = healthGuidance(answer.measurements, lang);
      if (band === 'healthy') {
        assert.equal(result.change, copy[lang].maintain);
      } else {
        assert.match(
          result.change,
          band === 'under'
            ? lang === 'vi'
              ? /nhẹ hơn/
              : /below/
            : lang === 'vi'
              ? /nặng hơn/
              : /above/,
        );
      }
      if (height === '170') {
        assert.equal(
          result.range,
          lang === 'vi' ? '53,5 - 71,9 kg' : '53.5 - 71.9 kg',
        );
        if (weight === '50') {
          assert.match(
            result.change,
            lang === 'vi' ? /53,5 kg khoảng 3,5 kg/ : /3.5 kg below 53.5 kg/,
          );
          assert.match(
            result.distance,
            lang === 'vi' ? /71,9 kg khoảng 21,9 kg/ : /21.9 kg below 71.9 kg/,
          );
        }
        if (weight === '85')
          assert.match(
            result.change,
            lang === 'vi' ? /71,9 kg khoảng 13,1 kg/ : /13.1 kg above 71.9 kg/,
          );
      }
      if (weight === '74')
        assert.match(
          result.distance,
          lang === 'vi' ? /bằng mức 74 kg/ : /exactly 74 kg/,
        );
      if (weight === '73.999')
        assert.match(result.change, lang === 'vi' ? /0,001 kg/ : /0.001 kg/);
      assert.doesNotMatch(
        result.change,
        /cận|boundary|chênh lệch|arithmetic/iu,
      );
      assert(!/[;–—]/u.test(result.change));
    });
  }
}

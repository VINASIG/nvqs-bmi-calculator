import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calculate } from '../src/lib/math.ts';
import { physique } from '../src/lib/military.ts';
import { copy } from '../src/lib/military-copy.ts';
import {
  callupScope,
  callupSummary,
  gradeExplanation,
  scoreLines,
} from '../src/lib/presentation.ts';

for (const lang of ['vi', 'en'] as const) {
  for (const [height, weight, accepted] of [
    ['170', '50', false],
    ['171', '52', false],
    ['170', '44', false],
    ['170', '55', true],
    ['160', '50', true],
    ['176', '95', false],
    ['170', '52.6', false],
    ['200', '72', false],
    ['200', '73.996', false],
    ['200', '74', true],
    ['200', '99.8', true],
    ['200', '107.8', true],
    ['200', '119.6', true],
    ['200', '119.601', false],
  ] as const) {
    await test(`explicit enlistment summary ${lang} ${height}cm ${weight}kg`, () => {
      const answer = calculate(height, weight);
      assert(answer.ok);
      const result = physique(answer.measurements, 'male');
      assert.equal(result.eligibleOnKnownCriteria, accepted);
      assert.equal(
        callupSummary(result, lang),
        accepted ? copy[lang].callupMet : copy[lang].callupRejected,
      );
      assert.equal(
        callupScope(result, lang),
        accepted ? copy[lang].callupMetScope : copy[lang].callupRejectedScope,
      );
      assert.doesNotMatch(callupSummary(result, lang), /[;:–—]/u);
    });
  }
  await test(`explain highest scores and preserve uncertain grades ${lang}`, () => {
    function scored(
      height: string,
      weight: string,
      chest: bigint | null = null,
    ) {
      const answer = calculate(height, weight);
      assert(answer.ok);
      return physique(answer.measurements, 'male', chest);
    }
    assert.match(
      gradeExplanation(scored('170', '55'), lang),
      lang === 'vi'
        ? /đều được chấm 1 điểm/
        : /All entered measurements receive 1 point/,
    );
    if (lang === 'en') {
      assert(
        scoreLines(scored('170', '55'), lang).every((line) =>
          line.includes('receives 1 point.'),
        ),
      );
      assert(
        scoreLines(scored('170', '50'), lang).some((line) =>
          line.includes('receives 4 points.'),
        ),
      );
    }
    assert.match(
      gradeExplanation(scored('170', '50'), lang),
      lang === 'vi' ? /BMI được chấm 4 điểm/ : /BMI receives 4 points/,
    );
    assert.match(
      gradeExplanation(scored('160', '50'), lang),
      lang === 'vi'
        ? /Chiều cao và cân nặng được chấm 2 điểm/
        : /Height and weight receive 2 points/,
    );
    const chest = scored('170', '55', 70_000n);
    assert.equal(callupSummary(chest, lang), copy[lang].callupRejected);
    assert.match(
      gradeExplanation(chest, lang),
      lang === 'vi' ? /Vòng ngực được chấm 6 điểm/ : /Chest receives 6 points/,
    );
    for (const [weight, lower, upper] of [
      ['99.8', 1, 2],
      ['107.8', 2, 3],
    ] as const) {
      const gap = scored('200', weight);
      assert.equal(gap.grade, null);
      assert(
        gradeExplanation(gap, lang).includes(
          `${String(lower)} ${lang === 'vi' ? 'hoặc' : 'or'} ${String(upper)}`,
        ),
      );
      assert.equal(callupSummary(gap, lang), copy[lang].callupMet);
      assert(
        scoreLines(gap, lang).some((line) =>
          line.includes(lang === 'vi' ? 'chưa có điểm' : 'no score'),
        ),
      );
    }
  });
}

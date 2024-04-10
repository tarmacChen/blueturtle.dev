import { mergeClassNames } from '@/lib/helper';
import { expect, test } from '@playwright/test';

test.describe('mergeClassNames', () => {
  test('empty elements', () => {
    const classes = [''];
    const actual = mergeClassNames(...classes);
    const expected = '';
    expect(actual).toStrictEqual(expected);
  });

  test('single element', () => {
    const classes = ['text-2xl'];
    const actual = mergeClassNames(...classes);
    const expected = 'text-2xl';
    expect(actual).toStrictEqual(expected);
  });

  test('many elements', () => {
    const classes = ['text-2xl', 'bg-gray-400'];
    const actual = mergeClassNames(...classes);
    const expected = 'text-2xl bg-gray-400';
    expect(actual).toStrictEqual(expected);
  });
});

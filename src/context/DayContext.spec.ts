import { expect, test } from 'bun:test';
import { renderHook } from '@testing-library/react';
import { useDayContext } from './DayContext';

test('useDayContext', () => {
  test('It throws when used outside of context', () => {
    expect(renderHook(() => useDayContext())).toThrow();
  });
});

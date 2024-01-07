import { expect, test } from 'bun:test';
import { renderHook } from '@testing-library/react';
import { useWeekContext } from './WeekContext';

test('useWeekContext', () => {
  test('It throws when used outside of context', () => {
    expect(renderHook(() => useWeekContext())).toThrow();
  });
});

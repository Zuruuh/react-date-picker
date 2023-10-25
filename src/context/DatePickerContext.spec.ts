import { expect, test } from 'bun:test';
import { renderHook } from '@testing-library/react';
import { useDatePickerContext } from './DatePickerContext';

test('useDatePickerContext', () => {
  test('It throws when used outside of context', () => {
    expect(renderHook(() => useDatePickerContext())).toThrow();
  });
});

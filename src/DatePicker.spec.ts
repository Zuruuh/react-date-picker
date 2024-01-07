import { test, expect } from 'bun:test';
import { useControlFactory } from './DatePicker';
import { renderHook } from '@testing-library/react';
import { useState } from 'react';
import { day } from './tests/utils';

test('useControlFactory', () => {
  renderHook(() => {
    const [date, setDate] = useState(day({ year: 2023, month: 10, day: 1 }));
    const controlFactory = useControlFactory(date, setDate);

    expect(
      controlFactory(true, 'month', day({ year: 2023, month: 11, day: 1 }))
        .disabled,
    ).toBeFalse();
  });
});

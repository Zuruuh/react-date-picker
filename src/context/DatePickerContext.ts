import { createContext, useContext } from 'react';
import type { Setter } from '../types/setter';
import type { Dayjs } from 'dayjs';

export interface DatePickerState {
  selectedDate: Dayjs | null;
  setSelectedDate: Setter<Dayjs | null>;
  temporarySelectedMonth: number;
  setTemporarySelectedMonth: Setter<number>;
  temporarySelectedYear: number;
  setTemporarySelectedYear: Setter<number>;
}

/**
 * @internal
 */
export const DatePickerContext = createContext<DatePickerState | undefined>(
  undefined
);

export function useDatePickerContext(): DatePickerState {
  const state = useContext(DatePickerContext);
  if (state === undefined) {
    throw new Error(
      'Uninitialized date picker context used! ' +
        'You probably tried to render a Date Picker element without wrapping it in a <DatePicker.Root>'
    );
  }

  return state;
}

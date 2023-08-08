import { createContext, useContext } from 'react';
import type { Setter } from '../types/setter';
import type { Dayjs } from 'dayjs';

export interface DatePickerControl {
  execute(): void;
  disabled: boolean;
}

export interface DatePickerControls {
  nextMonth: DatePickerControl;
  nextYear: DatePickerControl;
  prevMonth: DatePickerControl;
  prevYear: DatePickerControl;
}

export interface DatePickerState {
  selectedDate: Dayjs | null;
  setSelectedDate(date: Dayjs | null): void;
  temporarySelectedDate: Dayjs;
  setTemporarySelectedDate: Setter<Dayjs>;
  minimumSelectableDate: Dayjs;
  maximumSelectableDate: Dayjs;
  controls: DatePickerControls;
  dayjs(): Dayjs;
}

/**
 * @internal
 */
export const DatePickerContext = createContext<DatePickerState | undefined>(
  undefined
);

/**
 * @internal
 */
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

import { createContext, useContext } from 'react';
import type { Setter } from '../types/Setter';
import type { Dayjs } from 'dayjs';

export type DatePickerCalendarOverlap =
  | 'overlap'
  | 'no-overlap'
  | 'no-overlap-with-offset';

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
  overlap: DatePickerCalendarOverlap;
  dayjs(): Dayjs;
}

/**
 * @internal
 */
export const DatePickerContext = createContext<DatePickerState | undefined>(
  undefined,
);

/**
 * @internal
 */
export function useDatePickerContext(): DatePickerState {
  const state = useContext(DatePickerContext);
  if (state === undefined) {
    throw new Error(
      'Uninitialized date picker context used! ' +
        'You probably tried to render a Date Picker element without wrapping it in a <DatePicker.Root>',
    );
  }

  return state;
}

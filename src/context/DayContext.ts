import type { Dayjs } from 'dayjs';
import { createContext, useContext } from 'react';

export interface DayContextState {
  date: Dayjs;
}

/**
 * @internal
 */
export const DayContext = createContext<DayContextState | undefined>(undefined);

export function useDayContext(): DayContextState {
  const state = useContext(DayContext);
  if (state === undefined) {
    throw new Error(
      'Uninitialized Day context used! ' +
        'You probably tried to render a <DatePicker.Day> element without wrapping it in a <DatePicker.Week>'
    );
  }

  return state;
}

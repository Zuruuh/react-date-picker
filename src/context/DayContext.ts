import type { Dayjs } from 'dayjs';
import { createContext, useContext } from 'react';

export interface DayCorners {
  topLeft: boolean;
  topRight: boolean;
  bottomLeft: boolean;
  bottomRight: boolean;
}

export interface DayContextState {
  date: Dayjs;
  corners: DayCorners;
}

/**
 * @internal
 */
export const DayContext = createContext<DayContextState | undefined>(undefined);

/**
 * @internal
 */
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

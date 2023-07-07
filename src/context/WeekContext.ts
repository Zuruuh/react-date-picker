import { createContext, useContext } from 'react';

export interface WeekContextState {
  weekNumber: number;
}

/**
 * @internal
 */
export const WeekContext = createContext<WeekContextState | undefined>(
  undefined
);

/**
 * @internal
 */
export function useWeekContext(): WeekContextState {
  const state = useContext(WeekContext);
  if (state === undefined) {
    throw new Error(
      'Uninitialized week context used! ' +
        'You probably tried to render a <DatePicker.Week> element without wrapping it in a <DatePicker.Calendar>'
    );
  }

  return state;
}

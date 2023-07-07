import { type ReactNode, type FC, useMemo } from 'react';
import day from 'dayjs';
import { WeekContext } from '../context/WeekContext';
import { useDatePickerContext } from '../context/DatePickerContext';

export interface CalendarInnerProps {
  weekNumber: number;
}

export interface CalendarProps {
  children: ReactNode | ((props: CalendarInnerProps) => ReactNode);
}

const RENDERED_WEEKS = 5;

export const Calendar: FC<CalendarProps> = ({ children }) => {
  const { selectedDate } = useDatePickerContext();
  const date = useMemo(
    () => (selectedDate ?? day()).set('date', 1),
    [selectedDate]
  );

  return (
    <>
      {Array.from({ length: RENDERED_WEEKS }).map((_, i) => {
        const weekNumber = date.add(i, 'week').week();

        return (
          <WeekContext.Provider value={{ weekNumber }} key={i}>
            {typeof children === 'function'
              ? children({ weekNumber })
              : children}
          </WeekContext.Provider>
        );
      })}
    </>
  );
};

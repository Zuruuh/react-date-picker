import { useMemo, type FC, type ReactNode } from 'react';
import { useWeekContext } from '../context/WeekContext';
import { useDatePickerContext } from '../context/DatePickerContext';
import { DayContext } from '../context/DayContext';

export interface WeekProps {
  children: ReactNode;
}

/**
 * @internal
 */
export const Week: FC<WeekProps> = ({ children }) => {
  const { weekNumber } = useWeekContext();
  const { temporarySelectedYear, dayjs } = useDatePickerContext();
  const date = useMemo(
    () =>
      dayjs()
        .set('year', temporarySelectedYear)
        .week(weekNumber)
        .startOf('week'),
    [temporarySelectedYear, weekNumber, dayjs]
  );

  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
        <DayContext.Provider
          value={{ date: date.hour(12).add(i, 'day') }}
          key={date.set('day', i).toString()}
        >
          {children}
        </DayContext.Provider>
      ))}
    </>
  );
};

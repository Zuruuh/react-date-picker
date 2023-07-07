import { useMemo, type FC, type ReactNode } from 'react';
import { useWeekContext } from '../context/WeekContext';
import { useDatePickerContext } from '../context/DatePickerContext';
import day from 'dayjs';
import { DayContext } from '../context/DayContext';
import { DAYJS_DAY_COUNT_IN_A_WEEK } from '../consts/date';

export interface WeekProps {
  children: ReactNode;
}

export const Week: FC<WeekProps> = ({ children }) => {
  const { weekNumber } = useWeekContext();
  const { temporarySelectedYear } = useDatePickerContext();
  const date = useMemo(
    () => day().set('year', temporarySelectedYear).week(weekNumber),
    [temporarySelectedYear, weekNumber]
  );

  return (
    <>
      {Array.from({ length: DAYJS_DAY_COUNT_IN_A_WEEK + 1 }).map((_, i) => (
        <DayContext.Provider
          value={{ date: date.set('day', i) }}
          key={date.set('day', i).toString()}
        >
          {children}
        </DayContext.Provider>
      ))}
    </>
  );
};

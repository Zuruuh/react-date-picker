import { useMemo, type FC, type ReactNode } from 'react';
import { useWeekContext } from '../context/WeekContext';
import { useDatePickerContext } from '../context/DatePickerContext';
import { DayContext } from '../context/DayContext';

export interface WeekProps {
  children: ReactNode;
}

export const Week: FC<WeekProps> = ({ children }) => {
  const { weekNumber } = useWeekContext();
  const { temporarySelectedDate, dayjs } = useDatePickerContext();
  const date = useMemo(
    () =>
      dayjs()
        .set('year', temporarySelectedDate.year())
        .week(weekNumber[0])
        .startOf('week'),
    [temporarySelectedDate, weekNumber, dayjs]
  );

  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
        <DayContext.Provider
          value={{ date: date.add(i, 'day').startOf('day') }}
          key={date.set('day', i).toString()}
        >
          {children}
        </DayContext.Provider>
      ))}
    </>
  );
};

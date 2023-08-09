import { useCallback } from 'react';
import type { ReactNode, FC } from 'react';
import { useDatePickerContext } from '../context/DatePickerContext';
import { WeekContext } from '../context/WeekContext';

export interface CalendarInnerProps {
  weekNumber: number;
}

export interface CalendarProps {
  children: ReactNode | ((props: CalendarInnerProps) => ReactNode);
}

export const Calendar: FC<CalendarProps> = ({ children }) => {
  const { temporarySelectedDate } = useDatePickerContext();
  const referenceDate = temporarySelectedDate;
  const startOfMonth = referenceDate.date(1).endOf('week');

  const createChildren = useCallback(
    (props: CalendarInnerProps) =>
      typeof children === 'function' ? children(props) : children,
    [children]
  );

  const weeks: CalendarInnerProps[] = [{ weekNumber: startOfMonth.week() }];

  for (
    let i = 0;
    startOfMonth.add(i, 'week').month() === referenceDate.month();
    i++
  ) {
    const weekDate = startOfMonth.add(i + 1, 'week').startOf('week');
    const weekNumber = weekDate.week();

    if (weekDate.month() === referenceDate.month()) {
      weeks.push({ weekNumber });
    }
  }

  return (
    <>
      {weeks.map(({ weekNumber }) => (
        <WeekContext.Provider key={weekNumber} value={{ weekNumber }}>
          {createChildren({ weekNumber })}
        </WeekContext.Provider>
      ))}
    </>
  );
};

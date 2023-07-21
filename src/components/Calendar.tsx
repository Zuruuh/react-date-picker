import { type ReactNode, type FC, useMemo, useCallback } from 'react';
import { useDatePickerContext } from '../context/DatePickerContext';
import { WeekContext } from '../context/WeekContext';

export interface CalendarInnerProps {
  weekNumber: number;
}

export interface CalendarProps {
  children: ReactNode | ((props: CalendarInnerProps) => ReactNode);
}

/**
 * @internal
 */
export const Calendar: FC<CalendarProps> = ({ children }) => {
  const { selectedDate, temporarySelectedMonth, temporarySelectedYear, dayjs } =
    useDatePickerContext();
  const startOfMonth = useMemo(
    () =>
      (
        selectedDate ??
        dayjs().month(temporarySelectedMonth).year(temporarySelectedYear)
      )
        .date(1)
        .endOf('week'),
    [selectedDate, temporarySelectedMonth, temporarySelectedYear, dayjs]
  );

  const createChildren = useCallback(
    (props: CalendarInnerProps) =>
      typeof children === 'function' ? children(props) : children,
    [children]
  );

  const weeks: CalendarInnerProps[] = [];
  weeks.push({ weekNumber: startOfMonth.week() });

  for (let i = 1; i < 5; i++) {
    const weekDate = startOfMonth.add(i, 'week').startOf('week');
    const weekNumber = weekDate.week();

    if (weekDate.month() !== startOfMonth.month()) {
      break;
    }
    weeks.push({ weekNumber });
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

import { type ReactNode, type FC, useMemo, useCallback } from 'react';
import { useDatePickerContext } from '../context/DatePickerContext';
import { DAYJS_MONDAY, DAYJS_SUNDAY } from '../consts/date';
import { WeekContext } from '../context/WeekContext';

export interface CalendarInnerProps {
  weekNumber: number;
}

export interface CalendarProps {
  children: ReactNode | ((props: CalendarInnerProps) => ReactNode);
}

const MINIMUM_RENDERED_WEEKS = 3;

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
      ).date(1),
    [selectedDate, temporarySelectedMonth, temporarySelectedYear, dayjs]
  );

  const createChildren = useCallback(
    (props: CalendarInnerProps) =>
      typeof children === 'function' ? children(props) : children,
    [children]
  );

  const showPreviousWeek = startOfMonth.day() !== DAYJS_MONDAY;
  const showNextWeek = startOfMonth.endOf('month').day() !== DAYJS_SUNDAY;

  const weeks: ReactNode[] = [];

  const weeksToRender =
    MINIMUM_RENDERED_WEEKS +
    (showPreviousWeek ? 2 : 1) +
    (showNextWeek ? 1 : 0);

  for (let i = 0; i < weeksToRender; i++) {
    const weekDate = startOfMonth.add(i, 'week');
    const weekNumber = weekDate.week();

    weeks.push(
      <WeekContext.Provider key={weekNumber} value={{ weekNumber }}>
        {createChildren({ weekNumber })}
      </WeekContext.Provider>
    );
  }

  return <>{weeks}</>;
};

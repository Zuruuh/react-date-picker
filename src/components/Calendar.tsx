import { type ReactNode, type FC, useMemo, useCallback } from 'react';
import day from 'dayjs';
// import { WeekContext } from '../context/WeekContext';
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
  const { selectedDate, temporarySelectedMonth, temporarySelectedYear } =
    useDatePickerContext();
  const startOfMonth = useMemo(
    () =>
      (
        selectedDate ??
        day().month(temporarySelectedMonth).year(temporarySelectedYear)
      ).date(1),
    [selectedDate, temporarySelectedMonth, temporarySelectedYear]
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
/**
  const month = useMemo(
    () =>
      day()
        .set('date', 1)
        .set('month', temporarySelectedMonth)
        .set('year', temporarySelectedYear),
    [temporarySelectedYear, temporarySelectedMonth]
  );

  const elements: ReactNode[] = [];
  const monthBefore = month.subtract(1, 'month').endOf('month');

  elements.unshift(
    <WeekContext.Provider value={{ weekNumber: monthBefore.week() }}>
      {createChildren({ weekNumber: monthBefore.week() })}
    </WeekContext.Provider>
  );
  console.log(date.startOf('week').toString());
  for (let i = 0; i < MAX_RENDERED_WEEKS; i++) {
    const weekDate = date.add(i, 'week');
    if (
      weekDate.startOf('week').month() !== date.startOf('week').month() &&
      i > 0
    ) {
      console.log(
        weekDate.startOf('week').toString(),
        date.startOf('week').toString()
      );
      break;
    }
    const weekNumber = weekDate.week();

    elements.push(
      <WeekContext.Provider value={{ weekNumber }} key={weekNumber}>
        {typeof children === 'function' ? children({ weekNumber }) : children}
      </WeekContext.Provider>
    );
  }

**/

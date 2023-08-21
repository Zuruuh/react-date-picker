import { useCallback, type ReactNode, type FC } from 'react';
import {
  type DatePickerCalendarOverlap,
  useDatePickerContext,
} from '../context/DatePickerContext';
import { WeekContext } from '../context/WeekContext';
import type { Dayjs } from 'dayjs';
import type { WeekNumber, WeekNumbers } from '../types/WeekNumber';

export interface CalendarInnerProps {
  weekNumbers: WeekNumber;
}

export interface CalendarProps {
  children: ReactNode | ((props: CalendarInnerProps) => ReactNode);
}
function* generateWeeksBasedOnOverlap(
  referenceDate: Dayjs,
  overlap: DatePickerCalendarOverlap
): Generator<WeekNumber> {
  const startOfMonth = referenceDate.startOf('month');

  switch (overlap) {
    case 'overlap':
    case 'no-overlap-with-offset':
      for (
        let i = 0;
        startOfMonth.add(i, 'week').month() === referenceDate.month();
        i++
      ) {
        const weekDate = startOfMonth.add(i, 'week').startOf('week');
        const weekNumber = weekDate.week();

        if (weekDate.month() === referenceDate.month() || i === 0) {
          yield [weekNumber];
        }
      }

      return;
    case 'no-overlap':
      for (let i = 0; i < Math.ceil(startOfMonth.daysInMonth() / 7); i++) {
        yield [
          startOfMonth.add(i, 'week').week(),
          startOfMonth.add(i + 1, 'week').week(),
        ];
      }

      return;
  }
}

export const Calendar: FC<CalendarProps> = ({ children }) => {
  const { temporarySelectedDate, overlap } = useDatePickerContext();

  const createChildren = useCallback(
    (props: CalendarInnerProps) =>
      typeof children === 'function' ? children(props) : children,
    [children]
  );

  const weeks = Array.from(
    generateWeeksBasedOnOverlap(temporarySelectedDate, overlap)
  ) as WeekNumbers;

  return (
    <>
      {weeks.map((weekNumbers) => (
        <WeekContext.Provider
          key={weekNumbers.join('-')}
          value={{ weekNumbers }}
        >
          {createChildren({ weekNumbers })}
        </WeekContext.Provider>
      ))}
    </>
  );
};

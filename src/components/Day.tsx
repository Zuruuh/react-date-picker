import { useMemo, type FC, type ReactNode, useCallback } from 'react';
import { type Dayjs } from 'dayjs';
import { useDayContext } from '../context/DayContext';
import { useDatePickerContext } from '../context/DatePickerContext';

export interface DayInnerProps {
  onClick(): void;
  isCurrentDate: boolean;
  isSelectionnedDate: boolean;
  belongsToSelectedMonth: boolean;
  date: Dayjs;
}

export interface DayProps {
  children(props: DayInnerProps): ReactNode;
}

/**
 * @internal
 */
export const Day: FC<DayProps> = ({ children }) => {
  const { selectedDate, setSelectedDate, temporarySelectedMonth, dayjs } =
    useDatePickerContext();
  const { date } = useDayContext();

  const onClick = useCallback(() => {
    setSelectedDate(date);
  }, [setSelectedDate, date]);

  const isCurrentDate = useMemo(
    () => date.toString() === dayjs().startOf('day').toString(),
    [date, dayjs]
  );

  const isSelectionnedDate = useMemo(
    () => date.toString() === selectedDate?.toString(),
    [date, selectedDate]
  );

  const belongsToSelectedMonth = useMemo(
    () => date.get('month') === temporarySelectedMonth,
    [date, temporarySelectedMonth]
  );

  return (
    <>
      {children({
        onClick,
        isCurrentDate,
        isSelectionnedDate,
        belongsToSelectedMonth,
        date,
      })}
    </>
  );
};

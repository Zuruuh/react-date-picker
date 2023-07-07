import { useMemo, type FC, type ReactNode, useCallback } from 'react';
import day, { type Dayjs } from 'dayjs';
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

export const Day: FC<DayProps> = ({ children }) => {
  const { selectedDate, setSelectedDate, temporarySelectedMonth } =
    useDatePickerContext();
  const { date } = useDayContext();

  const onClick = useCallback(() => {
    console.log(`clicked button with date: ${date.toString()}`);
    setSelectedDate(date);
  }, [setSelectedDate, date]);

  const isCurrentDate = useMemo(
    () => date.toString() === day().startOf('day').toString(),
    [date]
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

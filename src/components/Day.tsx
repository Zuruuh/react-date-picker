import { useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import type { Dayjs } from 'dayjs';
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
  const {
    selectedDate,
    setSelectedDate,
    temporarySelectedDate,
    setTemporarySelectedDate,
    dayjs,
  } = useDatePickerContext();
  const { date } = useDayContext();

  const onClick = useCallback(() => {
    setSelectedDate(date);
    setTemporarySelectedDate(date);
  }, [setSelectedDate, date, setTemporarySelectedDate]);

  const isCurrentDate = date.toString() === dayjs().startOf('day').toString();
  const isSelectionnedDate = date.toString() === selectedDate?.toString();
  const belongsToSelectedMonth =
    date.get('month') === temporarySelectedDate.month();

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

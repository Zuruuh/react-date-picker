import { useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import type { Dayjs } from 'dayjs';
import { useDayContext } from '../context/DayContext';
import { useDatePickerContext } from '../context/DatePickerContext';

export interface DayInnerProps {
  onClick(): void;
  isToday: boolean;
  isBeforeToday: boolean;
  isSelected: boolean;
  belongsToSelectedMonth: boolean;
  date: Dayjs;
  alt: string;
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

  const isToday = date.toString() === dayjs().startOf('day').toString();
  const isSelected = date.toString() === selectedDate?.toString();
  const belongsToSelectedMonth =
    date.get('month') === temporarySelectedDate.month();
  const isBeforeToday = date.isBefore(dayjs());
  const alt = date.format('dddd D MMMM YYYY');

  return (
    <>
      {children({
        onClick,
        isToday,
        isBeforeToday,
        isSelected,
        belongsToSelectedMonth,
        date,
        alt,
      })}
    </>
  );
};

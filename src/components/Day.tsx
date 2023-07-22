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

export const Day: FC<DayProps> = ({ children }) => {
  const {
    selectedDate,
    setSelectedDate,
    temporarySelectedMonth,
    setTemporarySelectedMonth,
    setTemporarySelectedYear,
    dayjs,
  } = useDatePickerContext();
  const { date } = useDayContext();

  const onClick = useCallback(() => {
    setSelectedDate(date);
    setTemporarySelectedMonth(date.month());
    setTemporarySelectedYear(date.year());
  }, [
    setSelectedDate,
    date,
    setTemporarySelectedMonth,
    setTemporarySelectedYear,
  ]);

  const isCurrentDate = date.toString() === dayjs().startOf('day').toString();
  const isSelectionnedDate = date.toString() === selectedDate?.toString();
  const belongsToSelectedMonth = date.get('month') === temporarySelectedMonth;

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

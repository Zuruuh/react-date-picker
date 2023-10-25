import { useCallback, type FC, type ReactNode } from 'react';
import { type DayCorners, useDayContext } from '../context/DayContext';
import { useDatePickerContext } from '../context/DatePickerContext';
import type { Dayjs } from 'dayjs';

export interface DayInnerProps {
  onClick(): void;
  isToday: boolean;
  isSelected: boolean;
  belongsToSelectedMonth: boolean;
  isOutOfRange: boolean;
  isOverlapPlaceholder: boolean;
  date: Dayjs;
  alt: string;
  corners: DayCorners;
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
    minimumSelectableDate,
    maximumSelectableDate,
    overlap,
    dayjs,
  } = useDatePickerContext();
  const { date, corners } = useDayContext();

  const onClick = useCallback(() => {
    if (
      date.isAfter(maximumSelectableDate) ||
      date.isBefore(minimumSelectableDate)
    ) {
      throw new Error(
        `Tried to set a date (${date.toString()}) out of range (${minimumSelectableDate.format(
          'D/MM/YYYY'
        )}-${maximumSelectableDate.format(
          'D/MM/YYYY'
        )}). You should not bind the \`onClick\` callback when it's not supposed to be called`
      );
    }

    setSelectedDate(date);
    setTemporarySelectedDate(date);
  }, [
    setSelectedDate,
    date,
    setTemporarySelectedDate,
    minimumSelectableDate,
    maximumSelectableDate,
  ]);

  const isToday = date.toString() === dayjs().startOf('day').toString();

  const isSelected = date.toString() === selectedDate?.toString();

  const belongsToSelectedMonth = date.month() === temporarySelectedDate.month();

  const isOutOfRange =
    date.isBefore(minimumSelectableDate) || date.isAfter(maximumSelectableDate);

  const alt = date.format('dddd D MMMM YYYY');

  const isOverlapPlaceholder =
    overlap === 'no-overlap-with-offset' &&
    date.month() !== temporarySelectedDate.month();

  return (
    <>
      {children({
        onClick,
        isToday,
        isSelected,
        belongsToSelectedMonth,
        isOutOfRange,
        isOverlapPlaceholder,
        date,
        alt,
        corners,
      })}
    </>
  );
};

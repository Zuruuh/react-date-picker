import { type FC, type ReactNode } from 'react';
import { useWeekContext } from '../context/WeekContext';
import {
  type DatePickerCalendarOverlap,
  useDatePickerContext,
} from '../context/DatePickerContext';
import {
  DayContext,
  type DayContextState,
  type DayCorners,
} from '../context/DayContext';
import type { Dayjs } from 'dayjs';

export interface WeekProps {
  children: ReactNode;
}

function generateCorners({
  date,
  startOfMonth,
  overlap,
  dayIndex,
  totalDays,
  weekIndex,
  totalWeeks,
}: {
  date: Dayjs;
  startOfMonth: Dayjs;
  overlap: DatePickerCalendarOverlap;
  dayIndex: number;
  totalDays: number;
  weekIndex: number;
  totalWeeks: number;
}): DayCorners {
  let topLeft = false;
  let topRight = false;
  let bottomLeft = false;
  let bottomRight = false;

  const dateKey = date.format('D-MM-YYYY');

  if (overlap === 'no-overlap-with-offset') {
    if (dateKey === startOfMonth.format('D-MM-YYYY')) {
      topLeft = true;
    }

    if (dateKey === startOfMonth.endOf('week').format('D-MM-YYYY')) {
      topRight = true;
    }

    if (
      dateKey ===
      startOfMonth.endOf('month').startOf('week').format('D-MM-YYYY')
    ) {
      bottomLeft = true;
    }

    if (dateKey === startOfMonth.endOf('month').format('D-MM-YYYY')) {
      bottomRight = true;
    }

    if (
      weekIndex === 1 &&
      dayIndex === 0 &&
      date.subtract(1, 'week').month() !== date.month()
    ) {
      topLeft = true;
    }

    if (
      weekIndex === totalWeeks - 2 &&
      dayIndex === 6 &&
      date.add(1, 'week').month() !== date.month()
    ) {
      bottomRight = true;
    }
  } else if (overlap === 'overlap') {
    if (dateKey === startOfMonth.startOf('week').format('D-MM-YYYY')) {
      topLeft;
    }
  } else if (overlap === 'no-overlap') {
    //
  }
  //
  return { topLeft, topRight, bottomLeft, bottomRight };
}

export const Week: FC<WeekProps> = ({ children }) => {
  const { weekNumbers, weekIndex, totalWeeks } = useWeekContext();
  const { temporarySelectedDate, overlap, dayjs } = useDatePickerContext();

  const initialOffset =
    overlap === 'no-overlap'
      ? parseInt(
          temporarySelectedDate
            .startOf('month')
            .diff(
              temporarySelectedDate.startOf('month').startOf('week'),
              'days'
            )
            .toFixed()
        )
      : 0;

  const date = dayjs()
    .set('year', temporarySelectedDate.year())
    .week(weekNumbers[0])
    .startOf('week')
    .add(initialOffset, 'days');

  const partialDays: { value: DayContextState; key: string }[] = [];

  for (let i = 0; i < 7; i++) {
    const day = date.add(i, 'days');
    if (
      overlap === 'no-overlap' &&
      day.month() !== temporarySelectedDate.month()
    ) {
      continue;
    }

    partialDays.push({
      value: {
        date: day,
        corners: {
          topLeft: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
        },
      },
      key: `${overlap}-${day.format('D-MM-YYYY')}`,
    });
  }

  const days = partialDays.map((day, dayIndex, { length: totalDays }) => ({
    ...day,
    value: {
      ...day.value,
      corners: generateCorners({
        date: date.add(dayIndex, 'days'),
        startOfMonth: temporarySelectedDate.startOf('month'),
        overlap,
        weekIndex,
        dayIndex,
        totalDays,
        totalWeeks,
      }),
    },
  }));

  return (
    <>
      {days.map(({ value, key }) => (
        <DayContext.Provider key={key} value={value}>
          {children}
        </DayContext.Provider>
      ))}
    </>
  );
};

import { type FC, type ReactNode } from 'react';
import { useWeekContext } from '../context/WeekContext';
import { useDatePickerContext } from '../context/DatePickerContext';
import { DayContext, DayContextState } from '../context/DayContext';

export interface WeekProps {
  children: ReactNode;
}

export const Week: FC<WeekProps> = ({ children }) => {
  const { weekNumbers } = useWeekContext();
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

  const days: { value: DayContextState; key: string }[] = [];

  for (let i = 0; i < 7; i++) {
    const day = date.add(i, 'days');
    if (
      overlap === 'no-overlap' &&
      day.month() !== temporarySelectedDate.month()
    ) {
      continue;
    }

    days.push({
      value: { date: day },
      key: `${overlap}-${day.format('D-MM-YYYY')}`,
    });
  }

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

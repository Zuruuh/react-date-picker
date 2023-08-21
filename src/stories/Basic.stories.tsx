import styles from './Basic.stories.module.scss';
import { useState, type FC } from 'react';
import { DatePicker, type CalendarInnerProps } from '../';
import type { Story } from '@ladle/react';
import { withStrictMode } from '../ladle/decorators/withStrictMode';
import clsx from 'clsx';
import dayjs, { type Dayjs } from 'dayjs';

const MyCustomCalendar: FC<{ showWeekNumbers: boolean }> = ({
  showWeekNumbers,
}) => {
  return (
    <DatePicker.Calendar>
      {({ weekNumber }: CalendarInnerProps) => (
        <div className={styles.week}>
          {showWeekNumbers ? (
            <p className={styles.weekNumber}>{weekNumber}</p>
          ) : (
            <></>
          )}
          <DatePicker.Week>
            <div className={styles.day}>
              <DatePicker.Day>
                {({
                  onClick: onDayClick,
                  date: dayDate,
                  belongsToSelectedMonth,
                  isSelected,
                  isOutOfRange,
                  isToday,
                }) => (
                  <button
                    className={clsx({
                      [styles.selectionned]: isSelected,
                      [styles.today]: isToday,
                      [styles.month]: belongsToSelectedMonth,
                    })}
                    disabled={isOutOfRange}
                    onClick={onDayClick}
                  >
                    {dayDate.date()}
                  </button>
                )}
              </DatePicker.Day>
            </div>
          </DatePicker.Week>
        </div>
      )}
    </DatePicker.Calendar>
  );
};

export const Simple: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>
        The current selected date is: {date?.toString() ?? '(not selected yet)'}
      </p>
      <DatePicker.Root setSelectedDate={setDate} selectedDate={date}>
        {({ controls }) => (
          <>
            <div>
              <button
                disabled={controls.prevMonth.disabled}
                onClick={controls.prevMonth.execute}
              >
                prev month
              </button>
              <button
                disabled={controls.nextMonth.disabled}
                onClick={controls.nextMonth.execute}
              >
                next month
              </button>
            </div>
            <div className={styles.calendar}>
              <MyCustomCalendar showWeekNumbers={false} />
            </div>
          </>
        )}
      </DatePicker.Root>
    </>
  );
};

export const WithWeekNumbers: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>
        The current selected date is: {date?.toString() ?? '(not selected yet)'}
      </p>
      <p>The week numbers are shown in red on the left</p>
      <DatePicker.Root setSelectedDate={setDate} selectedDate={date}>
        <div className={styles.calendar}>
          <MyCustomCalendar showWeekNumbers={true} />
        </div>
      </DatePicker.Root>
    </>
  );
};

export const WithMinAndMaxRange: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>
        The current selected date is: {date?.toString() ?? '(not selected yet)'}
      </p>
      <p>
        The minimum date you can pick is{' '}
        {dayjs().subtract(1, 'week').toString()}
      </p>
      <p>
        The maximum date you can pick is {dayjs().add(1, 'week').toString()}
      </p>
      <DatePicker.Root
        setSelectedDate={setDate}
        selectedDate={date}
        minimumSelectableDate={dayjs().subtract(1, 'week')}
        maximumSelectableDate={dayjs().add(1, 'week')}
      >
        <div className={styles.calendar}>
          <MyCustomCalendar showWeekNumbers={false} />
        </div>
      </DatePicker.Root>
    </>
  );
};

export const WithNoOverlap: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>
        The current selected date is: {date?.toString() ?? '(not selected yet)'}
      </p>
      <DatePicker.Root
        setSelectedDate={setDate}
        selectedDate={date}
        overlap="no-overlap"
      >
        <div className={styles.calendar}>
          <MyCustomCalendar showWeekNumbers={false} />
        </div>
      </DatePicker.Root>
    </>
  );
};

WithNoOverlap.decorators = [withStrictMode];
Simple.decorators = [withStrictMode];
WithWeekNumbers.decorators = [withStrictMode];
WithMinAndMaxRange.decorators = [withStrictMode];

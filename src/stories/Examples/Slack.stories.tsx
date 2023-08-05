import styles from './Slack.stories.module.scss';
import { Story } from '@ladle/react';
import type { Dayjs } from 'dayjs';
import { useCallback, useState } from 'react';
import { DatePicker } from '../../';
import type { DatePickerState, DayInnerProps } from '../../';
import clsx from 'clsx';
import dayjs from 'dayjs';

// Reproduction of slack's date picker
export const Slack: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [showCalendar, setShowCalendar] = useState(true);

  const toggleCalendar = useCallback(() => {
    setShowCalendar((value) => !value);
  }, [setShowCalendar]);

  return (
    <div id="date-picker" className={styles.datePicker}>
      <DatePicker.Root
        selectedDate={date}
        setSelectedDate={setDate}
        minimumSelectableDate={dayjs().subtract(1, 'day')}
      >
        {useCallback(
          ({
            temporarySelectedDate,
            setTemporarySelectedDate,
            dayjs,
          }: DatePickerState) => (
            <>
              <div className={styles.header}>
                <button className={styles.control}>⬅️</button>
                <button className={styles.date} onClick={toggleCalendar}>
                  {showCalendar
                    ? temporarySelectedDate.format('MMMM YYYY')
                    : temporarySelectedDate.format('YYYY')}
                  ⬇️
                </button>
                <button className={styles.control}>➡️</button>
              </div>
              {showCalendar ? (
                <div className={styles.calendar}>
                  <DatePicker.Calendar>
                    <DatePicker.Week>
                      <DatePicker.Day>
                        {({
                          belongsToSelectedMonth,
                          date,
                          isOutOfRange,
                          isToday,
                          isSelected,
                          onClick: onDayClick,
                          alt,
                        }: DayInnerProps) => (
                          <>
                            {belongsToSelectedMonth ? (
                              <button
                                aria-label={alt}
                                className={clsx({
                                  [styles.isOutOfRange]: isOutOfRange,
                                  [styles.isToday]: isToday,
                                  [styles.isSelected]: isSelected,
                                  [styles.day]: true,
                                })}
                                disabled={isOutOfRange}
                                onClick={onDayClick}
                              >
                                {date.date()}
                              </button>
                            ) : (
                              <div
                                className={`${styles.day} ${styles.placeholder}`}
                              ></div>
                            )}
                          </>
                        )}
                      </DatePicker.Day>
                    </DatePicker.Week>
                  </DatePicker.Calendar>
                </div>
              ) : (
                <div className={styles.months}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <button
                      className={clsx({
                        [styles.month]: true,
                        [styles.isOutOfRange]: dayjs()
                          .month(i)
                          .isBefore(dayjs()),
                        [styles.isToday]: i === dayjs().month(),
                        [styles.isSelected]:
                          temporarySelectedDate.month() === i,
                      })}
                      key={`month-${i}`}
                      onClick={() =>
                        setTemporarySelectedDate(temporarySelectedDate.month(i))
                      }
                    >
                      {dayjs().month(i).format('MMMM')}
                    </button>
                  ))}
                </div>
              )}
            </>
          ),
          [showCalendar, toggleCalendar]
        )}
      </DatePicker.Root>
    </div>
  );
};

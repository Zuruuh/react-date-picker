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
        maximumSelectableDate={dayjs().add(1, 'year')}
      >
        {useCallback(
          ({
            temporarySelectedDate,
            setTemporarySelectedDate,
            controls: { prevMonth, nextMonth, prevYear, nextYear },
            minimumSelectableDate,
            maximumSelectableDate,
            dayjs,
          }: DatePickerState) => (
            <>
              {showCalendar ? (
                <>
                  <div className={styles.header}>
                    <button
                      className={styles.control}
                      disabled={prevMonth.disabled}
                      onClick={prevMonth.execute}
                    >
                      ⬅️
                    </button>
                    <button className={styles.date} onClick={toggleCalendar}>
                      {temporarySelectedDate.format('MMMM YYYY')}
                      ⬇️
                    </button>
                    <button
                      className={styles.control}
                      disabled={nextMonth.disabled}
                      onClick={nextMonth.execute}
                    >
                      ➡️
                    </button>
                  </div>

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
                </>
              ) : (
                <>
                  <div className={styles.header}>
                    <button
                      className={styles.control}
                      disabled={prevYear.disabled}
                      onClick={prevYear.execute}
                    >
                      ⬅️
                    </button>
                    <button className={styles.date} onClick={toggleCalendar}>
                      {temporarySelectedDate.format('YYYY')}
                      ⬇️
                    </button>
                    <button
                      className={styles.control}
                      disabled={nextYear.disabled}
                      onClick={nextYear.execute}
                    >
                      ➡️
                    </button>
                  </div>
                  <div className={styles.months}>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <button
                        className={clsx({
                          [styles.month]: true,
                          [styles.isToday]: i === dayjs().month(),
                          [styles.isSelected]:
                            temporarySelectedDate.month() === i,
                        })}
                        disabled={
                          temporarySelectedDate
                            .month(i)
                            .isBefore(minimumSelectableDate) ||
                          temporarySelectedDate
                            .month(i)
                            .isAfter(maximumSelectableDate)
                        }
                        key={`month-${i}`}
                        onClick={() =>
                          setTemporarySelectedDate(
                            temporarySelectedDate.month(i)
                          )
                        }
                      >
                        {dayjs().month(i).format('MMMM')}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </>
          ),
          [showCalendar, toggleCalendar]
        )}
      </DatePicker.Root>
    </div>
  );
};

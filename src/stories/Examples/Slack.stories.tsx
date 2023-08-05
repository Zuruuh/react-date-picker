import './Slack.stories.scss';
import { Story } from '@ladle/react';
import type { Dayjs } from 'dayjs';
import { useCallback, useState } from 'react';
import { DatePicker } from '../../';
import type { DatePickerState, DayInnerProps } from '../../';
import clsx from 'clsx';

// Reproduction of slack's date picker
export const Slack: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [showCalendar, setShowCalendar] = useState(true);

  const toggleCalendar = useCallback(() => {
    setShowCalendar((value) => !value);
  }, [setShowCalendar]);

  return (
    <div id="date-picker">
      <DatePicker.Root selectedDate={date} setSelectedDate={setDate}>
        {useCallback(
          ({
            temporarySelectedDate,
            setTemporarySelectedDate,
            dayjs,
          }: DatePickerState) => (
            <>
              <div className="header">
                <button className="control">⬅️</button>
                <button className="date" onClick={toggleCalendar}>
                  {showCalendar
                    ? temporarySelectedDate.format('MMMM YYYY')
                    : temporarySelectedDate.format('YYYY')}
                  ⬇️
                </button>
                <button className="control">➡️</button>
              </div>
              {showCalendar ? (
                <div className="calendar">
                  <DatePicker.Calendar>
                    <DatePicker.Week>
                      <DatePicker.Day>
                        {({
                          belongsToSelectedMonth,
                          date,
                          isBeforeToday,
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
                                  isBeforeToday,
                                  isToday,
                                  isSelected,
                                  day: true,
                                })}
                                disabled={isBeforeToday}
                                onClick={onDayClick}
                              >
                                {date.date()}
                              </button>
                            ) : (
                              <div className="day placeholder"></div>
                            )}
                          </>
                        )}
                      </DatePicker.Day>
                    </DatePicker.Week>
                  </DatePicker.Calendar>
                </div>
              ) : (
                <div className="months">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <button
                      className={clsx({
                        month: true,
                        isBeforeToday: dayjs().month(i).isBefore(dayjs()),
                        // isTooFarAway: dayjs().month(i)
                        isToday: i === dayjs().month(),
                        isSelected: temporarySelectedDate.month() === i,
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

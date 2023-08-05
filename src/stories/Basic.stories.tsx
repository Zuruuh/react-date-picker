import './Basic.stories.scss';
import { useCallback, useState } from 'react';
import type { FC } from 'react';
import { DatePicker } from '../';
import type { CalendarInnerProps } from '../';
import type { Story } from '@ladle/react';
import { withStrictMode } from '../ladle/decorators/withStrictMode';
import clsx from 'clsx';
import type { Dayjs } from 'dayjs';

const MyCustomCalendar: FC<{ showWeekNumbers: boolean }> = ({
  showWeekNumbers,
}) => {
  return (
    <DatePicker.Calendar>
      {useCallback(
        ({ weekNumber }: CalendarInnerProps) => (
          <div className="week">
            {showWeekNumbers ? (
              <p className="week-number">{weekNumber}</p>
            ) : (
              <></>
            )}
            <DatePicker.Week>
              <div className="day">
                <DatePicker.Day>
                  {({
                    onClick: onDayClick,
                    date: dayDate,
                    belongsToSelectedMonth,
                    isSelected,
                    isToday,
                  }) => (
                    <button
                      className={clsx({
                        selectionned: isSelected,
                        today: isToday,
                        month: belongsToSelectedMonth,
                      })}
                      onClick={onDayClick}
                    >
                      {dayDate.date()}
                    </button>
                  )}
                </DatePicker.Day>
              </div>
            </DatePicker.Week>
          </div>
        ),
        [showWeekNumbers]
      )}
    </DatePicker.Calendar>
  );
};

export const Simple: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>The current selected date is: {date?.toString()}</p>
      <DatePicker.Root setSelectedDate={setDate} selectedDate={date}>
        <div className="calendar">
          <MyCustomCalendar showWeekNumbers={false} />
        </div>
      </DatePicker.Root>
    </>
  );
};

export const WithWeekNumbers: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>The current selected date is: {date?.toString()}</p>
      <DatePicker.Root setSelectedDate={setDate} selectedDate={date}>
        <div className="calendar">
          <MyCustomCalendar showWeekNumbers={true} />
        </div>
      </DatePicker.Root>
    </>
  );
};

Simple.decorators = [withStrictMode];
WithWeekNumbers.decorators = [withStrictMode];

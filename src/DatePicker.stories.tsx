import './DatePicker.stories.css';
import { useState } from 'react';
import { DatePicker } from './';
import type { Story } from '@ladle/react';
import { withStrictMode } from './ladle/decorators/withStrictMode';
import clsx from 'clsx';

import day from 'dayjs';
import type { Dayjs } from 'dayjs';
import week from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/fr';

day.extend(week);
day.extend(utc);
day.locale('fr');

export const HelloWorld: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>The current selected date is: {date?.toString()}</p>
      <DatePicker.Root setSelectedDate={setDate} selectedDate={date}>
        <DatePicker.Calendar>
          {({ weekNumber }) => (
            <div className="week">
              <p>{weekNumber}</p>
              <DatePicker.Week>
                <div className="day">
                  <DatePicker.Day>
                    {({
                      onClick: onDayClick,
                      date: dayDate,
                      belongsToSelectedMonth,
                      isSelectionnedDate,
                      isCurrentDate,
                    }) => (
                      <button
                        className={clsx({
                          selectionned: isSelectionnedDate,
                          today: isCurrentDate,
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
          )}
        </DatePicker.Calendar>
      </DatePicker.Root>
    </>
  );
};

HelloWorld.decorators = [withStrictMode];

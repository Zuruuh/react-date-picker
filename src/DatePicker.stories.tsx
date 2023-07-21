import { useState } from 'react';
import { DatePicker } from './';
import type { Story } from '@ladle/react';
import { withStrictMode } from './ladle/decorators/withStrictMode';
import day, { type Dayjs } from 'dayjs';
import week from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/fr';

day.extend(week);
day.extend(utc);

export const HelloWorld: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>The current selected date is: {date?.toString()}</p>
      <DatePicker.Root setSelectedDate={setDate} selectedDate={date}>
        <DatePicker.Calendar>
          {({ weekNumber }) => (
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
              <p>{weekNumber}</p>
              <DatePicker.Week>
                <div style={{ display: 'flex' }}>
                  <DatePicker.Day>
                    {({
                      onClick: onDayClick,
                      date: dayDate,
                      belongsToSelectedMonth,
                      isSelectionnedDate,
                      isCurrentDate,
                    }) => (
                      <button
                        style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: isSelectionnedDate
                            ? 'blue'
                            : isCurrentDate
                            ? 'green'
                            : belongsToSelectedMonth
                            ? 'darkgray'
                            : 'gray',
                        }}
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

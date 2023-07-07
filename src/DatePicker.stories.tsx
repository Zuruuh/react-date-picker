import { useCallback, useEffect, useMemo, useState } from 'react';
import { DatePicker } from './';
import type { Story } from '@ladle/react';
import { withStrictMode } from './ladle/decorators/withStrictMode';
import day, { type Dayjs } from 'dayjs';
import week from 'dayjs/plugin/weekOfYear';

day.extend(week);

export const HelloWorld: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  // useEffect(() => {
  //   console.log(date);
  // }, [date]);
  const stringDate = useMemo(
    () => (date === null ? '' : date.toString()),
    [date]
  );

  return (
    <>
      <p>The current selected date is: {stringDate}</p>
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
                    }) => (
                      <button
                        style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: belongsToSelectedMonth
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

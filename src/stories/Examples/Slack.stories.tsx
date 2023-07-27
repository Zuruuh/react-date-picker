import { Story } from '@ladle/react';
import { Dayjs } from 'dayjs';
import { useCallback, useState } from 'react';
import { DatePicker } from '../../';
import type { DatePickerState, DayInnerProps } from '../../';

// Reproduction of slack's date picker
export const Slack: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  return (
    <DatePicker.Root selectedDate={date} setSelectedDate={setDate}>
      {useCallback(
        ({ temporarySelectedDate }: DatePickerState) => (
          <>
            <div className="header">
              <p>{temporarySelectedDate.format('MMMM YYYY')}</p>
            </div>
            <DatePicker.Calendar>
              <div className="week">
                <DatePicker.Week>
                  <DatePicker.Day>
                    {({ belongsToSelectedMonth, date }: DayInnerProps) => (
                      <>
                        {belongsToSelectedMonth ? (
                          <div className="day">
                            <button>{date.date()}</button>
                          </div>
                        ) : (
                          <div className="day placeholder"></div>
                        )}
                      </>
                    )}
                  </DatePicker.Day>
                </DatePicker.Week>
              </div>
            </DatePicker.Calendar>
          </>
        ),
        []
      )}
    </DatePicker.Root>
  );
};

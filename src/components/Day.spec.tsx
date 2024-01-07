import { render } from '@testing-library/react';
import { expect, test } from 'bun:test';
import { DayContext } from '../context/DayContext';
import { Day } from './Day';
import { createDatePickerContextState, day } from '../tests/utils';
import { DatePickerContext } from '../context/DatePickerContext';
import { type Dayjs } from 'dayjs';
import userEvent from '@testing-library/user-event';

test('Day component', async () => {
  const user = userEvent.setup();
  let selectedDate: Dayjs | null = null;

  const screen = render(
    <DatePickerContext.Provider
      value={createDatePickerContextState({
        setSelectedDate(date) {
          selectedDate = date;
        },
      })}
    >
      <DayContext.Provider
        value={{
          date: day({ year: 2023, month: 1, day: 2 }),
          corners: {
            topLeft: true,
            topRight: false,
            bottomLeft: false,
            bottomRight: false,
          },
        }}
      >
        <Day>
          {(props) => {
            expect(props.corners.topLeft).toBeTrue();
            expect(props.corners.topRight).toBeFalse();
            expect(props.corners.bottomLeft).toBeFalse();
            expect(props.corners.bottomRight).toBeFalse();

            return (
              <button
                aria-label={props.alt}
                type="button"
                onClick={props.onClick}
              />
            );
          }}
        </Day>
      </DayContext.Provider>
    </DatePickerContext.Provider>,
  );

  expect(selectedDate).toBeNull();

  await user.click(screen.getByRole('button'));

  expect(selectedDate).not.toBeNull();
  expect(selectedDate!.format('D-MM-YYYY')).toBe(
    day({ year: 2023, day: 2, month: 1 }).format('D-MM-YYYY'),
  );
});

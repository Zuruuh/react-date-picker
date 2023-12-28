import { test, expect } from 'bun:test';
import { Calendar, generateWeeksBasedOnOverlap } from './Calendar';
import { type Dayjs } from 'dayjs';
import { type DatePickerCalendarOverlap } from '../context/DatePickerContext';
import { day } from '../tests/utils';
import { render } from '@testing-library/react';

type Output = [Dayjs, DatePickerCalendarOverlap];

const expectedOutputs: Output[] = [
  [day({ month: 1 }), 'overlap'],
  [day({ month: 2 }), 'overlap'],
  [day({ month: 3 }), 'overlap'],
  [day({ month: 4 }), 'overlap'],
  [day({ month: 5 }), 'overlap'],
  [day({ month: 6 }), 'overlap'],
  [day({ month: 7 }), 'overlap'],
  [day({ month: 8 }), 'overlap'],
  [day({ month: 9 }), 'overlap'],
  [day({ month: 10 }), 'overlap'],
  [day({ month: 11 }), 'overlap'],
  [day({ month: 12 }), 'overlap'],

  [day({ month: 1 }), 'no-overlap'],
  [day({ month: 2 }), 'no-overlap'],
  [day({ month: 3 }), 'no-overlap'],
  [day({ month: 4 }), 'no-overlap'],
  [day({ month: 5 }), 'no-overlap'],
  [day({ month: 6 }), 'no-overlap'],
  [day({ month: 7 }), 'no-overlap'],
  [day({ month: 8 }), 'no-overlap'],
  [day({ month: 9 }), 'no-overlap'],
  [day({ month: 10 }), 'no-overlap'],
  [day({ month: 11 }), 'no-overlap'],
  [day({ month: 12 }), 'no-overlap'],

  [day({ month: 1 }), 'no-overlap-with-offset'],
  [day({ month: 2 }), 'no-overlap-with-offset'],
  [day({ month: 3 }), 'no-overlap-with-offset'],
  [day({ month: 4 }), 'no-overlap-with-offset'],
  [day({ month: 5 }), 'no-overlap-with-offset'],
  [day({ month: 6 }), 'no-overlap-with-offset'],
  [day({ month: 7 }), 'no-overlap-with-offset'],
  [day({ month: 8 }), 'no-overlap-with-offset'],
  [day({ month: 9 }), 'no-overlap-with-offset'],
  [day({ month: 10 }), 'no-overlap-with-offset'],
  [day({ month: 11 }), 'no-overlap-with-offset'],
  [day({ month: 12 }), 'no-overlap-with-offset'],
];

test('generateWeeksBasedOnOverlap', () => {
  for (const [date, type] of expectedOutputs) {
    expect(
      Array.from(generateWeeksBasedOnOverlap(date, type)),
    ).toMatchSnapshot();
  }
});

test('Calendar component', () => {
  render(<Calendar></Calendar>);
});

import { test, expect } from 'bun:test';
import { generateWeeksBasedOnOverlap } from './Calendar';
import { type Dayjs } from 'dayjs';
import { type DatePickerCalendarOverlap } from '../context/DatePickerContext';
import { day } from '../tests/utils';

type Output = [Dayjs, DatePickerCalendarOverlap];

const expectedOutputs: Output[] = [
  [day({ year: 2023, month: 1, day: 1 }), 'overlap'],
  [day({ year: 2023, month: 2, day: 1 }), 'overlap'],
  [day({ year: 2023, month: 3, day: 1 }), 'overlap'],
  [day({ year: 2023, month: 4, day: 1 }), 'overlap'],
  [day({ year: 2023, month: 5, day: 1 }), 'overlap'],
  [day({ year: 2023, month: 6, day: 1 }), 'overlap'],
  [day({ year: 2023, month: 7, day: 1 }), 'overlap'],
  [day({ year: 2023, month: 8, day: 1 }), 'overlap'],
  [day({ year: 2023, month: 9, day: 1 }), 'overlap'],
  [day({ year: 2023, month: 10, day: 1 }), 'overlap'],
  [day({ year: 2023, month: 11, day: 1 }), 'overlap'],
  [day({ year: 2023, month: 12, day: 1 }), 'overlap'],

  [day({ year: 2023, month: 1, day: 1 }), 'no-overlap'],
  [day({ year: 2023, month: 2, day: 1 }), 'no-overlap'],
  [day({ year: 2023, month: 3, day: 1 }), 'no-overlap'],
  [day({ year: 2023, month: 4, day: 1 }), 'no-overlap'],
  [day({ year: 2023, month: 5, day: 1 }), 'no-overlap'],
  [day({ year: 2023, month: 6, day: 1 }), 'no-overlap'],
  [day({ year: 2023, month: 7, day: 1 }), 'no-overlap'],
  [day({ year: 2023, month: 8, day: 1 }), 'no-overlap'],
  [day({ year: 2023, month: 9, day: 1 }), 'no-overlap'],
  [day({ year: 2023, month: 10, day: 1 }), 'no-overlap'],
  [day({ year: 2023, month: 11, day: 1 }), 'no-overlap'],
  [day({ year: 2023, month: 12, day: 1 }), 'no-overlap'],

  [day({ year: 2023, month: 1, day: 1 }), 'no-overlap-with-offset'],
  [day({ year: 2023, month: 2, day: 1 }), 'no-overlap-with-offset'],
  [day({ year: 2023, month: 3, day: 1 }), 'no-overlap-with-offset'],
  [day({ year: 2023, month: 4, day: 1 }), 'no-overlap-with-offset'],
  [day({ year: 2023, month: 5, day: 1 }), 'no-overlap-with-offset'],
  [day({ year: 2023, month: 6, day: 1 }), 'no-overlap-with-offset'],
  [day({ year: 2023, month: 7, day: 1 }), 'no-overlap-with-offset'],
  [day({ year: 2023, month: 8, day: 1 }), 'no-overlap-with-offset'],
  [day({ year: 2023, month: 9, day: 1 }), 'no-overlap-with-offset'],
  [day({ year: 2023, month: 10, day: 1 }), 'no-overlap-with-offset'],
  [day({ year: 2023, month: 11, day: 1 }), 'no-overlap-with-offset'],
  [day({ year: 2023, month: 12, day: 1 }), 'no-overlap-with-offset'],
];

test('generateWeeksBasedOnOverlap', () => {
  expectedOutputs.forEach(([date, type]) => {
    expect(
      Array.from(generateWeeksBasedOnOverlap(date, type)),
    ).toMatchSnapshot();
  });
});

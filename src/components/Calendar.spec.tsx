import { test, expect } from 'bun:test';
import { generateWeeksBasedOnOverlap } from './Calendar';
import { type Dayjs } from 'dayjs';
import { type DatePickerCalendarOverlap } from '../context/DatePickerContext';
import { WeekNumbers } from '../types/WeekNumber';
import { day } from '../tests/utils';

type Output = [Dayjs, DatePickerCalendarOverlap, WeekNumbers];

const expectedOutputs: Output[] = [
  [
    day({ year: 2023, month: 10, day: 23 }),
    'overlap',
    [[39], [40], [41], [42], [43], [44]],
  ] satisfies Output,
];

test('generateWeeksBasedOnOverlap', () => {
  expectedOutputs.forEach(([date, type, output]) => {
    expect(Array.from(generateWeeksBasedOnOverlap(date, type))).toEqual(output);
  });
});

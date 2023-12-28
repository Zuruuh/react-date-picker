import week from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';
import locale from 'dayjs/plugin/localeData';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { DatePickerState } from '../context/DatePickerContext';

dayjs.extend(week);
dayjs.extend(utc);
dayjs.extend(locale);
dayjs.locale('fr');

// we use month - 1 bcz internally dayjs uses 0 for January
export const day = ({
  day = 1,
  month = 1,
  year = 2023,
}: {
  day?: number;
  month?: number;
  year?: number;
}) =>
  dayjs()
    .year(year)
    .month(month - 1)
    .date(day)
    .hour(12)
    .minute(0)
    .second(0);

const defaultControl = {
  execute() {},
  disabled: false,
};

export function createDatePickerContextState(
  args: Partial<DatePickerState> = {},
): DatePickerState {
  return {
    overlap: 'overlap',
    setSelectedDate() {},
    selectedDate: null,
    dayjs: () => day({ year: 2023, month: 1, day: 1 }),
    maximumSelectableDate: dayjs().year(9999),
    minimumSelectableDate: dayjs().year(0),
    temporarySelectedDate: day({ year: 2023, month: 1, day: 1 }),
    setTemporarySelectedDate() {},
    controls: {
      nextYear: defaultControl,
      prevYear: defaultControl,
      nextMonth: defaultControl,
      prevMonth: defaultControl,
    },
    ...args,
  };
}

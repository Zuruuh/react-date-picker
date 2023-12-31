import { useCallback, useState, type FC, type ReactNode } from 'react';
import {
  DatePickerContext,
  type DatePickerCalendarOverlap,
  type DatePickerState,
} from './context/DatePickerContext';
import type { Setter } from './types/Setter';
import { Calendar } from './components/Calendar';
import { Week } from './components/Week';
import { Day } from './components/Day';
import day, { type Dayjs } from 'dayjs';

export interface DatePickerProps {
  selectedDate: Dayjs | null;
  setSelectedDate: Setter<Dayjs | null>;
  dayjs?(): Dayjs;
  minimumSelectableDate?: Dayjs;
  maximumSelectableDate?: Dayjs;
  overlap?: DatePickerCalendarOverlap;
  children: ReactNode | ((props: DatePickerState) => ReactNode);
}

/**
 * @internal
 */
export function useControlFactory(
  date: Dayjs,
  setDate: (date: Dayjs) => unknown,
) {
  return useCallback(
    (positive: boolean, unit: 'month' | 'year', referenceDate: Dayjs) => {
      const modifiedDate = (
        positive ? date.add(1, unit) : date.subtract(1, unit)
      ).date(1);

      return {
        disabled: positive
          ? modifiedDate.isAfter(referenceDate.endOf(unit))
          : modifiedDate.isBefore(referenceDate.startOf(unit)),
        execute(): void {
          setDate(modifiedDate);
        },
      };
    },
    [date, setDate],
  );
}

const DatePicker: FC<DatePickerProps> = ({
  children,
  selectedDate,
  setSelectedDate,
  minimumSelectableDate,
  maximumSelectableDate,
  overlap = 'overlap',
  dayjs = () => day(),
}) => {
  const dayFactory = useCallback(
    () => dayjs().utc(true).second(0).minute(0).hour(12),
    [dayjs],
  );
  const [temporarySelectedDate, setTemporarySelectedDate] = useState(
    dayFactory().day(dayjs().localeData().firstDayOfWeek()),
  );
  const setTemporarySelectedDateDecorator: Setter<Dayjs> = (date) => {
    const unwrappedDate =
      typeof date === 'function' ? date(temporarySelectedDate) : date;
    return setTemporarySelectedDate(unwrappedDate.date(1));
  };

  const controlFactory = useControlFactory(
    temporarySelectedDate,
    setTemporarySelectedDateDecorator,
  );

  minimumSelectableDate = (minimumSelectableDate ?? dayFactory().year(0))
    .second(0)
    .minute(0)
    .hour(0);
  maximumSelectableDate = (maximumSelectableDate ?? dayFactory().year(99999))
    .second(59)
    .minute(59)
    .hour(23);

  const props: DatePickerState = {
    selectedDate,
    setSelectedDate,
    temporarySelectedDate,
    setTemporarySelectedDate: setTemporarySelectedDateDecorator,
    minimumSelectableDate,
    maximumSelectableDate,
    controls: {
      nextMonth: controlFactory(true, 'month', maximumSelectableDate),
      nextYear: controlFactory(true, 'year', maximumSelectableDate),
      prevMonth: controlFactory(false, 'month', minimumSelectableDate),
      prevYear: controlFactory(false, 'year', minimumSelectableDate),
    },
    overlap,
    dayjs: dayFactory,
  };

  return (
    <DatePickerContext.Provider value={props}>
      {typeof children === 'function' ? children(props) : children}
    </DatePickerContext.Provider>
  );
};

export default {
  Root: DatePicker,
  Calendar,
  Week,
  Day,
};

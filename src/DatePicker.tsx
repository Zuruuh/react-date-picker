import { useCallback, useState } from 'react';
import type { ReactNode, FC } from 'react';
import { DatePickerContext } from './context/DatePickerContext';
import type { DatePickerState } from './context/DatePickerContext';
import { Calendar } from './components/Calendar';
import { Setter } from './types/setter';
import { Week } from './components/Week';
import { Day } from './components/Day';
import day from 'dayjs';
import type { Dayjs } from 'dayjs';

export interface DatePickerProps {
  selectedDate: Dayjs | null;
  setSelectedDate: Setter<Dayjs | null>;
  dayjs?(): Dayjs;
  minimumSelectableDate?: Dayjs;
  maximumSelectableDate?: Dayjs;
  children: ReactNode | ((props: DatePickerState) => ReactNode);
}

/**
 * @internal
 */
function useControlFactory(date: Dayjs, setDate: (date: Dayjs) => unknown) {
  return useCallback(
    (positive: boolean, unit: 'month' | 'year', referenceDate: Dayjs) => {
      const modifiedDate = positive
        ? date.add(1, unit)
        : date.subtract(1, unit);

      return {
        disabled: positive
          ? modifiedDate.isAfter(referenceDate)
          : modifiedDate.isBefore(referenceDate),
        execute(): void {
          setDate(modifiedDate);
        },
      };
    },
    [date, setDate]
  );
}

const DatePicker: FC<DatePickerProps> = ({
  children,
  selectedDate,
  setSelectedDate,
  minimumSelectableDate,
  maximumSelectableDate,
  dayjs = () => day().utc(true).startOf('day'),
}) => {
  const [temporarySelectedDate, setTemporarySelectedDate] = useState(dayjs());
  const controlFactory = useControlFactory(
    temporarySelectedDate,
    setTemporarySelectedDate
  );

  minimumSelectableDate = minimumSelectableDate ?? dayjs().year(0);
  maximumSelectableDate = maximumSelectableDate ?? dayjs().year(99999);

  const props: DatePickerState = {
    selectedDate,
    setSelectedDate,
    temporarySelectedDate,
    setTemporarySelectedDate,
    minimumSelectableDate,
    maximumSelectableDate,
    controls: {
      nextMonth: controlFactory(true, 'month', maximumSelectableDate),
      nextYear: controlFactory(true, 'year', maximumSelectableDate),
      prevMonth: controlFactory(false, 'month', minimumSelectableDate),
      prevYear: controlFactory(false, 'year', minimumSelectableDate),
    },
    dayjs,
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

import { useState, type ReactNode, type FC, useMemo } from 'react';
import { DatePickerContext } from './context/DatePickerContext';
import { Calendar } from './components/Calendar';
import { Setter } from './types/setter';
import { Week } from './components/Week';
import { Day } from './components/Day';
import day, { type Dayjs } from 'dayjs';

export interface DatePickerProps {
  selectedDate: Dayjs | null;
  setSelectedDate: Setter<Dayjs | null>;
  children: ReactNode;
}

const DatePicker: FC<DatePickerProps> = ({
  children,
  selectedDate,
  setSelectedDate,
}) => {
  const [temporarySelectedMonth, setTemporarySelectedMonth] = useState(
    day().month()
  );
  const [temporarySelectedYear, setTemporarySelectedYear] = useState(
    day().year()
  );

  const providerProps = useMemo(
    () => ({
      selectedDate,
      setSelectedDate,
      temporarySelectedMonth,
      setTemporarySelectedMonth,
      temporarySelectedYear,
      setTemporarySelectedYear,
    }),
    [
      selectedDate,
      setSelectedDate,
      temporarySelectedMonth,
      setTemporarySelectedMonth,
      temporarySelectedYear,
      setTemporarySelectedYear,
    ]
  );

  return (
    <DatePickerContext.Provider value={providerProps}>
      {children}
    </DatePickerContext.Provider>
  );
};

export default {
  Root: DatePicker,
  Calendar,
  Week,
  Day,
};

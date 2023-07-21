import { useState, type ReactNode, type FC } from 'react';
import { DatePickerContext } from './context/DatePickerContext';
import { Calendar } from './components/Calendar';
import { Setter } from './types/setter';
import { Week } from './components/Week';
import { Day } from './components/Day';
import day, { type Dayjs } from 'dayjs';

export interface DatePickerProps {
  selectedDate: Dayjs | null;
  setSelectedDate: Setter<Dayjs | null>;
  dayjs?(): Dayjs;
  children: ReactNode;
}

const DatePicker: FC<DatePickerProps> = ({
  children,
  selectedDate,
  setSelectedDate,
  dayjs = () => day().utc(true).startOf('day'),
}) => {
  const [temporarySelectedMonth, setTemporarySelectedMonth] = useState(
    dayjs().month()
  );
  const [temporarySelectedYear, setTemporarySelectedYear] = useState(
    dayjs().year()
  );

  return (
    <DatePickerContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        temporarySelectedMonth,
        setTemporarySelectedMonth,
        temporarySelectedYear,
        setTemporarySelectedYear,
        dayjs,
      }}
    >
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

import { useState } from 'react';
import type { ReactNode, FC } from 'react';
import {
  DatePickerContext,
  DatePickerState,
} from './context/DatePickerContext';
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

const DatePicker: FC<DatePickerProps> = ({
  children,
  selectedDate,
  setSelectedDate,
  minimumSelectableDate,
  maximumSelectableDate,
  dayjs = () => day().utc(true).startOf('day'),
}) => {
  const [temporarySelectedDate, setTemporarySelectedDate] = useState(dayjs());

  const props: DatePickerState = {
    selectedDate,
    setSelectedDate,
    temporarySelectedDate,
    setTemporarySelectedDate,
    minimumSelectableDate: minimumSelectableDate ?? dayjs().year(0),
    maximumSelectableDate: maximumSelectableDate ?? dayjs().year(99999),
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

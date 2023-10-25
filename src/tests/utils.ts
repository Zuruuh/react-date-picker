import week from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';
import locale from 'dayjs/plugin/localeData';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.extend(week);
dayjs.extend(utc);
dayjs.extend(locale);
dayjs.locale('fr');

// we use month - 1 bcz internally dayjs uses 0 for January
export const day = ({
  day,
  month,
  year,
}: {
  day: number;
  month: number;
  year: number;
}) =>
  dayjs()
    .year(year)
    .month(month - 1)
    .date(day)
    .hour(12)
    .minute(0)
    .second(0);

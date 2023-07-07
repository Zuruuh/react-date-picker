// import { type ReactNode, forwardRef, useCallback, useMemo } from 'react';
// import { useDatePickerContext } from '../hooks/useDatePickerContext';
// import type { DivPropsWithoutRef } from 'react-html-props';
// import day, { type Dayjs } from 'dayjs';
//
// export interface DaysInnerProps {
//   onClick(): void;
//   isCurrentDate: boolean;
//   isSelectionnedDate: boolean;
//   belongsToSelectedMonth: boolean;
//   date: Dayjs;
// }
//
// export interface DaysProps extends Omit<DivPropsWithoutRef, 'children'> {
//   children: (props: DaysInnerProps) => ReactNode;
// }
//
// export const Days = forwardRef<HTMLDivElement, DaysProps>(function Days(
//   { children, ...rest },
//   ref
// ) {
//   const {
//     selectedDate,
//     setSelectedDate,
//     temporarySelectedYear,
//     temporarySelectedMonth,
//   } = useDatePickerContext();
//   const onClick = useCallback(
//     (date: Dayjs) => {
//       setSelectedDate(date);
//     },
//     [setSelectedDate]
//   );
//
//   const generateDefaultProps = useCallback(
//     (date: Dayjs) =>
//       ({
//         date,
//         onClick: () => onClick(date),
//         isCurrentDate: date.isSame(day(), 'date'),
//         isSelectionnedDate: date.isSame(selectedDate, 'date'),
//       } satisfies Partial<DaysInnerProps>),
//     [onClick, selectedDate]
//   );
//
//   const month = useMemo(
//     () =>
//       day()
//         .set('date', 1)
//         .set('month', temporarySelectedMonth)
//         .set('year', temporarySelectedYear),
//     [temporarySelectedYear, temporarySelectedMonth]
//   );
//   const calendar: DaysInnerProps[][] = useMemo(() => {
//     const days: DaysInnerProps[] = [];
//     const countOfDaysBeforeMonthStart = -(MONDAY - month.day());
//     const monthBefore = month.subtract(1, 'month').endOf('month');
//
//     for (let i = 0; i < countOfDaysBeforeMonthStart; i++) {
//       const date = monthBefore.subtract(i, 'days');
//
//       days.unshift({
//         ...generateDefaultProps(date),
//         belongsToSelectedMonth: false,
//       });
//     }
//
//     for (let i = 1; i <= month.daysInMonth(); i++) {
//       const date = month.set('date', i);
//       days.push({
//         ...generateDefaultProps(date),
//         belongsToSelectedMonth: true,
//       });
//     }
//
//     const countOfDaysAfterMonthEnd = DAYS_COUNT_IN_A_WEEK - month.day();
//     const monthAfter = month.add(1, 'month');
//
//     for (let i = 0; i < countOfDaysAfterMonthEnd; i++) {
//       const date = monthAfter.add(i, 'days');
//
//       days.push({
//         ...generateDefaultProps(date),
//         belongsToSelectedMonth: false,
//       });
//     }
//
//     return days.reduce(
//       (prev: DaysInnerProps[][], curr, index): DaysInnerProps[][] => {
//         if (index % (DAYS_COUNT_IN_A_WEEK + 1) === 0 && index > 0) {
//           return [...prev, [curr]];
//         }
//
//         prev.at(-1)!.push(curr);
//         return prev;
//       },
//       [[]]
//     );
//   }, [month, generateDefaultProps]);
//
//   return (
//     <div ref={ref} {...rest}>
//       {calendar.map((entries) => (
//         <div style={{ display: 'flex', gap: '5px' }}>
//           {entries.map((entry) => (
//             <div
//               key={JSON.stringify(entry)}
//               style={{
//                 color: `${entry.belongsToSelectedMonth ? 'black' : 'gray'}`,
//               }}
//             >
//               {children(entry)}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// });

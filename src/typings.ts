import { DateTime } from 'luxon';

export interface ParseOptions {
  /**
   Date time to start from. Defaults to now. Value can instance of `Date`, milliseconds, or ISO string.
   @defaultValue `Date.now()`
   */
  from?: FromDate;
}

export interface Options extends ParseOptions {
  /**
   Set to `true` to use verbose formatting. Defaults to `false`.
   */
  long?: boolean;
}

export type FromDate = DateTime | Date | number | string;

export type Unit =
  | 'Years'
  | 'Year'
  | 'Yrs'
  | 'Yr'
  | 'Y'
  | 'Months'
  | 'Month'
  | 'Mon'
  | 'Mo'
  | 'Weeks'
  | 'Week'
  | 'W'
  | 'Days'
  | 'Day'
  | 'D'
  | 'Hours'
  | 'Hour'
  | 'Hrs'
  | 'Hr'
  | 'H'
  | 'Minutes'
  | 'Minute'
  | 'Mins'
  | 'Min'
  | 'M'
  | 'Seconds'
  | 'Second'
  | 'Secs'
  | 'Sec'
  | 's'
  | 'Milliseconds'
  | 'Millisecond'
  | 'Msecs'
  | 'Msec'
  | 'Ms';

export type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

export type StringValue = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}`;

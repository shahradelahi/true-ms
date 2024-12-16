import { DateTime, DurationLike } from 'luxon';

import type { FromDate, Options, StringValue } from '@/typings';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export function parseFromValue(from: FromDate): DateTime {
  if (from instanceof DateTime) {
    return from;
  }
  if (from instanceof Date) {
    return DateTime.fromJSDate(from);
  }
  if (typeof from === 'string') {
    return DateTime.fromISO(from);
  }
  if (typeof from === 'number') {
    return DateTime.fromMillis(from);
  }
  throw new Error('Value provided to ms.from() must be a Date, ISO string, or number.');
}

export function fromDuration(value: DurationLike, options?: Options): number {
  const from = options?.from ? parseFromValue(options.from) : DateTime.now();
  return from.plus(value).diff(from).toMillis();
}

export function fromMillis(value: number, options?: Options): number {
  return fromDuration({ milliseconds: value }, options);
}

/**
 * Pluralization helper.
 */
export function plural(ms: number, msAbs: number, n: number, name: string): StringValue {
  const isPlural = msAbs >= n * 1.5;
  return `${Math.round(ms / n)} ${name}${isPlural ? 's' : ''}` as StringValue;
}

/**
 * A type guard for errors.
 *
 * @param value - The value to test
 * @returns A boolean `true` if the provided value is an Error-like object
 */
export function isError(value: unknown): value is Error {
  return typeof value === 'object' && value !== null && 'message' in value;
}

/**
 * Short format for `ms`.
 */
export function fmtShort(ms: number): StringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= DAY) {
    return `${Math.round(ms / DAY)}d`;
  }
  if (msAbs >= HOUR) {
    return `${Math.round(ms / HOUR)}h`;
  }
  if (msAbs >= MINUTE) {
    return `${Math.round(ms / MINUTE)}m`;
  }
  if (msAbs >= SECOND) {
    return `${Math.round(ms / SECOND)}s`;
  }
  return `${ms}ms`;
}

/**
 * Long format for `ms`.
 */
export function fmtLong(ms: number): StringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= DAY) {
    return plural(ms, msAbs, DAY, 'day');
  }
  if (msAbs >= HOUR) {
    return plural(ms, msAbs, HOUR, 'hour');
  }
  if (msAbs >= MINUTE) {
    return plural(ms, msAbs, MINUTE, 'minute');
  }
  if (msAbs >= SECOND) {
    return plural(ms, msAbs, SECOND, 'second');
  }
  return `${ms} ms`;
}

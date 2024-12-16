import { DateTime, type DurationLike } from 'luxon';

import type { Options, ParseOptions, StringValue, Unit } from '@/typings';
import { fmtLong, fmtShort, fromDuration, fromMillis, isError, parseFromValue } from '@/utils';

/**
 * Parse or format the given value.
 *
 * @param value - The string or number to convert
 * @param options - Options for the conversion
 * @throws Error if `value` is not a non-empty string or a number
 */
function msFn(value: StringValue, options?: Options): number;
function msFn(value: number, options?: Options): string;
function msFn(value: DurationLike, options?: Options): number;
function msFn(value: StringValue | DurationLike | number, options?: Options): number | string {
  try {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return fromDuration(value, options);
    } else if (typeof value === 'string') {
      return parse(value, options);
    } else if (typeof value === 'number') {
      return format(value, options);
    }
    throw new Error(
      'Value provided to ms() must be a object of type DurationLike, string, or number.'
    );
  } catch (error) {
    const message = isError(error)
      ? `${error.message}. value=${JSON.stringify(value)}`
      : 'An unknown error has occurred.';
    throw new Error(message);
  }
}

/**
 * Parse the given string and return milliseconds.
 *
 * @param str - A string to parse to milliseconds
 * @param options - Options for the conversion
 * @returns The parsed value in milliseconds, or `NaN` if the string can't be
 * parsed
 */
export function parse(str: string, options?: ParseOptions): number {
  if (typeof str !== 'string' || str.length === 0 || str.length > 100) {
    throw new Error('Value provided to ms.parse() must be a string with length between 1 and 99.');
  }
  const match =
    /^(?<value>-?(?:\d+)?\.?\d+) *(?<type>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mon?|mo|years?|yrs?|y)?$/i.exec(
      str
    );
  // Named capture groups need to be manually typed today.
  // https://github.com/microsoft/TypeScript/issues/32098
  const groups = match?.groups as { value: string; type?: string } | undefined;
  if (!groups) {
    return NaN;
  }
  const from = options?.from ? parseFromValue(options.from) : DateTime.now();
  const n = parseFloat(groups.value);
  const type = (groups.type || 'ms').toLowerCase() as Lowercase<Unit>;
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return fromDuration({ year: n }, { from });
    case 'months':
    case 'month':
    case 'mon':
    case 'mo':
      return fromDuration({ month: n }, { from });
    case 'weeks':
    case 'week':
    case 'w':
      return fromDuration({ week: n }, { from });
    case 'days':
    case 'day':
    case 'd':
      return fromDuration({ day: n }, { from });
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return fromDuration({ hour: n }, { from });
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return fromDuration({ minute: n }, { from });
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return fromDuration({ second: n }, { from });
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      // This should never occur.
      throw new Error(`The unit ${type as string} was matched, but no matching case exists.`);
  }
}

/**
 * Parse the given StringValue and return milliseconds.
 *
 * @param value - A typesafe StringValue to parse to milliseconds
 * @param options - Options for the conversion
 * @returns The parsed value in milliseconds, or `NaN` if the string can't be
 * parsed
 */
export function parseStrict(value: StringValue, options?: ParseOptions): number {
  return parse(value, options);
}

/**
 * Format the given integer as a string.
 *
 * @param ms - milliseconds
 * @param options - Options for the conversion
 * @returns The formatted string
 */
export function format(ms: number, options?: Options): string {
  if (typeof ms !== 'number' || !isFinite(ms)) {
    throw new Error('Value provided to ms.format() must be of type number.');
  }
  const d = fromMillis(ms, options);
  return options?.long ? fmtLong(d) : fmtShort(d);
}

export { msFn as ms };
export default msFn;

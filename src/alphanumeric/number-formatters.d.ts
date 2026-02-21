/** Configuration for formatting time values. */
export interface TimeFormat {
  /** The scale factor to apply to values. */
  scale: number;
  /** Number of decimal places. */
  precision: number;
  /** The time unit suffix (e.g., 'ms', 's', 'μs'). */
  unit: string;
}

/** Prepares a time format configuration for a set of values.
 * @param values - The time values to analyze.
 * @param scale - Initial scale factor (default: 1).
 * @param useUnicode - If true, use Unicode unit symbols (e.g., μs).
 * @returns A TimeFormat configuration.
 */
export function prepareTimeFormat(values: number[], scale?: number, useUnicode?: boolean): TimeFormat;

/** Options for `formatTime()`. */
export interface FormatTimeOptions extends TimeFormat {
  /** If true, do not round the fractional part. */
  keepFractionAsIs?: boolean;
}

/** Formats a time value using a prepared format configuration.
 * @param value - The time value to format.
 * @param format - The format configuration from `prepareTimeFormat()`.
 * @returns The formatted time string.
 */
export function formatTime(value: number, format: FormatTimeOptions): string;

/** Options for number formatting functions. */
export interface FormatNumberOptions {
  /** Thousands separator character (default: ','). */
  comma?: string;
  /** If true, always show the sign. */
  keepSign?: boolean;
  /** Number of decimal places. */
  decimals?: number;
  /** If true, do not round the fractional part. */
  keepFractionAsIs?: boolean;
  /** Decimal point character (default: '.'). */
  dot?: string;
}

/** Formats an integer with optional comma separators and sign.
 * @param value - The integer to format.
 * @param options - Formatting options.
 * @returns The formatted string.
 */
export function formatInteger(value: number, options?: FormatNumberOptions): string;
/** Formats a number with optional decimals, comma separators, and sign.
 * @param value - The number to format.
 * @param options - Formatting options.
 * @returns The formatted string.
 */
export function formatNumber(value: number, options?: FormatNumberOptions): string;
/** Formats a number with SI abbreviations (k, M, G, T).
 * @param value - The number to format.
 * @param options - Formatting options.
 * @returns The abbreviated string.
 */
export function abbrNumber(value: number, options?: FormatNumberOptions): string;

/** Simplifies the exponent notation of a number string.
 * @param s - The number or string to simplify.
 * @param options - Options.
 * @returns The simplified string.
 */
export function simplifyExponent(s: string | number, options?: {keepExpPlus?: boolean}): string;

/** Result of comparing two numbers. */
export interface CompareDifferenceResult {
  /** True if `a < b`. */
  less: boolean;
  /** True if the values are effectively equal. */
  equality?: boolean;
  /** True if the difference is infinite. */
  infinity?: boolean;
  /** Formatted percentage difference, if applicable. */
  percentage?: string;
  /** Formatted ratio string, if applicable. */
  ratio?: string;
}

/** Compares two positive numbers and returns a description of their difference.
 * @param a - First number.
 * @param b - Second number.
 * @returns An object describing the difference.
 */
export function compareDifference(a: number, b: number): CompareDifferenceResult;

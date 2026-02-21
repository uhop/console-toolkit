export interface TimeFormat {
  scale: number;
  precision: number;
  unit: string;
}

/** Prepares a time format configuration for a set of values. */
export function prepareTimeFormat(values: number[], scale?: number, useUnicode?: boolean): TimeFormat;

export interface FormatTimeOptions extends TimeFormat {
  keepFractionAsIs?: boolean;
}

/** Formats a time value using a prepared format configuration. */
export function formatTime(value: number, format: FormatTimeOptions): string;

export interface FormatNumberOptions {
  comma?: string;
  keepSign?: boolean;
  decimals?: number;
  keepFractionAsIs?: boolean;
  dot?: string;
}

/** Formats an integer with optional comma separators and sign. */
export function formatInteger(value: number, options?: FormatNumberOptions): string;
/** Formats a number with optional decimals, comma separators, and sign. */
export function formatNumber(value: number, options?: FormatNumberOptions): string;
/** Formats a number with SI abbreviations (k, M, G, T). */
export function abbrNumber(value: number, options?: FormatNumberOptions): string;

/** Simplifies the exponent notation of a number string. */
export function simplifyExponent(s: string | number, options?: { keepExpPlus?: boolean }): string;

export interface CompareDifferenceResult {
  less: boolean;
  equality?: boolean;
  infinity?: boolean;
  percentage?: string;
  ratio?: string;
}

/** Compares two positive numbers and returns a description of their difference. */
export function compareDifference(a: number, b: number): CompareDifferenceResult;

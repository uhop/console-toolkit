export interface TimeFormat {
  scale: number;
  precision: number;
  unit: string;
}

export function prepareTimeFormat(values: number[], scale?: number, useUnicode?: boolean): TimeFormat;

export interface FormatTimeOptions extends TimeFormat {
  keepFractionAsIs?: boolean;
}

export function formatTime(value: number, format: FormatTimeOptions): string;

export interface FormatNumberOptions {
  comma?: string;
  keepSign?: boolean;
  decimals?: number;
  keepFractionAsIs?: boolean;
  dot?: string;
}

export function formatInteger(value: number, options?: FormatNumberOptions): string;
export function formatNumber(value: number, options?: FormatNumberOptions): string;
export function abbrNumber(value: number, options?: FormatNumberOptions): string;

export function simplifyExponent(s: string | number, options?: { keepExpPlus?: boolean }): string;

export interface CompareDifferenceResult {
  less: boolean;
  equality?: boolean;
  infinity?: boolean;
  percentage?: string;
  ratio?: string;
}

export function compareDifference(a: number, b: number): CompareDifferenceResult;

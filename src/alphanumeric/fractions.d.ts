/** A Unicode fraction character descriptor. */
export interface Fraction {
  /** The numerator of the fraction. */
  numerator: number;
  /** The denominator of the fraction. */
  denominator: number;
  /** The Unicode fraction symbol. */
  symbol: string;
  /** The numeric value of the fraction. */
  value: number;
}

/** All available Unicode fraction characters, sorted by value. */
export const fractions: Fraction[];
/** Unicode fraction characters with denominator 3. */
export const thirds: Fraction[];
/** Unicode fraction characters with denominator 4. */
export const quarters: Fraction[];
/** Unicode fraction characters with denominator 5. */
export const fifths: Fraction[];
/** Unicode fraction characters with denominator 6. */
export const sixths: Fraction[];
/** Unicode fraction characters with denominator 8. */
export const eighths: Fraction[];

export {quarters as fourths};

/** Finds the closest Unicode fraction symbol for a given value from all fractions.
 * @param value - A number between 0 and 1.
 * @param useFractionForZero - If true, return a fraction symbol for 0 instead of '0'.
 * @returns The closest Unicode fraction symbol.
 */
export function getFraction(value: number, useFractionForZero?: boolean): string;
/** Finds the closest Unicode fraction symbol from thirds.
 * @param value - A number between 0 and 1.
 * @param useFractionForZero - If true, return a fraction symbol for 0 instead of '0'.
 * @returns The closest Unicode fraction symbol.
 */
export function getThirds(value: number, useFractionForZero?: boolean): string;
/** Finds the closest Unicode fraction symbol from quarters.
 * @param value - A number between 0 and 1.
 * @param useFractionForZero - If true, return a fraction symbol for 0 instead of '0'.
 * @returns The closest Unicode fraction symbol.
 */
export function getQuarters(value: number, useFractionForZero?: boolean): string;
/** Finds the closest Unicode fraction symbol from fifths.
 * @param value - A number between 0 and 1.
 * @param useFractionForZero - If true, return a fraction symbol for 0 instead of '0'.
 * @returns The closest Unicode fraction symbol.
 */
export function getFifths(value: number, useFractionForZero?: boolean): string;
/** Finds the closest Unicode fraction symbol from sixths.
 * @param value - A number between 0 and 1.
 * @param useFractionForZero - If true, return a fraction symbol for 0 instead of '0'.
 * @returns The closest Unicode fraction symbol.
 */
export function getSixths(value: number, useFractionForZero?: boolean): string;
/** Finds the closest Unicode fraction symbol from eighths.
 * @param value - A number between 0 and 1.
 * @param useFractionForZero - If true, return a fraction symbol for 0 instead of '0'.
 * @returns The closest Unicode fraction symbol.
 */
export function getEighths(value: number, useFractionForZero?: boolean): string;

export {getQuarters as getFourths};

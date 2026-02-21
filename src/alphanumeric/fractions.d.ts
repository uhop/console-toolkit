export interface Fraction {
  numerator: number;
  denominator: number;
  symbol: string;
  value: number;
}

export const fractions: Fraction[];
export const thirds: Fraction[];
export const quarters: Fraction[];
export const fifths: Fraction[];
export const sixths: Fraction[];
export const eighths: Fraction[];

export { quarters as fourths };

export function getFraction(value: number, useFractionForZero?: boolean): string;
export function getThirds(value: number, useFractionForZero?: boolean): string;
export function getQuarters(value: number, useFractionForZero?: boolean): string;
export function getFifths(value: number, useFractionForZero?: boolean): string;
export function getSixths(value: number, useFractionForZero?: boolean): string;
export function getEighths(value: number, useFractionForZero?: boolean): string;

export { getQuarters as getFourths };

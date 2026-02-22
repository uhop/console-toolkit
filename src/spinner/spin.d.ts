import {SpinnerBase} from './spinner.js';

/** A spinner argument: frame array, state-to-string function, SpinnerBase instance, or other value. */
type SpinArg = string[] | ((state: string) => string) | SpinnerBase | unknown;

/** Tagged template literal for creating composite spinners from multiple parts.
 * @param strings - Template string parts.
 * @param args - Spinner arguments interpolated between string parts.
 * @returns A composite SpinnerBase.
 */
declare function spin(strings: TemplateStringsArray, ...args: SpinArg[]): SpinnerBase;

export default spin;

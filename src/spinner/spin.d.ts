import {SpinnerBase} from './spinner.js';

type SpinArg = string[] | ((state: string) => string) | SpinnerBase | any;

/** Tagged template literal for creating composite spinners from multiple parts. */
declare function spin(strings: TemplateStringsArray, ...args: SpinArg[]): SpinnerBase;

export default spin;

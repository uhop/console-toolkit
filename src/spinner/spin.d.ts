import { SpinnerBase } from './spinner.js';

type SpinArg = string[] | ((state: string) => string) | SpinnerBase | any;

declare function spin(strings: TemplateStringsArray, ...args: SpinArg[]): SpinnerBase;

export default spin;

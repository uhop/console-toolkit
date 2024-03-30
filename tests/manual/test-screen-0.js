import {log} from '../../src/show.js';
import Screen from '../../src/screen.js';
import {getBgColor, getBrightBgColor, Colors, Commands} from '../../src/sgr.js';
import {newState, RESET_STATE} from '../../src/sgr-state.js';

const screen = new Screen(8, 4);

screen.put(0, 0, '12345678').put(0, 1, '12345678').put(0, 2, '12345678').put(0, 3, '12345678').fillState(0, 0, 8, 4, RESET_STATE);
log(screen);
console.log('==');

screen.fill(2, 1, 4, 2, '*', newState([getBgColor(Colors.RED)]));
log(screen);
console.log('==');

const yellow = newState([getBrightBgColor(Colors.YELLOW)]);
screen.fillState(0, 0, 2, 1, yellow).fillState(6, 3, 2, 1, yellow);
log(screen);
console.log('==');

screen.pad(1, 2);
log(screen);
console.log('==');

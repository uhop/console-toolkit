import {log} from '../../src/show.js';
import Screen from '../../src/screen.js';
import {getBgColor, Colors} from '../../src/sgr.js';
import {newState} from '../../src/sgr-state.js';

const screen = new Screen(8, 4);

screen.put(0, 0, '12345678').put(0, 1, '12345678').put(0, 2, '12345678').put(0, 3, '12345678');
log(screen);
console.log('==');

screen.fill(2, 1, 4, 2, '*', newState([getBgColor(Colors.RED)]));
log(screen);
console.log('==');

import {log} from '../../src/show.js';
import Panel from '../../src/Panel.js';
import {getBgColor, getBgBrightColor, Colors} from '../../src/ansi/sgr.js';
import {newState, RESET_STATE} from '../../src/ansi/sgr-state.js';

const panel = new Panel(8, 4);

panel.put(0, 0, '12345678\n23456781\n34567812\n45678123').fillState(0, 0, 8, 4, RESET_STATE);
log(panel);
console.log('==');

panel.fill(2, 1, 4, 2, '*', newState([getBgColor(Colors.RED)]));
log(panel);
console.log('==');

const yellow = newState([getBgBrightColor(Colors.YELLOW)]);
panel.fillState(0, 0, 2, 1, yellow).fillState(6, 3, 2, 1, yellow);
log(panel);
console.log('==');

panel.pad(1, 2);
log(panel);
console.log('==');

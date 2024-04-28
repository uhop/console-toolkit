import {log} from '../../src/show.js';
import Panel from '../../src/panel.js';
import {getBgColor, getBgBrightColor, Colors} from '../../src/ansi/sgr.js';
import {commandsToState} from '../../src/ansi/sgr-state.js';

const panel = new Panel(8, 4);

panel.put(0, 0, '12345678\n23456781\n34567812\n45678123').fillState(0, 0, 8, 4, {state: null});
log(panel);
console.log('==');

panel.fill(2, 1, 4, 2, '*', commandsToState([getBgColor(Colors.RED)]));
log(panel);
console.log('==');

const yellow = commandsToState([getBgBrightColor(Colors.YELLOW)]);
panel.fillState(0, 0, 2, 1, {state: yellow}).fillState(6, 3, 2, 1, {state: yellow});
log(panel);
console.log('==');

panel.pad(1, 2);
log(panel);
console.log('==');

import Panel from '../../src/panel.js';
import {draw} from './utils.js';

const p = Panel.fromBox(['123', 'ab']);
draw(p, p.clone().transpose(), p.clone().flipH(), p.clone().flipV(), p.clone().rotateRight(), p.clone().rotateLeft());
draw(p.clone().flipH().flipV(), p.clone().rotateRight().rotateRight(), p.clone().rotateLeft().rotateLeft());

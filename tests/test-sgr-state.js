import test from 'tape-six';

import {
  stateTransition,
  stateReverseTransition,
  commandsToState
} from '../src/ansi/sgr-state.js';
import {Commands} from '../src/ansi/sgr.js';

test('SGR state transitions', async t => {
  await t.test('stateReverseTransition: bold without duplicate commands', t => {
    const base = {},
      bold = commandsToState([Commands.BOLD]),
      reverse = stateReverseTransition(base, bold);

    t.ok(reverse.includes(Commands.RESET_BOLD), 'should include RESET_BOLD');
    const resetCount = reverse.filter(c => c === Commands.RESET_BOLD).length;
    t.equal(resetCount, 1, 'RESET_BOLD should appear exactly once');
  });

  await t.test('stateReverseTransition: dim without duplicate commands', t => {
    const base = {},
      dim = commandsToState([Commands.DIM]),
      reverse = stateReverseTransition(base, dim);

    t.ok(reverse.includes(Commands.RESET_DIM), 'should include RESET_DIM');
    const resetCount = reverse.filter(c => c === Commands.RESET_DIM).length;
    t.equal(resetCount, 1, 'RESET_DIM should appear exactly once');
  });

  await t.test('stateReverseTransition: bold+dim to base', t => {
    const base = {},
      boldDim = commandsToState([Commands.BOLD, Commands.DIM]),
      reverse = stateReverseTransition(base, boldDim);

    t.ok(reverse.includes(Commands.RESET_BOLD), 'should include RESET_BOLD');
    const boldCount = reverse.filter(c => c === Commands.BOLD).length;
    const dimCount = reverse.filter(c => c === Commands.DIM).length;
    t.equal(boldCount, 0, 'should not re-apply BOLD');
    t.equal(dimCount, 0, 'should not re-apply DIM');
  });

  await t.test('stateTransition: bold to dim', t => {
    const bold = commandsToState([Commands.BOLD]),
      dim = commandsToState([Commands.DIM]),
      forward = stateTransition(bold, dim);

    t.ok(forward.length > 0, 'should produce commands');
    t.ok(forward.includes(Commands.DIM), 'should include DIM');
  });

  await t.test('stateReverseTransition: bold to dim and back', t => {
    const bold = commandsToState([Commands.BOLD]),
      dim = commandsToState([Commands.DIM]),
      reverse = stateReverseTransition(bold, dim);

    t.ok(reverse.includes(Commands.BOLD), 'should restore BOLD');
  });
});

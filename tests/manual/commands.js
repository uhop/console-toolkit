import style, {s} from '../../src/style.js';
import {draw, show} from './utils.js';

console.log(s`{{bold.bright.cyan}}Supported commands{{reset.all}}\n`);

{
  const names = [style.italic.text('none') + ':'],
    values = ['sample'];
  for (const name of 'bold,dim,italic,underline,blink,rapidBlink,inverse,hidden,strikethrough,overline'.split(',')) {
    names.push(name + ':');
    values.push(style[name].text('sample'));
  }
  draw(names, values);
}

console.log(s`\n{{bold.bright.cyan}}Underline versions{{reset.all}}\n`);

{
  const names = [],
    values = [];
  for (const name of 'underline,doubleUnderline,curlyUnderline'.split(',')) {
    names.push(name + ':');
    values.push(style[name].text('sample'));
  }
  draw(names, values);
}

console.log(s`\n{{bold.bright.cyan}}Underline decoration colors{{reset.all}}\n`);

{
  const names = [style.italic.text('none') + ':', 'bright yellow:', 'bright red:', 'bright green:'],
    values = [
      style.underline.text('sample'),
      style.doubleUnderline.decoration.bright.yellow.text('sample'),
      style.curlyUnderline.decoration.bright.red.text('sample'),
      style.underline.decoration.bright.green.text('sample')
    ];
  draw(names, values);
}

export class SymbolRange {
  constructor(fromSymbol, from = 0, to = 9, inputBase = '0') {
    this.from = from;
    this.to = to;
    this.base = fromSymbol.codePointAt(0) - from;
    this.inputBase = inputBase.codePointAt(0);
  }
  get(i) {
    if (typeof i !== 'number') {
      i = String(i).codePointAt(0) - this.inputBase;
    }
    return this.from <= i && i <= this.to && String.fromCodePoint(this.base + i);
  }
  transcode(s, {missing} = {}) {
    return s.replace(/./g, missing ? m => this.get(m) || missing : m => this.get(m) || m);
  }
};

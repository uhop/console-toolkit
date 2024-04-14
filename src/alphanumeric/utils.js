export class SymbolRange {
  constructor(fromSymbol, from = 0, to = 9, inputBase = '0') {
    this.from = from;
    this.to = to;
    this.base = fromSymbol.codePointAt(0) - from;
    this.inputBase = inputBase.codePointAt(0);
    this.overlay = null;
  }
  get(i) {
    if (this.overlay) {
      const result =
        typeof this.overlay.get == 'function'
          ? this.overlay.get(i)
          : this.overlay[typeof i !== 'number' ? i : String.fromCodePoint(this.inputBase + i)];
      if (result) return result;
    }
    if (typeof i !== 'number') {
      i = String(i).codePointAt(0) - this.inputBase;
    }
    return this.from <= i && i <= this.to && String.fromCodePoint(this.base + i);
  }
  transcode(s, {missing} = {}) {
    return s.replace(/./g, missing ? m => this.get(m) || missing : m => this.get(m) || m);
  }
}

export const transcode = (s, tables, {missing} = {}) => {
  let fn;
  if (typeof tables == 'function') {
    fn = tables;
  } else if (!Array.isArray(tables)) {
    if (typeof tables.transcode == 'function') return tables.transcode(s, {missing});
    fn = m => tables[m];
  } else {
    fn = m => {
      for (const table of tables) {
        const result = typeof table.get == 'function' ? table.get(m) : table[m];
        if (result) return result;
      }
      // return undefined;
    };
  }
  return s.replace(/./g, missing ? m => fn(m) || missing : m => fn(m) || m);
};

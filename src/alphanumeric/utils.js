/** Maps a range of numeric values to Unicode code points for transcoding digits/letters.
 * Supports overlays for custom symbol replacements.
 */
export class SymbolRange {
  /**
   * @param {string} fromSymbol - The Unicode character corresponding to the `from` value.
   * @param {number} [from=0] - Start of the range.
   * @param {number} [to=9] - End of the range (inclusive).
   * @param {string} [inputBase='0'] - The input character corresponding to 0.
   */
  constructor(fromSymbol, from = 0, to = 9, inputBase = '0') {
    this.from = from;
    this.to = to;
    this.base = fromSymbol.codePointAt(0) - from;
    this.inputBase = inputBase.codePointAt(0);
    this.overlay = null;
  }
  /** Gets the transcoded symbol for a value or character.
   * @param {number|string} i - Numeric index or input character.
   * @returns {string|false} The transcoded symbol, or false if out of range.
   */
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
  /** Transcodes a string by replacing each character with its mapped symbol.
   * @param {string} s - The string to transcode.
   * @param {object} [options] - Options.
   * @param {string} [options.missing] - Replacement for unmapped characters.
   * @returns {string} The transcoded string.
   */
  transcode(s, {missing} = {}) {
    return s.replace(/./g, missing ? m => this.get(m) || missing : m => this.get(m) || m);
  }
}

/** Transcodes a string using one or more lookup tables.
 * @param {string} s - The string to transcode.
 * @param {Function|object|Array} tables - A function, object, SymbolRange, or array of them.
 * @param {object} [options] - Options.
 * @param {string} [options.missing] - Replacement for unmapped characters.
 * @returns {string} The transcoded string.
 */
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

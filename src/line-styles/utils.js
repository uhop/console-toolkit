// A table definition matrix should define the following properties:
//   - 't': top row (3 symbols),
//   - 'm': middle row (3 symbols),
//   - 'b': bottom row (3 symbols),
//   - 'v': vertical separators (3 symbols),
//   - 'h': a horizontal separator (1 symbol),
//   - 'w': (optional) width of symbols.
// t/m/b/v lines should have the same width for each corresponding symbol.
// h should be one character long (visually).

// The default value for 'w': 1

export const populateStyle = (tableStyle, tableDefinition, hTheme, vTheme) => {
  const w = tableDefinition.w || 1,
    s = [0, w, w << 1],
    e = [s[0] + w, s[1] + w, s[2] + w],
    theme = (tableStyle[hTheme + '_' + vTheme] = [
      tableDefinition.m.substring(s[1], e[1]),
      tableDefinition.b.substring(s[1], e[1]),
      tableDefinition.t.substring(s[1], e[1]),
      tableDefinition.h.repeat(w),
      tableDefinition.m.substring(s[2], e[2]),
      tableDefinition.b.substring(s[2], e[2]),
      tableDefinition.t.substring(s[2], e[2]),
      tableDefinition.h.repeat(w),
      tableDefinition.m.substring(s[0], e[0]),
      tableDefinition.b.substring(s[0], e[0]),
      tableDefinition.t.substring(s[0], e[0]),
      tableDefinition.h.repeat(w),
      tableDefinition.v.substring(s[1], e[1]),
      tableDefinition.v.substring(s[0], e[0]),
      tableDefinition.v.substring(s[2], e[2])
    ]);
  tableStyle['_w_' + vTheme] = w;
  tableStyle['_h_' + hTheme] = tableDefinition.h;
  tableStyle['_v_' + vTheme] = theme.slice(12); // last vertical symbols
};

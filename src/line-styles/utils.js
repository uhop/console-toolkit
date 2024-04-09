// A table definition matrix should define the following properties:
//   - 't': top row (3 symbols),
//   - 'm': middle row (3 symbols),
//   - 'b': bottom row (3 symbols),
//   - 'v': vertical separators (3 symbols) - left border, internal, right border,
//   - 'h': horizontal separators (3 symbol) - top border, internal, bottom border,
//   - 'w': (optional) width of individual t/m/b/v symbols.
// t/m/b/v lines should have the same width for each symbol.
// h should have 3 symbols of length 1.

// The default value for 'w': 1

export const populateStyle = (tableStyle, tableDefinition, hTheme, vTheme) => {
  const w = tableDefinition.w || 1,
    s = [0, w, w << 1],
    e = [s[0] + w, s[1] + w, s[2] + w],
    theme = (tableStyle['t_' + hTheme + '_' + vTheme] = [
      tableDefinition.m.substring(s[1], e[1]),
      tableDefinition.b.substring(s[1], e[1]),
      tableDefinition.t.substring(s[1], e[1]),
      tableDefinition.h[1].repeat(w),
      tableDefinition.m.substring(s[2], e[2]),
      tableDefinition.b.substring(s[2], e[2]),
      tableDefinition.t.substring(s[2], e[2]),
      tableDefinition.h[2].repeat(w),
      tableDefinition.m.substring(s[0], e[0]),
      tableDefinition.b.substring(s[0], e[0]),
      tableDefinition.t.substring(s[0], e[0]),
      tableDefinition.h[0].repeat(w),
      tableDefinition.v.substring(s[1], e[1]),
      tableDefinition.v.substring(s[0], e[0]),
      tableDefinition.v.substring(s[2], e[2])
    ]);
  tableStyle['w_' + vTheme] = w;
  tableStyle['h_' + hTheme] = [theme[3], theme[7], theme[11]];
  tableStyle['v_' + vTheme] = theme.slice(12); // last vertical symbols
};

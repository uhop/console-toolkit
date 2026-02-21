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

/** Populates a line theme object from a table definition matrix.
 * Sets `t_`, `h_`, `v_`, `w_`, and `f` properties on the lineTheme.
 * @param {object} lineTheme - The line theme object to populate.
 * @param {object} tableDefinition - Definition with `t`, `m`, `b`, `v`, `h`, optional `w` and `f` properties.
 * @param {string} hTheme - Horizontal theme identifier.
 * @param {string} vTheme - Vertical theme identifier.
 */
export const populateTheme = (lineTheme, tableDefinition, hTheme, vTheme) => {
  const w = tableDefinition.w || 1,
    s = [0, w, w << 1],
    e = [s[0] + w, s[1] + w, s[2] + w],
    theme = (lineTheme['t_' + hTheme + '_' + vTheme] = [
      tableDefinition.m.substring(s[1], e[1]),
      tableDefinition.t.substring(s[1], e[1]), // before
      tableDefinition.b.substring(s[1], e[1]), // after
      tableDefinition.h[1].repeat(w),
      tableDefinition.m.substring(s[0], e[0]),
      tableDefinition.t.substring(s[0], e[0]), // before
      tableDefinition.b.substring(s[0], e[0]), // after
      tableDefinition.h[0].repeat(w),
      tableDefinition.m.substring(s[2], e[2]),
      tableDefinition.t.substring(s[2], e[2]), // before
      tableDefinition.b.substring(s[2], e[2]), // after
      tableDefinition.h[2].repeat(w),
      tableDefinition.v.substring(s[1], e[1]),
      tableDefinition.v.substring(s[0], e[0]), // before
      tableDefinition.v.substring(s[2], e[2]) // after
    ]);
  lineTheme['h_' + hTheme] = [tableDefinition.h[1], tableDefinition.h[0], tableDefinition.h[2]];
  lineTheme['v_' + vTheme] = theme.slice(12);
  lineTheme['w_' + vTheme] = w;
  lineTheme.f = tableDefinition.f || ' ';
};

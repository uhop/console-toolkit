export const drawRect = (bmp, x0, y0, x1, y1, value = 1) => {
  if (x1 < x0) [x0, x1] = [x1, x0];
  if (y1 < y0) [y0, y1] = [y1, y0];

  let indexL = bmp.getWordIndex(x0, y0),
    indexR = bmp.getWordIndex(x1, y0);

  const mask0 = bmp.getWordMask(x0, 0),
    mask1 = bmp.getWordMask(x1, 0),
    rowMask = (1 << bmp.blockWidth) - 1,
    firstRows = y0 % bmp.blockHeight,
    firstRowShift = bmp.blockWidth * firstRows,
    height = y1 - y0 + 1;

  if (firstRows + (y1 - y0) < bmp.blockHeight) {
    if (indexL === indexR) {
      // our rows are in a word: calculate a block mask
      const mask = ~(mask0 - 1) & (mask1 | (mask1 - 1));

      // apply the mask to the last incomplete block
      let fullMask = mask;
      for (let i = 1; i < height; ++i) fullMask = (fullMask << bmp.blockWidth) | mask;
      fullMask <<= firstRowShift;

      bmp.bitmap[indexL] =
        value > 0
          ? bmp.bitmap[indexL] | fullMask
          : value < 0
          ? bmp.bitmap[indexL] ^ fullMask
          : bmp.bitmap[indexL] & ~fullMask;
      return;
    }

    // our rows are all in one block vertically but over several words
    // calculate a left mask and a right masks
    const maskL = ~(mask0 - 1) & rowMask,
      maskR = mask1 | (mask1 - 1);

    // calculate masks
    let fullMaskL = maskL,
      fullMaskR = maskR,
      fullMaskM = ((1 << (bmp.blockWidth * height)) - 1) << firstRowShift;
    for (let i = 1; i < height; ++i) {
      fullMaskL = (fullMaskL << bmp.blockWidth) | maskL;
      fullMaskR = (fullMaskR << bmp.blockWidth) | maskR;
    }
    fullMaskL <<= firstRowShift;
    fullMaskR <<= firstRowShift;

    // apply masks
    bmp.bitmap[indexL] =
      value > 0
        ? bmp.bitmap[indexL] | fullMaskL
        : value < 0
        ? bmp.bitmap[indexL] ^ fullMaskL
        : bmp.bitmap[indexL] & ~fullMaskL;
    for (let index = indexL + 1; index < indexR; ++index)
      bmp.bitmap[index] =
        value > 0
          ? bmp.bitmap[index] | fullMaskM
          : value < 0
          ? bmp.bitmap[index] ^ fullMaskM
          : bmp.bitmap[index] & ~fullMaskM;
    bmp.bitmap[indexR] =
      value > 0
        ? bmp.bitmap[indexR] | fullMaskR
        : value < 0
        ? bmp.bitmap[indexR] ^ fullMaskR
        : bmp.bitmap[indexR] & ~fullMaskR;
    return;
  }

  const rowsOverFullBlock = height - (firstRows ? bmp.blockHeight - firstRows : 0),
    fullLines = Math.floor(rowsOverFullBlock / bmp.blockHeight),
    lastRows = rowsOverFullBlock % bmp.blockHeight;

  if (indexL === indexR) {
    // our row is confined in a word: calculate a row mask
    const mask = ~(mask0 - 1) & (mask1 | (mask1 - 1));
    if (firstRows) {
      // apply the mask to the first incomplete block
      let fullMask = mask;
      for (let i = 1, n = bmp.blockHeight - firstRows; i < n; ++i) fullMask = (fullMask << bmp.blockWidth) | mask;
      fullMask <<= firstRowShift;
      bmp.bitmap[indexL] =
        value > 0
          ? bmp.bitmap[indexL] | fullMask
          : value < 0
          ? bmp.bitmap[indexL] ^ fullMask
          : bmp.bitmap[indexL] & ~fullMask;
      indexL += bmp.lineSize;
    }
    if (fullLines) {
      // calculate a mask for full blocks
      let fullMask = mask;
      for (let i = 1; i < bmp.blockHeight; ++i) fullMask = (fullMask << bmp.blockWidth) | mask;
      // apply the mask to full blocks
      for (let i = 0; i < fullLines; ++i, indexL += bmp.lineSize)
        bmp.bitmap[indexL] =
          value > 0
            ? bmp.bitmap[indexL] | fullMask
            : value < 0
            ? bmp.bitmap[indexL] ^ fullMask
            : bmp.bitmap[indexL] & ~fullMask;
    }
    if (lastRows) {
      // apply the mask to the last incomplete block
      let fullMask = mask;
      for (let i = 1; i < lastRows; ++i) fullMask = (fullMask << bmp.blockWidth) | mask;
      bmp.bitmap[indexL] =
        value > 0
          ? bmp.bitmap[indexL] | fullMask
          : value < 0
          ? bmp.bitmap[indexL] ^ fullMask
          : bmp.bitmap[indexL] & ~fullMask;
    }
    return;
  }

  // calculate a left mask and a right masks
  const maskL = ~(mask0 - 1) & rowMask,
    maskR = mask1 | (mask1 - 1);

  if (firstRows) {
    // apply the mask to the first incomplete block
    let fullMaskL = maskL,
      fullMaskR = maskR,
      fullMaskM = ((1 << (bmp.blockWidth * (bmp.blockHeight - firstRows))) - 1) << firstRowShift;
    for (let i = 1, n = bmp.blockHeight - firstRows; i < n; ++i) {
      fullMaskL = (fullMaskL << bmp.blockWidth) | maskL;
      fullMaskR = (fullMaskR << bmp.blockWidth) | maskR;
    }
    fullMaskL <<= firstRowShift;
    fullMaskR <<= firstRowShift;
    bmp.bitmap[indexL] =
      value > 0
        ? bmp.bitmap[indexL] | fullMaskL
        : value < 0
        ? bmp.bitmap[indexL] ^ fullMaskL
        : bmp.bitmap[indexL] & ~fullMaskL;
    for (let index = indexL + 1; index < indexR; ++index)
      bmp.bitmap[index] =
        value > 0
          ? bmp.bitmap[index] | fullMaskM
          : value < 0
          ? bmp.bitmap[index] ^ fullMaskM
          : bmp.bitmap[index] & ~fullMaskM;
    bmp.bitmap[indexR] =
      value > 0
        ? bmp.bitmap[indexR] | fullMaskR
        : value < 0
        ? bmp.bitmap[indexR] ^ fullMaskR
        : bmp.bitmap[indexR] & ~fullMaskR;
    indexL += bmp.lineSize;
    indexR += bmp.lineSize;
  }

  if (fullLines) {
    // calculate masks
    let fullMaskL = maskL,
      fullMaskR = maskR;
    for (let i = 1; i < bmp.blockHeight; ++i) {
      fullMaskL = (fullMaskL << bmp.blockWidth) | maskL;
      fullMaskR = (fullMaskR << bmp.blockWidth) | maskR;
    }
    // apply masks
    for (let i = 0; i < fullLines; ++i, indexL += bmp.lineSize, indexR += bmp.lineSize) {
      bmp.bitmap[indexL] =
        value > 0
          ? bmp.bitmap[indexL] | fullMaskL
          : value < 0
          ? bmp.bitmap[indexL] ^ fullMaskL
          : bmp.bitmap[indexL] & ~fullMaskL;
      for (let index = indexL + 1; index < indexR; ++index)
        bmp.bitmap[index] = value > 0 ? ~0 : value < 0 ? ~bmp.bitmap[index] : 0;
      bmp.bitmap[indexR] =
        value > 0
          ? bmp.bitmap[indexR] | fullMaskR
          : value < 0
          ? bmp.bitmap[indexR] ^ fullMaskR
          : bmp.bitmap[indexR] & ~fullMaskR;
    }
  }

  if (lastRows) {
    // apply the mask to an incomplete block
    let fullMaskL = maskL,
      fullMaskR = maskR,
      fullMaskM = (1 << (bmp.blockWidth * lastRows)) - 1;
    for (let i = 1; i < lastRows; ++i) {
      fullMaskL = (fullMaskL << bmp.blockWidth) | maskL;
      fullMaskR = (fullMaskR << bmp.blockWidth) | maskR;
    }
    bmp.bitmap[indexL] =
      value > 0
        ? bmp.bitmap[indexL] | fullMaskL
        : value < 0
        ? bmp.bitmap[indexL] ^ fullMaskL
        : bmp.bitmap[indexL] & ~fullMaskL;
    for (let index = indexL + 1; index < indexR; ++index)
      bmp.bitmap[index] =
        value > 0
          ? bmp.bitmap[index] | fullMaskM
          : value < 0
          ? bmp.bitmap[index] ^ fullMaskM
          : bmp.bitmap[index] & ~fullMaskM;
    bmp.bitmap[indexR] =
      value > 0
        ? bmp.bitmap[indexR] | fullMaskR
        : value < 0
        ? bmp.bitmap[indexR] ^ fullMaskR
        : bmp.bitmap[indexR] & ~fullMaskR;
  }
};

export default drawRect;

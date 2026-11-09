const CELL = 220;
const TAB = 0.105;
/** How far a tab can reach past its cell, so every photo is drawn large enough to fill it. */
const REACH = 3 * TAB * CELL;
const COLS = 3;
const ROWS = 2;

interface Photo {
  src: string;
  width: number;
  height: number;
  /** Point of the photo to keep centred, from 0 to 1. */
  focusX: number;
  focusY: number;
}

const photo = (name: string, width: number, height: number, focusX = 0.5, focusY = 0.5): Photo => ({
  src: `images/${name}.webp`,
  width,
  height,
  focusX,
  focusY,
});

/** One photo per slot; a slot with span 2 runs one photo across two pieces. */
const SLOTS: { photo: Photo; col: number; row: number; span: number }[] = [
  { photo: photo('team-banner', 738, 414, 0.51, 0.55), col: 0, row: 0, span: 1 },
  { photo: photo('team-table', 230, 220), col: 1, row: 0, span: 1 },
  { photo: photo('team-celebrate', 230, 220, 0.5, 0.45), col: 2, row: 0, span: 1 },
  { photo: photo('team-board', 230, 220), col: 0, row: 1, span: 1 },
  { photo: photo('team-all', 638, 480, 0.5, 0.66), col: 1, row: 1, span: 2 },
];

type Point = [number, number];
type Side = 1 | -1;

/** One jigsaw edge from a to b. Side 1 bulges outward on a clockwise path, -1 cuts inward. */
function edge([ax, ay]: Point, [bx, by]: Point, side: Side) {
  const ux = (bx - ax) / CELL;
  const uy = (by - ay) / CELL;
  const at = (along: number, out: number) => {
    const a = along * CELL;
    const o = out * CELL * side;
    return `${(ax + ux * a + uy * o).toFixed(1)} ${(ay + uy * a - ux * o).toFixed(1)}`;
  };
  return (
    `C${at(0.2, 0)} ${at(0.5, -TAB)} ${at(0.5 - TAB, TAB)}` +
    `C${at(0.5 - 2 * TAB, 3 * TAB)} ${at(0.5 + 2 * TAB, 3 * TAB)} ${at(0.5 + TAB, TAB)}` +
    `C${at(0.5, -TAB)} ${at(0.8, 0)} ${at(1, 0)}`
  );
}

/** A shared seam: the piece on its left or top gets this side, its neighbour gets the opposite. */
const verticalSeam = (col: number, row: number): Side => ((col + row) % 2 === 0 ? 1 : -1);
const horizontalSeam = (col: number, row: number): Side => ((col + row) % 2 === 0 ? 1 : -1);

function piecePath(col: number, row: number) {
  const x = col * CELL;
  const y = row * CELL;
  const a: Point = [x, y];
  const b: Point = [x + CELL, y];
  const c: Point = [x + CELL, y + CELL];
  const d: Point = [x, y + CELL];
  const top = row === 0 ? (col % 2 === 0 ? 1 : -1) : (-horizontalSeam(col, row - 1) as Side);
  const right = col === COLS - 1 ? (row % 2 === 0 ? -1 : 1) : verticalSeam(col, row);
  const bottom = row === ROWS - 1 ? (col % 2 === 0 ? -1 : 1) : horizontalSeam(col, row);
  const left = col === 0 ? (row % 2 === 0 ? -1 : 1) : (-verticalSeam(col - 1, row) as Side);
  return `M${x} ${y}${edge(a, b, top)}${edge(b, c, right)}${edge(c, d, bottom)}${edge(d, a, left)}Z`;
}

/** Sizes a photo to cover a slot and all its tabs, kept centred on its focus point. */
function placePhoto({ width, height, focusX, focusY }: Photo, col: number, row: number, span: number) {
  const boxX = col * CELL - REACH;
  const boxY = row * CELL - REACH;
  const boxW = span * CELL + 2 * REACH;
  const boxH = CELL + 2 * REACH;
  const scale = Math.max(boxW / width, boxH / height);
  const w = width * scale;
  const h = height * scale;
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
  return {
    x: clamp(boxX + boxW / 2 - focusX * w, boxX + boxW - w, boxX),
    y: clamp(boxY + boxH / 2 - focusY * h, boxY + boxH - h, boxY),
    width: w,
    height: h,
  };
}

const PIECES = SLOTS.flatMap((slot) =>
  Array.from({ length: slot.span }, (_, offset) => ({
    d: piecePath(slot.col + offset, slot.row),
    src: slot.photo.src,
    place: placePhoto(slot.photo, slot.col, slot.row, slot.span),
  })),
);

const MARGIN = REACH + 4;

export function CareersPuzzle() {
  return (
    <svg
      className="careers__puzzle"
      viewBox={`${-MARGIN} ${-MARGIN} ${COLS * CELL + 2 * MARGIN} ${ROWS * CELL + 2 * MARGIN}`}
      role="img"
      aria-label="Decipher Financials team members at the office, shown as six interlocking puzzle pieces."
    >
      {PIECES.map((piece, index) => (
        <g key={index}>
          <clipPath id={`careers-piece-${index}`}>
            <path d={piece.d} />
          </clipPath>
          <image href={piece.src} {...piece.place} clipPath={`url(#careers-piece-${index})`} />
          <path d={piece.d} fill="none" stroke="#fff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </g>
      ))}
    </svg>
  );
}

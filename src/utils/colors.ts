export type HslaColor = {
  h: number;
  s: number;
  l: number;
  a: number;
};

export type RgbaColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

/**
 * Converts an HSL color value to RGB.
 *
 * Conversion formula adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 *
 * Assumes  h as an angle in [0,360] and s,l in [0,1]
 * returns r,g,b in [0,1].
 */
export const hsl2rgb = ({ h, s, l, a }: HslaColor) => {
  if (s > 1) {
    s = s / 100;
  }
  if (l > 1) {
    l = l / 100;
  }
  const b = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12) => l - b * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return { r: f(0), g: f(8), b: f(4), a };
};

export const rgb2hex = ({ r, g, b, a }: RgbaColor): string =>
  `#${[r, g, b]
    .map((x) =>
      Math.round(x * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}${Math.floor(a * 255)
    .toString(16)
    .padStart(2, "0")}`.toUpperCase();

export const hsl2hex = (color: HslaColor): string => rgb2hex(hsl2rgb(color));

export const hue2hsl = (hue: number, override?: Partial<Omit<HslaColor, "h">>): HslaColor => ({
  h: hue,
  s: override?.s ?? 100,
  l: override?.l ?? 50,
  a: override?.a ?? 1,
});

export const hue2hex = (hue: number, override?: Partial<Omit<HslaColor, "h">>) => hsl2hex(hue2hsl(hue, override));

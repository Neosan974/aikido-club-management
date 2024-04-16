import { hsl2rgb, rgb2hex, hsl2hex, hue2hex, hue2hsl } from "@/utils/colors";
import { describe, it, expect } from "vitest";

describe("rgb2hex", () => {
  it("converts black", () => {
    expect(rgb2hex({ r: 0, g: 0, b: 0, a: 1 })).toBe("#000000FF");
  });

  it("converts white", () => {
    expect(rgb2hex({ r: 1, g: 1, b: 1, a: 1 })).toBe("#FFFFFFFF");
  });

  it("converts red", () => {
    expect(rgb2hex({ r: 1, g: 0, b: 0, a: 1 })).toBe("#FF0000FF");
  });

  it("converts lime", () => {
    expect(rgb2hex({ r: 0, g: 1, b: 0, a: 1 })).toBe("#00FF00FF");
  });

  it("converts blue", () => {
    expect(rgb2hex({ r: 0, g: 0, b: 1, a: 1 })).toBe("#0000FFFF");
  });

  it("converts with half opacity", () => {
    expect(rgb2hex({ r: 1, g: 0, b: 0, a: 0.5 })).toBe("#FF00007F");
  });

  it("converts with zero opacity", () => {
    expect(rgb2hex({ r: 1, g: 0, b: 0, a: 0 })).toBe("#FF000000");
  });
});

describe("hsl2rgb", () => {
  it("converts black", () => {
    expect(hsl2rgb({ h: 0, s: 0, l: 0, a: 1 })).toEqual({ r: 0, g: 0, b: 0, a: 1 });
  });

  it("converts white", () => {
    expect(hsl2rgb({ h: 0, s: 0, l: 1, a: 1 })).toEqual({ r: 1, g: 1, b: 1, a: 1 });
  });

  it("converts red", () => {
    expect(hsl2rgb({ h: 0, s: 1, l: 0.5, a: 1 })).toEqual({ r: 1, g: 0, b: 0, a: 1 });
  });

  it("converts lime", () => {
    expect(hsl2rgb({ h: 120, s: 1, l: 0.5, a: 1 })).toEqual({ r: 0, g: 1, b: 0, a: 1 });
  });

  it("converts blue", () => {
    expect(hsl2rgb({ h: 240, s: 1, l: 0.5, a: 1 })).toEqual({ r: 0, g: 0, b: 1, a: 1 });
  });

  it("converts with half opacity", () => {
    expect(hsl2rgb({ h: 0, s: 1, l: 0.5, a: 0.5 })).toEqual({ r: 1, g: 0, b: 0, a: 0.5 });
  });

  it("converts with zero opacity", () => {
    expect(hsl2rgb({ h: 0, s: 1, l: 0.5, a: 0 })).toEqual({ r: 1, g: 0, b: 0, a: 0 });
  });
});

describe("hsl2hex", () => {
  it("converts black", () => {
    expect(hsl2hex({ h: 0, s: 0, l: 0, a: 1 })).toBe("#000000FF");
  });

  it("converts white", () => {
    expect(hsl2hex({ h: 0, s: 0, l: 1, a: 1 })).toBe("#FFFFFFFF");
  });

  it("converts red", () => {
    expect(hsl2hex({ h: 0, s: 1, l: 0.5, a: 1 })).toBe("#FF0000FF");
  });

  it("converts lime", () => {
    expect(hsl2hex({ h: 120, s: 1, l: 0.5, a: 1 })).toBe("#00FF00FF");
  });

  it("converts blue", () => {
    expect(hsl2hex({ h: 240, s: 1, l: 0.5, a: 1 })).toBe("#0000FFFF");
  });

  it("converts with half opacity", () => {
    expect(hsl2hex({ h: 0, s: 1, l: 0.5, a: 0.5 })).toBe("#FF00007F");
  });

  it("converts with zero opacity", () => {
    expect(hsl2hex({ h: 0, s: 1, l: 0.5, a: 0 })).toBe("#FF000000");
  });
});

describe("hue2hsl", () => {
  it("returns default saturation, lightness and opacity", () => {
    expect(hue2hsl(0)).toEqual({ h: 0, s: 100, l: 50, a: 1 });
  });

  it("allows overriding saturation", () => {
    expect(hue2hsl(0, { s: 50 })).toEqual({ h: 0, s: 50, l: 50, a: 1 });
  });

  it("allows overriding lightness", () => {
    expect(hue2hsl(0, { l: 25 })).toEqual({ h: 0, s: 100, l: 25, a: 1 });
  });

  it("allows overriding opacity", () => {
    expect(hue2hsl(0, { a: 0.5 })).toEqual({ h: 0, s: 100, l: 50, a: 0.5 });
  });

  it("allows overriding multiple values", () => {
    expect(hue2hsl(0, { s: 25, l: 75, a: 0.25 })).toEqual({ h: 0, s: 25, l: 75, a: 0.25 });
  });
});

describe("hue2hex", () => {
  it("converts hue 0 to red", () => {
    expect(hue2hex(0)).toEqual("#FF0000FF");
  });

  it("converts hue 120 to lime", () => {
    expect(hue2hex(120)).toEqual("#00FF00FF");
  });

  it("converts hue 240 to blue", () => {
    expect(hue2hex(240)).toEqual("#0000FFFF");
  });

  it("allows override saturation", () => {
    expect(hue2hex(0, { s: 50 })).toEqual("#BF4040FF");
  });

  it("allows override lightness", () => {
    expect(hue2hex(0, { l: 25 })).toEqual("#800000FF");
  });

  it("allows override opacity", () => {
    expect(hue2hex(0, { a: 0.5 })).toEqual("#FF00007F");
  });
});

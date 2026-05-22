"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

export type QRPattern =
  | "square"
  | "dots"
  | "rounded"
  | "extra-rounded"
  | "classy"
  | "classy-rounded"
  | "diamond"
  | "star"
  | "cross"
  | "mosaic";

export type QREyeStyle = "square" | "rounded" | "circle" | "leaf" | "shield" | "diamond";

export interface QRCustomization {
  pattern: QRPattern;
  eyeStyle: QREyeStyle;
  primaryColor: string;
  backgroundColor: string;
  logoUrl?: string;
  logoSize?: number;
  frameStyle?: "none" | "banner" | "box" | "balloon" | "circular";
  frameText?: string;
  template?: string;
}

export interface AdvancedQROptions {
  value: string;
  size?: number;
  customization?: QRCustomization;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
}

export interface AdvancedQRResult {
  dataUrl: string;
  loading: boolean;
  error: string | null;
  downloadPng: (filename?: string) => void;
  downloadSvg: (filename?: string) => void;
}

export const defaultCustomization: QRCustomization = {
  pattern: "square",
  eyeStyle: "square",
  primaryColor: "#0f172a",
  backgroundColor: "#ffffff",
  logoSize: 0.2,
  frameStyle: "none",
};

// ─── Eye region detection helpers ────────────────────────────────────────────

/**
 * Returns true if the module at (col, row) is part of one of the 3 finder
 * pattern eyes (the 7×7 squares in the three corners).
 */
function isEyeModule(col: number, row: number, matrixSize: number): boolean {
  // Top-left eye: cols 0-6, rows 0-6
  if (col < 7 && row < 7) return true;
  // Top-right eye: cols (size-7) to (size-1), rows 0-6
  if (col >= matrixSize - 7 && row < 7) return true;
  // Bottom-left eye: cols 0-6, rows (size-7) to (size-1)
  if (col < 7 && row >= matrixSize - 7) return true;
  return false;
}

// ─── Module drawing ───────────────────────────────────────────────────────────

function drawModule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number, // module pixel size
  pattern: QRPattern
) {
  const pad = s * 0.05; // tiny gap between modules for non-square styles
  switch (pattern) {
    case "dots":
      ctx.beginPath();
      ctx.arc(x + s / 2, y + s / 2, s / 2 - pad, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "rounded":
      fillRoundRect(ctx, x + pad, y + pad, s - pad * 2, s - pad * 2, s * 0.25);
      break;

    case "extra-rounded":
      fillRoundRect(ctx, x + pad, y + pad, s - pad * 2, s - pad * 2, s * 0.48);
      break;

    case "classy": {
      // Plus / cross shape
      const t = s * 0.28;
      ctx.fillRect(x + t, y, s - t * 2, s);
      ctx.fillRect(x, y + t, s, s - t * 2);
      break;
    }

    case "classy-rounded": {
      const t = s * 0.28;
      fillRoundRect(ctx, x + t, y, s - t * 2, s, s * 0.15);
      fillRoundRect(ctx, x, y + t, s, s - t * 2, s * 0.15);
      break;
    }

    case "diamond": {
      const cx = x + s / 2;
      const cy = y + s / 2;
      const r = s / 2 - pad;
      ctx.beginPath();
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx + r, cy);
      ctx.lineTo(cx, cy + r);
      ctx.lineTo(cx - r, cy);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "star": {
      const cx = x + s / 2;
      const cy = y + s / 2;
      const outerR = s / 2 - pad;
      const innerR = outerR * 0.45;
      const points = 4;
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        else ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
      }
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "cross": {
      // Thin cross / plus
      const arm = s * 0.22;
      ctx.fillRect(x + arm, y, s - arm * 2, s);
      ctx.fillRect(x, y + arm, s, s - arm * 2);
      break;
    }

    case "mosaic": {
      // Small square offset to create a mosaic / tile feel
      const inset = s * 0.12;
      fillRoundRect(ctx, x + inset, y + inset, s - inset * 2, s - inset * 2, s * 0.1);
      break;
    }

    default: // "square"
      ctx.fillRect(x, y, s, s);
  }
}

// ─── Eye drawing ──────────────────────────────────────────────────────────────

/**
 * Draws one complete finder-pattern eye.
 * @param ctx canvas context
 * @param ox  pixel x of the top-left corner of the 7×7 eye region
 * @param oy  pixel y of the top-left corner of the 7×7 eye region
 * @param s   pixel size of one module
 * @param style eye style
 * @param dark  dark colour
 * @param light light / background colour
 */
function drawEye(
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  s: number,
  style: QREyeStyle,
  dark: string,
  light: string
) {
  const total = s * 7;
  const outerW = total;
  const borderW = s; // 1-module border
  const gapW = s;    // 1-module gap
  const innerW = s * 3; // 3×3 inner dot
  const innerOff = s * 2; // offset to inner dot

  ctx.fillStyle = light;
  ctx.fillRect(ox, oy, total, total);

  ctx.fillStyle = dark;

  switch (style) {
    case "circle": {
      // Outer ring (circle)
      ctx.beginPath();
      ctx.arc(ox + total / 2, oy + total / 2, total / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = light;
      ctx.beginPath();
      ctx.arc(ox + total / 2, oy + total / 2, total / 2 - s, 0, Math.PI * 2);
      ctx.fill();
      // Inner dot (circle)
      ctx.fillStyle = dark;
      ctx.beginPath();
      ctx.arc(ox + total / 2, oy + total / 2, innerW / 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "rounded": {
      const r = s * 1.2;
      // Outer rounded square
      fillRoundRect(ctx, ox, oy, total, total, r);
      ctx.fillStyle = light;
      fillRoundRect(ctx, ox + borderW, oy + borderW, total - borderW * 2, total - borderW * 2, r * 0.6);
      // Inner dot rounded
      ctx.fillStyle = dark;
      fillRoundRect(ctx, ox + innerOff, oy + innerOff, innerW, innerW, s * 0.5);
      break;
    }

    case "leaf": {
      // Outer: top-left corner rounded only
      fillRoundRectCorners(ctx, ox, oy, total, total, [s * 2, s * 0.3, s * 2, s * 0.3]);
      ctx.fillStyle = light;
      fillRoundRectCorners(ctx, ox + borderW, oy + borderW, total - borderW * 2, total - borderW * 2, [s * 1.2, 0, s * 1.2, 0]);
      ctx.fillStyle = dark;
      fillRoundRectCorners(ctx, ox + innerOff, oy + innerOff, innerW, innerW, [s * 0.8, 0, s * 0.8, 0]);
      break;
    }

    case "shield": {
      // Pentagon / shield shape for outer
      const hw = total / 2;
      ctx.beginPath();
      ctx.moveTo(ox, oy + s);
      ctx.lineTo(ox + s, oy);
      ctx.lineTo(ox + total - s, oy);
      ctx.lineTo(ox + total, oy + s);
      ctx.lineTo(ox + total, oy + total);
      ctx.lineTo(ox, oy + total);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = light;
      ctx.beginPath();
      ctx.moveTo(ox + borderW, oy + borderW + s * 0.3);
      ctx.lineTo(ox + borderW + s * 0.5, oy + borderW);
      ctx.lineTo(ox + total - borderW - s * 0.5, oy + borderW);
      ctx.lineTo(ox + total - borderW, oy + borderW + s * 0.3);
      ctx.lineTo(ox + total - borderW, oy + total - borderW);
      ctx.lineTo(ox + borderW, oy + total - borderW);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = dark;
      fillRoundRect(ctx, ox + innerOff, oy + innerOff, innerW, innerW, s * 0.3);
      break;
    }

    case "diamond": {
      const cx = ox + total / 2;
      const cy = oy + total / 2;
      // Outer diamond
      ctx.beginPath();
      ctx.moveTo(cx, oy);
      ctx.lineTo(ox + total, cy);
      ctx.lineTo(cx, oy + total);
      ctx.lineTo(ox, cy);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = light;
      const ir = total / 2 - s;
      ctx.beginPath();
      ctx.moveTo(cx, oy + s);
      ctx.lineTo(ox + total - s, cy);
      ctx.lineTo(cx, oy + total - s);
      ctx.lineTo(ox + s, cy);
      ctx.closePath();
      ctx.fill();
      // Inner dot diamond
      ctx.fillStyle = dark;
      const dr = innerW / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy - dr);
      ctx.lineTo(cx + dr, cy);
      ctx.lineTo(cx, cy + dr);
      ctx.lineTo(cx - dr, cy);
      ctx.closePath();
      ctx.fill();
      break;
    }

    default: { // "square"
      ctx.fillRect(ox, oy, total, total);
      ctx.fillStyle = light;
      ctx.fillRect(ox + borderW, oy + borderW, total - borderW * 2, total - borderW * 2);
      ctx.fillStyle = dark;
      ctx.fillRect(ox + innerOff, oy + innerOff, innerW, innerW);
    }
  }
}

// ─── Canvas utilities ─────────────────────────────────────────────────────────

function fillRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  const clampedR = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + clampedR, y);
  ctx.lineTo(x + w - clampedR, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + clampedR);
  ctx.lineTo(x + w, y + h - clampedR);
  ctx.quadraticCurveTo(x + w, y + h, x + w - clampedR, y + h);
  ctx.lineTo(x + clampedR, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - clampedR);
  ctx.lineTo(x, y + clampedR);
  ctx.quadraticCurveTo(x, y, x + clampedR, y);
  ctx.closePath();
  ctx.fill();
}

/** Per-corner radii: [topLeft, topRight, bottomRight, bottomLeft] */
function fillRoundRectCorners(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  radii: [number, number, number, number]
) {
  const [tl, tr, br, bl] = radii.map((r) => Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  ctx.lineTo(x + bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
  ctx.fill();
}

// ─── Frame drawing ────────────────────────────────────────────────────────────

function drawFrame(
  ctx: CanvasRenderingContext2D,
  qrSize: number,
  frameH: number,
  customization: QRCustomization
) {
  const { primaryColor, backgroundColor, frameStyle, frameText } = customization;
  const frameY = qrSize;
  const w = qrSize;

  ctx.fillStyle = primaryColor;

  switch (frameStyle) {
    case "banner":
      ctx.fillRect(0, frameY, w, frameH);
      break;

    case "box":
      fillRoundRect(ctx, 12, frameY + 10, w - 24, frameH - 20, 12);
      break;

    case "balloon": {
      // Triangle pointer
      ctx.beginPath();
      ctx.moveTo(w / 2 - 14, frameY);
      ctx.lineTo(w / 2, frameY - 14);
      ctx.lineTo(w / 2 + 14, frameY);
      ctx.closePath();
      ctx.fill();
      fillRoundRect(ctx, 12, frameY + 2, w - 24, frameH - 14, 14);
      break;
    }

    case "circular": {
      const rx = w / 2;
      const ry = frameH / 2 - 4;
      ctx.beginPath();
      ctx.ellipse(w / 2, frameY + frameH / 2, rx - 10, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  if (frameText) {
    ctx.fillStyle = backgroundColor;
    ctx.font = `bold ${Math.round(frameH * 0.32)}px system-ui, -apple-system, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(frameText, w / 2, frameY + frameH / 2, w - 32);
  }
}

// ─── Logo overlay ─────────────────────────────────────────────────────────────

async function overlayLogo(
  ctx: CanvasRenderingContext2D,
  qrSize: number,
  logoUrl: string,
  logoFraction: number
) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const logoSide = qrSize * logoFraction;
      const lx = (qrSize - logoSide) / 2;
      const ly = (qrSize - logoSide) / 2;
      const pad = logoSide * 0.12;

      // White rounded background
      ctx.fillStyle = "#ffffff";
      fillRoundRect(ctx, lx - pad, ly - pad, logoSide + pad * 2, logoSide + pad * 2, pad * 1.5);

      ctx.drawImage(img, lx, ly, logoSide, logoSide);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = logoUrl;
  });
}

// ─── Main hook ────────────────────────────────────────────────────────────────

export function useAdvancedQRCode({
  value,
  size = 400,
  customization = defaultCustomization,
  errorCorrectionLevel = "H",
}: AdvancedQROptions): AdvancedQRResult {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const latestDataUrl = useRef<string>("");

  useEffect(() => {
    if (!value.trim()) {
      setDataUrl("");
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const generate = async () => {
      try {
        // 1. Get the raw QR matrix (boolean[][])
        const qrData = QRCode.create(value, { errorCorrectionLevel });
        const matrix = qrData.modules;
        const matrixSize = matrix.size; // number of modules per side

        const MARGIN = 2; // modules of quiet zone
        const totalModules = matrixSize + MARGIN * 2;
        const moduleSize = size / totalModules; // pixels per module

        const frameH =
          customization.frameStyle && customization.frameStyle !== "none" && customization.frameText
            ? Math.round(size * 0.18)
            : 0;

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size + frameH;
        const ctx = canvas.getContext("2d")!;

        // 2. Background
        ctx.fillStyle = customization.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 3. Draw data modules (skip eye regions)
        ctx.fillStyle = customization.primaryColor;
        for (let row = 0; row < matrixSize; row++) {
          for (let col = 0; col < matrixSize; col++) {
            if (!matrix.get(col, row)) continue; // light module
            if (isEyeModule(col, row, matrixSize)) continue; // handled separately

            const px = (col + MARGIN) * moduleSize;
            const py = (row + MARGIN) * moduleSize;
            drawModule(ctx, px, py, moduleSize, customization.pattern);
          }
        }

        // 4. Draw the three finder-pattern eyes
        const eyePositions = [
          { col: 0, row: 0 },                          // top-left
          { col: matrixSize - 7, row: 0 },             // top-right
          { col: 0, row: matrixSize - 7 },             // bottom-left
        ];

        for (const { col, row } of eyePositions) {
          const px = (col + MARGIN) * moduleSize;
          const py = (row + MARGIN) * moduleSize;
          drawEye(
            ctx, px, py, moduleSize,
            customization.eyeStyle,
            customization.primaryColor,
            customization.backgroundColor
          );
        }

        // 5. Logo overlay
        if (customization.logoUrl) {
          await overlayLogo(ctx, size, customization.logoUrl, customization.logoSize ?? 0.2);
        }

        // 6. Frame
        if (frameH > 0) {
          drawFrame(ctx, size, frameH, customization);
        }

        if (!cancelled) {
          const url = canvas.toDataURL("image/png");
          latestDataUrl.current = url;
          setDataUrl(url);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to generate QR code");
          setLoading(false);
        }
      }
    };

    generate();
    return () => { cancelled = true; };
  }, [value, size, customization, errorCorrectionLevel]);

  const downloadPng = (filename = "qrcode") => {
    const url = latestDataUrl.current || dataUrl;
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.png`;
    a.click();
  };

  const downloadSvg = (filename = "qrcode") => {
    const url = latestDataUrl.current || dataUrl;
    if (!url) return;
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <image href="${url}" width="${size}" height="${size}"/>
</svg>`;
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${filename}.svg`;
    a.click();
    URL.revokeObjectURL(blobUrl);
  };

  return { dataUrl, loading, error, downloadPng, downloadSvg };
}

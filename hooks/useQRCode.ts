"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

export interface QROptions {
  value: string;
  size?: number;
  darkColor?: string;
  lightColor?: string;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
}

export interface QRResult {
  dataUrl: string;
  loading: boolean;
  error: string | null;
  downloadPng: (filename?: string) => void;
  downloadSvg: (filename?: string) => void;
}

export function useQRCode({
  value,
  size = 280,
  darkColor = "#0f172a",
  lightColor = "#ffffff",
  errorCorrectionLevel = "M",
}: QROptions): QRResult {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const svgStringRef = useRef<string>("");

  useEffect(() => {
    if (!value.trim()) {
      setDataUrl("");
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const opts: QRCode.QRCodeToDataURLOptions = {
      width: size,
      margin: 2,
      errorCorrectionLevel,
      color: { dark: darkColor, light: lightColor },
    };

    const svgOpts: QRCode.QRCodeToStringOptions = {
      type: "svg",
      width: size,
      margin: 2,
      errorCorrectionLevel,
      color: { dark: darkColor, light: lightColor },
    };

    Promise.all([
      QRCode.toDataURL(value, opts),
      QRCode.toString(value, svgOpts),
    ])
      .then(([url, svg]) => {
        if (!cancelled) {
          setDataUrl(url);
          svgStringRef.current = svg;
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message ?? "Failed to generate QR code");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [value, size, darkColor, lightColor, errorCorrectionLevel]);

  const downloadPng = (filename = "qrcode") => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${filename}.png`;
    a.click();
  };

  const downloadSvg = (filename = "qrcode") => {
    if (!svgStringRef.current) return;
    const blob = new Blob([svgStringRef.current], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return { dataUrl, loading, error, downloadPng, downloadSvg };
}

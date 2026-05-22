"use client";

import Image from "next/image";
import { Download, ImageIcon, FileCode2, RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QRPreviewProps {
  dataUrl: string;
  loading: boolean;
  error: string | null;
  isDynamic: boolean;
  onDownloadPng: () => void;
  onDownloadSvg: () => void;
}

export function QRPreview({
  dataUrl,
  loading,
  error,
  isDynamic,
  onDownloadPng,
  onDownloadSvg,
}: QRPreviewProps) {
  const hasQR = !!dataUrl && !loading && !error;

  return (
    <div className="flex flex-col gap-5">
      {/* QR canvas */}
      <div className="flex aspect-square w-full max-w-[400px] mx-auto items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        {loading && (
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <RefreshCw size={28} className="animate-spin" />
            <span className="text-xs">Generating…</span>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-2 text-center text-red-400">
            <AlertCircle size={28} />
            <span className="text-xs">{error}</span>
          </div>
        )}

        {!loading && !error && !dataUrl && (
          <div className="flex flex-col items-center gap-3 text-slate-300">
            <div className="grid grid-cols-3 gap-1 opacity-30">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-8 w-8 rounded-sm bg-slate-400",
                    [0, 2, 6, 8].includes(i) && "opacity-100",
                    [4].includes(i) && "opacity-60"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-slate-400">
              Fill in the form to generate
            </span>
          </div>
        )}

        {hasQR && (
          <Image
            src={dataUrl}
            alt="Generated QR code"
            width={400}
            height={400}
            className="rounded-lg"
            unoptimized
          />
        )}
      </div>

      {/* Dynamic badge */}
      {isDynamic && (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-emerald-700">
            Dynamic QR — destination can be changed anytime
          </span>
        </div>
      )}

      {/* Download buttons */}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Download
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onDownloadPng}
            disabled={!hasQR}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors",
              hasQR
                ? "hover:border-slate-300 hover:bg-slate-50"
                : "cursor-not-allowed opacity-40"
            )}
          >
            <ImageIcon size={15} />
            PNG
          </button>
          <button
            onClick={onDownloadSvg}
            disabled={!hasQR}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors",
              hasQR
                ? "hover:border-slate-300 hover:bg-slate-50"
                : "cursor-not-allowed opacity-40"
            )}
          >
            <FileCode2 size={15} />
            SVG
          </button>
        </div>

        <button
          onClick={onDownloadPng}
          disabled={!hasQR}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
            hasQR
              ? "bg-slate-900 text-white hover:bg-slate-700"
              : "cursor-not-allowed bg-slate-100 text-slate-400"
          )}
        >
          <Download size={15} />
          Download QR Code
        </button>
      </div>

      {/* Specs */}
      {hasQR && (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="mb-2 text-xs font-medium text-slate-500">Details</p>
          <dl className="space-y-1.5">
            {[
              ["Format", "PNG + SVG"],
              ["Size", "400 × 400 px"],
              ["Error correction", "High (30%)"],
              ["Type", isDynamic ? "Dynamic" : "Static"],
            ].map(([key, val]) => (
              <div key={key} className="flex justify-between text-xs">
                <dt className="text-slate-400">{key}</dt>
                <dd className="font-medium text-slate-700">{val}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}

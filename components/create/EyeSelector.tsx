"use client";

import { cn } from "@/lib/utils";
import { QREyeStyle } from "@/hooks/useAdvancedQRCode";

interface EyeSelectorProps {
  value: QREyeStyle;
  onChange: (eyeStyle: QREyeStyle) => void;
}

const eyeStyles: { id: QREyeStyle; label: string; preview: React.ReactNode }[] = [
  {
    id: "square",
    label: "Square",
    preview: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <rect x="2" y="2" width="36" height="36" fill="currentColor" />
        <rect x="7" y="7" width="26" height="26" fill="white" />
        <rect x="14" y="14" width="12" height="12" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "rounded",
    label: "Rounded",
    preview: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <rect x="2" y="2" width="36" height="36" rx="7" fill="currentColor" />
        <rect x="7" y="7" width="26" height="26" rx="4" fill="white" />
        <rect x="14" y="14" width="12" height="12" rx="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "circle",
    label: "Circle",
    preview: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <circle cx="20" cy="20" r="18" fill="currentColor" />
        <circle cx="20" cy="20" r="13" fill="white" />
        <circle cx="20" cy="20" r="6" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "leaf",
    label: "Leaf",
    preview: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <rect x="2" y="2" width="36" height="36" rx="10" fill="currentColor" />
        <rect x="7" y="7" width="26" height="26" rx="6" fill="white" />
        <rect x="14" y="14" width="12" height="12" rx="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "shield",
    label: "Shield",
    preview: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <path d="M2 8 L8 2 L32 2 L38 8 L38 38 L2 38 Z" fill="currentColor" />
        <path d="M8 14 L11 8 L29 8 L32 14 L32 32 L8 32 Z" fill="white" />
        <rect x="14" y="14" width="12" height="12" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "diamond",
    label: "Diamond",
    preview: (
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <polygon points="20,2 38,20 20,38 2,20" fill="currentColor" />
        <polygon points="20,9 31,20 20,31 9,20" fill="white" />
        <polygon points="20,15 25,20 20,25 15,20" fill="currentColor" />
      </svg>
    ),
  },
];

export function EyeSelector({ value, onChange }: EyeSelectorProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-xs font-medium text-slate-700 mb-1">Corner Eye Style</h3>
        <p className="text-xs text-slate-500">Customize the three corner positioning markers</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {eyeStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg border p-4 transition-all",
              value === style.id
                ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900 ring-offset-2"
                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            <div className="text-slate-700">{style.preview}</div>
            <span className="text-xs font-medium text-slate-700">{style.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

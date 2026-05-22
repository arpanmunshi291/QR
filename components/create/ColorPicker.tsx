"use client";

import { Label } from "@/components/ui/Label";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  primaryColor: string;
  backgroundColor: string;
  onChange: (colors: { primaryColor: string; backgroundColor: string }) => void;
}

const presetColors = [
  { name: "Classic Black", primary: "#0f172a", bg: "#ffffff" },
  { name: "Ocean Blue", primary: "#0ea5e9", bg: "#f0f9ff" },
  { name: "Forest Green", primary: "#10b981", bg: "#f0fdf4" },
  { name: "Sunset Orange", primary: "#f97316", bg: "#fff7ed" },
  { name: "Royal Purple", primary: "#8b5cf6", bg: "#faf5ff" },
  { name: "Cherry Red", primary: "#ef4444", bg: "#fef2f2" },
  { name: "Gold", primary: "#eab308", bg: "#fefce8" },
  { name: "Pink", primary: "#ec4899", bg: "#fdf2f8" },
];

export function ColorPicker({ primaryColor, backgroundColor, onChange }: ColorPickerProps) {
  const [customMode, setCustomMode] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-medium text-slate-700 mb-1">Color Scheme</h3>
        <p className="text-xs text-slate-500">Choose colors that match your brand</p>
      </div>

      {/* Preset Colors */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-600">Presets</span>
          <button
            onClick={() => setCustomMode(!customMode)}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            {customMode ? "Show presets" : "Custom colors"}
          </button>
        </div>

        {!customMode ? (
          <div className="grid grid-cols-2 gap-2">
            {presetColors.map((preset) => (
              <button
                key={preset.name}
                onClick={() =>
                  onChange({ primaryColor: preset.primary, backgroundColor: preset.bg })
                }
                className={cn(
                  "flex items-center gap-2 rounded-lg border p-2 transition-all text-left",
                  primaryColor === preset.primary && backgroundColor === preset.bg
                    ? "border-slate-900 ring-2 ring-slate-900 ring-offset-2"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex gap-1">
                  <div
                    className="h-6 w-6 rounded border border-slate-200"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div
                    className="h-6 w-6 rounded border border-slate-200"
                    style={{ backgroundColor: preset.bg }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-700">{preset.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="primary-color">Primary Color (QR Code)</Label>
              <div className="flex gap-2">
                <input
                  id="primary-color"
                  type="color"
                  value={primaryColor}
                  onChange={(e) =>
                    onChange({ primaryColor: e.target.value, backgroundColor })
                  }
                  className="h-10 w-16 cursor-pointer rounded border border-slate-200"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) =>
                    onChange({ primaryColor: e.target.value, backgroundColor })
                  }
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex gap-2">
                <input
                  id="bg-color"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) =>
                    onChange({ primaryColor, backgroundColor: e.target.value })
                  }
                  className="h-10 w-16 cursor-pointer rounded border border-slate-200"
                />
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) =>
                    onChange({ primaryColor, backgroundColor: e.target.value })
                  }
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Color Preview */}
      <div className="rounded-lg border border-slate-200 p-4">
        <p className="text-xs font-medium text-slate-600 mb-2">Preview</p>
        <div
          className="h-20 rounded-lg border-2 flex items-center justify-center"
          style={{ backgroundColor, borderColor: primaryColor }}
        >
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: primaryColor }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

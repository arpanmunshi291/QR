"use client";

import { cn } from "@/lib/utils";
import { QRCustomization } from "@/hooks/useAdvancedQRCode";
import { Sparkles } from "lucide-react";

interface TemplateSelectorProps {
  onSelect: (template: Partial<QRCustomization>) => void;
}

const templates: {
  id: string;
  name: string;
  description: string;
  config: Partial<QRCustomization>;
  preview: { primary: string; bg: string };
}[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional black and white",
    config: {
      pattern: "square",
      eyeStyle: "square",
      primaryColor: "#0f172a",
      backgroundColor: "#ffffff",
      frameStyle: "none",
    },
    preview: { primary: "#0f172a", bg: "#ffffff" },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Rounded and sleek",
    config: {
      pattern: "rounded",
      eyeStyle: "rounded",
      primaryColor: "#1e293b",
      backgroundColor: "#f8fafc",
      frameStyle: "box",
      frameText: "Scan me!",
    },
    preview: { primary: "#1e293b", bg: "#f8fafc" },
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Cool blue tones",
    config: {
      pattern: "dots",
      eyeStyle: "circle",
      primaryColor: "#0ea5e9",
      backgroundColor: "#f0f9ff",
      frameStyle: "circular",
      frameText: "Visit us",
    },
    preview: { primary: "#0ea5e9", bg: "#f0f9ff" },
  },
  {
    id: "forest",
    name: "Forest",
    description: "Natural green",
    config: {
      pattern: "extra-rounded",
      eyeStyle: "leaf",
      primaryColor: "#10b981",
      backgroundColor: "#f0fdf4",
      frameStyle: "banner",
      frameText: "Eco-friendly",
    },
    preview: { primary: "#10b981", bg: "#f0fdf4" },
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm orange gradient",
    config: {
      pattern: "classy-rounded",
      eyeStyle: "rounded",
      primaryColor: "#f97316",
      backgroundColor: "#fff7ed",
      frameStyle: "balloon",
      frameText: "Special offer!",
    },
    preview: { primary: "#f97316", bg: "#fff7ed" },
  },
  {
    id: "royal",
    name: "Royal",
    description: "Elegant purple",
    config: {
      pattern: "classy",
      eyeStyle: "rounded",
      primaryColor: "#8b5cf6",
      backgroundColor: "#faf5ff",
      frameStyle: "box",
      frameText: "Premium",
    },
    preview: { primary: "#8b5cf6", bg: "#faf5ff" },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple",
    config: {
      pattern: "dots",
      eyeStyle: "circle",
      primaryColor: "#64748b",
      backgroundColor: "#ffffff",
      frameStyle: "none",
    },
    preview: { primary: "#64748b", bg: "#ffffff" },
  },
  {
    id: "bold",
    name: "Bold",
    description: "High contrast red",
    config: {
      pattern: "square",
      eyeStyle: "square",
      primaryColor: "#ef4444",
      backgroundColor: "#fef2f2",
      frameStyle: "banner",
      frameText: "Important!",
    },
    preview: { primary: "#ef4444", bg: "#fef2f2" },
  },
];

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-medium text-slate-700 mb-1">Quick Templates</h3>
        <p className="text-xs text-slate-500">Start with a pre-designed style</p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.config)}
            className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-left transition-all hover:border-slate-300 hover:bg-slate-50"
          >
            {/* Preview */}
            <div
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border-2"
              style={{
                backgroundColor: template.preview.bg,
                borderColor: template.preview.primary,
              }}
            >
              <div className="grid grid-cols-3 gap-0.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 w-1.5 rounded-sm"
                    style={{ backgroundColor: template.preview.primary }}
                  />
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-semibold text-slate-900">{template.name}</h4>
                {template.id === "modern" && (
                  <span className="flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">
                    <Sparkles size={10} />
                    Popular
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">{template.description}</p>
            </div>

            {/* Apply button hint */}
            <div className="text-xs font-medium text-slate-400">Apply →</div>
          </button>
        ))}
      </div>

      <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
        <p className="text-xs text-slate-600">
          💡 Templates apply all customization settings at once. You can still adjust individual
          settings after applying a template.
        </p>
      </div>
    </div>
  );
}

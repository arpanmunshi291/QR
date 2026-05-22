"use client";

import { cn } from "@/lib/utils";
import { QRCustomization } from "@/hooks/useAdvancedQRCode";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

interface FrameSelectorProps {
  frameStyle?: QRCustomization["frameStyle"];
  frameText?: string;
  onChange: (frame: { frameStyle?: QRCustomization["frameStyle"]; frameText?: string }) => void;
}

const frameStyles: {
  id: QRCustomization["frameStyle"];
  label: string;
  preview: React.ReactNode;
}[] = [
  {
    id: "none",
    label: "No Frame",
    preview: (
      <div className="h-16 w-full rounded border-2 border-slate-300 bg-slate-50" />
    ),
  },
  {
    id: "banner",
    label: "Banner",
    preview: (
      <div className="h-16 w-full rounded border-2 border-slate-300 bg-slate-50 relative">
        <div className="absolute bottom-0 left-0 right-0 h-5 bg-slate-700 rounded-b flex items-center justify-center">
          <div className="h-1 w-12 bg-slate-300 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: "box",
    label: "Box",
    preview: (
      <div className="h-16 w-full rounded border-2 border-slate-300 bg-slate-50 relative p-2">
        <div className="absolute bottom-2 left-2 right-2 h-4 bg-slate-700 rounded flex items-center justify-center">
          <div className="h-1 w-12 bg-slate-300 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: "balloon",
    label: "Speech Balloon",
    preview: (
      <div className="h-16 w-full rounded border-2 border-slate-300 bg-slate-50 relative p-2">
        <div className="absolute bottom-2 left-2 right-2 h-4 bg-slate-700 rounded-lg flex items-center justify-center">
          <div className="h-1 w-12 bg-slate-300 rounded" />
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-700" />
      </div>
    ),
  },
  {
    id: "circular",
    label: "Circular",
    preview: (
      <div className="h-16 w-full rounded border-2 border-slate-300 bg-slate-50 relative">
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-5 w-20 bg-slate-700 rounded-full flex items-center justify-center">
          <div className="h-1 w-10 bg-slate-300 rounded" />
        </div>
      </div>
    ),
  },
];

export function FrameSelector({ frameStyle = "none", frameText = "", onChange }: FrameSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-medium text-slate-700 mb-1">Frame Style</h3>
        <p className="text-xs text-slate-500">Add a frame with custom text below your QR code</p>
      </div>

      {/* Frame Style Selection */}
      <div className="grid grid-cols-2 gap-2">
        {frameStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange({ frameStyle: style.id, frameText })}
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg border p-3 transition-all",
              frameStyle === style.id
                ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900 ring-offset-2"
                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            <div className="w-full">{style.preview}</div>
            <span className="text-xs font-medium text-slate-700">{style.label}</span>
          </button>
        ))}
      </div>

      {/* Frame Text Input */}
      {frameStyle !== "none" && (
        <div className="space-y-1.5">
          <Label htmlFor="frame-text">Frame Text</Label>
          <Input
            id="frame-text"
            type="text"
            placeholder="Scan me!"
            value={frameText}
            onChange={(e) => onChange({ frameStyle, frameText: e.target.value })}
            maxLength={30}
          />
          <p className="text-xs text-slate-400">
            {frameText?.length || 0}/30 characters
          </p>
        </div>
      )}

      {/* Examples */}
      {frameStyle !== "none" && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
          <p className="text-xs font-medium text-blue-900 mb-1">💡 Frame Text Ideas</p>
          <div className="flex flex-wrap gap-1.5">
            {["Scan me!", "Visit us", "Get 20% off", "Menu", "WiFi", "Contact"].map((text) => (
              <button
                key={text}
                onClick={() => onChange({ frameStyle, frameText: text })}
                className="rounded-full bg-white px-2 py-1 text-xs text-blue-700 hover:bg-blue-100 border border-blue-200"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

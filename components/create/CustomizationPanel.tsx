"use client";

import { Palette, Eye, Image as ImageIcon, Frame, Sparkles, Grid3x3 } from "lucide-react";
import { QRCustomization, QRPattern, QREyeStyle } from "@/hooks/useAdvancedQRCode";
import { PatternSelector } from "./PatternSelector";
import { EyeSelector } from "./EyeSelector";
import { ColorPicker } from "./ColorPicker";
import { FrameSelector } from "./FrameSelector";
import { LogoUploader } from "./LogoUploader";
import { TemplateSelector } from "./TemplateSelector";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CustomizationPanelProps {
  customization: QRCustomization;
  onChange: (customization: QRCustomization) => void;
}

type TabId = "pattern" | "eyes" | "colors" | "logo" | "frame" | "templates";

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "pattern", label: "Pattern", icon: Grid3x3 },
  { id: "eyes", label: "Eyes", icon: Eye },
  { id: "colors", label: "Colors", icon: Palette },
  { id: "logo", label: "Logo", icon: ImageIcon },
  { id: "frame", label: "Frame", icon: Frame },
  { id: "templates", label: "Templates", icon: Sparkles },
];

export function CustomizationPanel({ customization, onChange }: CustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("pattern");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-900">Customize Design</h2>
        <p className="text-xs text-slate-500">Make your QR code unique and on-brand</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-100 px-4 py-3">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "pattern" && (
          <PatternSelector
            value={customization.pattern as QRPattern}
            onChange={(pattern) => onChange({ ...customization, pattern })}
          />
        )}
        {activeTab === "eyes" && (
          <EyeSelector
            value={customization.eyeStyle as QREyeStyle}
            onChange={(eyeStyle) => onChange({ ...customization, eyeStyle })}
          />
        )}
        {activeTab === "colors" && (
          <ColorPicker
            primaryColor={customization.primaryColor}
            backgroundColor={customization.backgroundColor}
            onChange={(colors) => onChange({ ...customization, ...colors })}
          />
        )}
        {activeTab === "logo" && (
          <LogoUploader
            logoUrl={customization.logoUrl}
            logoSize={customization.logoSize}
            onChange={(logo) => onChange({ ...customization, ...logo })}
          />
        )}
        {activeTab === "frame" && (
          <FrameSelector
            frameStyle={customization.frameStyle}
            frameText={customization.frameText}
            onChange={(frame) => onChange({ ...customization, ...frame })}
          />
        )}
        {activeTab === "templates" && (
          <TemplateSelector
            onSelect={(template) => onChange({ ...customization, ...template })}
          />
        )}
      </div>
    </div>
  );
}

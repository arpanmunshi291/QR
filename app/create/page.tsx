"use client";

import { useState, useMemo } from "react";
import {
  Link2,
  Type,
  Wifi,
  Mail,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdvancedQRCode, QRCustomization, defaultCustomization } from "@/hooks/useAdvancedQRCode";
import { Toggle } from "@/components/ui/Toggle";
import { UrlForm } from "@/components/create/UrlForm";
import { TextForm } from "@/components/create/TextForm";
import { WifiForm, type WifiData } from "@/components/create/WifiForm";
import { EmailForm, type EmailData } from "@/components/create/EmailForm";
import { QRPreview } from "@/components/create/QRPreview";
import { CustomizationPanel } from "@/components/create/CustomizationPanel";

// ─── Tab definitions ──────────────────────────────────────────────────────────

type TabId = "url" | "text" | "wifi" | "email";

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "url", label: "URL", icon: Link2 },
  { id: "text", label: "Text", icon: Type },
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "email", label: "Email", icon: Mail },
];

// ─── Helpers to build QR string from each form ───────────────────────────────

function buildWifiString(d: WifiData): string {
  if (!d.ssid) return "";
  const esc = (s: string) => s.replace(/[\\;,"]/g, (c) => `\\${c}`);
  return `WIFI:T:${d.security};S:${esc(d.ssid)};P:${esc(d.password)};H:${d.hidden ? "true" : "false"};;`;
}

function buildEmailString(d: EmailData): string {
  if (!d.to) return "";
  const params: string[] = [];
  if (d.subject) params.push(`subject=${encodeURIComponent(d.subject)}`);
  if (d.body) params.push(`body=${encodeURIComponent(d.body)}`);
  return `mailto:${d.to}${params.length ? `?${params.join("&")}` : ""}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState<TabId>("url");
  const [isDynamic, setIsDynamic] = useState(false);

  // Per-tab state
  const [urlValue, setUrlValue] = useState("https://");
  const [textValue, setTextValue] = useState("");
  const [wifiValue, setWifiValue] = useState<WifiData>({
    ssid: "",
    password: "",
    security: "WPA",
    hidden: false,
  });
  const [emailValue, setEmailValue] = useState<EmailData>({
    to: "",
    subject: "",
    body: "",
  });

  // QR Customization state
  const [customization, setCustomization] = useState<QRCustomization>(defaultCustomization);

  // Derive the QR string from active tab
  const qrString = useMemo(() => {
    switch (activeTab) {
      case "url":
        return urlValue;
      case "text":
        return textValue;
      case "wifi":
        return buildWifiString(wifiValue);
      case "email":
        return buildEmailString(emailValue);
    }
  }, [activeTab, urlValue, textValue, wifiValue, emailValue]);

  const { dataUrl, loading, error, downloadPng, downloadSvg } = useAdvancedQRCode({
    value: qrString,
    size: 400,
    customization,
    errorCorrectionLevel: "H",
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="mb-1 flex items-center gap-1.5 text-xs text-slate-400">
            <span>Dashboard</span>
            <ChevronRight size={12} />
            <span className="text-slate-700">Create QR Code</span>
          </nav>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Create QR Code
              </h1>
              <p className="text-sm text-slate-500">
                Generate a QR code for any content type
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-xs font-medium text-amber-700">
                Pro tip: Dynamic QR codes let you change the destination later
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main split layout */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* ── LEFT: Input panel ── */}
          <div className="space-y-6">
            {/* Type selector */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-4">
                <h2 className="text-sm font-semibold text-slate-900">
                  Content type
                </h2>
                <p className="text-xs text-slate-500">
                  Choose what your QR code should encode
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-xs font-medium transition-all",
                        activeTab === tab.id
                          ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form card */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-4">
                <h2 className="text-sm font-semibold text-slate-900">
                  {tabs.find((t) => t.id === activeTab)?.label} details
                </h2>
              </div>
              <div className="p-5">
                {activeTab === "url" && (
                  <UrlForm value={urlValue} onChange={setUrlValue} />
                )}
                {activeTab === "text" && (
                  <TextForm value={textValue} onChange={setTextValue} />
                )}
                {activeTab === "wifi" && (
                  <WifiForm value={wifiValue} onChange={setWifiValue} />
                )}
                {activeTab === "email" && (
                  <EmailForm value={emailValue} onChange={setEmailValue} />
                )}
              </div>
            </div>

            {/* Customization Panel */}
            <CustomizationPanel
              customization={customization}
              onChange={setCustomization}
            />

            {/* Dynamic QR toggle */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Dynamic QR Code
                  </h2>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                    Dynamic codes let you update the destination URL at any time
                    without reprinting. Scan counts and analytics are tracked
                    automatically.
                  </p>
                  {isDynamic && (
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                      {[
                        "✓ Edit destination anytime",
                        "✓ Real-time scan analytics",
                        "✓ Expiry & password protection",
                      ].map((f) => (
                        <span key={f}>{f}</span>
                      ))}
                    </div>
                  )}
                </div>
                <Toggle
                  id="dynamic-toggle"
                  checked={isDynamic}
                  onChange={setIsDynamic}
                />
              </div>
            </div>

            {/* Generate button (mobile: visible above preview) */}
            <button
              disabled={!qrString.trim() || loading}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors lg:hidden",
                qrString.trim() && !loading
                  ? "bg-slate-900 text-white hover:bg-slate-700"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              )}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Generating…
                </>
              ) : (
                "Generate QR Code"
              )}
            </button>
          </div>

          {/* ── RIGHT: Preview panel ── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">
                  Live preview
                </h2>
                {loading && (
                  <span className="text-xs text-slate-400">Updating…</span>
                )}
                {!loading && dataUrl && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Ready
                  </span>
                )}
              </div>

              <QRPreview
                dataUrl={dataUrl}
                loading={loading}
                error={error}
                isDynamic={isDynamic}
                onDownloadPng={() => downloadPng("quickqr-code")}
                onDownloadSvg={() => downloadSvg("quickqr-code")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

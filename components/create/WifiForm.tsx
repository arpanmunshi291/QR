"use client";

import { Wifi, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export interface WifiData {
  ssid: string;
  password: string;
  security: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

interface WifiFormProps {
  value: WifiData;
  onChange: (v: WifiData) => void;
}

const securityOptions: { value: WifiData["security"]; label: string }[] = [
  { value: "WPA", label: "WPA/WPA2" },
  { value: "WEP", label: "WEP" },
  { value: "nopass", label: "None (open)" },
];

export function WifiForm({ value, onChange }: WifiFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const update = (patch: Partial<WifiData>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="ssid" required>
          Network name (SSID)
        </Label>
        <Input
          id="ssid"
          placeholder="My WiFi Network"
          value={value.ssid}
          onChange={(e) => update({ ssid: e.target.value })}
          icon={<Wifi size={14} />}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="wifi-password">Password</Label>
        <div className="relative">
          <Input
            id="wifi-password"
            type={showPassword ? "text" : "password"}
            placeholder="Network password"
            value={value.password}
            onChange={(e) => update({ password: e.target.value })}
            className="pr-10"
            disabled={value.security === "nopass"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Security type</Label>
        <div className="flex gap-2">
          {securityOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update({ security: opt.value })}
              className={cn(
                "flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                value.security === opt.value
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2.5">
        <input
          type="checkbox"
          checked={value.hidden}
          onChange={(e) => update({ hidden: e.target.checked })}
          className="h-4 w-4 rounded border-slate-300 accent-slate-900"
        />
        <span className="text-sm text-slate-700">Hidden network</span>
      </label>
    </div>
  );
}

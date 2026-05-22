"use client";

import { Link } from "lucide-react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

interface UrlFormProps {
  value: string;
  onChange: (v: string) => void;
}

export function UrlForm({ value, onChange }: UrlFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="url" required>
          Destination URL
        </Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          icon={<Link size={14} />}
        />
        <p className="text-xs text-slate-400">
          Enter the full URL including https://
        </p>
      </div>
    </div>
  );
}

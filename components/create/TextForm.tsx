"use client";

import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

interface TextFormProps {
  value: string;
  onChange: (v: string) => void;
}

export function TextForm({ value, onChange }: TextFormProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="text" required>
        Text content
      </Label>
      <Textarea
        id="text"
        rows={5}
        placeholder="Enter any text, message, or note..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={2000}
      />
      <p className="text-right text-xs text-slate-400">
        {value.length} / 2000
      </p>
    </div>
  );
}

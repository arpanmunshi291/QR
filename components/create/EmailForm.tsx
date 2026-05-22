"use client";

import { Mail } from "lucide-react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

interface EmailFormProps {
  value: EmailData;
  onChange: (v: EmailData) => void;
}

export function EmailForm({ value, onChange }: EmailFormProps) {
  const update = (patch: Partial<EmailData>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email-to" required>
          To
        </Label>
        <Input
          id="email-to"
          type="email"
          placeholder="recipient@example.com"
          value={value.to}
          onChange={(e) => update({ to: e.target.value })}
          icon={<Mail size={14} />}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email-subject">Subject</Label>
        <Input
          id="email-subject"
          placeholder="Email subject line"
          value={value.subject}
          onChange={(e) => update({ subject: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email-body">Message</Label>
        <Textarea
          id="email-body"
          rows={4}
          placeholder="Email body (optional)"
          value={value.body}
          onChange={(e) => update({ body: e.target.value })}
        />
      </div>
    </div>
  );
}

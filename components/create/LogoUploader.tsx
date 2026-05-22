"use client";

import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/Label";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface LogoUploaderProps {
  logoUrl?: string;
  logoSize?: number;
  onChange: (logo: { logoUrl?: string; logoSize?: number }) => void;
}

export function LogoUploader({ logoUrl, logoSize = 0.2, onChange }: LogoUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange({ logoUrl: result, logoSize });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-medium text-slate-700 mb-1">Add Logo</h3>
        <p className="text-xs text-slate-500">Place your brand logo in the center</p>
      </div>

      {/* Upload Area */}
      {!logoUrl ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative rounded-lg border-2 border-dashed p-8 text-center transition-colors",
            dragActive
              ? "border-slate-900 bg-slate-50"
              : "border-slate-200 hover:border-slate-300"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-slate-100 p-3">
              <Upload size={20} className="text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">
                Drop your logo here
              </p>
              <p className="text-xs text-slate-500">or click to browse</p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-700"
            >
              Choose File
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-400">PNG, JPG, SVG up to 5MB</p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Logo Preview */}
          <div className="relative rounded-lg border border-slate-200 bg-slate-50 p-4">
            <button
              onClick={() => onChange({ logoUrl: undefined, logoSize })}
              className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-sm hover:bg-slate-100"
            >
              <X size={14} className="text-slate-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <img
                  src={logoUrl}
                  alt="Logo preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">Logo uploaded</p>
                <p className="text-xs text-slate-500">Adjust size below</p>
              </div>
            </div>
          </div>

          {/* Size Slider */}
          <div className="space-y-2">
            <Label htmlFor="logo-size">Logo Size: {Math.round(logoSize * 100)}%</Label>
            <input
              id="logo-size"
              type="range"
              min="10"
              max="30"
              step="1"
              value={logoSize * 100}
              onChange={(e) =>
                onChange({ logoUrl, logoSize: parseInt(e.target.value) / 100 })
              }
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Small</span>
              <span>Large</span>
            </div>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <ImageIcon size={14} />
            Change Logo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}

      {/* Tips */}
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
        <p className="text-xs font-medium text-amber-900 mb-1">💡 Pro Tips</p>
        <ul className="space-y-1 text-xs text-amber-700">
          <li>• Use a square logo for best results</li>
          <li>• Transparent backgrounds work great</li>
          <li>• Keep it simple for better scanning</li>
        </ul>
      </div>
    </div>
  );
}

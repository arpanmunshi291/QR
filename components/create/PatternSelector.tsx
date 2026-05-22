"use client";

import { cn } from "@/lib/utils";
import { QRPattern } from "@/hooks/useAdvancedQRCode";

interface PatternSelectorProps {
  value: QRPattern;
  onChange: (pattern: QRPattern) => void;
}

// SVG mini-previews — 3×3 grid of modules
function SquarePreview() {
  return (
    <svg viewBox="0 0 30 30" className="h-8 w-8">
      {[0,10,20].flatMap(y => [0,10,20].map(x => (
        <rect key={`${x}-${y}`} x={x+1} y={y+1} width={8} height={8} fill="currentColor" />
      )))}
    </svg>
  );
}
function DotsPreview() {
  return (
    <svg viewBox="0 0 30 30" className="h-8 w-8">
      {[5,15,25].flatMap(cy => [5,15,25].map(cx => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3.8} fill="currentColor" />
      )))}
    </svg>
  );
}
function RoundedPreview() {
  return (
    <svg viewBox="0 0 30 30" className="h-8 w-8">
      {[0,10,20].flatMap(y => [0,10,20].map(x => (
        <rect key={`${x}-${y}`} x={x+1} y={y+1} width={8} height={8} rx={2} fill="currentColor" />
      )))}
    </svg>
  );
}
function ExtraRoundedPreview() {
  return (
    <svg viewBox="0 0 30 30" className="h-8 w-8">
      {[0,10,20].flatMap(y => [0,10,20].map(x => (
        <rect key={`${x}-${y}`} x={x+1} y={y+1} width={8} height={8} rx={4} fill="currentColor" />
      )))}
    </svg>
  );
}
function ClassyPreview() {
  return (
    <svg viewBox="0 0 30 30" className="h-8 w-8">
      {[0,10,20].flatMap(y => [0,10,20].map(x => (
        <g key={`${x}-${y}`}>
          <rect x={x+3} y={y+1} width={4} height={8} fill="currentColor" />
          <rect x={x+1} y={y+3} width={8} height={4} fill="currentColor" />
        </g>
      )))}
    </svg>
  );
}
function ClassyRoundedPreview() {
  return (
    <svg viewBox="0 0 30 30" className="h-8 w-8">
      {[0,10,20].flatMap(y => [0,10,20].map(x => (
        <g key={`${x}-${y}`}>
          <rect x={x+3} y={y+1} width={4} height={8} rx={1.5} fill="currentColor" />
          <rect x={x+1} y={y+3} width={8} height={4} rx={1.5} fill="currentColor" />
        </g>
      )))}
    </svg>
  );
}
function DiamondPreview() {
  return (
    <svg viewBox="0 0 30 30" className="h-8 w-8">
      {[5,15,25].flatMap(cy => [5,15,25].map(cx => (
        <polygon
          key={`${cx}-${cy}`}
          points={`${cx},${cy-4} ${cx+4},${cy} ${cx},${cy+4} ${cx-4},${cy}`}
          fill="currentColor"
        />
      )))}
    </svg>
  );
}
function StarPreview() {
  // 4-pointed star
  const star = (cx: number, cy: number) => {
    const pts = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 - Math.PI / 2;
      const r = i % 2 === 0 ? 4 : 1.8;
      pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return pts.join(" ");
  };
  return (
    <svg viewBox="0 0 30 30" className="h-8 w-8">
      {[5,15,25].flatMap(cy => [5,15,25].map(cx => (
        <polygon key={`${cx}-${cy}`} points={star(cx, cy)} fill="currentColor" />
      )))}
    </svg>
  );
}
function CrossPreview() {
  return (
    <svg viewBox="0 0 30 30" className="h-8 w-8">
      {[0,10,20].flatMap(y => [0,10,20].map(x => (
        <g key={`${x}-${y}`}>
          <rect x={x+3.5} y={y+1} width={3} height={8} fill="currentColor" />
          <rect x={x+1} y={y+3.5} width={8} height={3} fill="currentColor" />
        </g>
      )))}
    </svg>
  );
}
function MosaicPreview() {
  return (
    <svg viewBox="0 0 30 30" className="h-8 w-8">
      {[0,10,20].flatMap(y => [0,10,20].map(x => (
        <rect key={`${x}-${y}`} x={x+2} y={y+2} width={6} height={6} rx={1} fill="currentColor" />
      )))}
    </svg>
  );
}

const patterns: { id: QRPattern; label: string; Preview: React.FC }[] = [
  { id: "square",        label: "Square",        Preview: SquarePreview },
  { id: "dots",          label: "Dots",          Preview: DotsPreview },
  { id: "rounded",       label: "Rounded",       Preview: RoundedPreview },
  { id: "extra-rounded", label: "Extra Rounded", Preview: ExtraRoundedPreview },
  { id: "classy",        label: "Classy",        Preview: ClassyPreview },
  { id: "classy-rounded",label: "Classy Rounded",Preview: ClassyRoundedPreview },
  { id: "diamond",       label: "Diamond",       Preview: DiamondPreview },
  { id: "star",          label: "Star",          Preview: StarPreview },
  { id: "cross",         label: "Cross",         Preview: CrossPreview },
  { id: "mosaic",        label: "Mosaic",        Preview: MosaicPreview },
];

export function PatternSelector({ value, onChange }: PatternSelectorProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-xs font-medium text-slate-700 mb-1">QR Code Pattern</h3>
        <p className="text-xs text-slate-500">Choose the style of the QR code modules</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {patterns.map(({ id, label, Preview }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg border p-4 transition-all",
              value === id
                ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900 ring-offset-2"
                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            <div className="text-slate-700">
              <Preview />
            </div>
            <span className="text-xs font-medium text-slate-700">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

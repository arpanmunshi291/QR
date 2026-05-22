"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Link as LinkIcon, Download, Zap, Shield, BarChart2 } from "lucide-react";
import { useQRCode } from "@/hooks/useQRCode";
import { cn } from "@/lib/utils";

const brands = ["Stripe", "Notion", "Linear", "Vercel", "Figma", "Loom"];

const stats = [
  { value: "2M+", label: "QR codes created" },
  { value: "50K+", label: "Happy teams" },
  { value: "99.9%", label: "Uptime SLA" },
];

export default function Hero() {
  const [url, setUrl] = useState("https://quickqr.io");
  const { dataUrl, loading, downloadPng } = useQRCode({ value: url, size: 220 });

  return (
    <section className="relative min-h-screen overflow-hidden bg-white flex flex-col">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-right orb */}
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-100 via-violet-50 to-transparent opacity-70 blur-3xl" />
        {/* Bottom-left orb */}
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-50 via-indigo-50 to-transparent opacity-60 blur-3xl" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* ── LEFT ── */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm">
              <Sparkles size={12} className="text-indigo-500" />
              Now with AI-powered analytics
              <span className="ml-1 rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">NEW</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-[68px]">
              Create.{" "}
              <span className="gradient-text">Connect.</span>
              <br />
              Track.{" "}
              <span className="gradient-text">Succeed.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-500">
              The all-in-one QR platform for modern teams. Generate dynamic codes,
              track scans in real time, and build branded experiences — all from
              one beautiful dashboard.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Zap size={15} />
                Get Started Free
                <ArrowRight size={15} />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
              >
                See how it works
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              ✓ Free forever &nbsp;·&nbsp; ✓ No credit card &nbsp;·&nbsp; ✓ 5-minute setup
            </p>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-8 border-t border-slate-100 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Live QR card ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px]">
              {/* Glow behind card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-400 to-violet-500 opacity-20 blur-2xl scale-95" />

              <div className="relative rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-sm">
                {/* Card header */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Live QR Preview</p>
                    <p className="text-xs text-slate-400 mt-0.5">Updates as you type</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </div>
                </div>

                {/* URL input */}
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition-all focus-within:border-indigo-400 focus-within:ring-3 focus-within:ring-indigo-100">
                  <LinkIcon size={14} className="shrink-0 text-slate-400" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-link.com"
                    className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>

                {/* QR display */}
                <div className="mt-4 flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/30 p-6 border border-slate-100">
                  {loading ? (
                    <div className="flex h-[220px] w-[220px] items-center justify-center">
                      <div className="h-10 w-10 animate-spin rounded-full border-3 border-indigo-100 border-t-indigo-600" />
                    </div>
                  ) : dataUrl ? (
                    <div className="animate-float">
                      <Image
                        src={dataUrl}
                        alt="QR Code"
                        width={220}
                        height={220}
                        className="rounded-xl shadow-lg"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="flex h-[220px] w-[220px] items-center justify-center text-sm text-slate-400">
                      Enter a URL above
                    </div>
                  )}
                </div>

                {/* Download button */}
                <button
                  onClick={() => downloadPng("quickqr")}
                  disabled={!dataUrl}
                  className={cn(
                    "mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all",
                    dataUrl
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01]"
                      : "cursor-not-allowed bg-slate-100 text-slate-400"
                  )}
                >
                  <Download size={15} />
                  Download PNG
                </button>

                {/* Feature pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { icon: Shield, label: "Secure" },
                    { icon: BarChart2, label: "Analytics" },
                    { icon: Zap, label: "Dynamic" },
                  ].map(({ icon: Icon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1 rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">
                      <Icon size={11} className="text-indigo-500" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted brands */}
        <div className="mt-20 border-t border-slate-100 pt-10">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {brands.map((brand) => (
              <span key={brand} className="text-sm font-bold text-slate-300 tracking-tight hover:text-slate-400 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

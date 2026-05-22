import Link from "next/link";
import { Link2, Settings2, Share2, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Link2,
    title: "Paste your URL",
    description: "Enter any destination — a website, PDF, video, or app store link. QuickQR supports any valid URL.",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    ring: "ring-blue-100",
  },
  {
    step: "02",
    icon: Settings2,
    title: "Customize your code",
    description: "Add your logo, pick brand colors, and choose a frame style. Make it unmistakably yours in seconds.",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    ring: "ring-violet-100",
  },
  {
    step: "03",
    icon: Share2,
    title: "Download & deploy",
    description: "Export as SVG, PNG, or PDF. Drop it on packaging, print, digital ads, or anywhere your audience is.",
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    ring: "ring-pink-100",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Track performance",
    description: "Watch scans roll in on your live dashboard. Filter by date, location, and device to optimize results.",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #a5b4fc 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
            ✦ How it works
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Up and running{" "}
            <span className="gradient-text">in minutes</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 leading-relaxed">
            No technical knowledge required. Four simple steps from idea to live QR code.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
              >
                {/* Step number */}
                <div className="mb-5 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-3xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>

                {/* Arrow connector (desktop) */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/40 z-10">
                    <ArrowRight size={12} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start for free — no credit card needed
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";

const perks = [
  "Free forever plan",
  "No credit card required",
  "5-minute setup",
  "Cancel anytime",
];

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 md:p-16 shadow-2xl shadow-indigo-500/30">
          {/* Background decorations */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>

          <div className="relative text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
              <Zap size={12} />
              Join 50,000+ teams already using QuickQR
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Ready to upgrade
              <br />
              your campaigns?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-indigo-100 leading-relaxed">
              Connect the physical and digital worlds. Start creating beautiful,
              trackable QR codes for free today.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold text-indigo-700 shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started for Free
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Try the generator
              </Link>
            </div>

            {/* Perks */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-1.5 text-sm text-indigo-100">
                  <CheckCircle2 size={14} className="text-indigo-300" />
                  {perk}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

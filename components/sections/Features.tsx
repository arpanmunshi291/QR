import { RefreshCw, BarChart2, Palette, Layers, Plug, Shield } from "lucide-react";

const features = [
  {
    icon: RefreshCw,
    title: "Dynamic QR Codes",
    description: "Update the destination URL anytime without reprinting. Your QR code stays the same while the content evolves.",
    badge: "Core",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: BarChart2,
    title: "Real-time Analytics",
    description: "Track every scan with location, device, and time data. Understand your audience and optimize campaigns.",
    badge: "Insights",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    description: "Add your logo, choose colors, and match your brand identity. Every QR code becomes a brand touchpoint.",
    badge: "Design",
    gradient: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    border: "border-pink-100",
    badgeColor: "bg-pink-100 text-pink-700",
  },
  {
    icon: Layers,
    title: "Bulk Generation",
    description: "Generate thousands of unique QR codes in seconds via CSV upload or API. Built for scale.",
    badge: "Scale",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    icon: Plug,
    title: "Smart Integrations",
    description: "Connect with Zapier, HubSpot, Salesforce, and 50+ tools. Automate workflows without writing code.",
    badge: "Integrations",
    gradient: "from-teal-500 to-emerald-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    badgeColor: "bg-teal-100 text-teal-700",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified. Password-protected QR codes, expiry dates, and role-based access control.",
    badge: "Security",
    gradient: "from-slate-600 to-slate-800",
    bg: "bg-slate-50",
    border: "border-slate-200",
    badgeColor: "bg-slate-200 text-slate-700",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-white" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            ✦ Features
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Everything you need{" "}
            <span className="gradient-text">to scale</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            From a single QR code to enterprise-grade campaigns — QuickQR handles it all.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-2xl border ${feature.border} bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/8`}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white via-white to-slate-50/50" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                      <Icon size={20} />
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${feature.badgeColor}`}>
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.description}</p>

                  {/* Bottom accent line */}
                  <div className={`mt-5 h-0.5 w-0 rounded-full bg-gradient-to-r ${feature.gradient} transition-all duration-500 group-hover:w-full`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

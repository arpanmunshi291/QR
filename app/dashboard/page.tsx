import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  QrCode,
  BarChart2,
  Plus,
  Settings,
  LogOut,
  Layers,
  TrendingUp,
  Clock,
} from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default async function DashboardPage() {
  const session = await auth();

  // Extra guard — middleware handles the redirect, but this is a safety net
  if (!session?.user) {
    redirect("/login");
  }

  const { user } = session;
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email?.[0].toUpperCase() ?? "?";

  const stats = [
    { label: "QR Codes created", value: "0", icon: QrCode, color: "bg-slate-100 text-slate-700" },
    { label: "Total scans", value: "0", icon: TrendingUp, color: "bg-emerald-50 text-emerald-700" },
    { label: "Active codes", value: "0", icon: Layers, color: "bg-blue-50 text-blue-700" },
    { label: "Last scan", value: "—", icon: Clock, color: "bg-amber-50 text-amber-700" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
              <QrCode size={16} />
            </span>
            <span className="text-lg tracking-tight">QuickQR</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/create"
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              <Plus size={15} />
              New QR
            </Link>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
              <Settings size={16} />
            </button>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt={user.name ?? ""} className="h-12 w-12 rounded-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Welcome back, {user.name?.split(" ")[0] ?? "there"} 👋
            </h1>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.color}`}>
                    <Icon size={16} />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <QrCode size={24} className="text-slate-500" />
          </div>
          <h2 className="text-base font-semibold text-slate-900">No QR codes yet</h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Create your first QR code and start tracking scans.
          </p>
          <Link
            href="/create"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            <Plus size={15} />
            Create QR Code
          </Link>
        </div>


      </div>
    </div>
  );
}

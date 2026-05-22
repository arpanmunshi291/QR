"use client";

import Link from "next/link";
import { QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-slate-200 py-3 shadow-sm"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/5 p-1.5 rounded-lg group-hover:bg-primary/10 transition-colors">
            <QrCode className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            Quick<span className="text-primary/70">QR</span>
          </span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            Product
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/create" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            Create QR
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors hidden sm:block">
            Log in
          </Link>
          <Link href="/signup">
            <Button className="shadow-sm rounded-full px-5">Sign up free</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

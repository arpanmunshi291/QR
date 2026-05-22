"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { Download, Link2 } from "lucide-react";
import { Input } from "./ui/Input";
import { Button } from "./ui/button";

export function QRPreview() {
  const [url, setUrl] = useState("https://quickqr.com");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  useEffect(() => {
    const generateQR = async () => {
      try {
        const urlToEncode = url.trim() || "https://quickqr.com";
        const dataUrl = await QRCode.toDataURL(urlToEncode, {
          width: 300,
          margin: 1,
          color: {
            dark: "#0f172a", // slate-900
            light: "#ffffff",
          },
        });
        setQrCodeDataUrl(dataUrl);
      } catch (err) {
        console.error("Error generating QR code", err);
      }
    };
    
    // Add a small debounce
    const timeout = setTimeout(generateQR, 300);
    return () => clearTimeout(timeout);
  }, [url]);

  const handleDownload = () => {
    if (!qrCodeDataUrl) return;
    const link = document.createElement("a");
    link.download = "quickqr-code.png";
    link.href = qrCodeDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className="w-full max-w-sm mx-auto relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-slate-200 to-slate-100 rounded-[24px] blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
      
      <motion.div 
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative bg-white p-6 rounded-[24px] border border-slate-100 shadow-[0_8px_40px_rgb(0,0,0,0.08)] flex flex-col items-center gap-6"
      >
        {/* QR Code Image */}
        <div className="w-full aspect-square bg-slate-50 rounded-xl flex items-center justify-center p-2 border border-slate-100/50">
          {qrCodeDataUrl ? (
            <img 
              src={qrCodeDataUrl} 
              alt="QR Code Preview" 
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 animate-pulse rounded-lg"></div>
          )}
        </div>

        {/* Input & Actions */}
        <div className="w-full space-y-4">
          <Input
            icon={<Link2 className="w-4 h-4" />}
            placeholder="Enter URL to generate..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="rounded-xl bg-slate-50 border-slate-200 shadow-none focus-visible:ring-slate-200 focus:bg-white transition-colors"
          />
          
          <Button 
            onClick={handleDownload}
            className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium h-11 shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PNG
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

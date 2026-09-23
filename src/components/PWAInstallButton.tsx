import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Smartphone, Download, Check, Sparkles } from 'lucide-react';

interface PWAInstallButtonProps {
  onOpenIPhoneGuide?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ onOpenIPhoneGuide }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  // If already running as an installed PWA on standalone mode, return null or a small badge
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-emerald-950 hover:bg-emerald-500 transition active:scale-95"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Telepítés</span>
      </button>
    );
  }

  // iOS Safari flow
  return (
    <button
      onClick={onOpenIPhoneGuide}
      className="flex items-center gap-1.5 rounded-xl border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-500/20 transition active:scale-95"
      title="Használat iPhone-on és Hozzáadás a Kezdőképernyőhöz"
    >
      <Smartphone className="w-3.5 h-3.5 text-blue-400" />
      <span className="hidden sm:inline">iPhone / iOS App</span>
      <span className="sm:hidden">iPhone</span>
    </button>
  );
};

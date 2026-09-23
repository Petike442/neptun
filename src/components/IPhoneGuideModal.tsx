import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Share2, 
  PlusSquare, 
  Download, 
  Check, 
  Copy, 
  Calendar, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Package,
  Terminal,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

interface IPhoneGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadIcs: () => void;
}

export const IPhoneGuideModal: React.FC<IPhoneGuideModalProps> = ({
  isOpen,
  onClose,
  onDownloadIcs,
}) => {
  const [activeTab, setActiveTab] = useState<'pwa' | 'ipa'>('pwa');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCommand = () => {
    const cmd = `npm run build && npx @capacitor/cli add ios && npx cap open ios`;
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-850/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
              <Smartphone className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> iOS & iPhone Támogatás
              </span>
              <h3 className="text-base font-bold text-white leading-tight">
                iPhone Használat & .IPA Lehetőségek
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch between PWA (Recommended) and IPA */}
        <div className="bg-slate-950/70 p-1.5 border-b border-slate-800 flex gap-1">
          <button
            onClick={() => setActiveTab('pwa')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'pwa'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Főképernyő & Naptár (Ajánlott)</span>
          </button>

          <button
            onClick={() => setActiveTab('ipa')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'ipa'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>.IPA Fájl & Sideloading</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 text-xs max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: PWA & Calendar (The easy, zero-setup way) */}
          {activeTab === 'pwa' && (
            <>
              {/* Quick Highlight Box */}
              <div className="bg-gradient-to-r from-emerald-950/60 to-teal-950/40 border border-emerald-500/40 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    99%-ban megegyezik a natív .IPA élménnyel, hátrányok nélkül!
                  </h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    A PWA hozzáadható a kezdőképernyőre, saját ikonnal nyílik meg, teljes képernyőn fut (safari címsor nélkül), nem jár le 7 nap után a tanúsítványa, és offline is működik.
                  </p>
                </div>
              </div>

              {/* Option A: Sync with Apple Calendar */}
              <div className="bg-slate-850/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">1. Apple Naptár szinkronizáció</h5>
                    <p className="text-[11px] text-slate-400">Összes óra, terem (E.C.I.124, 110...), oktató és emlékeztetők</p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300">
                  Koppints a gombra, és az iPhone automatikusan megkérdezi: <em>„Hozzáadja mindet a Naptárhoz?”</em>
                </p>

                <button
                  onClick={() => {
                    onDownloadIcs();
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>Órarend hozzáadása az iPhone Naptárhoz (.ics)</span>
                </button>
              </div>

              {/* Option B: Add to Home Screen (PWA Icon) */}
              <div className="bg-slate-850/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">2. Hozzáadás a Kezdőképernyőhöz</h5>
                    <p className="text-[11px] text-slate-400">Asztali ikon, teljes képernyő, offline működés</p>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <p className="text-[11px] text-slate-300">Nyisd meg ezt az oldalt az iPhone Safari böngészőjében.</p>
                  </div>
                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <p className="text-[11px] text-slate-300 flex items-center gap-1.5 flex-wrap">
                      Koppints a Safari alsó sávjában a 
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 text-blue-400 font-semibold border border-slate-700">
                        <Share2 className="w-3 h-3 inline" /> Megosztás
                      </span> gombra.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <p className="text-[11px] text-slate-300 flex items-center gap-1.5 flex-wrap">
                      Válaszd a 
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-semibold border border-slate-700">
                        <PlusSquare className="w-3 h-3 inline" /> Főképernyőhöz adás
                      </span> lehetőséget.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: .IPA & Capacitor Details */}
          {activeTab === 'ipa' && (
            <div className="space-y-4">
              {/* Explanation box */}
              <div className="bg-blue-950/30 border border-blue-500/40 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-blue-300 font-bold text-xs">
                  <Package className="w-4 h-4 text-blue-400" />
                  <span>Igen, átalakítható valódi .IPA fájllá!</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Az Apple iOS rendszere a webes kódokat a <strong>Capacitor (Ionic)</strong> technológiával csomagolja be natív iOS appá (Xcode projekt), amiből <code className="text-blue-300 font-mono">.ipa</code> fájl generálható.
                </p>
              </div>

              {/* Crucial iOS limitation callout */}
              <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-3.5 space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Amit tudnod kell az .IPA fájlokról iPhone-on:</span>
                </div>
                <p className="text-amber-200/90 leading-relaxed">
                  Az Apple biztonsági szabályai miatt egy .IPA fájl <strong>nem telepíthető úgy, mint Androidon az .APK</strong>. Az alábbiak egyike szükséges hozzá:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                  <li><strong>AltStore vagy Sideloadly</strong> (ingyenes Apple ID-val, de 7 naponta újra kell szignózni a gépről).</li>
                  <li><strong>Apple Developer előfizetés</strong> ($99/év) a TestFlight-hoz vagy App Store-hoz.</li>
                  <li><strong>TrollStore</strong> (csak régebbi, sebezhető iOS verziókon).</li>
                </ul>
              </div>

              {/* Ready config */}
              <div className="bg-slate-850 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-white text-xs block flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  Már előkészítettük a projektedben:
                </span>
                <p className="text-slate-300 text-[11px]">
                  Létrehoztuk a <code className="text-emerald-400 font-mono">capacitor.config.json</code> fájlt és a <code className="text-emerald-400 font-mono">.github/workflows/build-ios.yml</code> automatizációt, ami GitHubon ingyenes macOS gépen lefordítja az IPA-t.
                </p>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-[10px] text-slate-300">
                  <span className="truncate pr-2">npm run build && npx cap add ios</span>
                  <button
                    onClick={handleCopyCommand}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0"
                    title="Parancs másolása"
                  >
                    {copiedCommand ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl text-[11px] text-emerald-200">
                💡 <strong>Jó tanács:</strong> Ha nem szeretnél 7 naponta számítógéphez dugva szignózni (AltStore), használd a bal oldali fülön lévő <strong>„Főképernyőhöz adás”</strong> opciót. Pontosan ugyanúgy néz ki és viselkedik, mint egy .IPA-ból telepített app!
              </div>
            </div>
          )}

          {/* Copy link to send to iPhone */}
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between gap-3 pt-3">
            <div className="truncate">
              <span className="text-[10px] text-slate-400 block font-medium">Link megnyitása iPhone-on:</span>
              <span className="text-slate-300 font-mono text-[11px] truncate block max-w-[280px]">
                {currentUrl}
              </span>
            </div>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs border border-slate-700 flex items-center gap-1.5 shrink-0 transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Kimásolva!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Link másolása</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-850/80 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold transition-colors"
          >
            Bezárás
          </button>
        </div>
      </div>
    </div>
  );
};

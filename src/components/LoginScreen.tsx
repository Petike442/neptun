import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  LogIn, 
  ShieldCheck, 
  AlertCircle, 
  KeyRound, 
  Calendar
} from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (user: { username: string; name: string; role: string }) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  // Empty initially - nothing is prefilled in the username field
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanUser = username.trim().toUpperCase();
      const cleanPass = password.trim();

      // Check admin credentials
      const isValidPass = cleanPass === 'Fruzsina23.,' || cleanPass === 'Fruzsina23.';
      if (cleanUser === 'BKIBPG' && isValidPass) {
        const userObj = {
          username: 'BKIBPG',
          name: 'Chief Peti (Admin)',
          role: 'Admin / Hallgató',
        };

        if (rememberMe) {
          localStorage.setItem('neptun_user_session', JSON.stringify(userObj));
        } else {
          sessionStorage.setItem('neptun_user_session', JSON.stringify(userObj));
        }

        onLoginSuccess(userObj);
      } else {
        setIsLoading(false);
        setError('Hibás felhasználónév vagy jelszó! Kérlek ellenőrizd az adataidat.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Background glow decorations */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* University / App Logo & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 items-center justify-center shadow-xl shadow-emerald-500/20 text-slate-950 mb-3 font-bold ring-4 ring-slate-850">
            <Calendar className="w-8 h-8 text-slate-950" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Neptun Órarend Rendszer
          </h1>
          <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Informatika BSc • Hallgatói Belépési Kapu</span>
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8">
          
          <div className="mb-6 pb-4 border-b border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              Bejelentkezés
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add meg a Neptun azonosítódat és jelszavadat a hozzáféréshez.
            </p>
          </div>

          {error && (
            <div className="mb-5 bg-rose-950/70 border border-rose-500/40 text-rose-200 p-3 rounded-2xl text-xs flex items-start gap-2.5 animate-in shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <span className="font-bold block text-rose-300">Sikertelen belépés</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username / Neptun Code */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Neptun kód / Felhasználónév
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toUpperCase())}
                  placeholder="Neptun kód"
                  required
                  autoCapitalize="characters"
                  autoComplete="username"
                  autoFocus
                  className="w-full bg-slate-950/80 border border-slate-750 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white font-mono text-sm rounded-2xl pl-10 pr-4 py-2.5 outline-none transition-all placeholder:text-slate-600 uppercase"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Jelszó
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Jelszó"
                  required
                  autoComplete="current-password"
                  className="w-full bg-slate-950/80 border border-slate-750 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white font-mono text-sm rounded-2xl pl-10 pr-11 py-2.5 outline-none transition-all placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500/30 accent-emerald-500 cursor-pointer"
                />
                <span className="text-xs text-slate-300">Bejelentkezve maradok ezen az eszközön</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Azonosítás folyamatban...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Belépés az Órarendbe</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-slate-500 mt-6">
          Biztonságos kapcsolat • 2026. Őszi Szemeszter • iPhone PWA Támogatás
        </p>

      </div>
    </div>
  );
};

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, ShieldCheck, ArrowRight, Sun, Moon, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@balaji.com');
  const [password, setPassword] = useState('Admin@1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isDark, setIsDark] = useState(true);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email || !password) {
      setError('Please enter both email address and password.');
      return;
    }

    setLoading(true);

    try {
      // Call Node.js Backend Login API
      const response = await authApi.login({ email, password });

      if (response && response.success && response.data) {
        const { token, user } = response.data;
        // Save to AuthContext and localStorage
        login(user, token);
        setSuccessMsg(response.message || 'Login successful! Redirecting...');
      } else {
        setError(response?.message || 'Login failed. Please verify your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      const serverMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Unable to connect to backend server. Please check if Node.js server is running on port 5000.';
      setError(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* 1. UNIFIED FULL-SCREEN BACKGROUND: Model image smoothly fades across the ENTIRE screen */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2000&q=85"
          alt="Balaji Cosmetics & Jewellery Collection"
          className="w-full h-full object-cover object-center lg:object-left filter brightness-[0.75] transition-all duration-700"
        />

        {/* Seamless smooth gradient overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDark
              ? 'bg-gradient-to-r from-slate-950/70 via-slate-950/85 to-slate-950/95'
              : 'bg-gradient-to-r from-rose-950/60 via-stone-900/80 to-stone-950/95'
          }`}
        />

        {/* Ambient subtle rose & amber luxury glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Theme Switcher Toggle (Top Right) */}
      <div className="absolute top-6 right-6 z-30">
        <button
          type="button"
          onClick={() => setIsDark(!isDark)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold border border-white/15 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition shadow-lg cursor-pointer"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-300" />
              <span>Warm Tone</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-rose-300" />
              <span>Midnight Tone</span>
            </>
          )}
        </button>
      </div>

      {/* 2. UNIFIED CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Side: Brand Story & Highlights */}
        <div className="w-full lg:w-1/2 space-y-6 text-left">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-rose-200 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Balaji Cutlery & Cosmetics</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Manage Smarter.{' '}
            <span className="bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200 bg-clip-text text-transparent">
              Grow Faster.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Centralized admin portal for managing your boutique catalog: designer bangles, bridal imitation jewellery, skincare cosmetics & premium fragrances.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-rose-100/90 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Variant Matrix (Size, Shades, ML)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Low-stock & Restock Alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Automated Invoice & GST Reports</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Order Tracking & Customer CRM</span>
            </div>
          </div>
        </div>

        {/* Right Side: Seamless Frosted Glass Form */}
        <div className="w-full lg:w-5/12 max-w-md">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/15 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/80 space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-300/90 bg-rose-500/15 px-3 py-1 rounded-full border border-rose-400/20 inline-block mb-2">
                Administrator
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Sign In
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Enter your credentials to manage your store
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-200 text-xs flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Notification */}
            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-200 text-xs flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-rose-300 transition">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@balaji.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-white/15 text-white placeholder-slate-400 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 focus:bg-slate-950/80 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Please contact the super administrator to reset your password.');
                    }}
                    className="text-xs text-rose-300 hover:text-rose-200 font-medium transition"
                  >
                    Forgot?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-rose-300 transition">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-950/60 border border-white/15 text-white placeholder-slate-400 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 focus:bg-slate-950/80 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-slate-950 text-rose-600 focus:ring-rose-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-300">Remember this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 shadow-lg shadow-rose-950/60 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Security Info */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Secured</span>
              </div>
              <div>
                Endpoint: <span className="font-mono text-rose-300">/api/auth/login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

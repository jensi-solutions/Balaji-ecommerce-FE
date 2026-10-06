import { AuthProvider, useAuth } from './context/AuthContext';
import AdminLogin from './pages/AdminLogin';
import { LogOut, User, ShieldCheck, Sparkles } from 'lucide-react';

function AdminPortal() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top Admin Navbar */}
      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Balaji Cutlery & Cosmetics</h1>
            <p className="text-[11px] text-rose-300 font-medium">Admin Control Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <User className="w-4 h-4 text-rose-400" />
            <span className="font-semibold text-white">
              {user?.first_name} {user?.last_name}
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider">
              {user?.role?.role_name || 'Admin'}
            </span>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Authenticated Dashboard */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 sm:p-10 space-y-8">
        <div className="bg-gradient-to-r from-rose-950/60 via-slate-900/80 to-amber-950/40 p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>JWT Authentication Successful</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Welcome back, {user?.first_name} {user?.last_name}!
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              You are successfully authenticated. Your JWT session token is active and securely attached to all subsequent API requests.
            </p>
          </div>
        </div>

        {/* User Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-2">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Email Address</div>
            <div className="font-semibold text-white text-sm">{user?.email}</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-2">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Phone Number</div>
            <div className="font-semibold text-white text-sm">{user?.phone_number || 'N/A'}</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-2">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Admin Role</div>
            <div className="font-semibold text-rose-300 text-sm">{user?.role?.role_name || 'Admin'}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AdminPortal />
    </AuthProvider>
  );
}

export default App;

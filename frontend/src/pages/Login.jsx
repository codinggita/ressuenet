import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowRight, Sparkles, Activity } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const submit = async (event) => {
    event.preventDefault();

    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back to RescueHub.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden flex items-center justify-center py-20 px-4">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 glass-card overflow-hidden rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-surface-container-high/50"
      >
        {/* Left Side: Cinematic Visual */}
        <div className="relative hidden lg:block overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200"
            alt="Rescue Intelligence"
            className="absolute inset-0 h-full w-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white mb-4">
              <ShieldCheck size={14} />
              Secure Intelligence Hub
            </div>
            <h2 className="text-white font-display text-3xl font-black leading-tight">
              Powering the next generation of animal welfare.
            </h2>
          </div>
        </div>

        {/* Right Side: Authentication Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Activity size={24} />
            </div>
            <h1 className="font-display text-3xl font-black tracking-tight text-on-surface mb-3">Welcome Back</h1>
            <p className="text-on-surface-variant/80 font-medium">Access your rescue telemetry and coordination dashboard.</p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="space-y-4">
              <label className="block space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Terminal ID (Email)</span>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                    placeholder="Enter rescue ID..."
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Access Key (Password)</span>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-4 pl-12 pr-14 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                    placeholder="Enter access key..."
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl flex items-center justify-center text-on-surface-variant/40 hover:bg-surface-container-high transition-all"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-end">
              <button type="button" className="text-xs font-black text-primary hover:underline uppercase tracking-widest">
                Recover Access Key?
              </button>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full group flex items-center justify-center gap-3 rounded-2xl bg-primary py-5 text-sm font-black text-on-primary shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Activity size={18} className="animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <>
                  Establish Connection
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-surface-container-high/50 text-center">
            <p className="text-sm font-medium text-on-surface-variant">
              Unauthorized in the hub?{' '}
              <Link to="/register" className="font-black text-primary hover:underline underline-offset-4">
                Initialize Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

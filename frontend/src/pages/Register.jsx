import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building2, Mail, Phone, MapPin, Lock, Activity, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);
  const [accountType, setAccountType] = useState('Individual');
  const [formData, setFormData] = useState({
    organizationName: '',
    fullName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  const submit = async (event) => {
    event.preventDefault();

    try {
      await register({ ...formData, accountType });
      toast.success('Onboarding complete. Welcome to the network.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Initialization failed.');
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden flex items-center justify-center py-24 px-4">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary mb-6">
            <ShieldCheck size={14} />
            Network Onboarding
          </div>
          <h1 className="font-display text-4xl font-black tracking-tight text-on-surface mb-4">Initialize Rescue Account</h1>
          <p className="text-on-surface-variant/80 font-medium max-w-md mx-auto">
            Choose your clearance level and provide your credentials to join the global rescue coordination grid.
          </p>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-surface-container-high/50 shadow-2xl shadow-primary/5">
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-surface-container-low rounded-2xl mb-10 border border-outline-variant/10">
            {[
              { id: 'Individual', icon: User, label: 'Citizen Responder' },
              { id: 'NGO', icon: Building2, label: 'Verified NGO' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setAccountType(type.id)}
                className={`relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  accountType === type.id 
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <type.icon size={14} />
                {type.label}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <AnimatePresence mode="wait">
                {accountType === 'NGO' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:col-span-2 overflow-hidden"
                  >
                    <label className="block space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Organization Name</span>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                        <input
                          className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                          required
                          value={formData.organizationName}
                          onChange={(e) => updateField('organizationName', e.target.value)}
                          placeholder="e.g. Hope Paws Foundation"
                        />
                      </div>
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>

              <label className="block space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Full Name</span>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                    required
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Terminal ID (Email)</span>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="name@agency.com"
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Contact (Phone)</span>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                    required
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Sector (City)</span>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                    required
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="Enter your city"
                  />
                </div>
              </label>

              <label className="block space-y-2 md:col-span-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Access Key (Password)</span>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="Create a strong access key..."
                  />
                </div>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full group flex items-center justify-center gap-3 rounded-2xl bg-primary py-5 text-sm font-black text-on-primary shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Activity size={18} className="animate-spin" />
                  Initializing Grid...
                </span>
              ) : (
                <>
                  Initialize Account
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-surface-container-high/50 text-center">
            <p className="text-sm font-medium text-on-surface-variant">
              Already registered in the hub?{' '}
              <Link to="/login" className="font-black text-primary hover:underline underline-offset-4">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

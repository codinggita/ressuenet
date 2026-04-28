import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
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
      toast.success('Welcome back.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-88px)] max-w-6xl items-center gap-8 px-4 py-28 md:px-6 lg:grid-cols-2">
      <section className="hidden rounded-[32px] overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200"
          alt="Sanctuary"
          className="h-[620px] w-full object-cover"
        />
      </section>

      <section className="rounded-[28px] border border-outline-variant/10 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Secure sign in</p>
        <h1 className="mt-2 text-3xl font-black">Welcome back</h1>
        <p className="mt-2 text-sm text-on-surface-variant">Access your rescue dashboard, saved pets, and donation history.</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Email</span>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                className="input-field pl-11"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                placeholder="name@example.com"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Password</span>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                className="input-field pl-11 pr-11"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                placeholder="Enter password"
              />
              <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <button type="submit" disabled={loading} className="btn-primary mt-2 w-full justify-center">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-sm text-on-surface-variant">
          New here?{' '}
          <Link to="/register" className="font-bold text-primary">
            Create an account
          </Link>
        </p>
      </section>
    </div>
  );
}

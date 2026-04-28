import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
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
      toast.success('Account created.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-28 md:px-6">
      <div className="rounded-[28px] border border-outline-variant/10 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Account setup</p>
        <h1 className="mt-2 text-3xl font-black">Create your RescuePulse account</h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Choose whether you are joining as an individual or NGO unit, then connect to the live backend auth flow.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-surface-container-low p-1">
          {['Individual', 'NGO'].map((type) => (
            <button
              key={type}
              onClick={() => setAccountType(type)}
              className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
                accountType === type ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
          {accountType === 'NGO' ? (
            <input
              className="input-field md:col-span-2"
              placeholder="Organization name"
              value={formData.organizationName}
              onChange={(event) => setFormData((current) => ({ ...current, organizationName: event.target.value }))}
            />
          ) : null}
          <input className="input-field" placeholder="Full name" value={formData.fullName} onChange={(event) => setFormData((current) => ({ ...current, fullName: event.target.value }))} />
          <input className="input-field" type="email" placeholder="Email" value={formData.email} onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))} />
          <input className="input-field" placeholder="Phone" value={formData.phone} onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))} />
          <input className="input-field" placeholder="City" value={formData.city} onChange={(event) => setFormData((current) => ({ ...current, city: event.target.value }))} />
          <input className="input-field md:col-span-2" type="password" placeholder="Password" value={formData.password} onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))} />
          <button type="submit" disabled={loading} className="btn-primary md:col-span-2 w-full justify-center">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-5 text-sm text-on-surface-variant">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

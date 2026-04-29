import { useEffect, useState } from 'react';
import { HeartHandshake, ReceiptText, Wallet, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { donationService } from '../services';

const presetAmounts = [250, 500, 1000, 2500];

export default function Donation() {
  const [stats, setStats] = useState(null);
  const [amount, setAmount] = useState(500);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    donationService.getStats()
      .then((response) => setStats(response.data))
      .catch(() => null);
  }, []);

  const submitDonation = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error('Please choose a valid donation amount.');
      return;
    }

    try {
      setLoading(true);
      const created = await donationService.createDonation({
        amount: Number(amount),
        donorName,
        donorEmail,
        paymentMethod,
        purpose: 'General Rescue Fund',
      });

      await donationService.verifyDonation({
        donationId: created.data.donation._id,
        paymentId: `demo_${Date.now()}`,
      });

      toast.success('Test donation completed and receipt generated.');
      setDonorName('');
      setDonorEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to process donation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-surface overflow-hidden pt-28 pb-20">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-secondary/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary">
                <HeartHandshake size={14} />
                Global Support Fund
              </div>
              <h1 className="mt-8 font-display text-5xl font-black tracking-tight text-on-surface md:text-6xl leading-[1.1]">
                Empower the <br /><span className="text-primary italic">Rescue Network.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-on-surface-variant/80">
                Your contributions fuel emergency medical care, high-fidelity transport systems, and state-of-the-art sanctuary management protocols across India.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { label: 'Total Raised', value: `₹${(stats?.totalRaised ?? 0).toLocaleString()}`, icon: Wallet, color: 'bg-primary/20 text-primary' },
                { label: 'Donations', value: stats?.successfulDonations ?? 0, icon: Heart, color: 'bg-secondary/20 text-secondary-fixed-dim' },
                { label: 'Verification', value: 'Auto-Sync', icon: ReceiptText, color: 'bg-emerald-500/20 text-emerald-500' }
              ].map((stat) => (
                <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-soft border border-surface-container-high/50 group hover:bg-on-surface transition-colors">
                  <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon size={20} />
                  </div>
                  <div className="text-2xl font-black text-on-surface group-hover:text-white transition-colors">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-hover:text-white/40 transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] bg-on-surface p-8 text-white shadow-xl relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               <div className="relative z-10 flex items-center gap-6">
                 <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Sparkles size={32} className="text-primary-fixed" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black mb-1 text-white">Direct Impact Mode</h3>
                    <p className="text-sm text-white/60 leading-relaxed font-medium">100% of community contributions are deployed directly to frontline responders and medical supplies.</p>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Donation Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-[3rem] border border-white/40 bg-white/60 p-8 shadow-glass backdrop-blur-xl"
          >
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-black text-on-surface">Secure Contribution</h2>
              
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Select Amount</label>
                <div className="grid grid-cols-2 gap-4">
                  {presetAmounts.map((value) => (
                    <button
                      key={value}
                      onClick={() => setAmount(value)}
                      className={`rounded-2xl py-4 text-sm font-black transition-all active:scale-95 ${
                        Number(amount) === value 
                          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                          : 'bg-white text-on-surface border border-outline-variant/10 hover:border-primary/40'
                      }`}
                    >
                      ₹{value}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(event) => setAmount(event.target.value)} 
                    placeholder="Custom Amount (INR)" 
                    className="w-full bg-white border border-outline-variant/10 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <input 
                    value={donorName} 
                    onChange={(event) => setDonorName(event.target.value)} 
                    placeholder="Full Name" 
                    className="w-full bg-white border border-outline-variant/10 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <input 
                    value={donorEmail} 
                    onChange={(event) => setDonorEmail(event.target.value)} 
                    placeholder="Email Address" 
                    className="w-full bg-white border border-outline-variant/10 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <select 
                    value={paymentMethod} 
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    className="w-full bg-white border border-outline-variant/10 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm appearance-none cursor-pointer"
                  >
                    <option>UPI</option>
                    <option>Card</option>
                    <option>Net Banking</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={submitDonation} 
                disabled={loading} 
                className="w-full group flex items-center justify-center gap-3 rounded-[2rem] bg-primary py-5 text-lg font-black text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Donate ₹${amount}`}
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
              
              <p className="text-center text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
                Secure 256-bit Encrypted Transaction
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

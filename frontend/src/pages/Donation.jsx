import { useEffect, useState } from 'react';
import { HeartHandshake, ReceiptText, Wallet } from 'lucide-react';
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
    donationService.getStats().then((response) => setStats(response.data)).catch(() => null);
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
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to process donation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-28 md:px-6 md:pt-32">
      <section className="grid gap-6 rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div className="space-y-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Donation flow</p>
          <h1 className="text-3xl font-black md:text-4xl">Fund care, transport, treatment, and shelter</h1>
          <p className="max-w-2xl text-sm text-on-surface-variant md:text-base">
            This page now uses the backend donation APIs. In local mode it completes a safe demo verification flow so you
            can test end-to-end before adding live payment credentials.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-surface-container-low p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Wallet className="h-5 w-5" />
              </div>
              <div className="text-xl font-black">INR {(stats?.totalRaised ?? 0).toLocaleString()}</div>
              <div className="text-sm text-on-surface-variant">Raised through recorded successes</div>
            </div>
            <div className="rounded-2xl bg-surface-container-low p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div className="text-xl font-black">{stats?.successfulDonations ?? 0}</div>
              <div className="text-sm text-on-surface-variant">Successful donations</div>
            </div>
            <div className="rounded-2xl bg-surface-container-low p-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ReceiptText className="h-5 w-5" />
              </div>
              <div className="text-xl font-black">Auto receipts</div>
              <div className="text-sm text-on-surface-variant">Generated from backend data</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-5">
          <div className="space-y-4">
            <h2 className="text-2xl font-black">Make a test donation</h2>
            <div className="grid grid-cols-2 gap-3">
              {presetAmounts.map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    Number(amount) === value ? 'bg-primary text-on-primary' : 'bg-white text-on-surface'
                  }`}
                >
                  INR {value}
                </button>
              ))}
            </div>
            <input className="input-field" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Custom amount" />
            <input className="input-field" value={donorName} onChange={(event) => setDonorName(event.target.value)} placeholder="Your name" />
            <input className="input-field" value={donorEmail} onChange={(event) => setDonorEmail(event.target.value)} placeholder="Your email" />
            <select className="input-field" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
              <option>UPI</option>
              <option>Card</option>
              <option>Net Banking</option>
            </select>
            <button onClick={submitDonation} disabled={loading} className="btn-primary w-full justify-center">
              {loading ? 'Processing donation...' : `Donate INR ${amount}`}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

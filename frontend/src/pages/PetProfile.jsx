import { useEffect, useState } from 'react';
import { Heart, MapPinned, ShieldCheck, ArrowLeft, Send, CheckCircle2, Info, Sparkles, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLoader } from '../components/Loader';
import { adoptionService } from '../services';
import { useAuthStore } from '../store/authStore';

export default function PetProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState(null);
  const [similarPets, setSimilarPets] = useState([]);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    message: '',
  });

  useEffect(() => {
    setLoading(true);
    adoptionService
      .getPetById(id)
      .then((response) => {
        setPet(response.data.pet);
        setSimilarPets(response.data.similarPets || []);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || 'Unable to load pet profile.');
        navigate('/adopt');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const submitApplication = async (event) => {
    event.preventDefault();
    if (!user) {
      toast.error('Please log in to submit an application.');
      return;
    }

    try {
      await adoptionService.submitApplication({
        petId: pet._id,
        ...formData,
      });
      toast.success('Adoption application submitted successfully!');
      setFormData((current) => ({ ...current, message: '' }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to submit application.');
    }
  };

  if (loading) {
    return <PageLoader label="Fetching profile from network..." />;
  }

  if (!pet) return null;

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Navigation Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/adopt" className="inline-flex items-center gap-2 text-sm font-black text-on-surface-variant/60 hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            Back to Registry
          </Link>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Main Profile Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            {/* Cinematic Image Gallery (Main) */}
            <div className="relative group overflow-hidden rounded-[3.5rem] shadow-2xl">
              <img
                src={pet.images?.[0] || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80'}
                alt={pet.name}
                className="h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 flex gap-3">
                <div className="rounded-full bg-primary-fixed px-6 py-2 text-xs font-black uppercase tracking-widest text-on-primary-fixed backdrop-blur-xl">
                  {pet.adoptionStatus}
                </div>
                <div className="rounded-full bg-white/20 border border-white/20 px-6 py-2 text-xs font-black uppercase tracking-widest text-white backdrop-blur-xl">
                  {pet.species}
                </div>
              </div>
            </div>

            {/* Profile Information Card */}
            <div className="glass-card p-10 md:p-12 rounded-[3.5rem] border border-surface-container-high/50">
              <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                <div>
                  <h1 className="font-display text-5xl font-black tracking-tight text-on-surface">{pet.name}</h1>
                  <p className="mt-2 text-lg font-bold text-primary italic">{pet.breed || pet.species}</p>
                </div>
                <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/20">
                  <Heart className="h-7 w-7" />
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mb-10">
                {[
                  { icon: MapPinned, label: pet.city || 'National Registry' },
                  { icon: Activity, label: pet.ageLabel || `${pet.age} Years Old` },
                  { icon: ShieldCheck, label: pet.size },
                  { icon: Info, label: pet.gender }
                ].map((tag, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl bg-surface-container-low px-5 py-3 text-sm font-black text-on-surface-variant">
                    <tag.icon size={18} className="text-primary" />
                    {tag.label}
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h3 className="font-display text-xl font-black text-on-surface flex items-center gap-2">
                  <Sparkles className="text-primary" size={20} />
                  Story & Personality
                </h3>
                <p className="text-lg leading-relaxed text-on-surface-variant/80 font-medium">
                  {pet.description}
                </p>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl bg-surface-container-low/50 p-6 border border-surface-container-high/30">
                  <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                    <Activity size={16} />
                    Vital Stats
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-on-surface-variant/40">Vaccinated</span>
                      <span className={pet.healthStatus?.vaccinated ? 'text-emerald-500' : 'text-on-surface-variant/60'}>
                        {pet.healthStatus?.vaccinated ? 'Certified' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-on-surface-variant/40">Neutered</span>
                      <span className={pet.healthStatus?.neutered ? 'text-emerald-500' : 'text-on-surface-variant/60'}>
                        {pet.healthStatus?.neutered ? 'Certified' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-3xl bg-surface-container-low/50 p-6 border border-surface-container-high/30">
                  <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                    <CheckCircle2 size={16} />
                    Shelter Verification
                  </div>
                  <p className="text-sm font-bold text-on-surface-variant/80 leading-relaxed">
                    This profile is verified by the <span className="text-primary">National Rescue Network</span>. 
                    Immediate health records available on request.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar - Application Form */}
          <aside className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 md:p-10 rounded-[3rem] border-2 border-primary/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 bg-primary/5 blur-[60px] rounded-full" />
              
              <h2 className="relative z-10 font-display text-3xl font-black text-on-surface">Start Adoption</h2>
              <p className="relative z-10 mt-3 text-sm font-medium text-on-surface-variant/60 leading-relaxed">
                Your application will be routed directly to the verified rescue center managing {pet.name}'s care.
              </p>

              <form onSubmit={submitApplication} className="relative z-10 mt-8 space-y-4">
                <div className="space-y-4">
                  <input 
                    className="w-full rounded-2xl bg-surface-container-low px-6 py-4 text-sm font-bold text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/20" 
                    placeholder="Full Name" 
                    value={formData.fullName} 
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))} 
                  />
                  <input 
                    className="w-full rounded-2xl bg-surface-container-low px-6 py-4 text-sm font-bold text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/20" 
                    type="email" 
                    placeholder="Email Address" 
                    value={formData.email} 
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} 
                  />
                  <textarea 
                    className="w-full rounded-2xl bg-surface-container-low px-6 py-4 text-sm font-bold text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary/20 min-h-[140px] resize-none" 
                    placeholder="Why are you a good fit for this companion?" 
                    value={formData.message} 
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} 
                  />
                </div>

                <button 
                  type="submit" 
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-on-surface py-5 text-sm font-black text-white hover:bg-primary transition-all shadow-xl hover:shadow-primary/20"
                >
                  Submit Application
                  <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
            </motion.div>

            {/* Similar Connections */}
            {similarPets.length > 0 && (
              <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-8 rounded-[3rem] border border-surface-container-high/50"
              >
                <h3 className="font-display text-xl font-black text-on-surface mb-6">Similar Companions</h3>
                <div className="space-y-4">
                  {similarPets.slice(0, 3).map((item) => (
                    <Link 
                      key={item._id} 
                      to={`/adopt/${item._id}`} 
                      className="flex items-center gap-4 rounded-2xl bg-surface-container-low p-4 transition-all hover:bg-white hover:shadow-lg group"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-on-surface">
                        <img src={item.images?.[0]} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-black text-on-surface group-hover:text-primary transition-colors">{item.name}</div>
                        <div className="text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest">{item.breed || item.species}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

import { Heart, Search, Filter, ArrowRight, Activity, MapPinned, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import EmptyState from '../components/EmptyState';
import { CardSkeleton } from '../components/Loader';
import { adoptionService } from '../services';
import { useAuthStore } from '../store/authStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

export default function Adopt() {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  
  // Parse initial search term from URL
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialTerm = queryParams.get('term') || '';

  const [filters, setFilters] = useState({
    term: initialTerm,
    species: '',
    city: '',
    status: 'Available',
  });

  // Update filters if URL changes
  useEffect(() => {
    const term = queryParams.get('term');
    if (term !== null) {
      setFilters(prev => ({ ...prev, term }));
    }
  }, [queryParams]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await adoptionService.getPets({
          term: filters.term || undefined,
          species: filters.species || undefined,
          city: filters.city || undefined,
          status: filters.status || undefined,
          limit: 18,
        });
        setPets(response.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Unable to load adoption pets.');
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [filters]);

  const availableCount = useMemo(
    () => pets.filter((pet) => pet.adoptionStatus === 'Available').length,
    [pets]
  );

  const toggleFavorite = async (petId) => {
    if (!user) {
      toast.error('Please log in to save favorites.');
      return;
    }

    try {
      await adoptionService.addFavorite(petId);
      toast.success('Added to favorites.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to save favorite.');
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header Section */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12 overflow-hidden rounded-[3.5rem] bg-on-surface p-10 md:p-16 text-white"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="absolute -right-20 -top-20 h-64 w-64 bg-primary/20 blur-[100px] rounded-full" />
          
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary-fixed">
                <Sparkles size={14} />
                Voices Waiting for a Home
              </div>
              <h1 className="font-display text-4xl font-black md:text-6xl tracking-tight">
                Find Your <span className="text-primary-fixed italic">Companion.</span>
              </h1>
              <p className="max-w-2xl text-lg text-white/60 leading-relaxed font-medium">
                Every animal here has a story of resilience. Our network connects verified shelters 
                with compassionate homes to ensure a lifetime of care.
              </p>
            </div>
            
            <div className="glass-dark border-white/10 p-8 rounded-[2.5rem] min-w-[280px]">
              <div className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">Network Status</div>
              <div className="flex items-end gap-3">
                <div className="text-5xl font-black text-primary-fixed leading-none">{availableCount}</div>
                <div className="text-xs font-bold text-white/60 pb-1">Verified Profiles</div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Feed Active
              </div>
            </div>
          </div>
        </motion.section>

        {/* Filters Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 glass-card p-4 md:p-6 rounded-[2.5rem] border border-surface-container-high/50"
        >
          <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" size={20} />
              <input
                className="w-full rounded-2xl bg-surface-container-low px-12 py-4 text-sm font-bold text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Search name, breed, or traits..."
                value={filters.term}
                onChange={(e) => setFilters(prev => ({ ...prev, term: e.target.value }))}
              />
            </div>
            
            <div className="relative">
              <select 
                className="w-full appearance-none rounded-2xl bg-surface-container-low px-6 py-4 text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                value={filters.species} 
                onChange={(e) => setFilters(prev => ({ ...prev, species: e.target.value }))}
              >
                <option value="">All Species</option>
                <option value="Dog">Dogs</option>
                <option value="Cat">Cats</option>
                <option value="Bird">Birds</option>
                <option value="Rabbit">Rabbits</option>
              </select>
            </div>

            <div className="relative group">
              <MapPinned className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                className="w-full rounded-2xl bg-surface-container-low px-12 py-4 text-sm font-bold text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                value={filters.city} 
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))} 
                placeholder="Filter by City" 
              />
            </div>

            <div className="relative">
              <select 
                className="w-full appearance-none rounded-2xl bg-surface-container-low px-6 py-4 text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                value={filters.status} 
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="Available">Available Only</option>
                <option value="Pending">Pending Adoption</option>
                <option value="Adopted">Adopted</option>
                <option value="">All Statuses</option>
              </select>
            </div>
          </div>
        </motion.section>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[500px] rounded-[3rem] bg-surface-container-low animate-pulse" />
              ))}
            </motion.div>
          ) : pets.length ? (
            <motion.div 
              key="results"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {pets.map((pet) => (
                <motion.article 
                  key={pet._id} 
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="group overflow-hidden rounded-[3rem] bg-white shadow-soft border border-surface-container-high/50 hover:shadow-2xl transition-all"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={pet.images?.[0] || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80'}
                      alt={pet.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute right-6 top-6 flex flex-col gap-2">
                      <button
                        onClick={() => toggleFavorite(pet._id)}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-primary shadow-xl backdrop-blur-md transition hover:bg-primary hover:text-white"
                      >
                        <Heart className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="absolute left-6 bottom-6 flex gap-2">
                      <span className="rounded-full bg-primary-fixed px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-on-primary-fixed backdrop-blur-md">
                        {pet.species}
                      </span>
                      <span className="rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-on-surface backdrop-blur-md">
                        {pet.adoptionStatus}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="font-display text-2xl font-black text-on-surface">{pet.name}</h2>
                        <p className="text-sm font-bold text-on-surface-variant/60">{pet.breed || pet.species}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-black text-primary uppercase tracking-widest">
                        <MapPinned size={14} />
                        {pet.city || 'Remote'}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="rounded-xl bg-surface-container-low px-3 py-1.5 text-[10px] font-bold text-on-surface-variant/80">{pet.ageLabel || `${pet.age}Y`}</span>
                      <span className="rounded-xl bg-surface-container-low px-3 py-1.5 text-[10px] font-bold text-on-surface-variant/80">{pet.size}</span>
                      <span className="rounded-xl bg-surface-container-low px-3 py-1.5 text-[10px] font-bold text-on-surface-variant/80">{pet.gender}</span>
                    </div>

                    <p className="line-clamp-2 text-sm text-on-surface-variant/70 leading-relaxed mb-8">
                      {pet.description}
                    </p>

                    <Link 
                      to={`/adopt/${pet._id}`} 
                      className="group/btn flex items-center justify-center gap-3 rounded-[1.5rem] bg-on-surface py-4 text-sm font-black text-white transition-all hover:bg-primary hover:shadow-xl"
                    >
                      Meet {pet.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20"
            >
              <EmptyState
                title="No companions found"
                message="Try broadening your search or checking a different city. New profiles are added daily."
                icon="🐾"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { Heart, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { CardSkeleton } from '../components/Loader';
import { adoptionService } from '../services';
import { useAuthStore } from '../store/authStore';

export default function Adopt() {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({
    term: '',
    species: '',
    city: '',
    status: 'Available',
  });

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
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 md:px-6 md:pt-32">
      <section className="mb-8 grid gap-6 rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto] md:p-8">
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Adoption search</p>
          <h1 className="text-3xl font-black md:text-4xl">Find a rescue companion</h1>
          <p className="max-w-2xl text-sm text-on-surface-variant md:text-base">
            Browse live adoption data from the backend, filter by city and species, and save pets you want to revisit.
          </p>
        </div>
        <div className="rounded-2xl bg-surface-container-low p-4 md:min-w-[220px]">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Available now</div>
          <div className="mt-2 text-3xl font-black text-primary">{availableCount}</div>
          <div className="mt-1 text-sm text-on-surface-variant">Pets currently marked available</div>
        </div>
      </section>

      <section className="mb-8 grid gap-3 rounded-2xl border border-outline-variant/10 bg-white p-4 shadow-sm md:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr]">
        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Search</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
            <input
              className="input-field pl-10"
              placeholder="Name, breed, personality"
              value={filters.term}
              onChange={(event) => setFilters((current) => ({ ...current, term: event.target.value }))}
            />
          </div>
        </label>
        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Species</span>
          <select className="input-field" value={filters.species} onChange={(event) => setFilters((current) => ({ ...current, species: event.target.value }))}>
            <option value="">All</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">City</span>
          <input className="input-field" value={filters.city} onChange={(event) => setFilters((current) => ({ ...current, city: event.target.value }))} placeholder="Ahmedabad" />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Status</span>
          <select className="input-field" value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}>
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Adopted">Adopted</option>
            <option value="">All</option>
          </select>
        </label>
      </section>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <CardSkeleton key={item} />
          ))}
        </div>
      ) : pets.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pets.map((pet) => (
            <article key={pet._id} className="overflow-hidden rounded-3xl border border-outline-variant/10 bg-white shadow-sm">
              <div className="relative">
                <img
                  src={pet.images?.[0] || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80'}
                  alt={pet.name}
                  loading="lazy"
                  className="h-60 w-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(pet._id)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-tertiary shadow-sm transition hover:scale-105"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-black">{pet.name}</h2>
                    <p className="text-sm text-on-surface-variant">{pet.breed || pet.species}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    {pet.adoptionStatus}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-on-surface-variant">
                  <span className="rounded-full bg-surface-container-low px-2.5 py-1">{pet.city || 'Unknown city'}</span>
                  <span className="rounded-full bg-surface-container-low px-2.5 py-1">{pet.ageLabel || `${pet.age} years`}</span>
                  <span className="rounded-full bg-surface-container-low px-2.5 py-1">{pet.size}</span>
                </div>
                <p className="line-clamp-3 text-sm text-on-surface-variant">{pet.description}</p>
                <Link to={`/adopt/${pet._id}`} className="btn-primary w-full justify-center">
                  Meet {pet.name}
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No pets match these filters"
          message="Try removing a filter or changing the city."
          icon="🐾"
        />
      )}
    </div>
  );
}

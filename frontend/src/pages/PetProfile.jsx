import { useEffect, useState } from 'react';
import { Heart, MapPin, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { PageLoader } from '../components/Loader';
import { adoptionService } from '../services';
import { useAuthStore } from '../store/authStore';

export default function PetProfile() {
  const { id } = useParams();
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
    adoptionService
      .getPetById(id)
      .then((response) => {
        setPet(response.data.pet);
        setSimilarPets(response.data.similarPets || []);
      })
      .catch((error) => toast.error(error.response?.data?.message || 'Unable to load pet profile.'))
      .finally(() => setLoading(false));
  }, [id]);

  const submitApplication = async (event) => {
    event.preventDefault();

    try {
      await adoptionService.submitApplication({
        petId: pet._id,
        ...formData,
      });
      toast.success('Adoption application submitted.');
      setFormData((current) => ({ ...current, message: '' }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to submit application.');
    }
  };

  if (loading) {
    return <PageLoader label="Loading pet profile..." />;
  }

  if (!pet) {
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-28 md:px-6 md:pt-32">
      <Link to="/adopt" className="mb-6 inline-block text-sm font-bold text-primary">
        Back to adoption
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-5 rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm md:p-6">
          <img
            src={pet.images?.[0] || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80'}
            alt={pet.name}
            className="h-[340px] w-full rounded-[24px] object-cover md:h-[480px]"
          />
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{pet.adoptionStatus}</div>
              <h1 className="mt-2 text-4xl font-black">{pet.name}</h1>
              <p className="mt-2 text-sm text-on-surface-variant">{pet.breed || pet.species}</p>
            </div>
            <button className="btn-outline">
              <Heart className="h-4 w-4" />
              Save
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-surface-container-low px-3 py-1.5 text-sm font-semibold">{pet.city || 'Unknown city'}</span>
            <span className="rounded-full bg-surface-container-low px-3 py-1.5 text-sm font-semibold">{pet.ageLabel || `${pet.age} years`}</span>
            <span className="rounded-full bg-surface-container-low px-3 py-1.5 text-sm font-semibold">{pet.size}</span>
          </div>

          <p className="text-sm leading-7 text-on-surface-variant">{pet.description}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-surface-container-low p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold">
                <MapPin className="h-4 w-4 text-primary" />
                Location
              </div>
              <p className="text-sm text-on-surface-variant">{pet.city || 'Not specified'}</p>
            </div>
            <div className="rounded-2xl bg-surface-container-low p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Health status
              </div>
              <p className="text-sm text-on-surface-variant">
                Vaccinated: {pet.healthStatus?.vaccinated ? 'Yes' : 'No'} | Neutered: {pet.healthStatus?.neutered ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <form onSubmit={submitApplication} className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-2xl font-black">Apply to adopt</h2>
            <p className="mt-2 text-sm text-on-surface-variant">Send your interest directly to the backend adoption application flow.</p>
            <div className="mt-5 space-y-3">
              <input className="input-field" placeholder="Full name" value={formData.fullName} onChange={(event) => setFormData((current) => ({ ...current, fullName: event.target.value }))} />
              <input className="input-field" type="email" placeholder="Email" value={formData.email} onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))} />
              <input className="input-field" placeholder="Phone" value={formData.phone} onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))} />
              <input className="input-field" placeholder="City" value={formData.city} onChange={(event) => setFormData((current) => ({ ...current, city: event.target.value }))} />
              <textarea className="input-field min-h-[120px]" placeholder="Why are you a good fit?" value={formData.message} onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))} />
            </div>
            <button type="submit" className="btn-primary mt-4 w-full justify-center">
              Submit application
            </button>
          </form>

          {similarPets.length ? (
            <section className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm md:p-6">
              <h2 className="text-xl font-black">Similar pets</h2>
              <div className="mt-4 space-y-3">
                {similarPets.map((item) => (
                  <Link key={item._id} to={`/adopt/${item._id}`} className="flex items-center gap-3 rounded-2xl bg-surface-container-low p-3 transition hover:bg-surface-container-high">
                    <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=500&q=80'} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm text-on-surface-variant">{item.breed || item.species}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </section>
    </div>
  );
}

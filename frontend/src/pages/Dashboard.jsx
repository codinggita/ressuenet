import { useEffect, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Heart,
  Landmark,
  LifeBuoy,
  MapPinned,
  Phone,
  Shield,
  Siren,
  Trees,
  Wallet,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { CardSkeleton } from '../components/Loader';
import { donationService, rescueService } from '../services';
import { useAuthStore } from '../store/authStore';

function StatPanel({ label, value, detail, icon }) {
  return (
    <div className="rounded-3xl border border-outline-variant/10 bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">{icon}</div>
      <div className="text-2xl font-black">{value}</div>
      <div className="mt-1 text-sm font-semibold text-on-surface">{label}</div>
      <div className="mt-2 text-sm leading-6 text-on-surface-variant">{detail}</div>
    </div>
  );
}

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const [dashboardResponse, donationHistory] = await Promise.all([
          rescueService.getCompleteDashboard(),
          user ? donationService.getHistory() : Promise.resolve({ data: [] }),
        ]);

        setDashboard(dashboardResponse.data);
        setDonations(donationHistory.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Unable to load dashboard data.');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [user]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 md:px-6 md:pt-32">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <CardSkeleton key={item} />
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: 'Active alerts',
      value: dashboard?.activeAlerts ?? 0,
      detail: 'Open or dispatched rescue cases still competing for attention.',
      icon: <Siren className="h-5 w-5" />,
    },
    {
      label: 'Resolved today',
      value: dashboard?.resolvedToday ?? 0,
      detail: 'Cases marked resolved since the start of the day.',
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    {
      label: 'Available adoptions',
      value: dashboard?.availablePets ?? 0,
      detail: 'Profiles currently visible for shelter-led adoption.',
      icon: <Heart className="h-5 w-5" />,
    },
    {
      label: 'Funds raised',
      value: `INR ${(dashboard?.totalRaised ?? 0).toLocaleString()}`,
      detail: `${dashboard?.successfulDonors ?? 0} successful donations recorded.`,
      icon: <Wallet className="h-5 w-5" />,
    },
  ];

  const maxCenters = Math.max(...(dashboard?.networkByState || []).map((item) => item.centers), 1);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 md:px-6 md:pt-32">
      <div className="mb-8 rounded-[32px] border border-outline-variant/10 bg-white p-6 shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Operational dashboard</p>
            <h1 className="mt-2 text-3xl font-black">Welcome {user?.fullName?.split(' ')[0] || 'back'}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-on-surface-variant">
              This panel now reads from a fuller India-focused rescue dataset, with network coverage, official channels,
              sanctuary context, and action prompts instead of sparse placeholder metrics.
            </p>
          </div>
          <div className="rounded-[28px] bg-surface-container-low p-5">
            <div className="flex items-center gap-2 text-primary">
              <Phone className="h-5 w-5" />
              <h2 className="text-xl font-black">Priority contacts</h2>
            </div>
            <div className="mt-4 space-y-3">
              {(dashboard?.helplines || []).slice(0, 3).map((item) => (
                <div key={item.state} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{item.state}</div>
                      <div className="mt-1 text-lg font-black">{item.helpline}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                  <div className="mt-2 text-sm text-on-surface-variant">{item.agency}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <StatPanel key={card.label} {...card} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[32px] border border-outline-variant/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <LifeBuoy className="h-5 w-5" />
            <h2 className="text-xl font-black">Today&apos;s rescue feed</h2>
          </div>
          <div className="space-y-3">
            {(dashboard?.todayAlerts || []).length ? (
              dashboard.todayAlerts.map((report) => (
                <article key={report.id} className="rounded-2xl bg-surface-container-low p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-black">{report.referenceId}</div>
                      <div className="mt-1 text-sm text-on-surface">{report.location}</div>
                      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{report.description}</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                      {report.status}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-on-surface-variant">
                      {report.species}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-on-surface-variant">
                      {report.urgency} priority
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-sm text-on-surface-variant">No recent rescue reports are available yet.</p>
            )}
          </div>
        </section>

        <section className="rounded-[32px] border border-outline-variant/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <MapPinned className="h-5 w-5" />
            <h2 className="text-xl font-black">Network coverage by state</h2>
          </div>
          <div className="space-y-4">
            {(dashboard?.networkByState || []).map((item) => (
              <article key={item.state} className="rounded-2xl bg-surface-container-low p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="font-bold">{item.state}</div>
                  <div className="text-sm text-on-surface-variant">{item.centers} centers</div>
                </div>
                <div className="h-2 rounded-full bg-white">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${Math.max((item.centers / maxCenters) * 100, 12)}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-on-surface-variant">{item.rescues.toLocaleString()} cumulative rescues logged</div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-[32px] border border-outline-variant/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <Trees className="h-5 w-5" />
            <h2 className="text-xl font-black">Sanctuary watchlist</h2>
          </div>
          <div className="space-y-3">
            {(dashboard?.sanctuaries || []).slice(0, 4).map((item) => (
              <article key={item.name} className="rounded-2xl bg-surface-container-low p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-black">{item.name}</div>
                    <div className="mt-1 text-sm text-on-surface">{item.state}</div>
                  </div>
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.status}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.keySpecies.slice(0, 3).map((species) => (
                    <span key={species} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-on-surface-variant">
                      {species}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-outline-variant/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <Landmark className="h-5 w-5" />
            <h2 className="text-xl font-black">Schemes and official resources</h2>
          </div>
          <div className="space-y-3">
            {(dashboard?.schemes || []).slice(0, 3).map((scheme) => (
              <article key={scheme.name} className="rounded-2xl bg-surface-container-low p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-black">{scheme.name}</div>
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{scheme.year}</div>
                </div>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{scheme.focus}</p>
              </article>
            ))}
            {(dashboard?.officialResources || []).slice(0, 2).map((resource) => (
              <article key={resource.name} className="rounded-2xl border border-outline-variant/10 p-4">
                <div className="font-bold">{resource.name}</div>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{resource.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[32px] border border-outline-variant/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <Heart className="h-5 w-5" />
            <h2 className="text-xl font-black">Adoption highlights</h2>
          </div>
          <div className="space-y-3">
            {(dashboard?.adoptionHighlights || []).map((pet) => (
              <article key={pet._id} className="rounded-2xl bg-surface-container-low p-4">
                <div className="flex items-start gap-4">
                  <img src={pet.images?.[0]} alt={pet.name} className="h-20 w-20 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-black">{pet.name}</div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-on-surface-variant">
                        {pet.species}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-on-surface">{pet.breed}</p>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">{pet.description}</p>
                    <div className="mt-2 text-sm font-medium text-on-surface">
                      {pet.shelter?.name || 'Partner shelter'} in {pet.city}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-outline-variant/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <Activity className="h-5 w-5" />
            <h2 className="text-xl font-black">What to do next</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              {(dashboard?.recommendedActions || []).map((item) => (
                <article key={item.title} className="rounded-2xl bg-surface-container-low p-4">
                  <div className="font-black">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.detail}</p>
                </article>
              ))}
            </div>
            <div className="space-y-3">
              {(dashboard?.legalResources || []).map((item) => (
                <article key={item.title} className="rounded-2xl border border-outline-variant/10 p-4">
                  <div className="font-black">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.summary}</p>
                  <p className="mt-2 text-sm font-medium text-on-surface">{item.penalties}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[32px] border border-outline-variant/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <Shield className="h-5 w-5" />
            <h2 className="text-xl font-black">Conservation and enforcement notes</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(dashboard?.newsBriefings || []).map((item) => (
              <article key={item.headline} className="rounded-2xl bg-surface-container-low p-4">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{item.category}</div>
                <div className="mt-2 font-black">{item.headline}</div>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.summary}</p>
              </article>
            ))}
            {(dashboard?.wildlifeCrimeCases || []).map((item) => (
              <article key={item.title} className="rounded-2xl border border-outline-variant/10 p-4">
                <div className="font-black">{item.title}</div>
                <p className="mt-2 text-sm text-on-surface">{item.location}</p>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.action}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-outline-variant/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <Wallet className="h-5 w-5" />
            <h2 className="text-xl font-black">Donation history</h2>
          </div>
          <div className="space-y-3">
            {donations.length ? (
              donations.slice(0, 6).map((donation) => (
                <article key={donation._id} className="rounded-2xl bg-surface-container-low p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-black">INR {donation.amount}</div>
                      <div className="mt-1 text-sm text-on-surface-variant">{donation.purpose || donation.status}</div>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-on-surface-variant">
                      {donation.status}
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-sm text-on-surface-variant">No donation history yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

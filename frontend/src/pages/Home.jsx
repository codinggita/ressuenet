import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Gavel,
  Heart,
  Landmark,
  LifeBuoy,
  MapPinned,
  Newspaper,
  Phone,
  ShieldCheck,
  Trees,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { CardSkeleton, PageLoader } from '../components/Loader';
import { adoptionService, donationService, rescueService } from '../services';

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-black md:text-3xl">{title}</h2>
        {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-on-surface-variant">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

function StatCard({ label, value, detail, icon }) {
  return (
    <div className="rounded-3xl border border-outline-variant/10 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">{icon}</div>
      <div className="text-3xl font-black text-on-surface">{value}</div>
      <div className="mt-1 text-sm font-semibold text-on-surface">{label}</div>
      <div className="mt-2 text-sm leading-6 text-on-surface-variant">{detail}</div>
    </div>
  );
}

function MiniPill({ children }) {
  return (
    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
      {children}
    </span>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [donationStats, setDonationStats] = useState(null);
  const [adoptionHighlights, setAdoptionHighlights] = useState([]);

  useEffect(() => {
    async function loadHome() {
      try {
        const [overviewResponse, donationResponse, petsResponse] = await Promise.all([
          rescueService.getOverview(),
          donationService.getStats(),
          adoptionService.getPets({ status: 'Available', limit: 4 }),
        ]);

        setOverview(overviewResponse.data);
        setDonationStats(donationResponse.data);
        setAdoptionHighlights((petsResponse.data || []).slice(0, 4));
      } finally {
        setLoading(false);
      }
    }

    loadHome();
  }, []);

  if (loading && !overview) {
    return <PageLoader label="Loading the rescue network..." />;
  }

  const stats = overview?.stats;
  const helplines = overview?.helplines || [];
  const schemes = overview?.schemes || [];
  const sanctuaries = overview?.sanctuaries || [];
  const species = overview?.species || [];
  const laws = overview?.legalResources || [];
  const resources = overview?.officialResources || [];
  const timeline = overview?.timeline || [];
  const briefings = overview?.newsBriefings || [];
  const stories = overview?.rescueStories || [];

  return (
    <div className="pb-14 pt-24 md:pt-28">
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="overflow-hidden rounded-[32px] border border-outline-variant/10 bg-on-surface text-surface shadow-2xl">
          <div className="grid gap-8 p-6 md:grid-cols-[1.15fr_0.85fr] md:p-10">
            <div className="space-y-6">
              <MiniPill>India rescue and wildlife response</MiniPill>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                  Make emergency animal response easier to trust, faster to route, and harder to ignore.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-surface/75 md:text-lg">
                  RescueNet now carries verified helplines, government programs, sanctuary context, legal guidance, and
                  a broader rescue network so people can act on real information instead of placeholder content.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/report" className="btn-emergency">
                  Report emergency
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/nearby" className="btn-primary">
                  Find nearby help
                  <MapPinned className="h-4 w-4" />
                </Link>
                <Link to="/education" className="btn-outline border-white/15 text-white hover:bg-white/5">
                  Learn the law
                  <Gavel className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {helplines.slice(0, 3).map((item) => (
                  <div key={item.state} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{item.state}</div>
                    <div className="mt-2 text-2xl font-black text-white">{item.helpline}</div>
                    <div className="mt-2 text-sm leading-6 text-surface/70">{item.agency}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Network snapshot</p>
                  <h2 className="mt-2 text-2xl font-black text-white">What the platform can route right now</h2>
                </div>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">Live from DB</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-3xl font-black text-white">{stats?.activeAlerts ?? 0}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-surface/60">Open alerts</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-3xl font-black text-white">{stats?.activeCenters ?? 0}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-surface/60">Rescue centers</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-3xl font-black text-white">{stats?.statesCovered ?? 0}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-surface/60">States covered</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-3xl font-black text-white">INR {(donationStats?.totalRaised ?? 0).toLocaleString()}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-surface/60">Successful donations</div>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="font-bold text-white">Wildlife crime should not be routed like a normal rescue request.</div>
                    <p className="mt-1 text-sm leading-6 text-surface/75">
                      Keep WCCB and enforcement contacts visible when the report points to trafficking, captivity, or body-part trade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Available adoptions"
            value={stats?.availablePets ?? 0}
            detail="Profiles already mapped to shelters so adoption traffic can move toward real organizations."
            icon={<Heart className="h-5 w-5" />}
          />
          <StatCard
            label="Stories in the system"
            value={stats?.totalStories ?? 0}
            detail="A better rescue homepage needs narrative proof, not just counters."
            icon={<BookOpen className="h-5 w-5" />}
          />
          <StatCard
            label="Education resources"
            value={stats?.totalArticles ?? 0}
            detail="Protocols, laws, and explainer content give the platform more civic weight."
            icon={<ShieldCheck className="h-5 w-5" />}
          />
          <StatCard
            label="Verified support lines"
            value={helplines.length}
            detail="State and national contacts make the first action clearer under stress."
            icon={<Phone className="h-5 w-5" />}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <SectionHeading
          eyebrow="Government programs"
          title="Public schemes and rescue infrastructure worth surfacing"
          description="These programs give the project real-world anchor points and make the platform feel closer to public service than a generic animal app."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {schemes.map((scheme) => (
            <article key={scheme.name} className="rounded-3xl border border-outline-variant/10 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{scheme.launchedBy}</div>
                  <h3 className="mt-2 text-xl font-black">{scheme.name}</h3>
                </div>
                <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-bold text-primary">{scheme.year}</div>
              </div>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">{scheme.focus}</p>
              <p className="mt-3 text-sm font-medium text-on-surface">{scheme.impact}</p>
              <a href={scheme.website} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-primary">
                Official reference
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <SectionHeading
          eyebrow="Rapid access"
          title="State and national helplines"
          description="These are the numbers a stressed user needs in the first screenful, not buried in a footer."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {helplines.map((item) => (
            <article key={item.state + item.helpline} className="rounded-3xl border border-outline-variant/10 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{item.state}</div>
                  <h3 className="mt-2 text-xl font-black">{item.helpline}</h3>
                </div>
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-3 text-sm font-semibold text-on-surface">{item.agency}</p>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.coverage}</p>
              <a href={item.website} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-primary">
                Open official source
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <SectionHeading
          eyebrow="Protected areas"
          title="Sanctuaries the platform should understand"
          description="A rescue product gets sharper when it can distinguish urban companion-animal help from wildlife landscapes and marine habitats."
        />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {sanctuaries.map((sanctuary) => (
            <article key={sanctuary.name} className="rounded-3xl border border-outline-variant/10 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{sanctuary.state}</div>
                  <h3 className="mt-2 text-xl font-black">{sanctuary.name}</h3>
                </div>
                <Trees className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-3 text-sm text-on-surface">{sanctuary.district}</p>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{sanctuary.status}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {sanctuary.keySpecies.map((name) => (
                  <span key={name} className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-semibold text-on-surface-variant">
                    {name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <SectionHeading
          eyebrow="Species spotlight"
          title="Threatened species users should actually learn about"
          description="The rescue platform now carries structured conservation context instead of generic inspirational copy."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {species.map((item) => (
            <article key={item.name} className="rounded-3xl border border-outline-variant/10 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black">{item.name}</h3>
                  <p className="mt-1 text-sm italic text-on-surface-variant">{item.scientificName}</p>
                </div>
                <span className="rounded-full bg-tertiary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-tertiary">
                  {item.iucnStatus}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-on-surface">{item.population}</p>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.habitat}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.threats.map((threat) => (
                  <span key={threat} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {threat}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <SectionHeading
          eyebrow="Field briefings"
          title="Platform briefings and rescue stories"
          description="The homepage needed more editorial weight, so this section pairs operational signals with concrete story hooks."
          action={
            <Link to="/stories" className="text-sm font-bold text-primary">
              Explore stories
            </Link>
          }
        />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Newspaper className="h-5 w-5" />
              <h3 className="text-xl font-black">Latest briefings</h3>
            </div>
            <div className="space-y-4">
              {briefings.map((item) => (
                <article key={item.headline} className="rounded-2xl bg-surface-container-low p-4">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{item.category}</div>
                  <h4 className="mt-2 text-lg font-black">{item.headline}</h4>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.summary}</p>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-on-surface-variant">{item.source}</div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {stories.length ? (
              stories.map((story) => (
                <article key={story.title} className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{story.focus}</div>
                      <h3 className="mt-2 text-xl font-black">{story.title}</h3>
                    </div>
                    <LifeBuoy className="h-5 w-5 text-primary" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-on-surface">{story.location}</p>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{story.summary}</p>
                  <div className="mt-3 text-sm font-medium text-on-surface">{story.organization}</div>
                </article>
              ))
            ) : (
              <EmptyState title="No rescue stories yet" message="Seed or publish stories to populate this panel." icon="Stories" />
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <SectionHeading
          eyebrow="Laws and institutions"
          title="Legal framework and official resources"
          description="This is where the project starts feeling more credible: official references, penalty context, and the agencies people need to recognize."
        />
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4">
            {laws.map((law) => (
              <article key={law.title} className="rounded-3xl border border-outline-variant/10 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black">{law.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">{law.summary}</p>
                  </div>
                  <Gavel className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-3 text-sm font-medium text-on-surface">{law.penalties}</p>
                <a href={law.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-primary">
                  Read source
                </a>
              </article>
            ))}
          </div>
          <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Landmark className="h-5 w-5" />
              <h3 className="text-xl font-black">Official resources</h3>
            </div>
            <div className="space-y-4">
              {resources.map((resource) => (
                <article key={resource.name} className="rounded-2xl bg-surface-container-low p-4">
                  <h4 className="font-black">{resource.name}</h4>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{resource.description}</p>
                  <a href={resource.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-bold text-primary">
                    Visit site
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <SectionHeading
          eyebrow="Adoption"
          title="Profiles already connected to shelters"
          description="Adoption is more actionable when every card is tied back to a real rescue service instead of floating as anonymous sample data."
          action={
            <Link to="/adopt" className="text-sm font-bold text-primary">
              Browse all pets
            </Link>
          }
        />
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <CardSkeleton key={item} />
            ))}
          </div>
        ) : adoptionHighlights.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {adoptionHighlights.map((pet) => (
              <article key={pet._id} className="overflow-hidden rounded-[28px] border border-outline-variant/10 bg-white shadow-sm">
                <img src={pet.images?.[0]} alt={pet.name} className="h-52 w-full object-cover" loading="lazy" />
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-black">{pet.name}</h3>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                      {pet.species}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant">{pet.breed}</p>
                  <p className="text-sm leading-6 text-on-surface-variant">{pet.description}</p>
                  <div className="text-sm font-medium text-on-surface">
                    {pet.shelter?.name || 'Partner shelter'} in {pet.city}
                  </div>
                  <Link to={`/adopt/${pet._id}`} className="inline-flex text-sm font-bold text-primary">
                    View profile
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No adoption profiles yet" message="Seed pets or publish adoption listings to fill this section." icon="Heart" />
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <SectionHeading
          eyebrow="Conservation timeline"
          title="A short history of the systems behind rescue and protection"
          description="The homepage needed more temporal depth, so this gives users a sense of how current rescue work connects to longer conservation policy."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {timeline.map((item) => (
            <article key={item.year + item.title} className="rounded-3xl border border-outline-variant/10 bg-white p-5 shadow-sm">
              <div className="text-sm font-black uppercase tracking-[0.18em] text-primary">{item.year}</div>
              <h3 className="mt-2 text-xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="rounded-[32px] border border-outline-variant/10 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Next move</p>
              <h2 className="mt-2 text-3xl font-black">Use the platform like a field tool, not a brochure.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-on-surface-variant">
                Report emergencies, route to verified centers, support rescue funds, and keep official wildlife resources one tap away when the case crosses into enforcement or habitat protection.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link to="/report" className="btn-emergency">
                Start an emergency report
              </Link>
              <Link to="/dashboard" className="btn-secondary">
                Open dashboard
              </Link>
              <Link to="/donate" className="btn-outline">
                Support rescue work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

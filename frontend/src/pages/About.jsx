import { useEffect, useState } from 'react';
import { ArrowRight, Building2, Heart, Landmark, Map, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLoader } from '../components/Loader';
import { rescueService } from '../services';

export default function About() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    rescueService
      .getOverview()
      .then((response) => setOverview(response.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading && !overview) {
    return <PageLoader label="Loading platform overview..." />;
  }

  const stats = overview?.stats || {};
  const officialResources = overview?.officialResources || [];
  const schemes = overview?.schemes || [];
  const featuredSanctuary = overview?.sanctuaries?.[0];

  const cards = [
    { label: 'Rescue centers', value: stats.activeCenters || 0, icon: Shield },
    { label: 'State contacts', value: overview?.helplines?.length || 0, icon: Building2 },
    { label: 'Species spotlights', value: overview?.species?.length || 0, icon: Heart },
    { label: 'Official resources', value: officialResources.length, icon: Landmark },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 md:px-6 md:pt-32">
      <section className="grid gap-6 rounded-[32px] border border-outline-variant/10 bg-white p-6 shadow-sm lg:grid-cols-[1fr_0.9fr] lg:p-8">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-primary">
            <Users className="h-4 w-4" />
            Why RescueNet exists
          </span>
          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-5xl">
            This should feel like a field-ready public utility, not a glossy placeholder.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-on-surface-variant">
            The platform is being reshaped around verified contacts, government references, sanctuary context, adoption routes,
            and rescue workflow support so people can make better decisions faster.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="btn-primary">
              Join the network
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/map" className="btn-outline">
              <Map className="h-4 w-4" />
              Explore map
            </Link>
            <Link to="/donate" className="btn-outline">
              Support rescue work
            </Link>
          </div>
        </div>

        {featuredSanctuary ? (
          <div className="overflow-hidden rounded-[28px] bg-on-surface text-surface shadow-xl">
            <img src={featuredSanctuary.image} alt={featuredSanctuary.name} className="h-72 w-full object-cover" />
            <div className="space-y-3 p-5">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{featuredSanctuary.state}</div>
              <h2 className="text-2xl font-black text-white">{featuredSanctuary.name}</h2>
              <p className="text-sm leading-6 text-surface/75">{featuredSanctuary.status}</p>
            </div>
          </div>
        ) : null}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-3xl font-black">{card.value}</div>
              <div className="mt-1 text-sm font-semibold text-on-surface">{card.label}</div>
            </article>
          );
        })}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black">What the platform is trying to do better</h2>
          <div className="mt-4 space-y-3">
            <article className="rounded-2xl bg-surface-container-low p-4">
              <div className="font-black">Route emergency reports toward known responders</div>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                Verified rescue centers, helplines, and map context lower the time between report and intervention.
              </p>
            </article>
            <article className="rounded-2xl bg-surface-container-low p-4">
              <div className="font-black">Separate wildlife protection from generic pet rescue content</div>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                Sanctuary data, species context, and crime escalation routes keep the platform grounded in real conservation needs.
              </p>
            </article>
            <article className="rounded-2xl bg-surface-container-low p-4">
              <div className="font-black">Make public data approachable instead of bureaucratic</div>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                Government schemes and legal references are surfaced as usable cards and actions rather than long walls of text.
              </p>
            </article>
          </div>
        </div>

        <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black">Government and institutional anchors</h2>
          <div className="mt-4 space-y-3">
            {schemes.map((scheme) => (
              <article key={scheme.name} className="rounded-2xl bg-surface-container-low p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-black">{scheme.name}</div>
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{scheme.year}</div>
                </div>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{scheme.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[32px] border border-outline-variant/10 bg-on-surface p-6 text-surface shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-black text-white">Transparency and external references still matter.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-surface/70">
              Use these public sources to verify the platform&apos;s conservation framing, legal summaries, and government program references.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link to="/dashboard" className="btn-secondary">
              Platform dashboard
            </Link>
            <Link to="/stories" className="btn-outline border-white/15 text-white hover:bg-white/5">
              Rescue stories
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {officialResources.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <div className="font-black text-white">{resource.name}</div>
              <p className="mt-2 text-sm leading-6 text-surface/70">{resource.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

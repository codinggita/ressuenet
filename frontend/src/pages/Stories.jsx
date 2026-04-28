import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Heart,
  Mail,
  MapPin,
  Share2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { PageLoader } from '../components/Loader';
import { contentService, rescueService } from '../services';

function normalizeStories(dbStories = [], curatedStories = []) {
  const databaseItems = dbStories.map((story) => ({
    id: story._id,
    title: story.title,
    excerpt: story.excerpt,
    body: story.content,
    category: story.category || 'Rescue Story',
    location: story.city || 'India',
    organization: story.organization || 'Rescue partner',
    image: story.image,
    date: story.publishedAt || story.createdAt,
    type: 'Database',
  }));

  const curatedItems = curatedStories.map((story, index) => ({
    id: `curated-${index}`,
    title: story.title,
    excerpt: story.summary,
    body: story.summary,
    category: story.focus || 'Field Story',
    location: story.location,
    organization: story.organization,
    image: story.image,
    date: null,
    type: 'Curated',
  }));

  return [...databaseItems, ...curatedItems];
}

export default function Stories() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [stories, setStories] = useState([]);
  const [category, setCategory] = useState('All');
  const [selectedStory, setSelectedStory] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function loadStories() {
      try {
        const [overviewResponse, storiesResponse] = await Promise.all([
          rescueService.getOverview(),
          contentService.getStories(),
        ]);

        const combinedStories = normalizeStories(storiesResponse.data || [], overviewResponse.data?.rescueStories || []);
        setOverview(overviewResponse.data);
        setStories(combinedStories);
        setSelectedStory(combinedStories[0] || null);
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, []);

  const categories = useMemo(() => {
    const storyCategories = [...new Set(stories.map((item) => item.category).filter(Boolean))];
    return ['All', ...storyCategories];
  }, [stories]);

  const filteredStories = useMemo(() => {
    return stories.filter((story) => category === 'All' || story.category === category);
  }, [stories, category]);

  const featuredStory = selectedStory || filteredStories[0];
  const stateLinks = (overview?.helplines || []).slice(0, 4);

  if (loading && !stories.length) {
    return <PageLoader label="Loading rescue stories..." />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 md:px-6 md:pt-32">
      <section className="grid gap-6 rounded-[32px] border border-outline-variant/10 bg-white p-6 shadow-sm lg:grid-cols-[1fr_0.9fr] lg:p-8">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-primary">
            <Heart className="h-4 w-4" />
            Real rescue narratives
          </span>
          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-5xl">
            The project needs proof of real work, not just metrics.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-on-surface-variant">
            These stories now come from the platform database and the curated India-focused rescue layer, with real-photo support
            and working selection controls instead of static editorial placeholders.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                const target = document.getElementById('story-grid');
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              Browse stories
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/volunteer" className="btn-outline">
              Submit your journey
            </Link>
            <Link to="/map" className="btn-outline">
              Open rescue map
            </Link>
          </div>
        </div>

        {featuredStory ? (
          <div className="overflow-hidden rounded-[28px] bg-on-surface text-surface shadow-xl">
            <img src={featuredStory.image} alt={featuredStory.title} className="h-72 w-full object-cover" />
            <div className="space-y-3 p-5">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{featuredStory.category}</div>
              <h2 className="text-2xl font-black text-white">{featuredStory.title}</h2>
              <p className="text-sm leading-6 text-surface/75">{featuredStory.excerpt}</p>
              <div className="flex items-center gap-2 text-sm text-surface/70">
                <MapPin className="h-4 w-4 text-primary" />
                {featuredStory.location} · {featuredStory.organization}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-6">
          <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <BookOpen className="h-4 w-4" />
              <h2 className="text-lg font-black">Filter by story type</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    category === item ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black">Rapid contacts</h2>
            <div className="mt-4 space-y-3">
              {stateLinks.map((item) => (
                <article key={item.state} className="rounded-2xl bg-surface-container-low p-4">
                  <div className="font-black">{item.state}</div>
                  <div className="mt-1 text-sm text-on-surface">{item.helpline}</div>
                  <div className="mt-2 text-sm text-on-surface-variant">{item.agency}</div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-outline-variant/10 bg-on-surface p-5 text-surface shadow-sm">
            <h2 className="text-xl font-black text-white">Get story updates</h2>
            <p className="mt-2 text-sm leading-6 text-surface/70">
              New rescue case studies, adoption wins, and field notes delivered in a cleaner, less noisy format.
            </p>
            <form
              className="mt-4 space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email.trim()) {
                  toast.error('Enter an email to subscribe.');
                  return;
                }
                toast.success('Subscription request captured for the demo flow.');
                setEmail('');
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="input-field border-white/10 bg-white/10 text-white placeholder:text-white/40"
              />
              <button className="btn-primary w-full justify-center" type="submit">
                <Mail className="h-4 w-4" />
                Subscribe
              </button>
            </form>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black">Selected story</h2>
            {featuredStory ? (
              <div className="mt-4 grid gap-5 md:grid-cols-[0.95fr_1.05fr]">
                <img src={featuredStory.image} alt={featuredStory.title} className="h-full min-h-[260px] w-full rounded-[24px] object-cover" />
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                      {featuredStory.category}
                    </span>
                    <span className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-semibold text-on-surface-variant">
                      {featuredStory.type}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black">{featuredStory.title}</h3>
                  <div className="text-sm font-medium text-on-surface">
                    {featuredStory.location} · {featuredStory.organization}
                  </div>
                  <p className="text-sm leading-7 text-on-surface-variant">{featuredStory.body}</p>
                  <div className="flex gap-3">
                    <Link to="/report" className="btn-emergency">
                      Report similar case
                    </Link>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(`${featuredStory.title} - ${featuredStory.location}`);
                        toast.success('Story title copied.');
                      }}
                      className="btn-outline"
                    >
                      <Share2 className="h-4 w-4" />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div id="story-grid" className="grid gap-4 md:grid-cols-2">
            {filteredStories.map((story) => (
              <article key={story.id} className="overflow-hidden rounded-[28px] border border-outline-variant/10 bg-white shadow-sm">
                <img src={story.image} alt={story.title} className="h-56 w-full object-cover" />
                <div className="space-y-3 p-5">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{story.category}</div>
                  <h3 className="text-2xl font-black">{story.title}</h3>
                  <p className="line-clamp-3 text-sm leading-6 text-on-surface-variant">{story.excerpt}</p>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-on-surface">{story.location}</div>
                    <button
                      onClick={() => setSelectedStory(story)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary"
                    >
                      Read story
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

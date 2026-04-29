import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  FileText,
  Filter,
  Gavel,
  Phone,
  Search,
  ShieldAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageLoader } from '../components/Loader';
import { contentService, rescueService } from '../services';

export default function Education() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    async function loadEducation() {
      try {
        const [overviewResponse, articlesResponse] = await Promise.all([
          rescueService.getOverview(),
          contentService.getArticles(),
        ]);

        const articleList = articlesResponse.data || [];
        setOverview(overviewResponse.data);
        setArticles(articleList);
        setSelectedArticle(articleList[0] || null);
      } finally {
        setLoading(false);
      }
    }

    loadEducation();
  }, []);

  const categories = useMemo(() => {
    const articleCategories = [...new Set(articles.map((item) => item.category).filter(Boolean))];
    return ['All', ...articleCategories];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = category === 'All' || article.category === category;
      const search = query.trim().toLowerCase();
      const matchesQuery =
        !search ||
        article.title?.toLowerCase().includes(search) ||
        article.summary?.toLowerCase().includes(search) ||
        article.category?.toLowerCase().includes(search);
      return matchesCategory && matchesQuery;
    });
  }, [articles, category, query]);

  const legalResources = overview?.legalResources || [];
  const helplines = overview?.helplines || [];
  const officialResources = overview?.officialResources || [];

  if (loading && !overview) {
    return <PageLoader label="Loading rescue guidance..." />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 md:px-6 md:pt-32">
      <section className="grid gap-6 rounded-[32px] border border-outline-variant/10 bg-on-surface p-6 text-surface shadow-2xl lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-primary">
            <ShieldAlert className="h-4 w-4" />
            Rescue knowledge base
          </span>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-5xl">
            Laws, field guides, and emergency references should feel usable under pressure.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-surface/75">
            This page now pulls from the platform&apos;s articles and official legal references, so it reads like an operational
            handbook instead of a decorative document dump.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/report" className="btn-emergency">
              Start an emergency report
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/map" className="btn-primary">
              Open rescue map
            </Link>
            <a
              href={helplines[0]?.website}
              target="_blank"
              rel="noreferrer"
              className="btn-outline border-white/15 text-white hover:bg-white/5"
            >
              Open official helpline
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
          <img
            src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80"
            alt="Veterinary kit and field care tools"
            className="h-full min-h-[280px] w-full object-cover"
          />
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Filter className="h-4 w-4" />
              <h2 className="text-lg font-black">Browse guidance</h2>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search articles, laws, protocols"
                  className="input-field pl-10"
                />
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
          </div>

          <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Gavel className="h-4 w-4" />
              <h2 className="text-lg font-black">Legal quick view</h2>
            </div>
            <div className="space-y-3">
              {legalResources.map((resource) => (
                <article key={resource.title} className="rounded-2xl bg-surface-container-low p-4">
                  <div className="font-black">{resource.title}</div>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{resource.summary}</p>
                  <p className="mt-2 text-sm font-medium text-on-surface">{resource.penalties}</p>
                  <a href={resource.link} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-bold text-primary">
                    Read official text
                  </a>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Phone className="h-4 w-4" />
              <h2 className="text-lg font-black">Escalation contacts</h2>
            </div>
            <div className="space-y-3">
              {helplines.slice(0, 4).map((item) => (
                <article key={item.state} className="rounded-2xl bg-surface-container-low p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-black">{item.state}</div>
                      <div className="mt-1 text-sm text-on-surface">{item.helpline}</div>
                    </div>
                    <a href={`tel:${item.helpline}`} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-primary">
                      Call
                    </a>
                  </div>
                  <div className="mt-2 text-sm text-on-surface-variant">{item.agency}</div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <BookOpen className="h-4 w-4" />
              <h2 className="text-lg font-black">Guides and explainers</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {filteredArticles.map((article) => (
                <button
                  key={article._id}
                  onClick={() => setSelectedArticle(article)}
                  className={`rounded-3xl border p-5 text-left transition ${
                    selectedArticle?._id === article._id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-outline-variant/10 bg-surface-container-low hover:bg-surface-container-lowest'
                  }`}
                >
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-primary">{article.category}</div>
                  <h3 className="mt-2 text-xl font-black">{article.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{article.summary}</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                    {article.type || 'Article'} · {article.readTime || 'Short read'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <FileText className="h-4 w-4" />
              <h2 className="text-lg font-black">Selected guidance</h2>
            </div>
            {selectedArticle ? (
              <article className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                    {selectedArticle.category}
                  </span>
                  <span className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-semibold text-on-surface-variant">
                    {selectedArticle.type || 'Article'}
                  </span>
                  <span className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-semibold text-on-surface-variant">
                    {selectedArticle.readTime || 'Short read'}
                  </span>
                </div>
                <h3 className="text-2xl font-black">{selectedArticle.title}</h3>
                <p className="text-sm leading-7 text-on-surface-variant">{selectedArticle.summary}</p>
                <div className="rounded-3xl bg-surface-container-low p-5 text-sm leading-7 text-on-surface-variant">
                  {selectedArticle.content || 'Detailed guidance will appear here as articles are expanded in the database.'}
                </div>
              </article>
            ) : (
              <p className="text-sm text-on-surface-variant">No article selected.</p>
            )}
          </div>

          <div className="rounded-[28px] border border-outline-variant/10 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <ExternalLink className="h-4 w-4" />
              <h2 className="text-lg font-black">Official resources</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {officialResources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-outline-variant/10 bg-surface-container-low p-4 transition hover:bg-surface-container-lowest"
                >
                  <div className="font-black">{resource.name}</div>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

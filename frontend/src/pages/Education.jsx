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
  Sparkles,
  Zap,
  Globe,
  Award,
  ChevronRight,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLoader } from '../components/Loader';
import { contentService, rescueService } from '../services';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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
    return <PageLoader label="Synthesizing rescue protocols..." />;
  }

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20 relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-secondary/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        {/* Hero Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center mb-16"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary shadow-sm">
              <ShieldAlert size={14} />
              Operational Intelligence
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-display text-5xl font-black md:text-7xl tracking-tight text-on-surface leading-[1.05]">
              Protocol & <br />
              <span className="text-primary italic">Knowledge Base.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="max-w-2xl text-xl leading-relaxed text-on-surface-variant/80 font-medium">
              Access real-time field guides, legal frameworks, and emergency escalation protocols. Designed for clarity under high-pressure rescue environments.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <Link to="/report" className="group flex items-center gap-3 rounded-[2rem] bg-on-surface px-10 py-5 font-black text-white shadow-2xl transition-all hover:bg-primary">
                Emergency Report
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/map" className="flex items-center gap-3 rounded-[2rem] border border-outline-variant/10 bg-white/50 px-8 py-5 font-black text-on-surface backdrop-blur-md transition-all hover:bg-white hover:shadow-xl">
                Tactical Map
              </Link>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative hidden lg:block">
            <div className="aspect-square rounded-[4rem] overflow-hidden border-4 border-white/20 shadow-3xl relative group bg-on-surface">
              <img
                src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80"
                alt="Veterinary kit"
                className="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="glass-card p-6 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={16} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Active Focus</span>
                  </div>
                  <p className="text-sm font-bold opacity-90 leading-relaxed">Field triage guidelines for regional avian species updated 2h ago.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Intelligence Grid */}
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Sidebar Controls */}
          <aside className="space-y-8">
            {/* Search & Filters */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[3rem] border border-surface-container-high/50 shadow-soft bg-white/60 backdrop-blur-md"
            >
              <div className="relative mb-8">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search protocols..."
                  className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-5 pl-14 pr-8 font-bold placeholder:text-on-surface-variant/20 focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest ml-2">
                  <Filter size={14} /> Sector Filtering
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((item) => (
                    <button
                      key={item}
                      onClick={() => setCategory(item)}
                      className={`rounded-xl px-5 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                        category === item 
                          ? 'bg-on-surface text-white shadow-lg' 
                          : 'bg-surface-container-low text-on-surface-variant/60 hover:bg-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Legal Framework */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-[3.5rem] border border-surface-container-high/50 shadow-soft bg-white/60 backdrop-blur-md"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  <Gavel size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-on-surface">Legal Framework</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Compliance Directives</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {legalResources.map((resource) => (
                  <article key={resource.title} className="rounded-[2.5rem] bg-surface-container-low/50 p-6 border border-transparent hover:border-primary/20 hover:bg-white transition-all group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-black text-on-surface text-lg group-hover:text-primary transition-colors">{resource.title}</div>
                      <ExternalLink size={14} className="text-on-surface-variant/20 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-on-surface-variant/70 mb-4">{resource.summary}</p>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{resource.penalties}</span>
                       <a href={resource.link} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-widest text-on-surface hover:underline">Read Statute</a>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>

            {/* Emergency Uplinks */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-[3.5rem] border border-surface-container-high/50 shadow-soft bg-on-surface text-white"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary shadow-inner">
                  <Phone size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black">Escalation Links</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Immediate Assistance</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {helplines.slice(0, 4).map((item) => (
                  <article key={item.state} className="rounded-2xl bg-white/5 p-5 border border-white/5 hover:bg-white/10 transition-all flex items-center justify-between group">
                    <div>
                      <div className="text-sm font-black text-primary">{item.state}</div>
                      <div className="text-lg font-black mt-1 group-hover:text-white transition-colors">{item.helpline}</div>
                    </div>
                    <a href={`tel:${item.helpline}`} className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 transition-all">
                      <Phone size={16} />
                    </a>
                  </article>
                ))}
              </div>
            </motion.div>
          </aside>

          {/* Knowledge Repository */}
          <div className="space-y-10">
            {/* Guide Explorer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 md:p-14 rounded-[3.5rem] border-2 border-primary/5 shadow-2xl bg-white/80 backdrop-blur-xl"
            >
              <div className="mb-10 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-on-surface">Field Guide Repository</h2>
                  <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant/40">Technical Documentation</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {filteredArticles.map((article) => (
                  <motion.button
                    key={article._id}
                    whileHover={{ y: -5 }}
                    onClick={() => {
                      setSelectedArticle(article);
                      document.getElementById('article-view')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`rounded-[2.5rem] border-2 p-8 text-left transition-all duration-500 relative overflow-hidden group ${
                      selectedArticle?._id === article._id
                        ? 'border-primary bg-primary/5 shadow-xl'
                        : 'border-transparent bg-surface-container-low hover:bg-white hover:border-primary/20 hover:shadow-lg'
                    }`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{article.category}</span>
                        <Zap size={14} className={`${selectedArticle?._id === article._id ? 'text-primary' : 'text-on-surface-variant/20'}`} />
                      </div>
                      <h3 className="text-2xl font-black text-on-surface leading-tight mb-4 group-hover:text-primary transition-colors">{article.title}</h3>
                      <p className="text-sm font-medium leading-relaxed text-on-surface-variant/60 line-clamp-2 mb-6">{article.summary}</p>
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">
                         <Target size={12} /> {article.type || 'SOP'} · {article.readTime || '3m'}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Active Article View */}
            <AnimatePresence mode="wait">
              {selectedArticle && (
                <motion.div 
                  id="article-view"
                  key={selectedArticle._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card p-10 md:p-16 rounded-[4rem] border border-surface-container-high/50 shadow-3xl bg-on-surface text-white relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <span className="rounded-full bg-primary px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                        {selectedArticle.category}
                      </span>
                      <span className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
                        <FileText size={14} /> {selectedArticle.type || 'PROTOCOL'}
                      </span>
                    </div>

                    <h2 className="font-display text-4xl md:text-5xl font-black leading-tight mb-8">{selectedArticle.title}</h2>
                    
                    <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
                      <div className="space-y-8">
                        <p className="text-xl font-medium text-white/80 leading-relaxed italic border-l-4 border-primary pl-8 py-2">
                          {selectedArticle.summary}
                        </p>
                        <div className="text-lg leading-relaxed text-white/60 font-medium space-y-6">
                           {selectedArticle.content?.split('\n').map((para, i) => (
                             <p key={i}>{para}</p>
                           )) || 'Awaiting detailed field documentation integration...'}
                        </div>
                        
                        <div className="pt-8 flex flex-wrap gap-4">
                           <button className="flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 font-black text-white shadow-xl hover:scale-105 transition-all">
                              Download SOP <ArrowRight size={18} />
                           </button>
                           <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-black text-white hover:bg-white/10 transition-all">
                              Copy Link
                           </button>
                        </div>
                      </div>

                      <div className="space-y-6">
                         <div className="rounded-[2.5rem] bg-white/5 border border-white/10 p-8">
                            <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                               <Globe size={14} /> Official Endorsements
                            </h4>
                            <div className="space-y-4">
                               {officialResources.slice(0, 3).map(res => (
                                 <a key={res.name} href={res.url} target="_blank" rel="noreferrer" className="block p-4 rounded-2xl bg-white/5 border border-transparent hover:border-primary/20 transition-all">
                                    <div className="font-black text-sm">{res.name}</div>
                                    <div className="text-[10px] text-white/30 font-bold uppercase mt-1">Cross-Reference</div>
                                 </a>
                               ))}
                            </div>
                         </div>

                         <div className="rounded-[2.5rem] bg-primary/10 border border-primary/20 p-8">
                            <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                               <Award size={14} /> Certification Level
                            </h4>
                            <p className="text-xs font-medium text-white/60 leading-relaxed mb-6">
                               This document requires Level 2 field clearance for full tactical implementation.
                            </p>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-primary w-2/3" />
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

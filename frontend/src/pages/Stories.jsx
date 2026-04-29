import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Heart,
  Mail,
  MapPin,
  Share2,
  Sparkles,
  Search,
  Filter,
  Calendar,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Leaf
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    return <PageLoader label="Extracting rescue narratives..." />;
  }

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20 relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-emerald-500/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        {/* Hero Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center mb-20"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary">
              <Sparkles size={14} />
              Rescue Chronicles
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-display text-5xl font-black md:text-7xl tracking-tight text-on-surface leading-[1.1]">
              Field Reports & <br />
              <span className="text-primary italic">Success Vectors.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="max-w-xl text-lg leading-relaxed text-on-surface-variant/80 font-medium">
              Real-time narratives from the frontlines of wildlife rescue. Proof of impact curated from the platform database and regional intelligence layers.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => {
                  const target = document.getElementById('story-grid');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center gap-3 rounded-[2rem] bg-on-surface px-10 py-5 font-black text-white shadow-2xl transition-all hover:bg-primary"
              >
                Browse Reports
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
              <Link to="/volunteer" className="flex items-center gap-3 rounded-[2rem] border border-outline-variant/10 bg-white/50 px-8 py-5 font-black text-on-surface backdrop-blur-md transition-all hover:bg-white hover:shadow-xl">
                Submit Journey
              </Link>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative group">
            {featuredStory ? (
              <div className="overflow-hidden rounded-[3.5rem] bg-on-surface shadow-3xl relative">
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent z-10" />
                <img src={featuredStory.image} alt={featuredStory.title} className="h-[550px] w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
                
                <div className="absolute bottom-10 left-10 right-10 z-20">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="rounded-full bg-primary px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20">
                      Featured Report
                    </span>
                    <span className="flex items-center gap-2 text-xs font-bold text-white/60">
                      <MapPin size={14} className="text-primary" />
                      {featuredStory.location}
                    </span>
                  </div>
                  <h2 className="text-4xl font-black text-white mb-4 leading-tight">{featuredStory.title}</h2>
                  <p className="text-sm font-medium text-white/60 line-clamp-2 mb-6 max-w-lg">{featuredStory.excerpt}</p>
                  <button 
                    onClick={() => setSelectedStory(featuredStory)}
                    className="flex items-center gap-2 text-sm font-black text-primary hover:text-white transition-colors group/btn"
                  >
                    Dive into full report <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ) : null}
          </motion.div>
        </motion.section>

        {/* Content Explorer */}
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Sidebar Controls */}
          <aside className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[3rem] border border-surface-container-high/50 shadow-soft"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Filter size={18} />
                </div>
                <h2 className="text-xl font-black text-on-surface">Intelligence Filters</h2>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${
                      category === item 
                        ? 'bg-on-surface text-white shadow-lg' 
                        : 'bg-surface-container-low text-on-surface-variant/60 hover:bg-white hover:text-primary'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-[3rem] border border-surface-container-high/50 shadow-soft"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <TrendingUp size={18} />
                </div>
                <h2 className="text-xl font-black text-on-surface">State Intel Links</h2>
              </div>
              
              <div className="space-y-3">
                {stateLinks.map((item) => (
                  <article key={item.state} className="rounded-2xl bg-surface-container-low/50 p-5 border border-transparent hover:border-emerald-500/20 hover:bg-white transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-black text-on-surface group-hover:text-emerald-600 transition-colors">{item.state}</div>
                      <Award size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-xs font-bold text-on-surface-variant/60">{item.helpline}</div>
                  </article>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10 rounded-[3rem] bg-on-surface text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 bg-primary/10 blur-[50px] rounded-full" />
              <h2 className="relative z-10 text-2xl font-black">Intel Pipeline</h2>
              <p className="relative z-10 mt-3 text-sm font-medium text-white/50 leading-relaxed">
                Receive the latest field notes and rescue success telemetry directly.
              </p>
              
              <form
                className="relative z-10 mt-8 space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!email.trim()) {
                    toast.error('Enter an email to subscribe.');
                    return;
                  }
                  toast.success('Subscription request captured.');
                  setEmail('');
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Operational Email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-4 font-black text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform" type="submit">
                  <Mail size={18} />
                  Subscribe
                </button>
              </form>
            </motion.div>
          </aside>

          {/* Main Feed */}
          <div className="space-y-10">
            {/* Active Analysis Section */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={featuredStory?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card p-10 md:p-14 rounded-[3.5rem] border-2 border-primary/5 shadow-2xl bg-white/80 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen size={16} />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Active Report Analysis</h2>
                </div>

                {featuredStory ? (
                  <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
                    <div className="relative group overflow-hidden rounded-[2.5rem] shadow-xl h-full min-h-[300px]">
                      <img src={featuredStory.image} alt={featuredStory.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="rounded-full bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary">
                          {featuredStory.category}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">
                          <Calendar size={12} />
                          {featuredStory.date ? new Date(featuredStory.date).toLocaleDateString() : 'Active Field Op'}
                        </div>
                      </div>
                      
                      <h3 className="font-display text-4xl font-black text-on-surface leading-tight mb-6">{featuredStory.title}</h3>
                      <p className="text-lg leading-relaxed text-on-surface-variant/80 font-medium mb-8">{featuredStory.body}</p>
                      
                      <div className="flex flex-wrap gap-4 mt-auto">
                        <Link to="/report" className="flex items-center gap-3 rounded-2xl bg-on-surface px-8 py-4 font-black text-white shadow-xl hover:bg-primary transition-all">
                          Similar Report
                        </Link>
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(`${featuredStory.title}`);
                            toast.success('Telemetry ID copied.');
                          }}
                          className="flex items-center gap-3 rounded-2xl border border-outline-variant/10 px-6 py-4 font-black text-on-surface hover:bg-white hover:shadow-lg transition-all"
                        >
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            {/* Grid Visualization */}
            <div id="story-grid" className="grid gap-8 md:grid-cols-2">
              {filteredStories.map((story) => (
                <motion.article 
                  key={story.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-[3rem] glass-card border border-surface-container-high/50 bg-white shadow-soft group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={story.image} alt={story.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-6 left-6">
                      <span className="rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                        {story.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-4">
                      <MapPin size={12} />
                      {story.location}
                    </div>
                    <h3 className="text-2xl font-black text-on-surface leading-tight mb-4 group-hover:text-primary transition-colors">{story.title}</h3>
                    <p className="line-clamp-3 text-sm font-medium leading-relaxed text-on-surface-variant/60 mb-8">{story.excerpt}</p>
                    
                    <button
                      onClick={() => {
                        setSelectedStory(story);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-on-surface hover:text-primary transition-colors"
                    >
                      Analyze Report <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

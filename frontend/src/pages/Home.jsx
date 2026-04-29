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
  Activity,
  Plus,
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles,
  Info,
  FileText,
  Bookmark,
  ExternalLink,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { CardSkeleton, PageLoader } from '../components/Loader';
import { adoptionService, donationService, rescueService } from '../services';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
};

function SectionHeading({ eyebrow, title, description, action, light = false }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
    >
      <div className="max-w-3xl">
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest ${light ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
          <Activity size={14} />
          {eyebrow}
        </div>
        <h2 className={`mt-4 font-display text-3xl font-black tracking-tight md:text-4xl ${light ? 'text-white' : 'text-on-surface'}`}>{title}</h2>
        {description ? <p className={`mt-4 text-base leading-relaxed ${light ? 'text-white/70' : 'text-on-surface-variant/80'}`}>{description}</p> : null}
      </div>
      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </motion.div>
  );
}

function PremiumCard({ children, className = "" }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`glass-card p-6 md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [donationStats, setDonationStats] = useState(null);
  const [adoptionHighlights, setAdoptionHighlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

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
    return <PageLoader label="Initializing rescue networks..." />;
  }

  const stats = overview?.stats;
  const helplines = overview?.helplines || [];
  const schemes = overview?.schemes || [];
  const sanctuaries = overview?.sanctuaries || [];
  const species = overview?.species || [];
  const laws = overview?.legalResources || [];
  const resources = overview?.officialResources || [];
  const briefings = overview?.newsBriefings || [];
  const stories = overview?.rescueStories || [];
  const recentReports = overview?.recentReports || [];

  return (
    <div className="relative overflow-hidden bg-surface pt-24 pb-20">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-end pb-32 pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero_bg.png" 
            alt="Hero Background" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-on-surface/80 via-on-surface/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent/10" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-primary/20 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-primary-fixed backdrop-blur-xl border border-primary/20">
              <ShieldAlert size={16} />
              National Rescue Network • v2.0 Live
            </div>
            <h1 className="mt-8 font-display text-4xl font-black leading-[1.05] text-white md:text-6xl lg:text-7xl tracking-tight">
              Every Life <span className="text-primary-fixed italic">Matters.</span> <br />
              Every Second <span className="text-primary-fixed italic">Counts.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-surface/80 md:text-xl font-medium relative z-10">
              India's unified digital command center for animal emergency response. 
              Bridging the gap between critical incidents and life-saving action.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 group relative max-w-2xl z-20"
            >
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-primary to-emerald-400 opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
              <div className="relative flex items-center gap-2 rounded-[2.5rem] bg-on-surface/40 p-2 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <div className="flex flex-1 items-center gap-4 px-6">
                  <Search className="text-white/60" size={20} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/adopt?term=${searchQuery}`)}
                    placeholder="Search name, breed, or rescue status..." 
                    className="w-full bg-transparent py-4 text-white placeholder:text-white/40 focus:outline-none"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="p-2 text-white/40 hover:text-white transition-colors"
                    >
                      <Plus className="rotate-45" size={18} />
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => navigate(`/adopt?term=${searchQuery}`)}
                  className="flex items-center gap-2 rounded-full bg-primary-fixed px-6 py-4 text-sm font-black text-on-primary-fixed hover:bg-white hover:text-on-surface transition-all"
                >
                  <Search size={18} />
                  Search
                </button>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 px-4 relative z-30">
                {[
                  { label: 'Emergency', path: '/nearby' },
                  { label: 'Adoption', path: '/adopt' },
                  { label: 'Legal Aid', path: '/education' },
                  { label: 'Sanctuaries', path: '/nearby?type=sanctuary' }
                ].map(tag => (
                  <button 
                    key={tag.label} 
                    onClick={() => navigate(tag.path)}
                    className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-primary-fixed hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    {tag.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Network Snapshot (Overlaying Stats) */}
      <section className="relative z-30 mt-12 mx-auto max-w-7xl px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: 'Active Alerts', value: stats?.activeAlerts ?? 0, icon: Activity, color: 'bg-primary/20 text-primary-fixed', description: 'Incidents currently being routed to response teams nationwide.' },
            { label: 'Pending Adoptions', value: stats?.availablePets ?? 0, icon: Heart, color: 'bg-secondary/20 text-secondary-fixed-dim', description: 'Verified shelter profiles ready for their forever homes.' },
            { label: 'Verified Centers', value: stats?.activeCenters ?? 0, icon: ShieldCheck, color: 'bg-emerald-500/20 text-emerald-400', description: 'NGOs and government units integrated into our dispatch system.' },
            { label: 'Funds Allocated', value: `₹${(donationStats?.totalRaised ?? 0).toLocaleString()}`, icon: Sparkles, color: 'bg-blue-500/20 text-blue-400', description: 'Community contributions deployed for emergency medical aid.' }
          ].map((stat, sIdx) => (
            <div key={`${stat.label}-${sIdx}`} className="glass-dark border-white/10 p-8 group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon size={80} />
              </div>
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color} mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <div className="text-4xl font-black text-white tracking-tighter">{stat.value}</div>
              <div className="mt-1 text-sm font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
              <p className="mt-4 text-[11px] text-white/30 leading-relaxed font-medium">{stat.description}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Field Reports & News Briefings (Masonry Style Grid) */}
      <section className="mx-auto max-w-7xl px-4 py-32 md:px-6">
        <SectionHeading 
          eyebrow="Intelligence Hub"
          title="Field Reports & Briefings"
          description="Real-time data from the frontline of animal rescue and conservation efforts across India."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* Main Feed - Recent Reports */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-display text-2xl font-black text-on-surface">
                <Activity className="text-primary" />
                Live Incident Feed
              </h3>
              <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Tracking
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {recentReports.slice(0, 4).map((report, idx) => (
                <motion.div
                  key={`${report.referenceId}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-soft border border-surface-container-high/50 hover:shadow-2xl transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className={`rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                      report.urgency === 'High' ? 'bg-red-500 text-white' : 'bg-primary/10 text-primary'
                    }`}>
                      {report.urgency}
                    </div>
                    <div className="text-[10px] font-bold text-on-surface-variant/40">
                      {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <h4 className="mt-4 font-display text-xl font-black text-on-surface group-hover:text-primary transition-colors">
                    {report.species} Rescue
                  </h4>
                  <div className="mt-2 flex items-center gap-2 text-xs font-bold text-on-surface-variant/60">
                    <MapPinned size={14} className="text-primary" />
                    {report.locationText}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-surface-container-high flex items-center justify-center text-xs font-black">
                        {report.referenceId.slice(-2)}
                      </div>
                      <span className="text-xs font-bold text-on-surface-variant/80">{report.status}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-surface-container-high group-hover:text-primary transition-colors group-hover:translate-x-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar - News Briefings */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-8">
            <h3 className="flex items-center gap-2 font-display text-2xl font-black text-on-surface">
              <Bookmark className="text-secondary" />
              Intelligence Briefings
            </h3>
            <div className="space-y-4">
              {briefings.slice(0, 5).map((news, nIdx) => (
                <motion.div
                  key={`${news.title}-${nIdx}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="group rounded-2xl bg-surface-container-low/50 p-5 hover:bg-white hover:shadow-lg border border-transparent hover:border-surface-container-high transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-secondary">
                    <span>{news.source}</span>
                    <span className="h-1 w-1 rounded-full bg-secondary/30" />
                    <span className="text-on-surface-variant/40 font-bold">{news.date}</span>
                  </div>
                  <h4 className="mt-2 font-display text-sm font-black leading-tight text-on-surface group-hover:text-secondary transition-colors">
                    {news.title}
                  </h4>
                </motion.div>
              ))}
            </div>
            
            {/* Quick Action Card */}
            <div className="rounded-[2.5rem] bg-on-surface p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/40 transition-all" />
              <Info className="relative z-10 text-primary-fixed mb-4" size={32} />
              <h4 className="relative z-10 font-display text-xl font-black">Join as Volunteer</h4>
              <p className="relative z-10 mt-2 text-sm text-white/60 leading-relaxed">Be the first responder in your neighborhood. Get verified and save lives.</p>
              <Link to="/register" className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-black text-primary-fixed uppercase tracking-widest">
                Learn More
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Helplines (Priority Access) */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-6 bg-surface-container-low/30 rounded-[4rem]">
        <SectionHeading 
          eyebrow="Emergency Access"
          title="Rapid Response Helplines"
          description="Direct access to verified state and national authorities. No middleman, just immediate action."
          action={
            <Link to="/nearby" className="group flex items-center gap-2 font-black text-primary">
              View All Helplines
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {helplines.slice(0, 6).map((item) => (
            <motion.div
              key={item.helpline}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group flex items-center justify-between rounded-3xl bg-white p-6 shadow-soft transition-all hover:shadow-xl border border-surface-container-high/20"
            >
              <div className="min-w-0">
                <div className="text-xs font-black uppercase tracking-widest text-primary">{item.state}</div>
                <div className="mt-2 text-2xl font-black text-on-surface">{item.helpline}</div>
                <div className="mt-1 truncate text-sm font-medium text-on-surface-variant/70">{item.agency}</div>
              </div>
              <a href={`tel:${item.helpline}`} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-white">
                <Phone size={20} />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Adoption Section */}
      <section className="relative overflow-hidden bg-on-surface py-32 text-white mt-24">
        <div className="absolute inset-0 opacity-20">
          <img src="/adopt_bg.png" alt="Pet adoption banner background" className="h-full w-full object-cover" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading 
            eyebrow="Adopt, Don't Shop"
            title="Voices Waiting for a Home"
            description="Every profile here is connected to a verified shelter. We bridge the gap between rescue and recovery."
            light={true}
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {adoptionHighlights.map((pet) => (
              <motion.article 
                key={pet._id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group overflow-hidden rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 p-3 transition-all hover:bg-white/10"
              >
                <div className="relative h-64 overflow-hidden rounded-[2rem]">
                  <img src={pet.images?.[0]} alt={`Photo of ${pet.name}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute right-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                    {pet.species}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-black">{pet.name}</h3>
                    <span className="text-xs font-bold text-white/40">{pet.city}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/60 line-clamp-2">{pet.description}</p>
                  <Link to={`/pet/${pet._id}`} className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-sm font-black transition-colors hover:bg-white hover:text-on-surface">
                    View Profile
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Species Spotlight & Conservation Stories */}
      <section className="relative z-20 -mt-20 rounded-t-[4rem] bg-surface pt-32 pb-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading 
          eyebrow="Conservation Hub"
          title="Species Spotlight"
          description="In-depth coverage of vulnerable species and the success stories that keep the network moving."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Species List */}
          <div className="grid gap-6 sm:grid-cols-2">
            {species.slice(0, 4).map((s, idx) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-80 overflow-hidden rounded-[3rem] bg-on-surface"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary-fixed">{s.status}</div>
                  <h4 className="mt-2 font-display text-2xl font-black text-white">{s.name}</h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(Array.isArray(s.threats) ? s.threats : (typeof s.threats === 'string' ? s.threats.split(',') : [])).map((tag, tIdx) => (
                      <span key={`${s.name}-${tag}`} className="px-2 py-0.5 rounded-lg bg-white/10 text-[9px] font-bold text-white/60 whitespace-nowrap">{tag.toString().trim()}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rescue Success Stories */}
          <div className="space-y-8">
            <h3 className="flex items-center gap-2 font-display text-2xl font-black text-on-surface">
              <Sparkles className="text-primary" />
              Staff Picks: Success Stories
            </h3>
            <div className="space-y-6">
              {stories.slice(0, 3).map((story) => (
                <div key={story.title} className="flex gap-6 rounded-[2rem] bg-surface-container-low p-6 hover:bg-white hover:shadow-xl transition-all group">
                  <div className="shrink-0 h-24 w-24 overflow-hidden rounded-2xl bg-on-surface flex items-center justify-center">
                    <Heart size={32} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Success Story</div>
                    <h4 className="mt-1 font-display text-lg font-black text-on-surface group-hover:text-primary transition-colors">{story.title}</h4>
                    <p className="mt-2 text-sm text-on-surface-variant/70 line-clamp-2 italic">"{story.highlight}"</p>
                    <div className="mt-4 flex items-center gap-4 text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
                      <span>{story.location}</span>
                      <span>•</span>
                      <span>{story.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Resource Hub & Legal Framework */}
      <section className="bg-surface-container-low/30 py-32 border-t border-surface-container-high">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading 
            eyebrow="Resource Hub"
            title="Policy & Procedure"
            description="Direct access to official documentation, government schemes, and the legal framework protecting wildlife."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            {/* Legal Framework */}
            <div className="lg:col-span-7 space-y-8">
              <div className="grid gap-6">
                {laws.slice(0, 4).map((law, lIdx) => (
                  <PremiumCard key={`${law.title}-${lIdx}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-xl font-black text-on-surface">{law.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant/80">{law.summary}</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
                        <Gavel size={20} />
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-6">
                      <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                        <AlertTriangle size={14} />
                        Penalty: {law.penalties}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">
                        <FileText size={14} />
                        {law.act}
                      </div>
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </div>

            {/* Official Resources & Schemes */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <h4 className="font-display text-xl font-black text-on-surface flex items-center gap-2">
                  <ShieldCheck className="text-emerald-500" />
                  Government Schemes
                </h4>
                {schemes.slice(0, 3).map((scheme, scIdx) => (
                  <div key={`${scheme.name}-${scIdx}`} className="group relative rounded-3xl bg-white p-6 shadow-soft hover:shadow-lg transition-all overflow-hidden border border-surface-container-high/50">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <ExternalLink size={40} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{scheme.agency}</div>
                    <h5 className="mt-1 font-display font-black text-on-surface group-hover:text-emerald-600 transition-colors">{scheme.name}</h5>
                    <p className="mt-2 text-xs text-on-surface-variant/70 leading-relaxed">{scheme.benefit}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h4 className="font-display text-xl font-black text-on-surface flex items-center gap-2">
                  <Bookmark className="text-primary" />
                  Official Documents
                </h4>
                <div className="grid gap-4">
                  {resources.slice(0, 4).map((res, rIdx) => (
                    <a 
                      key={`res-${res.title}-${rIdx}`}                       href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-2xl bg-surface-container-low p-4 hover:bg-white hover:shadow-md transition-all group border border-transparent hover:border-primary/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-on-surface text-white group-hover:bg-primary transition-colors">
                          <FileText size={18} />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-primary">{res.category}</div>
                          <div className="text-sm font-bold text-on-surface">{res.title}</div>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-surface-container-high group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="mx-auto max-w-7xl px-4 py-32 md:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[4rem] bg-on-surface p-12 md:p-24 text-white text-center"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="absolute -left-20 -top-20 h-64 w-64 bg-primary/30 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-secondary/30 blur-[100px] rounded-full animate-pulse" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display text-5xl font-black md:text-7xl tracking-tighter leading-[1] mb-12">
              Ready to Save a <br /><span className="text-primary-fixed">Life Today?</span>
            </h2>
            <p className="mt-8 text-xl text-white/70 leading-relaxed font-medium">
              Join the 50,000+ citizens already protecting India's wildlife. Your action creates a ripple effect of compassion.
            </p>
            <div className="mt-16 flex flex-col gap-6 sm:flex-row justify-center">
              <Link to="/register" className="group flex items-center justify-center gap-3 rounded-[2rem] bg-white px-12 py-6 text-xl font-black text-on-surface shadow-2xl transition-all hover:scale-105 active:scale-95">
                Join Network
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/donation" className="group flex items-center justify-center gap-3 rounded-[2rem] border-2 border-white/20 bg-white/10 px-12 py-6 text-xl font-black text-white backdrop-blur-xl transition-all hover:bg-white/20">
                Support Cause
                <Heart size={20} className="transition-transform group-hover:scale-110" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

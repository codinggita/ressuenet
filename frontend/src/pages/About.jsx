import { useEffect, useState } from 'react';
import { 
  ArrowRight, 
  Building2, 
  Heart, 
  Landmark, 
  Map, 
  Shield, 
  Users, 
  Target, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Zap,
  Leaf
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLoader } from '../components/Loader';
import { rescueService } from '../services';

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
    return <PageLoader label="Fetching mission intelligence..." />;
  }

  const stats = overview?.stats || {};
  const officialResources = overview?.officialResources || [];
  const schemes = overview?.schemes || [];
  const featuredSanctuary = overview?.sanctuaries?.[0];

  const statCards = [
    { label: 'Rescue Nodes', value: stats.activeCenters || 0, icon: Shield, color: 'text-primary' },
    { label: 'State Channels', value: overview?.helplines?.length || 0, icon: Globe, color: 'text-blue-500' },
    { label: 'Impact Vectors', value: overview?.species?.length || 0, icon: Heart, color: 'text-rose-500' },
    { label: 'Legal Anchors', value: officialResources.length, icon: Landmark, color: 'text-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20 relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-primary/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

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
              <Target size={14} />
              Mission Parameters
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-display text-5xl font-black md:text-7xl tracking-tight text-on-surface leading-[1.1]">
              A Field-Ready <br />
              <span className="text-primary italic">Public Utility.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="max-w-2xl text-lg leading-relaxed text-on-surface-variant/80 font-medium">
              RescueNet is engineered around verified protocols, government references, and sanctuary intelligence. We bridge the gap between emergency reporting and professional intervention through high-fidelity data coordination.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <Link to="/register" className="group flex items-center gap-3 rounded-[2rem] bg-on-surface px-10 py-5 font-black text-white shadow-2xl transition-all hover:bg-primary">
                Join the Network
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/map" className="flex items-center gap-3 rounded-[2rem] border border-outline-variant/10 bg-white/50 px-8 py-5 font-black text-on-surface backdrop-blur-md transition-all hover:bg-white hover:shadow-xl">
                <Map size={20} />
                Explore Grid
              </Link>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative group">
            {featuredSanctuary ? (
              <div className="overflow-hidden rounded-[3.5rem] bg-on-surface shadow-3xl relative">
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent z-10" />
                <img src={featuredSanctuary.image} alt={featuredSanctuary.name} className="h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
                
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-fixed mb-2">{featuredSanctuary.state} Spotlight</div>
                  <h2 className="text-3xl font-black text-white mb-2">{featuredSanctuary.name}</h2>
                  <p className="text-sm font-medium text-white/60 line-clamp-2">{featuredSanctuary.status}</p>
                </div>
              </div>
            ) : (
              <div className="h-[500px] rounded-[3.5rem] bg-on-surface/5 border-2 border-dashed border-primary/20 flex items-center justify-center p-12 text-center">
                <Sparkles size={48} className="text-primary/20 mb-4 mx-auto" />
                <p className="text-on-surface-variant/40 font-black uppercase tracking-widest text-xs">Awaiting Network Spotlight</p>
              </div>
            )}
            
            {/* Floating Badge */}
            <div className="absolute -right-6 -bottom-6 glass-card p-6 rounded-3xl border border-primary/20 shadow-2xl z-30 hidden md:block">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-primary uppercase tracking-widest">Platform Integrity</div>
                    <div className="text-sm font-bold text-on-surface">Verified Operations</div>
                  </div>
               </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-24"
        >
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.article 
                key={card.label} 
                variants={itemVariants}
                className="glass-card p-8 rounded-[2.5rem] border border-surface-container-high/50 shadow-soft hover:shadow-xl transition-all group"
              >
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container-low ${card.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  <Icon size={24} />
                </div>
                <div className="text-4xl font-black text-on-surface tracking-tight">{card.value}</div>
                <div className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">{card.label}</div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Core Directives */}
        <div className="grid gap-12 lg:grid-cols-2 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 md:p-14 rounded-[3.5rem] border border-surface-container-high/50"
          >
            <h2 className="font-display text-3xl font-black text-on-surface mb-10">Operational <span className="text-primary italic">Directives.</span></h2>
            <div className="space-y-6">
              {[
                { title: 'Emergency Routing', desc: 'Verified rescue centers and map context lower the latency between report and intervention.', icon: Zap },
                { title: 'Species Context', desc: 'Separating wildlife protection from generic rescue content ensuring precise conservation scaling.', icon: Leaf },
                { title: 'Data Transparency', desc: 'Government schemes and legal references are surfaced as usable action tokens for responders.', icon: Landmark }
              ].map((item, i) => (
                <div key={i} className="group flex gap-6 p-6 rounded-[2rem] bg-surface-container-low/50 hover:bg-white transition-all border border-transparent hover:border-primary/10">
                  <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-on-surface mb-2">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-on-surface-variant/70 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 md:p-14 rounded-[3.5rem] border border-surface-container-high/50"
          >
            <h2 className="font-display text-3xl font-black text-on-surface mb-10">Institutional <span className="text-primary italic">Anchors.</span></h2>
            <div className="space-y-4">
              {schemes.map((scheme) => (
                <article key={scheme.name} className="rounded-3xl border border-outline-variant/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] font-black text-primary uppercase tracking-widest">{scheme.year} Protocol</div>
                    <div className="h-2 w-2 rounded-full bg-primary/20 group-hover:bg-primary animate-pulse" />
                  </div>
                  <h3 className="font-black text-lg text-on-surface leading-tight mb-3">{scheme.name}</h3>
                  <p className="text-xs font-medium leading-relaxed text-on-surface-variant/80">{scheme.focus}</p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    View Documentation <ChevronRight size={12} />
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Global Registry Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[3.5rem] bg-on-surface p-10 md:p-16 text-white shadow-3xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          
          <div className="relative z-10">
            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center mb-16">
              <div>
                <h2 className="font-display text-4xl font-black md:text-5xl text-white">Transparency Matters.</h2>
                <p className="mt-6 max-w-2xl text-lg text-white/60 font-medium leading-relaxed">
                  The network relies on external public sources to verify conservation framing, legal summaries, and state-led program references.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard" className="flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 font-black text-white shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                  Platform Status
                </Link>
                <Link to="/stories" className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-black text-white hover:bg-white/10 transition-all">
                  Field Reports
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {officialResources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[2rem] border border-white/10 bg-white/5 p-8 transition hover:bg-white/10 hover:border-white/20"
                >
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white group-hover:bg-primary transition-colors">
                    <ExternalLink size={18} />
                  </div>
                  <div className="font-black text-white text-lg leading-tight mb-3">{resource.name}</div>
                  <p className="text-xs font-medium leading-relaxed text-white/40 group-hover:text-white/60 transition-colors">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

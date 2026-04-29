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
  Plus,
  LayoutDashboard,
  Bell,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CardSkeleton } from '../components/Loader';
import { donationService, rescueService } from '../services';
import { useAuthStore } from '../store/authStore';

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

function StatPanel({ label, value, detail, icon, colorClass }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/60 p-6 shadow-glass backdrop-blur-xl transition-all hover:bg-white hover:shadow-glass-hover"
    >
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${colorClass} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClass} text-white shadow-lg`}>
        {icon}
      </div>
      <div className="text-3xl font-black tracking-tight text-on-surface">{value}</div>
      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">{label}</div>
      <div className="mt-3 text-xs font-medium leading-relaxed text-on-surface-variant/70">{detail}</div>
    </motion.div>
  );
}

function QuickAction({ icon: Icon, label, description, to, color }) {
  return (
    <Link to={to} className="group">
      <motion.div
        variants={itemVariants}
        whileHover={{ x: 5 }}
        className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/40 p-4 transition-all hover:bg-white hover:shadow-soft"
      >
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-${color}/10 text-${color} group-hover:scale-110 transition-transform shadow-sm`}>
          <Icon size={20} />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-black text-on-surface">{label}</div>
          <div className="truncate text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider">{description}</div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const dashboardResponse = await rescueService.getCompleteDashboard();
        setDashboard(dashboardResponse.data);
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
      <div className="min-h-screen bg-surface pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <CardSkeleton key={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: 'Active alerts',
      value: dashboard?.activeAlerts ?? 0,
      detail: 'Rescue cases currently in open or dispatched status.',
      icon: <Siren className="h-6 w-6" />,
      colorClass: 'from-orange-500 to-red-600',
    },
    {
      label: 'Resolved today',
      value: dashboard?.resolvedToday ?? 0,
      detail: 'Successful animal rescues completed within 24 hours.',
      icon: <CheckCircle2 className="h-6 w-6" />,
      colorClass: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Available adoptions',
      value: dashboard?.availablePets ?? 0,
      detail: 'Animals waiting for their forever homes in our network.',
      icon: <Heart className="h-6 w-6" />,
      colorClass: 'from-pink-500 to-rose-600',
    },
    {
      label: 'Funds raised',
      value: `₹${(dashboard?.totalRaised ?? 0).toLocaleString()}`,
      detail: `${dashboard?.successfulDonors ?? 0} community members contributed.`,
      icon: <Wallet className="h-6 w-6" />,
      colorClass: 'from-blue-600 to-indigo-700',
    },
  ];

  const maxCenters = Math.max(...(dashboard?.networkByState || []).map((item) => item.centers), 1);

  return (
    <div className="min-h-screen bg-surface pb-20 pt-24 md:pt-28 relative overflow-hidden">
      {/* Background Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-[10%] top-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-[5%] top-[40%] h-[30%] w-[30%] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-4 md:px-6"
      >
        {/* Cinematic Header */}
        <motion.div variants={itemVariants} className="mb-12 overflow-hidden rounded-[3rem] bg-on-surface shadow-2xl relative">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 pointer-events-none" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
           
           <div className="grid lg:grid-cols-[1.3fr_0.7fr] relative z-10">
            <div className="p-10 md:p-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary-fixed">
                <LayoutDashboard size={14} />
                Operational Dashboard
              </div>
              <h1 className="mt-8 font-display text-4xl font-black tracking-tight text-white md:text-6xl">
                System Status: <span className="text-primary-fixed">Active</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60 font-medium">
                Tracking animal welfare operations across India. Coordinating with <span className="text-white font-bold">{dashboard?.activeCenters ?? 0} active centers</span> and dispatch teams.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/report" className="group flex items-center gap-3 rounded-[2rem] bg-primary px-8 py-4 font-black text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                  <Plus size={22} className="transition-transform group-hover:rotate-90" />
                  New Report
                </Link>
                <Link to="/map" className="flex items-center gap-3 rounded-[2rem] border border-white/20 bg-white/5 px-8 py-4 font-black text-white backdrop-blur-md transition-all hover:bg-white/10">
                  <MapPinned size={22} />
                  Operational Map
                </Link>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-2xl p-10 md:p-12 border-l border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 font-display text-lg font-black text-white">
                  <Bell className="h-5 w-5 text-primary-fixed" />
                  Emergency Hotlines
                </div>
                <Link to="/nearby" className="text-[10px] font-black uppercase tracking-widest text-primary-fixed hover:underline">Global Registry</Link>
              </div>
              
              <div className="space-y-4">
                {(dashboard?.helplines || []).slice(0, 3).map((item) => (
                  <motion.div 
                    key={item.state} 
                    whileHover={{ x: 5 }}
                    className="group flex items-center justify-between rounded-2xl bg-white/10 p-4 border border-white/5 transition-all hover:bg-white/15"
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary-fixed">{item.state}</div>
                      <div className="mt-1 text-sm font-black text-white">{item.helpline}</div>
                      <div className="text-[10px] font-bold text-white/40 uppercase">{item.agency}</div>
                    </div>
                    <a href={`tel:${item.helpline}`} className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary-fixed transition-colors group-hover:bg-primary group-hover:text-white shadow-sm">
                      <Phone size={18} />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <StatPanel key={card.label} {...card} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-16">
            {/* Live Rescue Feed */}
            <motion.section variants={itemVariants}>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-3xl font-black text-on-surface">Live Operations</h2>
                  <p className="mt-1 text-sm font-bold text-on-surface-variant/40 uppercase tracking-widest">Real-time incident stream</p>
                </div>
                <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-on-surface shadow-soft border border-surface-container-high">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]" />
                  Active Link
                </div>
              </div>
              
              <div className="space-y-4">
                {(dashboard?.todayAlerts || []).length ? (
                  dashboard.todayAlerts.map((report) => (
                    <motion.article 
                      key={report.id}
                      whileHover={{ scale: 1.01 }}
                      className="group relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/60 p-6 shadow-glass backdrop-blur-md transition-all hover:bg-white"
                    >
                      <div className={`absolute left-0 top-0 h-full w-2 ${report.urgency === 'High' ? 'bg-red-500' : 'bg-primary'}`} />
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-surface-container-low text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                          <Zap size={24} fill={report.urgency === 'High' ? 'currentColor' : 'none'} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-black text-primary uppercase tracking-widest">{report.referenceId}</span>
                            <span className="text-[10px] font-bold text-on-surface-variant/40">• {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <h3 className="font-bold text-on-surface flex items-center gap-2">
                             <MapPinned size={14} className="text-primary" />
                             {report.location}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant/80 font-medium line-clamp-2">
                            {report.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4">
                          <span className={`rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-sm ${
                            report.status === 'Open' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'
                          }`}>
                            {report.status}
                          </span>
                          <span className="rounded-lg bg-surface-container-high px-3 py-1.5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">
                            {report.species}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-outline-variant/10 bg-white/30 py-20">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-soft">
                      <LifeBuoy className="text-primary/20" size={40} />
                    </div>
                    <p className="text-lg font-black text-on-surface-variant/40 uppercase tracking-widest">Awaiting Transmissions</p>
                  </div>
                )}
              </div>
            </motion.section>

            {/* Network Presence */}
            <motion.section variants={itemVariants}>
               <div className="mb-8">
                  <h2 className="font-display text-3xl font-black text-on-surface">National Presence</h2>
                  <p className="mt-1 text-sm font-bold text-on-surface-variant/40 uppercase tracking-widest">Verified coverage areas</p>
                </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {(dashboard?.networkByState || []).map((item) => (
                  <div key={item.state} className="rounded-[2.5rem] bg-white p-8 shadow-soft border border-surface-container-high/50 hover:shadow-xl transition-all group">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-black text-xl text-on-surface group-hover:text-primary transition-colors">{item.state}</h3>
                      <div className="text-[10px] font-black text-primary bg-primary/10 px-4 py-2 rounded-full uppercase tracking-widest">
                        {item.centers} Operational
                      </div>
                    </div>
                    <div className="relative h-3 w-full overflow-hidden rounded-full bg-surface-container-low shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max((item.centers / maxCenters) * 100, 10)}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-primary via-primary to-emerald-400" 
                      />
                    </div>
                    <div className="mt-6 flex items-center justify-between text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <Activity size={14} className="text-primary" />
                        {item.rescues.toLocaleString()} Impacts
                      </div>
                      <Link to="/map" className="flex items-center gap-1 font-black text-primary hover:underline">
                        Deploy <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="rounded-[3rem] bg-on-surface p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <h2 className="font-display text-xl font-black flex items-center gap-3 mb-8">
                <Shield className="text-primary-fixed" size={24} />
                Commander Tools
              </h2>
              <div className="space-y-4">
                <QuickAction to="/report" icon={Siren} color="orange-500" label="Deploy Emergency" description="Priority 1 Rescue" />
                <QuickAction to="/adopt" icon={Heart} color="pink-500" label="Initiate Adoption" description="Home Matching" />
                <QuickAction to="/volunteer" icon={Trees} color="emerald-500" label="Field Logistics" description="Join Response Team" />
                <QuickAction to="/donation" icon={Wallet} color="blue-500" label="Resource Injection" description="Fund Operations" />
              </div>
            </motion.div>

            {/* Conservation Intel */}
            <motion.section variants={itemVariants} className="rounded-[2.5rem] bg-white p-8 shadow-soft border border-surface-container-high/50">
              <h2 className="mb-8 font-display text-xl font-black text-on-surface flex items-center gap-3">
                <Trees className="text-primary" size={24} />
                Operational Intel
              </h2>
              <div className="space-y-5">
                {(dashboard?.sanctuaries || []).slice(0, 3).map((item) => (
                  <div key={item.name} className="relative rounded-2xl bg-surface-container-low p-5 border border-transparent hover:border-primary/20 hover:bg-white transition-all group">
                    <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-primary/20 group-hover:bg-primary transition-colors" />
                    <div className="font-black text-base text-on-surface group-hover:text-primary transition-colors">{item.name}</div>
                    <div className="text-[10px] font-black text-primary-fixed bg-primary/20 px-2 py-0.5 rounded inline-block mt-2 uppercase tracking-widest">{item.state}</div>
                    <p className="mt-3 text-xs text-on-surface-variant font-medium leading-relaxed line-clamp-2">{item.status}</p>
                  </div>
                ))}
              </div>
              <Link to="/education" className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-surface-container-low py-4 text-sm font-black text-primary transition-all hover:bg-primary hover:text-white shadow-sm">
                Access Archives <ArrowUpRight size={18} />
              </Link>
            </motion.section>

            {/* Gov Protocols */}
            <motion.section variants={itemVariants} className="rounded-[2.5rem] bg-white p-8 shadow-soft border border-surface-container-high/50 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 text-primary opacity-5">
                 <Landmark size={120} />
              </div>
              <h2 className="mb-8 font-display text-xl font-black text-on-surface flex items-center gap-3">
                <Landmark className="text-primary" size={24} />
                Gov Protocols
              </h2>
              <div className="space-y-4">
                {(dashboard?.schemes || []).slice(0, 2).map((scheme) => (
                  <div key={scheme.name} className="rounded-2xl border border-outline-variant/10 p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{scheme.year} Protocol</div>
                    <div className="mt-1 font-black text-sm text-on-surface leading-tight">{scheme.name}</div>
                    <p className="mt-3 text-[11px] font-medium leading-relaxed text-on-surface-variant/80">{scheme.focus}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        {/* Adoption Grid */}
        <motion.section variants={itemVariants} className="mt-20">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="font-display text-4xl font-black text-on-surface">Unit Readiness</h2>
              <p className="mt-1 text-sm font-bold text-on-surface-variant/40 uppercase tracking-widest">Profiles ready for deployment</p>
            </div>
            <Link to="/adopt" className="group flex items-center gap-3 rounded-[2rem] bg-white px-8 py-4 font-black text-on-surface shadow-soft transition-all hover:bg-primary hover:text-white border border-surface-container-high">
              Registry <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {(dashboard?.adoptionHighlights || []).map((pet) => (
              <motion.article 
                key={pet._id}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[3rem] bg-white p-4 shadow-soft transition-all hover:shadow-2xl border border-surface-container-high/50"
              >
                <div className="relative h-72 w-full overflow-hidden rounded-[2.5rem] shadow-inner">
                  <img src={pet.images?.[0]} alt={pet.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary backdrop-blur-md shadow-sm">
                    {pet.species}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display text-2xl font-black text-on-surface">{pet.name}</h3>
                    <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">{pet.city}</span>
                  </div>
                  <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">{pet.breed}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <Link to={`/adopt/${pet._id}`} className="text-xs font-black text-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Unit Profile</Link>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <Heart size={16} fill={pet.adoptionStatus === 'Available' ? 'currentColor' : 'none'} />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

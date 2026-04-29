import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import {
  MapPinned,
  Navigation,
  Phone,
  RefreshCw,
  Shield,
  Trees,
  Building2,
  Activity,
  ArrowRight,
  ShieldAlert,
  Search,
  Filter,
  Layers,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import EmptyState from '../components/EmptyState';
import { PageLoader, Spinner } from '../components/Loader';
import { rescueService } from '../services';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const defaultLocation = { lat: 23.0225, lng: 72.5714, label: 'Ahmedabad' };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function NearbyHelp() {
  const [location, setLocation] = useState(defaultLocation);
  const [radius, setRadius] = useState(10000);
  const [type, setType] = useState('all');
  const [view, setView] = useState('rescue');
  const [loading, setLoading] = useState(true);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [centers, setCenters] = useState([]);
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: 'Local Node (Detected)',
        });
      },
      () => {
        toast.error('Telemetry restricted. Using region fallback.');
      }
    );
  }, []);

  useEffect(() => {
    async function loadOverview() {
      try {
        const response = await rescueService.getOverview();
        setOverview(response.data);
      } catch (error) {
        toast.error('Hub intelligence offline.');
      } finally {
        setOverviewLoading(false);
      }
    }
    loadOverview();
  }, []);

  useEffect(() => {
    async function loadCenters() {
      try {
        setLoading(true);
        const response = await rescueService.getNearby(location.lat, location.lng, radius, type);
        setCenters(response.data || []);
      } catch (error) {
        toast.error('Regional registry sync failed.');
      } finally {
        setLoading(false);
      }
    }
    loadCenters();
  }, [location, radius, type]);

  const sanctuaries = useMemo(() => overview?.sanctuaries || [], [overview]);
  const helplines = useMemo(() => overview?.helplines || [], [overview]);

  const mapCenter = useMemo(() => {
    if (view === 'sanctuaries' && sanctuaries.length) {
      return [sanctuaries[0].coordinates[1], sanctuaries[0].coordinates[0]];
    }
    if (view === 'helplines' && helplines.length) {
      return [helplines[0].coordinates[1], helplines[0].coordinates[0]];
    }
    return [location.lat, location.lng];
  }, [view, sanctuaries, helplines, location]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const mapItems = useMemo(() => {
    const radiusKm = radius / 1000;

    if (view === 'sanctuaries') {
      return sanctuaries
        .filter(item => {
          if (!item.coordinates) return false;
          const dist = calculateDistance(location.lat, location.lng, item.coordinates[1], item.coordinates[0]);
          return dist <= radiusKm;
        })
        .map((item) => ({
          id: item.name,
          title: item.name,
          subtitle: `${item.district}, ${item.state}`,
          description: item.status,
          coordinates: item.coordinates,
          badge: 'Sanctuary',
          image: item.image,
        }));
    }

    if (view === 'helplines') {
      return helplines
        .filter((item) => {
          if (!item.coordinates) return false;
          const dist = calculateDistance(location.lat, location.lng, item.coordinates[1], item.coordinates[0]);
          return dist <= radiusKm;
        })
        .map((item) => ({
          id: item.state,
          title: item.agency,
          subtitle: `${item.state} | ${item.helpline}`,
          description: item.coverage,
          coordinates: item.coordinates,
          badge: 'Helpline',
          website: item.website,
          phone: item.helpline,
        }));
    }

    return centers.map((center) => ({
      id: center._id,
      title: center.name,
      subtitle: center.location.address,
      description: `${center.type}${center.distanceKm ? ` | ${center.distanceKm} km` : ''}`,
      coordinates: center.location.coordinates,
      badge: center.type,
      phone: center.contact?.phone?.[0],
      services: center.services,
    }));
  }, [view, sanctuaries, helplines, centers]);

  if (overviewLoading && !overview) {
    return <PageLoader label="Synchronizing operations map..." />;
  }

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20 relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-primary/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary mb-4">
              <Layers size={14} />
              Global Operations Grid
            </div>
            <h1 className="font-display text-4xl font-black md:text-5xl tracking-tight text-on-surface">
              Map the <span className="text-primary italic">Network.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-on-surface-variant/80 leading-relaxed font-medium">
              Real-time synchronization of rescue centers, wildlife sanctuaries, and helpline hubs across the geography of the coordination grid.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap gap-2 lg:mb-2">
            {[
              { id: 'rescue', label: 'Rescue Units', icon: Shield },
              { id: 'sanctuaries', label: 'Sanctuaries', icon: Trees },
              { id: 'helplines', label: 'Helpline Hubs', icon: Building2 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`group flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                    view === item.id 
                      ? 'bg-primary text-on-primary shadow-xl shadow-primary/20' 
                      : 'glass-card text-on-surface-variant/60 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon size={14} className={view === item.id ? '' : 'transition-transform group-hover:scale-110'} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {/* Map Interaction Layer */}
            <div className="glass-card overflow-hidden rounded-[2.5rem] border border-surface-container-high/50 shadow-2xl shadow-primary/5">
              <div className="relative h-[400px] w-full md:h-[600px]">
                <MapContainer center={mapCenter} zoom={view === 'rescue' ? 12 : 5} className="h-full w-full grayscale-[0.2] contrast-[1.1]">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap"
                  />
                  {view === 'rescue' && (
                    <Marker 
                      position={[location.lat, location.lng]}
                      icon={L.divIcon({
                        className: 'user-marker',
                        html: `<div class="w-8 h-8 bg-blue-500 border-4 border-white rounded-full shadow-lg flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>`,
                        iconSize: [32, 32],
                        iconAnchor: [16, 16],
                      })}
                    >
                      <Popup className="premium-popup">Telemetry Origin (You)</Popup>
                    </Marker>
                  )}
                  {mapItems.map((item) => (
                    <Marker key={item.id} position={[item.coordinates[1], item.coordinates[0]]}>
                      <Popup className="premium-popup">
                        <div className="p-1">
                          <div className="font-black text-sm mb-1">{item.title}</div>
                          <div className="text-[10px] font-bold text-primary uppercase tracking-wider">{item.badge}</div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
                
                {/* Search / Filters Overlay */}
                <div className="absolute top-6 left-6 right-6 z-[1000] pointer-events-none">
                  <div className="pointer-events-auto flex flex-wrap gap-3">
                    <AnimatePresence mode="wait">
                      {view === 'rescue' && (
                        <motion.div 
                          key="type-filter"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="glass-dark px-4 py-2 rounded-2xl flex items-center gap-3 border border-white/10 backdrop-blur-xl"
                        >
                          <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Type</span>
                          <select 
                            value={type} 
                            onChange={(e) => setType(e.target.value)} 
                            className="bg-transparent text-xs font-black text-white focus:outline-none cursor-pointer"
                          >
                            <option className="bg-surface-container-dark text-white" value="all">All Sectors</option>
                            <option className="bg-surface-container-dark text-white" value="NGO">NGO</option>
                            <option className="bg-surface-container-dark text-white" value="Veterinary">Veterinary</option>
                            <option className="bg-surface-container-dark text-white" value="Ambulance">Ambulance</option>
                            <option className="bg-surface-container-dark text-white" value="Government">Govt.</option>
                          </select>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="glass-dark px-4 py-2 rounded-2xl flex items-center gap-3 border border-white/10 backdrop-blur-xl">
                      <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Radius</span>
                      <select 
                        value={radius} 
                        onChange={(e) => setRadius(Number(e.target.value))} 
                        className="bg-transparent text-xs font-black text-white focus:outline-none cursor-pointer"
                      >
                        <option className="bg-surface-container-dark text-white" value={10000}>10 KM</option>
                        <option className="bg-surface-container-dark text-white" value={25000}>25 KM</option>
                        <option className="bg-surface-container-dark text-white" value={50000}>50 KM</option>
                        <option className="bg-surface-container-dark text-white" value={100000}>100 KM</option>
                        <option className="bg-surface-container-dark text-white" value={500000}>500 KM</option>
                      </select>
                    </div>

                    <button 
                      onClick={() => setLocation({ ...location })}
                      className="glass-dark h-10 w-10 flex items-center justify-center rounded-2xl border border-white/10 hover:bg-white/20 transition-colors"
                    >
                      <RefreshCw size={16} className={`text-white ${loading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registry Side Panel */}
          <aside className="space-y-6 flex flex-col h-[500px] md:h-auto">
            <div className="flex items-center justify-between mb-4 px-2">
              <div>
                <h2 className="font-display text-xl font-black text-on-surface">Regional Registry</h2>
                <p className="text-xs font-black text-on-surface-variant/40 uppercase tracking-widest mt-1">{mapItems.length} Identified Nodes</p>
              </div>
              {loading && <Spinner size="sm" />}
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar"
            >
              {mapItems.length ? (
                mapItems.map((item) => (
                  <motion.article 
                    key={item.id}
                    variants={itemVariants}
                    className="glass-card p-5 border border-surface-container-high/50 hover:border-primary/20 transition-all group relative overflow-hidden"
                  >
                    {'image' in item && item.image && (
                      <div className="absolute top-0 right-0 w-24 h-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                        <img src={item.image} alt="" className="w-full h-full object-cover grayscale" />
                      </div>
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-sm leading-tight text-on-surface">{item.title}</h3>
                          <p className="text-[11px] font-medium text-on-surface-variant/60 mt-1">{item.subtitle}</p>
                        </div>
                        <span className="shrink-0 rounded-lg bg-primary/5 px-2 py-1 text-[10px] font-black text-primary uppercase tracking-widest border border-primary/10">
                          {item.badge}
                        </span>
                      </div>
                      
                      <p className="text-[11px] font-bold text-on-surface-variant/80 mb-4">{item.description}</p>
                      
                      <div className="flex gap-2">
                        {item.phone && (
                          <a href={`tel:${item.phone}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                            <Phone size={12} />
                            Establish Link
                          </a>
                        )}
                        <a 
                          href={item.website || `https://www.google.com/maps/dir/?api=1&destination=${item.coordinates[1]},${item.coordinates[0]}`}
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-high transition-all"
                        >
                          <Navigation size={12} />
                          Navigate
                        </a>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="h-full flex items-center justify-center">
                  <EmptyState
                    title="No Nodes Detected"
                    message="Expand search radius or adjust telemetry filters."
                    icon="Map"
                  />
                </div>
              )}
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}

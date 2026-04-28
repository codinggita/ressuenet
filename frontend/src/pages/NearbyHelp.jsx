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
} from 'lucide-react';
import toast from 'react-hot-toast';
import EmptyState from '../components/EmptyState';
import { PageLoader, Spinner } from '../components/Loader';
import { rescueService } from '../services';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const defaultLocation = { lat: 23.0225, lng: 72.5714, label: 'Ahmedabad fallback' };

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
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: 'Your current location',
        });
      },
      () => {
        toast.error('Location access denied. Using fallback search area.');
      }
    );
  }, []);

  useEffect(() => {
    async function loadOverview() {
      try {
        const response = await rescueService.getOverview();
        setOverview(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Unable to fetch map overview data.');
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
        toast.error(error.response?.data?.message || 'Unable to fetch nearby rescue centers.');
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

  const mapItems = useMemo(() => {
    if (view === 'sanctuaries') {
      return sanctuaries.map((item) => ({
        id: item.name,
        title: item.name,
        subtitle: `${item.state} - ${item.district}`,
        description: item.status,
        coordinates: item.coordinates,
        badge: 'Sanctuary',
        image: item.image,
      }));
    }

    if (view === 'helplines') {
      return helplines
        .filter((item) => item.coordinates)
        .map((item) => ({
          id: item.state,
          title: item.agency,
          subtitle: `${item.state} - ${item.helpline}`,
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
      description: `${center.type}${center.distanceKm ? ` - ${center.distanceKm} km away` : ''}`,
      coordinates: center.location.coordinates,
      badge: center.type,
      phone: center.contact?.phone?.[0],
      services: center.services,
    }));
  }, [view, sanctuaries, helplines, centers]);

  if (overviewLoading && !overview) {
    return <PageLoader label="Loading map intelligence..." />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 md:px-6 md:pt-32">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Rescue map</p>
          <h1 className="mt-2 text-3xl font-black md:text-4xl">Map the response network, not just nearby search results</h1>
          <p className="mt-2 max-w-3xl text-sm text-on-surface-variant md:text-base">
            The map now carries rescue centers, wildlife sanctuaries, and helpline hubs so the new real-data layer shows up as geography instead of looking like a long document.
          </p>
        </div>
        <button onClick={() => setLocation({ ...location })} className="btn-outline">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {[
          { id: 'rescue', label: 'Rescue centers', icon: Shield },
          { id: 'sanctuaries', label: 'Sanctuaries', icon: Trees },
          { id: 'helplines', label: 'Helpline hubs', icon: Building2 },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                view === item.id ? 'bg-primary text-on-primary' : 'bg-white text-on-surface-variant'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {view === 'rescue' ? (
        <div className="mb-5 grid gap-3 rounded-2xl border border-outline-variant/10 bg-white p-4 shadow-sm md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Service type</span>
            <select value={type} onChange={(e) => setType(e.target.value)} className="input-field">
              <option value="all">All services</option>
              <option value="NGO">NGO</option>
              <option value="Veterinary">Veterinary</option>
              <option value="Ambulance">Ambulance</option>
              <option value="Government">Government</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Radius</span>
            <select value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="input-field">
              <option value={5000}>5 km</option>
              <option value={10000}>10 km</option>
              <option value={25000}>25 km</option>
              <option value={50000}>50 km</option>
            </select>
          </label>
          <div className="rounded-2xl bg-surface-container-low p-4">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Search origin</div>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold">
              <MapPinned className="h-4 w-4 text-primary" />
              {location.label}
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="overflow-hidden rounded-3xl border border-outline-variant/10 bg-white shadow-sm">
          <MapContainer center={mapCenter} zoom={view === 'rescue' ? 12 : 5} className="h-[360px] w-full md:h-[560px]">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {view === 'rescue' ? (
              <Marker position={[location.lat, location.lng]}>
                <Popup>Current search location</Popup>
              </Marker>
            ) : null}
            {mapItems.map((item) => (
              <Marker key={item.id} position={[item.coordinates[1], item.coordinates[0]]}>
                <Popup>
                  <div className="space-y-1">
                    <div className="font-bold">{item.title}</div>
                    <div className="text-sm">{item.subtitle}</div>
                    <div className="text-sm text-primary">{item.description}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="rounded-3xl border border-outline-variant/10 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black">
                {view === 'rescue' ? 'Available centers' : view === 'sanctuaries' ? 'Sanctuary cards' : 'Helpline hubs'}
              </h2>
              <p className="text-sm text-on-surface-variant">{mapItems.length} results</p>
            </div>
            {loading && view === 'rescue' ? <Spinner size="sm" label="" /> : null}
          </div>

          <div className="max-h-[560px] space-y-3 overflow-auto pr-1">
            {loading && view === 'rescue' ? (
              <div className="py-10">
                <Spinner label="Loading nearby centers..." />
              </div>
            ) : mapItems.length ? (
              mapItems.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-low">
                  {'image' in item && item.image ? <img src={item.image} alt={item.title} className="h-40 w-full object-cover" /> : null}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="mt-1 text-sm text-on-surface">{item.subtitle}</p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">{item.badge}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.description}</p>

                    {view === 'rescue' ? (
                      <>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {(item.services || []).slice(0, 3).map((service) => (
                            <span key={service} className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-on-surface-variant">
                              {service}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <a href={`tel:${item.phone || ''}`} className="btn-primary flex-1">
                            <Phone className="h-4 w-4" />
                            Call
                          </a>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${item.coordinates[1]},${item.coordinates[0]}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-outline flex-1"
                          >
                            <Navigation className="h-4 w-4" />
                            Directions
                          </a>
                        </div>
                      </>
                    ) : view === 'helplines' ? (
                      <div className="mt-4 flex gap-2">
                        <a href={`tel:${item.phone || ''}`} className="btn-primary flex-1">
                          <Phone className="h-4 w-4" />
                          Call
                        </a>
                        <a href={item.website} target="_blank" rel="noreferrer" className="btn-outline flex-1">
                          <Navigation className="h-4 w-4" />
                          Source
                        </a>
                      </div>
                    ) : (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${item.coordinates[1]},${item.coordinates[0]}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-outline mt-4 w-full justify-center"
                      >
                        <Navigation className="h-4 w-4" />
                        Open in maps
                      </a>
                    )}
                  </div>
                </article>
              ))
            ) : (
              <EmptyState
                title="No map items found"
                message="Try another view or increase the rescue search radius."
                icon="Map"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

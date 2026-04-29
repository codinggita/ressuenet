import { useEffect, useMemo, useState } from 'react';
import { ImagePlus, LocateFixed, Shield, TriangleAlert, Activity, ArrowRight, ShieldAlert, Sparkles, MapPinned } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { rescueService } from '../services';

const initialForm = {
  location: '',
  lat: '',
  lng: '',
  species: 'Dog',
  severity: 3,
  description: '',
  isAnonymous: false,
  reporterName: '',
  reporterPhone: '',
  photo: null,
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

export default function Report() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition((position) => {
      setFormData((current) => ({
        ...current,
        lat: String(position.coords.latitude),
        lng: String(position.coords.longitude),
      }));
    });
  }, []);

  const urgencyLabel = useMemo(() => {
    if (formData.severity >= 4) return 'Critical Response';
    if (formData.severity >= 3) return 'Standard Urgent';
    return 'Non-Critical Observation';
  }, [formData.severity]);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Please choose an image smaller than 5MB.');
      return;
    }

    updateField('photo', file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.location.trim()) {
      toast.error('A Dispatch Address is required for units to locate the incident.');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Detailed observations are required for response strategy.');
      return;
    }

    if (!formData.isAnonymous && !formData.reporterPhone.trim()) {
      toast.error('A contact number is required or submit anonymously.');
      return;
    }

    try {
      setSubmitting(true);
      const loadingToast = toast.loading('Syncing with command center...');
      const response = await rescueService.submitReport(formData);
      toast.dismiss(loadingToast);
      toast.success('Incident logged. Dispatching intelligence.');
      navigate('/nearby', { state: { report: response.data } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to submit your report.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-red-500/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-red-600">
            <ShieldAlert size={14} />
            Emergency Intake Portal
          </div>
          <h1 className="mt-6 font-display text-4xl font-black md:text-5xl tracking-tight text-on-surface">
            Report an Animal in <span className="text-red-600 italic">Distress.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-on-surface-variant/80 leading-relaxed font-medium">
            Your report is routed directly to the nearest verified responders. 
            Accuracy in location and visual evidence significantly decreases response time.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Location Section */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-surface-container-high/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <MapPinned size={20} />
                </div>
                <h2 className="font-display text-xl font-black">Location Intelligence</h2>
              </div>
              
              <div className="space-y-6">
                <label className="block space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Dispatch Address</span>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                    value={formData.location}
                    onChange={(event) => updateField('location', event.target.value)}
                    placeholder="Street name, landmark, or neighborhood"
                  />
                </label>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-primary/5 p-5 border border-primary/10">
                    <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                      <LocateFixed size={14} />
                      GPS Coordinate Lock
                    </div>
                    <p className="text-sm font-bold text-on-surface-variant">
                      {formData.lat && formData.lng ? `${formData.lat.slice(0, 7)}, ${formData.lng.slice(0, 7)}` : 'Waiting for telemetry...'}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-surface-container-low p-5 border border-outline-variant/10">
                    <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-on-surface-variant/60">
                      <Activity size={14} />
                      Response Priority
                    </div>
                    <p className="text-sm font-bold text-on-surface-variant">{urgencyLabel}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-surface-container-high/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary-fixed-dim">
                  <Activity size={20} />
                </div>
                <h2 className="font-display text-xl font-black">Incident Parameters</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Species Class</span>
                  <select 
                    className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm appearance-none cursor-pointer" 
                    value={formData.species} 
                    onChange={(event) => updateField('species', event.target.value)}
                  >
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Cow</option>
                    <option>Wild</option>
                    <option>Other</option>
                  </select>
                </label>
                
                <label className="block space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Severity Rating</span>
                  <div className="px-2 pt-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={formData.severity}
                      onChange={(event) => updateField('severity', Number(event.target.value))}
                      className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                    <div className="flex justify-between mt-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">
                      <span>Mild</span>
                      <span className="text-red-500 font-black">Level {formData.severity}</span>
                      <span>Critical</span>
                    </div>
                  </div>
                </label>
              </div>

              <label className="block space-y-2 mt-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Frontline Observations</span>
                <textarea
                  className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm min-h-[160px]"
                  value={formData.description}
                  onChange={(event) => updateField('description', event.target.value)}
                  placeholder="Describe injuries, behavior, or immediate threats..."
                />
              </label>
            </div>
          </motion.div>

          <aside className="space-y-6">
            {/* Visual Evidence */}
            <div className="glass-card p-6 rounded-[2.5rem] border border-surface-container-high/50">
              <h3 className="text-sm font-black uppercase tracking-widest text-on-surface-variant/60 mb-6 flex items-center gap-2">
                <ImagePlus size={16} />
                Visual Evidence
              </h3>
              <div className="relative group overflow-hidden rounded-[2rem] bg-surface-container-low border border-dashed border-outline-variant/30 transition-all hover:border-primary/40">
                {preview ? (
                  <div className="relative aspect-square">
                    <img src={preview} alt="preview" className="h-full w-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => { setPreview(null); updateField('photo', null); }}
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label htmlFor="photo-upload" className="flex flex-col items-center justify-center p-8 cursor-pointer aspect-square">
                    <ImagePlus size={32} className="text-on-surface-variant/20 mb-3 group-hover:text-primary/40 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 text-center">Attach Photo for Verification</span>
                    <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                  </label>
                )}
              </div>
            </div>

            {/* Reporter Profile */}
            <div className="glass-card p-6 rounded-[2.5rem] border border-surface-container-high/50">
              <h3 className="text-sm font-black uppercase tracking-widest text-on-surface-variant/60 mb-6 flex items-center gap-2">
                <Shield size={16} />
                Reporter Profile
              </h3>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 rounded-2xl bg-surface-container-low p-4 cursor-pointer border border-transparent hover:border-primary/20 transition-all">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded-lg border-outline-variant/30 bg-white text-primary focus:ring-primary/20"
                    checked={formData.isAnonymous}
                    onChange={(event) => updateField('isAnonymous', event.target.checked)}
                  />
                  <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Anonymous Report</span>
                </label>

                <AnimatePresence>
                  {!formData.isAnonymous && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pt-2 overflow-hidden"
                    >
                      <input
                        className="w-full bg-white border border-outline-variant/10 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                        value={formData.reporterName}
                        onChange={(event) => updateField('reporterName', event.target.value)}
                        placeholder="Full Name"
                      />
                      <input
                        className="w-full bg-white border border-outline-variant/10 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                        value={formData.reporterPhone}
                        onChange={(event) => updateField('reporterPhone', event.target.value)}
                        placeholder="Phone Number"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={submitting} 
              className="w-full group flex items-center justify-center gap-3 rounded-[2.5rem] bg-red-600 py-6 text-base font-black text-white shadow-xl shadow-red-500/20 transition-all hover:bg-red-700 active:scale-95 disabled:opacity-50"
            >
              {submitting ? 'Transmitting Data...' : 'Broadcast Emergency'}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
            
            <p className="text-center text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">
              Direct Line to Local Response Units
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}

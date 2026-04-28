import { useEffect, useMemo, useState } from 'react';
import { ImagePlus, LocateFixed, Shield, TriangleAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
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
    if (formData.severity >= 4) return 'High urgency';
    if (formData.severity >= 3) return 'Medium urgency';
    return 'Low urgency';
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

    if (!formData.location.trim() || !formData.description.trim()) {
      toast.error('Location and description are required.');
      return;
    }

    if (!formData.isAnonymous && !formData.reporterPhone.trim()) {
      toast.error('Add a phone number or submit anonymously.');
      return;
    }

    try {
      setSubmitting(true);
      const loadingToast = toast.loading('Submitting rescue report...');
      const response = await rescueService.submitReport(formData);
      toast.dismiss(loadingToast);
      toast.success('Report submitted. Opening nearby help.');
      navigate('/nearby', { state: { report: response.data } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to submit your report.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-14 pt-28 md:px-6 md:pt-32">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Emergency intake</p>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">Report an animal in distress</h1>
        <p className="mt-2 text-sm text-on-surface-variant md:text-base">
          Keep it quick: where the animal is, what condition it is in, and how responders can reach you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-outline-variant/10 bg-white p-5 shadow-sm md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Location</span>
            <input
              className="input-field"
              value={formData.location}
              onChange={(event) => updateField('location', event.target.value)}
              placeholder="Street, landmark, or neighborhood"
            />
          </label>
          <div className="rounded-2xl bg-surface-container-low p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold">
              <LocateFixed className="h-4 w-4 text-primary" />
              GPS assist
            </div>
            <p className="text-sm text-on-surface-variant">
              {formData.lat && formData.lng ? 'Location coordinates detected.' : 'Waiting for device location access.'}
            </p>
          </div>
          <div className="rounded-2xl bg-surface-container-low p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold">
              <TriangleAlert className="h-4 w-4 text-primary" />
              Priority
            </div>
            <p className="text-sm text-on-surface-variant">{urgencyLabel}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Species</span>
            <select className="input-field" value={formData.species} onChange={(event) => updateField('species', event.target.value)}>
              <option>Dog</option>
              <option>Cat</option>
              <option>Bird</option>
              <option>Cow</option>
              <option>Wild</option>
              <option>Other</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Severity</span>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.severity}
              onChange={(event) => updateField('severity', Number(event.target.value))}
              className="mt-3 w-full accent-primary"
            />
            <span className="text-sm font-semibold text-on-surface-variant">Level {formData.severity} of 5</span>
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">What happened?</span>
          <textarea
            className="input-field min-h-[140px]"
            value={formData.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="Describe injuries, threats, mobility, or behavior."
          />
        </label>

        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Photo</span>
            <div className="flex min-h-[120px] items-center gap-4 rounded-2xl border border-dashed border-outline-variant/30 bg-surface-container-low p-4">
              <label className="btn-outline cursor-pointer">
                <ImagePlus className="h-4 w-4" />
                Upload image
                <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </label>
              {preview ? <img src={preview} alt="preview" className="h-20 w-20 rounded-xl object-cover" /> : null}
            </div>
          </label>
          <div className="rounded-2xl bg-surface-container-low p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold">
              <Shield className="h-4 w-4 text-primary" />
              Privacy
            </div>
            <label className="flex items-center gap-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={(event) => updateField('isAnonymous', event.target.checked)}
              />
              Report anonymously
            </label>
          </div>
        </div>

        {!formData.isAnonymous ? (
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Your name</span>
              <input
                className="input-field"
                value={formData.reporterName}
                onChange={(event) => updateField('reporterName', event.target.value)}
                placeholder="Full name"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Phone</span>
              <input
                className="input-field"
                value={formData.reporterPhone}
                onChange={(event) => updateField('reporterPhone', event.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </label>
          </div>
        ) : null}

        <button type="submit" disabled={submitting} className="btn-emergency w-full justify-center">
          {submitting ? 'Submitting report...' : 'Submit emergency report'}
        </button>
      </form>
    </div>
  );
}

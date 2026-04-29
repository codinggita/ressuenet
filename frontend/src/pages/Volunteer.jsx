import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Heart, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Star, 
  ArrowRight, 
  Camera, 
  Calendar, 
  Upload, 
  CheckCircle2, 
  FileText,
  MapPin,
  Clock,
  ChevronLeft,
  Bird,
  Dog,
  Cat,
  Fish,
  AlertCircle
} from 'lucide-react';

const Volunteer = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    skills: [],
    availability: '',
    idDocument: null,
    certifications: '',
    emergencyContact: '',
    species: [],
    tasks: [],
    travelRadius: '10km',
    notifications: { email: true, push: true }
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const roles = [
    { title: 'Rescue', desc: 'Field operations and emergency pick-ups.', icon: <Zap />, tag: 'Critical' },
    { title: 'Foster', desc: 'Provide a temporary home for animals in need.', icon: <Heart />, tag: 'High Impact' },
    { title: 'Transport', desc: 'Safely move animals between shelters and homes.', icon: <Users />, tag: 'Logistics' },
    { title: 'Advocate', desc: 'Digital coordination and social impact.', icon: <Globe />, tag: 'Remote' }
  ];

  // --- Step Components ---

  const Step0 = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Star className="w-3.5 h-3.5" /> Global Community
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Become the <span className="text-primary font-black">Bridge</span> <br/>to Safety.
          </h1>
          <p className="text-lg text-on-surface-variant font-medium leading-relaxed max-w-lg">
            Your skills can save lives. Join our network of responders, fosters, and advocates. Together, we can protect every heartbeat.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={nextStep}
              className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-black text-lg hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-3 group"
            >
              Start Application <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl relative group">
            <img 
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
              alt="Volunteer" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-on-surface text-surface p-6 rounded-3xl shadow-xl max-w-[240px] space-y-3 border border-white/5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <p className="font-bold text-xs uppercase tracking-tight">Verified Impact</p>
            </div>
            <p className="text-xs font-medium text-surface/60 leading-relaxed italic">
              "RescuePulse makes volunteering seamless and rewarding."
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">How would you like to help?</h2>
          <p className="text-on-surface-variant font-medium">Choose a role that fits your lifestyle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role, i) => (
            <div key={i} className="group bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 hover:bg-primary transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all">
                <div className="text-primary group-hover:text-white transition-colors">
                  {React.cloneElement(role.icon, { className: 'w-6 h-6' })}
                </div>
              </div>
              <div className="space-y-3">
                <span className="text-[9px] font-black uppercase tracking-wider text-on-surface-variant/40 group-hover:text-white/40">{role.tag}</span>
                <h3 className="text-lg font-bold group-hover:text-white transition-colors">{role.title}</h3>
                <p className="text-xs text-on-surface-variant/70 font-medium leading-relaxed group-hover:text-white/70">{role.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const Step1 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto space-y-10"
    >
      <div className="space-y-3 text-center">
        <h2 className="text-4xl font-bold tracking-tight">Create Your Profile</h2>
        <p className="text-on-surface-variant font-medium">Basic info to get you started on missions.</p>
      </div>

      <div className="bg-surface-container-low p-10 rounded-[48px] border border-outline-variant/10 space-y-8 shadow-2xl">
        <div className="flex flex-col items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-surface-container-highest flex items-center justify-center border-4 border-primary/20 relative group overflow-hidden">
            <Camera className="w-8 h-8 text-on-surface-variant/40" />
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Upload className="w-6 h-6 text-on-primary" />
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Identity Photo Required</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60 ml-4">Full Name</label>
            <input 
              type="text" 
              placeholder="Operational Call Sign" 
              className="w-full bg-surface-container-highest border-none rounded-2xl py-4 px-6 font-bold placeholder:text-on-surface-variant/20 focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60 ml-4">Mobile Unit</label>
            <input 
              type="tel" 
              placeholder="+1 (555) 000-0000" 
              className="w-full bg-surface-container-highest border-none rounded-2xl py-4 px-6 font-bold placeholder:text-on-surface-variant/20 focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60 ml-4">Weekly Availability</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Weekdays', 'Weekends', 'Evenings', 'On-Call'].map(time => (
              <button key={time} className="py-3 rounded-xl bg-surface-container-highest font-bold text-sm hover:bg-primary hover:text-on-primary transition-all border border-outline-variant/10">
                {time}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={nextStep}
          className="w-full bg-on-surface text-surface py-5 rounded-2xl font-black text-lg hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-3"
        >
          Secure & Continue <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const Step2 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto space-y-10"
    >
      <div className="space-y-3 text-center">
        <h2 className="text-4xl font-bold tracking-tight">Identity & Security</h2>
        <p className="text-on-surface-variant font-medium leading-relaxed">To ensure safety, please provide valid ID and emergency contact details.</p>
      </div>

      <div className="bg-surface-container-low p-10 rounded-[48px] border border-outline-variant/10 space-y-10 shadow-2xl">
        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60 ml-4">Document Verification</label>
          <div className="border-4 border-dashed border-outline-variant/20 rounded-[32px] p-12 flex flex-col items-center gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-on-surface-variant/40" />
            </div>
            <div className="text-center">
              <p className="font-black text-lg">Drag and drop your ID</p>
              <p className="text-xs text-on-surface-variant/60 font-bold uppercase tracking-widest">PDF, JPEG or PNG up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant/60 ml-4">Emergency Contact</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Contact Name" 
              className="bg-surface-container-highest border-none rounded-2xl py-4 px-6 font-bold"
            />
            <input 
              type="tel" 
              placeholder="Contact Number" 
              className="bg-surface-container-highest border-none rounded-2xl py-4 px-6 font-bold"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={prevStep}
            className="flex-1 bg-surface-container-highest text-on-surface py-5 rounded-2xl font-black text-lg hover:bg-outline-variant/20 transition-all flex items-center justify-center gap-3"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <button 
            onClick={nextStep}
            className="flex-[2] bg-primary text-on-primary py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            Verify Identity <ShieldCheck className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const Step3 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto space-y-12"
    >
      <div className="space-y-3 text-center">
        <h2 className="text-4xl font-bold tracking-tight">Preferences</h2>
        <p className="text-on-surface-variant font-medium">Help us match you with tasks that fit your interests.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-low p-10 rounded-[48px] border border-outline-variant/10 space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">01</span>
              Species Sector
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Canine', icon: <Dog /> },
                { name: 'Feline', icon: <Cat /> },
                { name: 'Avian', icon: <Bird /> },
                { name: 'Exotic', icon: <Fish /> }
              ].map(item => (
                <button key={item.name} className="p-4 rounded-2xl bg-surface-container-highest border border-transparent hover:border-primary flex items-center gap-3 font-bold transition-all">
                  <div className="text-primary/40">{item.icon}</div>
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-sm">02</span>
              Mission Type
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Emergency Rescue', desc: 'Critical field triage' },
                { name: 'Fostering', desc: 'In-home medical recovery' },
                { name: 'Event Support', desc: 'Strategic awareness' }
              ].map(item => (
                <button key={item.name} className="w-full p-4 rounded-2xl bg-surface-container-highest text-left border border-transparent hover:border-secondary transition-all">
                  <p className="font-black text-sm">{item.name}</p>
                  <p className="text-[10px] text-on-surface-variant/60 font-bold uppercase">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-on-surface text-surface p-10 rounded-[48px] space-y-8 relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <h3 className="text-xl font-black tracking-tight text-primary">Deployment Radius</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-surface/40">
                <span>5km</span>
                <span>50km+</span>
              </div>
              <input type="range" className="w-full accent-primary h-2 bg-white/10 rounded-full appearance-none cursor-pointer" />
              <p className="text-center font-black text-4xl text-primary">25km</p>
            </div>
          </div>

          <div className="space-y-6 relative z-10 pt-8 border-t border-white/5">
            <h3 className="text-xl font-black tracking-tight">Intelligence Feed</h3>
            <div className="space-y-4">
              {[
                { label: 'Push Alerts', desc: 'Urgent rescue missions', icon: <Zap /> },
                { label: 'Email Uplink', desc: 'Weekly operational reports', icon: <Calendar /> }
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{item.icon}</div>
                    <div>
                      <p className="font-black text-sm">{item.label}</p>
                      <p className="text-[10px] text-surface/40 font-bold">{item.desc}</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-on-primary rounded-full absolute right-1"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => alert('Operational Status: Active. Welcome to the Sanctuary.')}
            className="w-full bg-primary text-on-primary py-5 rounded-2xl font-black text-xl shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all relative z-10"
          >
            Complete Onboarding
          </button>

          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 blur-3xl rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-surface pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Progress Bar (Visible after step 0) */}
        {step > 0 && (
          <div className="max-w-xl mx-auto mb-16 space-y-4">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/40">
              <span className={step >= 1 ? 'text-primary' : ''}>Profile</span>
              <span className={step >= 2 ? 'text-primary' : ''}>Verification</span>
              <span className={step >= 3 ? 'text-primary' : ''}>Preferences</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 3) * 100}%` }}
                className="h-full bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]"
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && <Step0 key="step0" />}
          {step === 1 && <Step1 key="step1" />}
          {step === 2 && <Step2 key="step2" />}
          {step === 3 && <Step3 key="step3" />}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Volunteer;

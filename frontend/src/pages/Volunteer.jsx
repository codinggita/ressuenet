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
  AlertCircle,
  Sparkles
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
      className="space-y-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Force Recruitment
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-on-surface">
            Become the <span className="text-primary italic">Bridge</span> <br/>to Safety.
          </h1>
          <p className="text-xl text-on-surface-variant/80 font-medium leading-relaxed max-w-xl">
            Operationalize your empathy. Join our network of rapid responders, tactical fosters, and digital advocates. Every heartbeat is a mission.
          </p>
          <div className="flex flex-wrap gap-4 pt-6">
            <button 
              onClick={nextStep}
              className="bg-on-surface text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-primary shadow-2xl transition-all flex items-center gap-4 group"
            >
              Initialize Onboarding <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-3xl relative group border-4 border-white/20">
            <img 
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" 
              alt="Volunteer in field" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-10 left-10 right-10">
               <div className="glass-card p-6 rounded-[2rem] border border-white/20 backdrop-blur-md bg-white/10 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <p className="font-black text-xs uppercase tracking-widest">Verified Impact</p>
                  </div>
                  <p className="text-sm font-medium opacity-80 leading-relaxed italic">
                    "The RescueNet Command Center has streamlined our field coordination by 300%."
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight text-on-surface">Sector Specialization</h2>
          <p className="text-on-surface-variant/60 font-medium">Select your primary operational focus within the network.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="group glass-card p-8 rounded-[3rem] border border-surface-container-high/50 bg-white hover:bg-on-surface transition-all duration-500 shadow-soft"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-all">
                <div className="text-primary group-hover:text-white transition-colors">
                  {React.cloneElement(role.icon, { className: 'w-7 h-7' })}
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover:text-primary-container">{role.tag}</span>
                <h3 className="text-2xl font-black text-on-surface group-hover:text-white transition-colors">{role.title}</h3>
                <p className="text-sm text-on-surface-variant/70 font-medium leading-relaxed group-hover:text-white/60">{role.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const Step1 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="max-w-4xl mx-auto space-y-12"
    >
      <div className="space-y-4 text-center">
        <h2 className="text-4xl font-black tracking-tight text-on-surface">Personnel Identity</h2>
        <p className="text-on-surface-variant/60 font-medium">Establish your unique identifier within the rescue matrix.</p>
      </div>

      <div className="glass-card p-10 md:p-16 rounded-[4rem] border-2 border-primary/5 shadow-2xl bg-white/80 backdrop-blur-xl space-y-12">
        <div className="flex flex-col items-center gap-8">
          <div className="w-40 h-40 rounded-full bg-surface-container-highest flex items-center justify-center border-4 border-primary/10 relative group overflow-hidden shadow-inner">
            <Camera className="w-10 h-10 text-on-surface-variant/40" />
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" />
            <div className="absolute inset-0 bg-on-surface/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 z-10">
              <Upload className="w-8 h-8 text-white mb-2" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Upload Intel</span>
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Biometric Capture Required</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 ml-2">Full Identity Name</label>
            <input 
              type="text" 
              placeholder="Operational Call Sign" 
              className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-5 px-8 font-bold placeholder:text-on-surface-variant/20 focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-soft"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 ml-2">Comm-Link ID</label>
            <input 
              type="tel" 
              placeholder="+91 XXX XXX XXXX" 
              className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-5 px-8 font-bold placeholder:text-on-surface-variant/20 focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-soft"
            />
          </div>
        </div>

        <div className="space-y-6">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 ml-2">Availability Window</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Weekdays', 'Weekends', 'Evenings', 'On-Call'].map(time => (
              <button key={time} className="py-5 rounded-2xl bg-surface-container-low font-black text-xs uppercase tracking-widest hover:bg-on-surface hover:text-white transition-all border border-outline-variant/5 shadow-sm">
                {time}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={nextStep}
          className="w-full bg-on-surface text-white py-6 rounded-[2rem] font-black text-xl hover:bg-primary shadow-2xl transition-all flex items-center justify-center gap-4 group"
        >
          Secure Protocol <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </motion.div>
  );

  const Step2 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="max-w-4xl mx-auto space-y-12"
    >
      <div className="space-y-4 text-center">
        <h2 className="text-4xl font-black tracking-tight text-on-surface">Security Verification</h2>
        <p className="text-on-surface-variant/60 font-medium">Validation of credentials for field access clearance.</p>
      </div>

      <div className="glass-card p-10 md:p-16 rounded-[4rem] border-2 border-primary/5 shadow-2xl bg-white/80 backdrop-blur-xl space-y-12">
        <div className="space-y-6">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 ml-2">Registry Authentication (ID)</label>
          <div className="border-4 border-dashed border-outline-variant/10 rounded-[3rem] p-16 flex flex-col items-center gap-6 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group bg-surface-container-low/50">
            <div className="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center group-hover:scale-110 transition-all shadow-lg text-primary">
              <Upload className="w-8 h-8" />
            </div>
            <div className="text-center">
              <p className="font-black text-xl text-on-surface">Inject Document File</p>
              <p className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest mt-2">PDF, High-Res Scan, or Biometric Photo</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 ml-2">Emergency Tactical Contact</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="Contact Name" 
              className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-5 px-8 font-bold shadow-soft"
            />
            <input 
              type="tel" 
              placeholder="Contact Link (Phone)" 
              className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl py-5 px-8 font-bold shadow-soft"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <button 
            onClick={prevStep}
            className="flex-1 bg-surface-container-low text-on-surface py-6 rounded-2xl font-black text-lg hover:bg-white transition-all flex items-center justify-center gap-3 border border-outline-variant/10 shadow-soft"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <button 
            onClick={nextStep}
            className="flex-[2.5] bg-primary text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
          >
            Authorize Credentials <ShieldCheck className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const Step3 = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-5xl mx-auto space-y-12"
    >
      <div className="space-y-4 text-center">
        <h2 className="text-4xl font-black tracking-tight text-on-surface">Sector Preferences</h2>
        <p className="text-on-surface-variant/60 font-medium">Fine-tune your mission matching parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10">
        <div className="glass-card p-12 rounded-[4rem] border border-surface-container-high/50 bg-white/80 backdrop-blur-xl space-y-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-4 text-on-surface">
              <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-sm font-black">01</span>
              Species Sector
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Canine Force', icon: <Dog /> },
                { name: 'Feline Unit', icon: <Cat /> },
                { name: 'Avian Wing', icon: <Bird /> },
                { name: 'Exotic Division', icon: <Fish /> }
              ].map(item => (
                <button key={item.name} className="p-6 rounded-[2rem] bg-surface-container-low border-2 border-transparent hover:border-primary hover:bg-white flex items-center gap-4 font-black text-sm transition-all shadow-soft group">
                  <div className="text-primary/40 group-hover:text-primary transition-colors">{item.icon}</div>
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-4 text-on-surface">
              <span className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary text-sm font-black">02</span>
              Mission Geometry
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Emergency Rescue', desc: 'Critical field triage & pick-up' },
                { name: 'Tactical Fostering', desc: 'Medical recovery & socialization' },
                { name: 'Strategic Advocacy', desc: 'Digital coordination & awareness' }
              ].map(item => (
                <button key={item.name} className="w-full p-6 rounded-[2rem] bg-surface-container-low text-left border-2 border-transparent hover:border-secondary hover:bg-white transition-all shadow-soft group">
                  <p className="font-black text-lg text-on-surface group-hover:text-secondary">{item.name}</p>
                  <p className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest mt-1">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-on-surface text-white p-12 rounded-[4rem] space-y-12 relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="space-y-8 relative z-10">
            <h3 className="text-2xl font-black tracking-tight text-primary">Deployment Radius</h3>
            <div className="space-y-6">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                <span>Local Grid</span>
                <span>Expanded Zone</span>
              </div>
              <div className="relative h-2 bg-white/10 rounded-full">
                <div className="absolute h-full bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)]" style={{ width: '60%' }} />
                <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-2xl border-4 border-primary cursor-pointer" />
              </div>
              <div className="text-center">
                <span className="text-6xl font-black text-primary">30</span>
                <span className="text-xl font-black text-white/40 ml-2 uppercase tracking-widest">km</span>
              </div>
            </div>
          </div>

          <div className="space-y-8 relative z-10 pt-10 border-t border-white/10">
            <h3 className="text-2xl font-black tracking-tight text-white">Neural Links</h3>
            <div className="space-y-4">
              {[
                { label: 'Tactical Push', desc: 'Real-time rescue pings', icon: <Zap />, active: true },
                { label: 'Operational Log', desc: 'Weekly impact summary', icon: <Calendar />, active: false }
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`${item.active ? 'text-primary' : 'text-white/20'} transition-colors`}>{item.icon}</div>
                    <div>
                      <p className="font-black text-sm text-white group-hover:text-primary transition-colors">{item.label}</p>
                      <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{item.desc}</p>
                    </div>
                  </div>
                  <div className={`w-14 h-8 rounded-full relative p-1.5 transition-all duration-300 ${item.active ? 'bg-primary' : 'bg-white/10'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${item.active ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => alert('Operational Status: ACTIVE. Deployment protocols initiated.')}
            className="w-full bg-primary text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/40 hover:scale-[1.03] active:scale-[0.97] transition-all relative z-10"
          >
            Activate Onboarding
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-surface pt-32 pb-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-secondary/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Progress System */}
        {step > 0 && (
          <div className="max-w-2xl mx-auto mb-20 space-y-6">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant/30 px-2">
              <span className={step >= 1 ? 'text-primary' : ''}>Identity</span>
              <span className={step >= 2 ? 'text-primary' : ''}>Clearance</span>
              <span className={step >= 3 ? 'text-primary' : ''}>Protocols</span>
            </div>
            <div className="h-2 w-full bg-surface-container-high/30 rounded-full overflow-hidden flex p-1">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 3) * 100}%` }}
                className="h-full bg-primary rounded-full shadow-[0_0_25px_rgba(var(--primary-rgb),0.8)]"
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

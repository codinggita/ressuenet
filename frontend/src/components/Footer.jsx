import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  ArrowRight,
  ShieldCheck,
  Mail,
  MapPin,
  Phone,
  Send,
  Zap,
  Globe
} from 'lucide-react';

const Footer = () => {
  // Custom SVGs for social icons to ensure stability
  const SocialIcons = [
    {
      name: 'Instagram',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
      )
    },
    {
      name: 'Twitter',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
      )
    },
    {
      name: 'GitHub',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
      )
    }
  ];

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-white/5 bg-[#080B10] px-4 pb-24 pt-12 text-white md:px-8 lg:pb-10">
      {/* Subtle Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 gap-10 border-b border-white/5 pb-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-all duration-300">
                <Activity className="w-6 h-6 text-on-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none">RescuePulse</span>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary/60">Tactical Welfare</span>
              </div>
            </Link>
            
            <p className="max-w-xs text-sm font-medium leading-relaxed text-white/40">
              Engineering the future of animal emergency response and high-fidelity sanctuary management protocols.
            </p>

            <div className="flex gap-3 pt-2">
              {SocialIcons.map((social) => (
                <motion.button 
                  key={social.name}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all"
                >
                  {social.icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Operations</h4>
            <ul className="space-y-3">
              {[
                { name: 'Rescue Map', path: '/map' },
                { name: 'Live Intel', path: '/dashboard' },
                { name: 'Field Training', path: '/education' },
                { name: 'Nearby Nodes', path: '/nearby' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm font-bold text-white/30 hover:text-white transition-all flex items-center group">
                    {link.name}
                    <ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Mission</h4>
            <ul className="space-y-3">
              {[
                { name: 'Adoption Hub', path: '/adopt' },
                { name: 'Volunteer', path: '/volunteer' },
                { name: 'Impact Feed', path: '/stories' },
                { name: 'Our Ethos', path: '/about' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm font-bold text-white/30 hover:text-white transition-all flex items-center group">
                    {link.name}
                    <ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-secondary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sync / Status */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-tertiary">Intelligence</h4>
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Field Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold placeholder:text-white/20 focus:outline-none focus:border-tertiary/50 transition-all"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-tertiary text-on-tertiary px-4 rounded-lg font-black text-[10px] tracking-widest uppercase hover:opacity-90 transition-all">
                  Sync
                </button>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/80">Node Status</span>
                  <span className="text-[8px] font-bold text-emerald-500/60 uppercase">Operational v4.2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[11px] font-bold text-white/20">
              © {new Date().getFullYear()} RescuePulse HQ.
            </p>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500/80">All Systems Nominal</span>
            </div>
          </div>
          
          <div className="flex gap-6">
            {['Privacy', 'Security', 'Terms'].map((item) => (
              <Link 
                key={item}
                className="text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors" 
                to="#"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

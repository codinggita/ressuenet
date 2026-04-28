import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Activity, 
  ShieldAlert, 
  LayoutDashboard, 
  Heart, 
  Users, 
  Gift,
  ChevronDown,
  BookOpen,
  Info,
  LogOut
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Help', path: '/nearby', icon: ShieldAlert },
    { name: 'Adopt', path: '/adopt', icon: Heart },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Stories', path: '/stories', icon: BookOpen },
    { name: 'Volunteer', path: '/volunteer', icon: Users },
    { name: 'Donate', path: '/donate', icon: Gift },
    { name: 'About', path: '/about', icon: Info },
  ];

  const isActive = (path) =>
    location.pathname === path || (path === '/nearby' && location.pathname === '/nearby-help');

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out');
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
      isScrolled ? 'py-3' : 'py-5'
    }`}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className={`relative flex items-center justify-between rounded-[28px] border border-outline-variant/10 bg-surface/88 px-4 py-3 shadow-xl shadow-on-surface/5 backdrop-blur-xl transition-all duration-300 md:px-6 ${
          isScrolled ? 'scale-[0.98]' : 'scale-100'
        }`}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12">
              <Activity className="h-5 w-5 text-on-primary" />
            </div>
            <span className="text-xl font-black tracking-tight text-on-surface md:text-2xl">
              Rescue<span className="text-primary">Pulse</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden items-center gap-3 sm:flex">
                <Link
                  to="/dashboard"
                  className="rounded-full px-3 py-2 text-sm font-semibold text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
                >
                  {user.fullName?.split(' ')[0] || 'Profile'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="hidden rounded-full px-3 py-2 text-sm font-semibold text-on-surface-variant transition hover:bg-surface-container-high hover:text-primary sm:block"
              >
                Login
              </Link>
            )}

            <Link 
              to="/report"
              className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 md:px-5"
            >
              <ShieldAlert className="h-4 w-4" />
              Report
            </Link>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-on-surface transition hover:bg-surface-container-high lg:hidden"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 top-full mt-3 px-4 lg:hidden"
          >
            <div className="space-y-4 rounded-[28px] border border-outline-variant/20 bg-surface/95 p-4 shadow-2xl backdrop-blur-2xl">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-[20px] p-4 transition-all ${
                    isActive(link.path) ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'bg-surface-container-low hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <link.icon className="h-5 w-5" />
                    <span className="text-base font-bold tracking-tight">{link.name}</span>
                  </div>
                  <ChevronDown className="-rotate-90 h-4 w-4 opacity-40" />
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {user ? (
                  <>
                    <Link 
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center rounded-2xl bg-surface-container-highest py-3 font-bold text-on-surface"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="rounded-2xl bg-primary py-3 font-bold text-on-primary"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center rounded-2xl bg-surface-container-highest py-3 font-bold text-on-surface"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center rounded-2xl bg-primary py-3 font-bold text-on-primary"
                    >
                      Join
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

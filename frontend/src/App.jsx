import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import { PageLoader } from './components/Loader';
import { useAuthStore } from './store/authStore';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Report = lazy(() => import('./pages/Report'));
const Adopt = lazy(() => import('./pages/Adopt'));
const RescueMap = lazy(() => import('./pages/Map'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PetProfile = lazy(() => import('./pages/PetProfile'));
const NearbyHelp = lazy(() => import('./pages/NearbyHelp'));
const Donation = lazy(() => import('./pages/Donation'));
const Stories = lazy(() => import('./pages/Stories'));
const Volunteer = lazy(() => import('./pages/Volunteer'));
const Education = lazy(() => import('./pages/Education'));

function Layout() {
  const bootstrap = useAuthStore((state) => state.bootstrap);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-surface">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-surface">
        <div className="absolute right-0 top-0 h-[540px] w-[540px] translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] -translate-x-1/3 translate-y-1/4 rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/report" element={<Report />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/adopt/:id" element={<PetProfile />} />
            <Route path="/map" element={<RescueMap />} />
            <Route path="/about" element={<About />} />
            <Route path="/nearby" element={<NearbyHelp />} />
            <Route path="/nearby-help" element={<NearbyHelp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/education" element={<Education />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

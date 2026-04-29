import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import { PageLoader } from './components/Loader';
import { useAuthStore } from './store/authStore';
import SEO from './components/SEO';

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

const siteUrl = 'https://rescue-plus.vercel.app';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RescueNet',
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  sameAs: [siteUrl],
};

const routeSeo = {
  home: {
    title: 'RescueNet | Rapid Animal Emergency Network',
    description:
      'Report animal emergencies, find nearby rescue help, adopt pets, donate, and volunteer through RescueNet.',
    path: '/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'RescueNet',
      url: siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/adopt?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  },
  about: {
    title: 'About RescueNet | Animal Rescue Platform',
    description:
      'Learn how RescueNet supports animal rescue teams, shelters, volunteers, adopters, and donors with coordinated emergency response.',
    path: '/about',
    schema: organizationSchema,
  },
  report: {
    title: 'Report an Animal Emergency | RescueNet',
    description:
      'Submit animal rescue incidents with location and details so nearby responders and rescue organizations can coordinate faster.',
    path: '/report',
  },
  adopt: {
    title: 'Adopt Rescue Pets | RescueNet',
    description:
      'Browse available rescue pets and connect with adoption opportunities through verified animal welfare partners.',
    path: '/adopt',
  },
  petProfile: {
    title: 'Pet Profile | RescueNet Adoption',
    description:
      'View rescue pet details, health information, adoption readiness, and next steps for giving a pet a safe home.',
    path: '/adopt',
  },
  map: {
    title: 'Animal Rescue Map | RescueNet',
    description:
      'Explore nearby rescue centers, shelters, and emergency animal support services on the RescueNet map.',
    path: '/map',
  },
  nearbyHelp: {
    title: 'Nearby Animal Help | RescueNet',
    description:
      'Find nearby animal rescue centers, emergency contacts, shelters, and volunteer support based on your location.',
    path: '/nearby-help',
  },
  dashboard: {
    title: 'Rescue Dashboard | RescueNet',
    description:
      'Track animal rescue reports, emergency response activity, adoption insights, donations, and community impact.',
    path: '/dashboard',
    noIndex: true,
  },
  donate: {
    title: 'Donate to Animal Rescue | RescueNet',
    description:
      'Support animal rescue operations, medical care, shelter resources, and emergency response through RescueNet donations.',
    path: '/donate',
  },
  stories: {
    title: 'Animal Rescue Stories | RescueNet',
    description:
      'Read rescue stories, adoption journeys, and community impact updates from the RescueNet animal welfare network.',
    path: '/stories',
  },
  volunteer: {
    title: 'Volunteer for Animal Rescue | RescueNet',
    description:
      'Discover volunteer opportunities for rescue response, shelter support, foster care, awareness, and community outreach.',
    path: '/volunteer',
  },
  education: {
    title: 'Animal Welfare Education | RescueNet',
    description:
      'Learn practical animal welfare, emergency rescue, first aid, adoption, and community care guidance from RescueNet.',
    path: '/education',
  },
  login: {
    title: 'Login | RescueNet',
    description: 'Log in to your RescueNet account to manage rescue reports, donations, volunteering, and adoption activity.',
    path: '/login',
    noIndex: true,
  },
  register: {
    title: 'Create an Account | RescueNet',
    description: 'Create a RescueNet account to report emergencies, volunteer, donate, and support animal rescue work.',
    path: '/register',
    noIndex: true,
  },
};

function Page({ seo, children }) {
  return (
    <>
      <SEO {...seo} />
      {children}
    </>
  );
}

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
            <Route path="/" element={<Page seo={routeSeo.home}><Home /></Page>} />
            <Route path="/login" element={<Page seo={routeSeo.login}><Login /></Page>} />
            <Route path="/register" element={<Page seo={routeSeo.register}><Register /></Page>} />
            <Route path="/report" element={<Page seo={routeSeo.report}><Report /></Page>} />
            <Route path="/adopt" element={<Page seo={routeSeo.adopt}><Adopt /></Page>} />
            <Route path="/adopt/:id" element={<Page seo={routeSeo.petProfile}><PetProfile /></Page>} />
            <Route path="/map" element={<Page seo={routeSeo.map}><RescueMap /></Page>} />
            <Route path="/about" element={<Page seo={routeSeo.about}><About /></Page>} />
            <Route path="/nearby" element={<Page seo={routeSeo.nearbyHelp}><NearbyHelp /></Page>} />
            <Route path="/nearby-help" element={<Page seo={routeSeo.nearbyHelp}><NearbyHelp /></Page>} />
            <Route path="/dashboard" element={<Page seo={routeSeo.dashboard}><Dashboard /></Page>} />
            <Route path="/donate" element={<Page seo={routeSeo.donate}><Donation /></Page>} />
            <Route path="/stories" element={<Page seo={routeSeo.stories}><Stories /></Page>} />
            <Route path="/volunteer" element={<Page seo={routeSeo.volunteer}><Volunteer /></Page>} />
            <Route path="/education" element={<Page seo={routeSeo.education}><Education /></Page>} />
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

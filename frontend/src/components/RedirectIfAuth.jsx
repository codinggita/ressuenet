import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { PageLoader } from './Loader';

export default function RedirectIfAuth({ children }) {
  const { user, hydrated } = useAuthStore();

  if (!hydrated) {
    return <PageLoader label="Checking session state..." />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { PageLoader } from './Loader';

export default function ProtectedRoute({ children }) {
  const { user, hydrated } = useAuthStore();
  const location = useLocation();

  if (!hydrated) {
    return <PageLoader label="Verifying security credentials..." />;
  }

  if (!user) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

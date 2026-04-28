import { Heart, Home, MapPinned, LifeBuoy, UserRound } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/nearby', label: 'Help', icon: LifeBuoy },
  { to: '/adopt', label: 'Adopt', icon: Heart },
  { to: '/map', label: 'Map', icon: MapPinned },
  { to: '/dashboard', label: 'Profile', icon: UserRound },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-outline-variant/20 bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),0.35rem)] pt-2 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to || (item.to === '/nearby' && location.pathname === '/nearby-help');

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex min-h-[60px] flex-col items-center justify-center rounded-2xl transition ${
                active ? 'bg-primary/10 text-primary' : 'text-on-surface-variant'
              }`}
            >
              <Icon className="mb-1 h-5 w-5" />
              <span className="text-[11px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

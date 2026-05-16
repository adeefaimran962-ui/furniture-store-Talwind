import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button';

export default function Profile() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  /* Redirect to login if not authenticated */
  if (!user) {
    return (
      <main className="min-h-[calc(100vh-70px)] flex flex-col items-center justify-center gap-6 px-5 text-center">
        <div className="text-6xl">🔒</div>
        <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">You're not logged in</h2>
        <p className="text-[#4A4A4A] dark:text-[#CCBBAA] max-w-[380px]">
          Please sign in to view your profile and account details.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Button size="lg" onClick={() => navigate('/login')}>Sign In</Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/register')}>Create Account</Button>
        </div>
      </main>
    );
  }

  const stats = [
    { icon: '📦', label: 'Orders',   value: user.orders   },
    { icon: '❤️', label: 'Wishlist', value: user.wishlist  },
    { icon: '🛒', label: 'Cart',     value: count          },
  ];

  const details = [
    { icon: '✉️', label: 'Email',    value: user.email    },
    { icon: '📞', label: 'Phone',    value: user.phone    },
    { icon: '📍', label: 'Location', value: user.location },
    { icon: '🗓', label: 'Member Since', value: user.joined },
    { icon: '🏷', label: 'Role',     value: user.role     },
  ];

  return (
    <>
      {/* Profile hero banner */}
      <div className="bg-gradient-to-br from-[#FAF9F6] to-[#F4ECE1] dark:from-[#1A1A1A] dark:to-[#222] border-b border-[#EEEEEE] dark:border-[#2A2A2A] px-[5%] pt-16 pb-0 max-[768px]:px-5">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-end gap-6 pb-0">
          {/* Avatar */}
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-[#1E1E1E] shadow-lg"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-[#1E1E1E]" title="Online" />
          </div>

          {/* Name + role */}
          <div className="pb-4">
            <h1 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-1">{user.name}</h1>
            <span className="inline-block bg-[#B8860B] text-white text-[0.72rem] font-bold uppercase tracking-[1px] px-3 py-1 rounded-full font-['Inter']">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      <main className="min-h-[calc(100vh-70px)] px-[5%] py-10 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">

        {/* ── Stats row ── */}
        <div className="flex flex-wrap gap-4 mb-10">
          {stats.map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex-[1_1_140px] bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-5 text-center transition-all duration-300 hover:border-[#B8860B] hover:shadow-[0_8px_24px_rgba(184,134,11,0.12)]"
            >
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-[1.8rem] font-bold text-[#B8860B] font-['Playfair_Display'] leading-none">{value}</div>
              <div className="text-[0.78rem] text-[#999] uppercase tracking-[1px] mt-1 font-['Inter']">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-wrap gap-8 items-start">

          {/* Personal details */}
          <div className="flex-[1_1_320px]">
            <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-5 pb-3 border-b border-[#EEEEEE] dark:border-[#2A2A2A]">
              Personal Information
            </h3>
            <div className="flex flex-col gap-4">
              {details.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg px-5 py-4"
                >
                  <span className="text-xl w-7 text-center shrink-0">{icon}</span>
                  <div>
                    <div className="text-[0.72rem] text-[#999] uppercase tracking-[1px] font-semibold font-['Inter']">{label}</div>
                    <div className="text-[0.95rem] text-[#1A1A1A] dark:text-[#F0EDE8] font-['Inter'] mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account actions */}
          <div className="flex-[1_1_260px]">
            <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-5 pb-3 border-b border-[#EEEEEE] dark:border-[#2A2A2A]">
              Account Actions
            </h3>
            <div className="flex flex-col gap-3">
              <Button size="md" fullWidth onClick={() => navigate('/cart')}>🛒 View Cart ({count})</Button>
              <Button size="md" variant="outline" fullWidth onClick={() => navigate('/services')}>🛍 Browse Collection</Button>
              <Button size="md" variant="outline" fullWidth onClick={() => navigate('/dashboard')}>📊 Dashboard</Button>
              <Button size="md" variant="outline" fullWidth onClick={() => navigate('/reviews')}>⭐ Write a Review</Button>
              <Button size="md" variant="outline" fullWidth onClick={() => navigate('/contact')}>📞 Contact Support</Button>

              {/* Divider */}
              <div className="border-t border-[#EEEEEE] dark:border-[#2A2A2A] my-2" />

              <Button
                size="md"
                variant="danger"
                fullWidth
                onClick={() => { logout(); navigate('/login'); }}
              >
                🔒 Sign Out
              </Button>
            </div>

            {/* Member card */}
            <div className="mt-6 bg-gradient-to-br from-[#2C2C2C] to-[#1A1A1A] rounded-lg p-6 text-white">
              <div className="text-[0.7rem] uppercase tracking-[2px] text-[#B8860B] font-semibold font-['Inter'] mb-1">DECORA</div>
              <div className="text-[1.1rem] font-semibold font-['Playfair_Display'] mb-3">{user.name}</div>
              <div className="text-[0.78rem] text-[#aaa] font-['Inter']">{user.email}</div>
              <div className="flex justify-between items-end mt-4">
                <span className="text-[0.7rem] text-[#888] font-['Inter']">Member since {user.joined}</span>
                <span className="text-[0.72rem] bg-[#B8860B] px-2 py-0.5 rounded-full font-semibold uppercase tracking-[0.5px] font-['Inter']">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

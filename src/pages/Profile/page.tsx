import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import type { User } from '../../context/AuthContext';

/* ─────────────────────────────────────────────
   Static permanent community members
───────────────────────────────────────────── */
const PERMANENT_USERS: (User & { online: boolean })[] = [
  {
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@decora.com',
    role: 'Interior Designer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '+1 (555) 201-3344',
    location: 'New York, USA',
    joined: 'March 2022',
    orders: 24,
    wishlist: 18,
    online: true,
  },
  {
    name: 'James Thornton',
    email: 'james.thornton@decora.com',
    role: 'Premium Member',
    avatar: 'https://i.pravatar.cc/150?img=8',
    phone: '+44 20 7946 0321',
    location: 'London, UK',
    joined: 'January 2021',
    orders: 41,
    wishlist: 9,
    online: true,
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@decora.com',
    role: 'VIP Member',
    avatar: 'https://i.pravatar.cc/150?img=5',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    joined: 'June 2023',
    orders: 13,
    wishlist: 27,
    online: false,
  },
  {
    name: 'Carlos Mendez',
    email: 'carlos.mendez@decora.com',
    role: 'Gold Member',
    avatar: 'https://i.pravatar.cc/150?img=12',
    phone: '+34 91 123 4567',
    location: 'Madrid, Spain',
    joined: 'September 2022',
    orders: 19,
    wishlist: 14,
    online: true,
  },
  {
    name: 'Emma Johansson',
    email: 'emma.johansson@decora.com',
    role: 'New Member',
    avatar: 'https://i.pravatar.cc/150?img=9',
    phone: '+46 8 123 456',
    location: 'Stockholm, Sweden',
    joined: 'February 2024',
    orders: 5,
    wishlist: 31,
    online: false,
  },
  {
    name: 'David Park',
    email: 'david.park@decora.com',
    role: 'Premium Member',
    avatar: 'https://i.pravatar.cc/150?img=15',
    phone: '+82 2 1234 5678',
    location: 'Seoul, South Korea',
    joined: 'November 2020',
    orders: 58,
    wishlist: 22,
    online: true,
  },
];

const ROLE_COLORS: Record<string, string> = {
  'Interior Designer': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'VIP Member':        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'Gold Member':       'bg-amber-100  text-amber-800  dark:bg-amber-900/30  dark:text-amber-300',
  'Premium Member':    'bg-blue-100   text-blue-800   dark:bg-blue-900/30   dark:text-blue-300',
  'New Member':        'bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-300',
};

function roleBadgeCls(role: string) {
  return ROLE_COLORS[role] ?? 'bg-[#B8860B]/10 text-[#B8860B]';
}

/* ─────────────────────────────────────────────
   Single user card used in the community grid
───────────────────────────────────────────── */
function UserCard({ u, isLoggedIn = false }: { u: User & { online: boolean }; isLoggedIn?: boolean }) {
  return (
    <div className="relative flex flex-col items-center text-center gap-3 p-6 bg-white dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(184,134,11,0.18)] hover:border-[#B8860B] group">

      {/* Logged-in badge */}
      {isLoggedIn && (
        <span className="absolute top-3 right-3 text-[0.6rem] font-bold uppercase tracking-widest bg-[#B8860B] text-white px-2 py-0.5 rounded-full font-['Inter']">
          You
        </span>
      )}

      {/* Avatar + online dot */}
      <div className="relative mt-2">
        <img
          src={u.avatar}
          alt={u.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-[#F4ECE1] dark:border-[#2A2A2A] group-hover:border-[#B8860B] transition-all duration-300 shadow-md"
        />
        <span
          className={`absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-[#1E1E1E] ${u.online ? 'bg-green-500' : 'bg-gray-400'}`}
          title={u.online ? 'Online' : 'Offline'}
        />
      </div>

      {/* Name */}
      <div>
        <p className="font-semibold text-[1rem] text-[#1A1A1A] dark:text-[#F0EDE8] font-['Inter'] leading-tight">{u.name}</p>
        <p className="text-[0.75rem] text-[#999] font-['Inter'] mt-0.5">{u.location}</p>
      </div>

      {/* Role badge */}
      <span className={`text-[0.68rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-['Inter'] ${roleBadgeCls(u.role)}`}>
        {u.role}
      </span>

      {/* Stats row */}
      <div className="w-full flex justify-around pt-3 border-t border-[#EEEEEE] dark:border-[#2A2A2A] mt-1">
        <div>
          <p className="text-[1.1rem] font-bold text-[#B8860B] font-['Playfair_Display'] leading-none">{u.orders}</p>
          <p className="text-[0.68rem] text-[#999] uppercase tracking-wide font-['Inter'] mt-0.5">Orders</p>
        </div>
        <div className="w-px bg-[#EEEEEE] dark:bg-[#2A2A2A]" />
        <div>
          <p className="text-[1.1rem] font-bold text-[#B8860B] font-['Playfair_Display'] leading-none">{u.wishlist}</p>
          <p className="text-[0.68rem] text-[#999] uppercase tracking-wide font-['Inter'] mt-0.5">Wishlist</p>
        </div>
        <div className="w-px bg-[#EEEEEE] dark:bg-[#2A2A2A]" />
        <div>
          <p className="text-[0.75rem] font-semibold text-[#4A4A4A] dark:text-[#CCBBAA] font-['Inter'] leading-none mt-1">{u.joined.split(' ')[1]}</p>
          <p className="text-[0.68rem] text-[#999] uppercase tracking-wide font-['Inter'] mt-0.5">Joined</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Profile page
───────────────────────────────────────────── */
export default function Profile() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  /* Build the full community list: logged-in user first, then permanent */
  const loggedInAsCard = user ? { ...user, online: true } : null;
  const communityBase: (User & { online: boolean })[] = loggedInAsCard
    ? [loggedInAsCard, ...PERMANENT_USERS]
    : PERMANENT_USERS;

  const allRoles = Array.from(new Set(communityBase.map(u => u.role)));

  const filtered = communityBase.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.location.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
    const matchRole   = !roleFilter   || u.role === roleFilter;
    const matchStatus = !statusFilter || (statusFilter === 'online' ? u.online : !u.online);
    return matchSearch && matchRole && matchStatus;
  });

  const inputCls = 'flex-1 min-w-[160px] px-4 py-2.5 text-[0.85rem] font-["Inter"] bg-white dark:bg-[#111] text-[#1A1A1A] dark:text-[#F0EDE8] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.15)] transition-all duration-200';

  const stats = user ? [
    { icon: '📦', label: 'Orders',   value: user.orders  },
    { icon: '❤️', label: 'Wishlist', value: user.wishlist },
    { icon: '🛒', label: 'Cart',     value: count         },
  ] : [];

  const details = user ? [
    { icon: '✉️', label: 'Email',        value: user.email    },
    { icon: '📞', label: 'Phone',        value: user.phone    },
    { icon: '📍', label: 'Location',     value: user.location },
    { icon: '🗓',  label: 'Member Since', value: user.joined   },
    { icon: '🏷',  label: 'Role',         value: user.role     },
  ] : [];

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO — shown only when logged in
      ══════════════════════════════════════════ */}
      {user && (
        <div className="bg-gradient-to-br from-[#FAF9F6] to-[#F4ECE1] dark:from-[#1A1A1A] dark:to-[#222] border-b border-[#EEEEEE] dark:border-[#2A2A2A] px-[5%] pt-16 pb-0 max-[768px]:px-5">
          <div className="max-w-[1200px] mx-auto flex flex-wrap items-end gap-6 pb-0">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-[#1E1E1E] shadow-lg"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-[#1E1E1E]" title="Online" />
            </div>
            <div className="pb-4">
              <h1 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-1">{user.name}</h1>
              <span className={`inline-block text-[0.72rem] font-bold uppercase tracking-[1px] px-3 py-1 rounded-full font-['Inter'] ${roleBadgeCls(user.role)}`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          NOT LOGGED IN — guest banner
      ══════════════════════════════════════════ */}
      {!user && (
        <div className="bg-gradient-to-br from-[#FAF9F6] to-[#F4ECE1] dark:from-[#1A1A1A] dark:to-[#222] border-b border-[#EEEEEE] dark:border-[#2A2A2A] px-[5%] py-14 text-center max-[768px]:px-5">
          <div className="max-w-[600px] mx-auto flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#B8860B]/10 flex items-center justify-center text-3xl">👥</div>
            <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0">DECORA Community</h2>
            <p className="text-[#4A4A4A] dark:text-[#CCBBAA] m-0 max-w-[440px]">
              Meet our members and discover the people behind DECORA's thriving design community. Sign in to see your own profile.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <Button size="lg" onClick={() => navigate('/login')}>Sign In</Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/register')}>Create Account</Button>
            </div>
          </div>
        </div>
      )}

      <main className="min-h-[calc(100vh-70px)] px-[5%] py-10 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">

        {/* ══════════════════════════════════════════
            LOGGED-IN USER — stats + details + actions
        ══════════════════════════════════════════ */}
        {user && (
          <>
            {/* Stats row */}
            <div className="flex flex-wrap gap-4 mb-10">
              {stats.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex-[1_1_140px] bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-xl p-5 text-center transition-all duration-300 hover:border-[#B8860B] hover:shadow-[0_8px_24px_rgba(184,134,11,0.12)]"
                >
                  <div className="text-3xl mb-2">{icon}</div>
                  <div className="text-[1.8rem] font-bold text-[#B8860B] font-['Playfair_Display'] leading-none">{value}</div>
                  <div className="text-[0.78rem] text-[#999] uppercase tracking-[1px] mt-1 font-['Inter']">{label}</div>
                </div>
              ))}
            </div>

            {/* Two-column: details + actions */}
            <div className="flex flex-wrap gap-8 items-start mb-10">

              {/* Personal details */}
              <div className="flex-[1_1_320px]">
                <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-5 pb-3 border-b border-[#EEEEEE] dark:border-[#2A2A2A]">
                  Personal Information
                </h3>
                <div className="flex flex-col gap-4">
                  {details.map(({ icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-xl px-5 py-4"
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
                  <div className="border-t border-[#EEEEEE] dark:border-[#2A2A2A] my-2" />
                  <Button size="md" variant="danger" fullWidth onClick={() => { logout(); navigate('/login'); }}>
                    🔒 Sign Out
                  </Button>
                </div>

                {/* Member card */}
                <div className="mt-6 bg-gradient-to-br from-[#2C2C2C] to-[#1A1A1A] rounded-xl p-6 text-white">
                  <div className="text-[0.7rem] uppercase tracking-[2px] text-[#B8860B] font-semibold font-['Inter'] mb-1">DECORA</div>
                  <div className="text-[1.1rem] font-semibold font-['Playfair_Display'] mb-3">{user.name}</div>
                  <div className="text-[0.78rem] text-[#aaa] font-['Inter']">{user.email}</div>
                  <div className="flex justify-between items-end mt-4">
                    <span className="text-[0.7rem] text-[#888] font-['Inter']">Member since {user.joined}</span>
                    <span className={`text-[0.68rem] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide font-['Inter'] ${roleBadgeCls(user.role)}`}>{user.role}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-10">
              <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-5 pb-3 border-b border-[#EEEEEE] dark:border-[#2A2A2A]">
                Recent Activity
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { dot: 'bg-green-500',    text: <span>Order <strong>#DEC-2847</strong> delivered — Modern Sofa, Charcoal Grey</span>,      time: '2 days ago'  },
                  { dot: 'bg-[#B8860B]',    text: <span>Added <strong>Dining Table — Solid Oak</strong> to wishlist</span>,                  time: '5 days ago'  },
                  { dot: 'bg-blue-400',     text: <span>Left a 5-star review for <strong>Comfort Chair — Beige</strong></span>,              time: '1 week ago'  },
                  { dot: 'bg-green-500',    text: <span>Order <strong>#DEC-2601</strong> shipped — Coffee Table, Tempered Glass</span>,       time: '2 weeks ago' },
                  { dot: 'bg-[#B8860B]',    text: <span>Requested custom quote for <strong>L-Shape Sofa — Cream, 280 cm</strong></span>,     time: '3 weeks ago' },
                ].map(({ dot, text, time }, i) => (
                  <div key={i} className="flex items-center gap-3.5 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-xl px-5 py-4">
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${dot}`} />
                    <p className="m-0 text-[0.88rem] flex-1 text-[#4A4A4A] dark:text-[#CCBBAA] font-['Inter']">{text}</p>
                    <span className="ml-auto text-[0.78rem] text-[#999] whitespace-nowrap font-['Inter']">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="mb-12">
              <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-5 pb-3 border-b border-[#EEEEEE] dark:border-[#2A2A2A]">
                My Preferences
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: '🪵', label: 'Favourite Material', value: 'Solid Oak & Walnut'        },
                  { icon: '🎨', label: 'Preferred Style',    value: 'Modern Minimalist'          },
                  { icon: '🏠', label: 'Room Focus',         value: 'Living Room & Bedroom'      },
                  { icon: '💰', label: 'Budget Range',       value: '$500 – $3,000 per piece'    },
                  { icon: '🚚', label: 'Delivery Option',    value: 'White-Glove Assembly'       },
                  { icon: '🌿', label: 'Sustainability',     value: 'FSC-Certified Materials Only'},
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="flex-[1_1_220px] bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-xl px-5 py-4 flex items-center gap-4"
                  >
                    <span className="text-xl w-7 text-center shrink-0">{icon}</span>
                    <div>
                      <div className="text-[0.72rem] text-[#999] uppercase tracking-[1px] font-semibold font-['Inter']">{label}</div>
                      <div className="text-[0.9rem] text-[#1A1A1A] dark:text-[#F0EDE8] font-['Inter'] mt-0.5">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            COMMUNITY MEMBERS SECTION (always visible)
        ══════════════════════════════════════════ */}
        <div>
          {/* Section header */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6 pb-3 border-b border-[#EEEEEE] dark:border-[#2A2A2A]">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[2px] text-[#B8860B] font-['Inter'] mb-1">Our People</p>
              <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0">Community Members</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-[0.8rem] text-[#999] font-['Inter']">
                {communityBase.filter(u => u.online).length} online
              </span>
              <span className="text-[#EEEEEE] dark:text-[#2A2A2A] mx-1">|</span>
              <span className="text-[0.8rem] text-[#999] font-['Inter']">{communityBase.length} total</span>
            </div>
          </div>

          {/* Search + filter bar */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="relative flex-[2_1_200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999] text-sm pointer-events-none">🔍</span>
              <input
                type="text"
                placeholder="Search by name, location or role..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={`${inputCls} pl-9 w-full`}
              />
            </div>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className={`${inputCls} flex-[1_1_160px] cursor-pointer`}
            >
              <option value="">All Roles</option>
              {allRoles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className={`${inputCls} flex-[1_1_140px] cursor-pointer`}
            >
              <option value="">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
            {(search || roleFilter || statusFilter) && (
              <button
                onClick={() => { setSearch(''); setRoleFilter(''); setStatusFilter(''); }}
                className="px-4 py-2.5 text-[0.82rem] font-semibold font-['Inter'] text-[#dc3545] border border-[#dc3545] rounded-lg hover:bg-[#dc3545] hover:text-white transition-all duration-200 cursor-pointer bg-transparent"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results count */}
          {(search || roleFilter || statusFilter) && (
            <p className="text-[0.82rem] text-[#999] font-['Inter'] mb-5">
              Showing {filtered.length} of {communityBase.length} members
            </p>
          )}

          {/* Cards grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="text-5xl">🔍</div>
              <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0">No members found</h3>
              <p className="text-[#4A4A4A] dark:text-[#CCBBAA] m-0">Try adjusting your search or filters.</p>
              <button
                onClick={() => { setSearch(''); setRoleFilter(''); setStatusFilter(''); }}
                className="text-[#B8860B] font-semibold text-[0.88rem] font-['Inter'] underline bg-transparent border-none cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((u, i) => (
                <UserCard
                  key={u.email + i}
                  u={u}
                  isLoggedIn={!!user && u.email === user.email}
                />
              ))}
            </div>
          )}
        </div>

      </main>
    </>
  );
}

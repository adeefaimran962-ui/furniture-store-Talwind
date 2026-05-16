import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

/* ── 4 main links shown in the centre ── */
const mainLinks = [
  { to: '/',         label: 'Home'       },
  { to: '/about',    label: 'About'      },
  { to: '/services', label: 'Collection' },
  { to: '/reviews',  label: 'Reviews'    },
];

/* ── Extra links hidden inside "More" dropdown ── */
const moreLinks = [
  { to: '/dashboard', label: '📊 Dashboard' },
  { to: '/contact',   label: '📞 Contact'   },
  { to: '/cart',      label: '🛒 Cart'      },
  { to: '/profile',   label: '👤 Profile'   },
];

/* ── All links combined (used in mobile drawer) ── */
const allLinks = [...mainLinks, ...moreLinks.map(l => ({ to: l.to, label: l.label }))];

export default function Navbar() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [moreOpen,  setMoreOpen]  = useState(false);
  const [userOpen,  setUserOpen]  = useState(false);

  const { dark, toggleTheme } = useTheme();
  const { user, logout }      = useAuth();
  const { count }             = useCart();
  const navigate              = useNavigate();
  const location              = useLocation();

  const moreRef = useRef<HTMLLIElement>(null);
  const userRef = useRef<HTMLLIElement>(null);

  /* Close dropdowns when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Close everything on route change */
  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
    setUserOpen(false);
  }, [location.pathname]);

  /* ── Shared class helpers ── */
  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const linkCls = (to: string) =>
    [
      'font-["Inter"] text-[0.8rem] font-semibold tracking-[1px] uppercase',
      'px-3 py-[6px] rounded transition-colors duration-300 whitespace-nowrap',
      isActive(to)
        ? 'text-[#B8860B]'
        : 'text-[#1A1A1A] dark:text-[#F0EDE8] hover:text-[#B8860B]',
    ].join(' ');

  const dropItemCls =
    'flex items-center gap-2 px-4 py-2.5 text-[0.82rem] font-semibold uppercase tracking-[0.8px] font-["Inter"] text-[#1A1A1A] dark:text-[#F0EDE8] hover:text-[#B8860B] hover:bg-[#FAF9F6] dark:hover:bg-[#2A2A2A] transition-colors duration-200 whitespace-nowrap w-full text-left';

  return (
    <nav className="bg-white dark:bg-[#111111] border-b border-[#EEEEEE] dark:border-[#2A2A2A] sticky top-0 z-[1000] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between h-[70px] px-[5%] max-[768px]:px-5">

        {/* ── LEFT: Brand ── */}
        <Link
          to="/"
          className="font-['Playfair_Display'] text-[1.5rem] font-bold text-[#1A1A1A] dark:text-[#F0EDE8] tracking-[2px] shrink-0 hover:text-[#B8860B] transition-colors duration-300 max-[480px]:text-[1.2rem]"
        >
          DECORA
        </Link>

        {/* ── CENTRE: Main links + More dropdown (desktop only) ── */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0 absolute left-1/2 -translate-x-1/2">
          {mainLinks.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={linkCls(to)}>{label}</Link>
            </li>
          ))}

          {/* More ▾ dropdown */}
          <li ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen(o => !o)}
              className={[
                'font-["Inter"] text-[0.8rem] font-semibold tracking-[1px] uppercase',
                'px-3 py-[6px] rounded transition-colors duration-300',
                'flex items-center gap-1 bg-transparent border-none cursor-pointer',
                moreOpen
                  ? 'text-[#B8860B]'
                  : 'text-[#1A1A1A] dark:text-[#F0EDE8] hover:text-[#B8860B]',
              ].join(' ')}
              aria-haspopup="true"
              aria-expanded={moreOpen}
            >
              More
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown panel */}
            {moreOpen && (
              <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-white dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.12)] py-1.5 min-w-[180px] z-50">
                {moreLinks.map(({ to, label }) => (
                  <Link key={to} to={to} className={dropItemCls}>
                    {label}
                    {to === '/cart' && count > 0 && (
                      <span className="ml-auto bg-[#B8860B] text-white text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {count}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* ── RIGHT: Theme toggle + Sign In / User menu ── */}
        <div className="hidden md:flex items-center gap-2">

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#EEEEEE] dark:border-[#2A2A2A] bg-transparent text-[1rem] cursor-pointer transition-all duration-300 hover:border-[#B8860B] hover:bg-[#FAF9F6] dark:hover:bg-[#2A2A2A]"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Cart icon (quick access) */}
          <Link
            to="/cart"
            className="relative w-9 h-9 flex items-center justify-center rounded-full border border-[#EEEEEE] dark:border-[#2A2A2A] text-[1rem] transition-all duration-300 hover:border-[#B8860B] hover:bg-[#FAF9F6] dark:hover:bg-[#2A2A2A]"
          >
            🛒
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#B8860B] text-white text-[0.55rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* Signed-in user menu OR Sign In button */}
          {user ? (
            <li ref={userRef} className="relative list-none">
              <button
                onClick={() => setUserOpen(o => !o)}
                className="flex items-center gap-2 bg-transparent border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-full pl-1 pr-3 py-1 cursor-pointer transition-all duration-300 hover:border-[#B8860B]"
              >
                <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                <span className="text-[0.78rem] font-semibold font-['Inter'] text-[#1A1A1A] dark:text-[#F0EDE8] max-w-[80px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <svg className={`w-3 h-3 text-[#999] transition-transform duration-200 ${userOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {userOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 bg-white dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.12)] py-1.5 min-w-[160px] z-50">
                  <Link to="/profile"   className={dropItemCls}>👤 Profile</Link>
                  <Link to="/dashboard" className={dropItemCls}>📊 Dashboard</Link>
                  <div className="border-t border-[#EEEEEE] dark:border-[#2A2A2A] my-1" />
                  <button
                    className={`${dropItemCls} text-[#dc3545] hover:text-[#dc3545] hover:bg-red-50 dark:hover:bg-red-900/20`}
                    onClick={() => { logout(); navigate('/login'); }}
                  >
                    🔒 Sign Out
                  </button>
                </div>
              )}
            </li>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-1.5 bg-[#B8860B] text-white border-2 border-[#B8860B] px-5 py-2 text-[0.75rem] font-semibold uppercase tracking-[1.5px] rounded-[4px] cursor-pointer transition-all duration-300 hover:bg-[#8B6508] hover:border-[#8B6508] hover:-translate-y-0.5 font-['Inter']"
            >
              Sign In
            </button>
          )}
        </div>

        {/* ── MOBILE: Hamburger ── */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none p-[6px] cursor-pointer"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            /* X icon */
            <svg className="w-6 h-6 text-[#1A1A1A] dark:text-[#F0EDE8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger bars */
            <>
              <span className="block w-6 h-[2px] bg-[#1A1A1A] dark:bg-[#F0EDE8] rounded-sm" />
              <span className="block w-6 h-[2px] bg-[#1A1A1A] dark:bg-[#F0EDE8] rounded-sm" />
              <span className="block w-6 h-[2px] bg-[#1A1A1A] dark:bg-[#F0EDE8] rounded-sm" />
            </>
          )}
        </button>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#111] border-t-2 border-[#B8860B] shadow-[0_8px_20px_rgba(0,0,0,0.1)] pb-4">
          <ul className="list-none m-0 p-0">
            {allLinks.map(({ to, label }) => (
              <li key={to} className="border-b border-[#EEEEEE] dark:border-[#2A2A2A] last:border-0">
                <Link
                  to={to}
                  className={[
                    'flex items-center justify-between px-6 py-3.5',
                    'font-["Inter"] text-[0.85rem] font-semibold uppercase tracking-[1px]',
                    'transition-colors duration-200',
                    isActive(to)
                      ? 'text-[#B8860B] bg-[#FAF9F6] dark:bg-[#1E1E1E]'
                      : 'text-[#1A1A1A] dark:text-[#F0EDE8] hover:text-[#B8860B] hover:bg-[#FAF9F6] dark:hover:bg-[#1E1E1E]',
                  ].join(' ')}
                >
                  {label}
                  {to === '/cart' && count > 0 && (
                    <span className="bg-[#B8860B] text-white text-[0.6rem] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile bottom bar: theme + sign in */}
          <div className="flex items-center gap-3 px-6 pt-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-[0.8rem] font-semibold font-['Inter'] uppercase tracking-[1px] text-[#1A1A1A] dark:text-[#F0EDE8] bg-transparent border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-[4px] px-3 py-2 cursor-pointer hover:border-[#B8860B] transition-all duration-300"
            >
              {dark ? '☀️ Light' : '🌙 Dark'}
            </button>

            {user ? (
              <button
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-transparent text-[#dc3545] border-2 border-[#dc3545] px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[1.5px] rounded-[4px] cursor-pointer transition-all duration-300 hover:bg-[#dc3545] hover:text-white font-['Inter']"
                onClick={() => { logout(); navigate('/login'); }}
              >
                🔒 Sign Out
              </button>
            ) : (
              <button
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#B8860B] text-white border-2 border-[#B8860B] px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[1.5px] rounded-[4px] cursor-pointer transition-all duration-300 hover:bg-[#8B6508] hover:border-[#8B6508] font-['Inter']"
                onClick={() => { navigate('/login'); setMenuOpen(false); }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

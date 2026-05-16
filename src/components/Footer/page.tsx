import { Link } from 'react-router-dom';

const quickLinks = [
  { to: '/',          label: 'Home'       },
  { to: '/about',     label: 'About'      },
  { to: '/services',  label: 'Collection' },
  { to: '/reviews',   label: 'Reviews'    },
  { to: '/contact',   label: 'Contact'    },
];

const accountLinks = [
  { to: '/login',     label: 'Login'     },
  { to: '/register',  label: 'Sign Up'   },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/profile',   label: 'Profile'   },
  { to: '/cart',      label: 'Cart'      },
];

const socials = [
  { href: '#', label: 'Instagram', icon: '📸' },
  { href: '#', label: 'Facebook',  icon: '📘' },
  { href: '#', label: 'Twitter',   icon: '🐦' },
  { href: '#', label: 'Pinterest', icon: '📌' },
];

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] dark:bg-[#0A0A0A] text-[#ccc] pt-14 px-[5%] pb-6 mt-[60px]">
      <div className="flex flex-wrap gap-10 justify-between max-w-[1200px] mx-auto mb-9 max-[768px]:flex-col max-[768px]:gap-7">

        {/* Brand */}
        <div className="flex-[1_1_220px] flex flex-col gap-3">
          <h1 className="text-[1.8rem] text-white m-0 font-['Playfair_Display']">DECORA</h1>
          <p className="text-[0.85rem] text-[#888] m-0 leading-relaxed">
            Luxury furniture for modern living.<br />Crafted with passion since 2004.
          </p>
          {/* Social links */}
          <div className="flex gap-3 mt-2">
            {socials.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full bg-[#3a3a3a] flex items-center justify-center text-sm transition-all duration-300 hover:bg-[#B8860B] hover:text-white"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex-[1_1_160px] flex flex-col gap-[10px]">
          <h2 className="text-[0.85rem] font-bold text-white uppercase tracking-[1.5px] mb-2 font-['Inter']">Quick Links</h2>
          {quickLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="text-[#aaa] text-[0.875rem] transition-colors duration-300 hover:text-[#B8860B]">
              {label}
            </Link>
          ))}
        </div>

        {/* Account */}
        <div className="flex-[1_1_160px] flex flex-col gap-[10px]">
          <h2 className="text-[0.85rem] font-bold text-white uppercase tracking-[1.5px] mb-2 font-['Inter']">Account</h2>
          {accountLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="text-[#aaa] text-[0.875rem] transition-colors duration-300 hover:text-[#B8860B]">
              {label}
            </Link>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex-[1_1_200px] flex flex-col gap-[10px]">
          <h2 className="text-[0.85rem] font-bold text-white uppercase tracking-[1.5px] mb-2 font-['Inter']">Contact</h2>
          <p className="text-[0.85rem] text-[#888] m-0 leading-relaxed">📍 45 Design District, Milano, Italy</p>
          <p className="text-[0.85rem] text-[#888] m-0 leading-relaxed">📞 +1 (555) 123-4567</p>
          <p className="text-[0.85rem] text-[#888] m-0 leading-relaxed">✉️ hello@decora.com</p>
          <p className="text-[0.85rem] text-[#888] m-0 leading-relaxed">🕐 Mon–Sat, 10am – 7pm</p>
        </div>
      </div>

      <p className="text-center border-t border-[#333] pt-5 m-0 text-[0.8rem] text-[#666]">
        © 2026 DECORA. All rights reserved. Designed with ❤️ in Milano.
      </p>
    </footer>
  );
}

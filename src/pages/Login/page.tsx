import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    // Simulate login — in a real app this would call an API
    login({
      name: 'Alex Johnson',
      email,
      role: 'Premium Member',
      avatar: 'https://i.pravatar.cc/150?img=3',
      phone: '+1 (555) 987-6543',
      location: 'New York, USA',
      joined: 'January 2024',
      orders: 7,
      wishlist: 12,
    });
    navigate('/profile');
  };

  return (
    <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto flex items-center justify-center max-[768px]:px-5 max-[768px]:py-8">
      <div className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-10 max-w-[480px] w-full shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-[768px]:p-7">

        <div className="text-center mb-7">
          <div className="text-[2.2rem] mb-2">🔐</div>
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Welcome Back</h2>
          <p className="text-[#4A4A4A] dark:text-[#CCBBAA]">Sign in to your DECORA account</p>
        </div>

        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-[0.875rem] cursor-pointer text-[#4A4A4A] dark:text-[#CCBBAA]">
              <input type="checkbox" className="w-auto" />
              Remember me
            </label>
            <a href="#" className="text-[#B8860B] font-semibold text-[0.875rem] hover:text-[#8B6508]">Forgot password?</a>
          </div>

          <Button type="submit" size="lg" fullWidth className="mt-2">Sign In</Button>
        </form>

        <p className="text-center mt-5 text-[0.9rem] text-[#4A4A4A] dark:text-[#CCBBAA]">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#B8860B] font-semibold hover:text-[#8B6508]">Create Account</Link>
        </p>

        {/* Trust badges */}
        <div className="mt-7 pt-6 border-t border-[#EEEEEE] dark:border-[#2A2A2A]">
          <p className="text-center text-[0.72rem] text-[#999] uppercase tracking-[1px] font-['Inter'] mb-4">Member Benefits</p>
          <div className="flex flex-col gap-2.5">
            {[
              { icon: '🚚', text: 'Free white-glove delivery on orders over $2,000' },
              { icon: '🎨', text: 'Access to exclusive bespoke design consultations' },
              { icon: '⭐', text: 'Early access to new collections and member-only sales' },
              { icon: '🔒', text: 'Secure checkout with 256-bit SSL encryption' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-[0.82rem] text-[#4A4A4A] dark:text-[#CCBBAA] font-['Inter']">
                <span className="text-base shrink-0">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

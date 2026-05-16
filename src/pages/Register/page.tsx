import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    login({
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      role: 'New Member',
      avatar: 'https://i.pravatar.cc/150?img=7',
      phone: 'Not provided',
      location: 'Not provided',
      joined: 'May 2026',
      orders: 0,
      wishlist: 0,
    });
    navigate('/profile');
  };

  return (
    <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto flex items-center justify-center max-[768px]:px-5 max-[768px]:py-8">
      <div className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-10 max-w-[480px] w-full shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-[768px]:p-7">

        <div className="text-center mb-7">
          <div className="text-[2.2rem] mb-2">✨</div>
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Create Account</h2>
          <p className="text-[#4A4A4A] dark:text-[#CCBBAA]">Join DECORA and discover premium living</p>
        </div>

        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <Input label="First Name" type="text" placeholder="John" value={form.firstName} onChange={set('firstName')} required className="flex-1" />
            <Input label="Last Name"  type="text" placeholder="Doe"  value={form.lastName}  onChange={set('lastName')}  required className="flex-1" />
          </div>
          <Input label="Email Address"    type="email"    placeholder="you@example.com"         value={form.email}    onChange={set('email')}    required />
          <Input label="Password"         type="password" placeholder="Create a strong password" value={form.password} onChange={set('password')} required />
          <Input label="Confirm Password" type="password" placeholder="Repeat your password"     value={form.confirm}  onChange={set('confirm')}  required />

          <Button type="submit" size="lg" fullWidth className="mt-2">Create Account</Button>
        </form>

        <p className="text-center mt-5 text-[0.9rem] text-[#4A4A4A] dark:text-[#CCBBAA]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#B8860B] font-semibold hover:text-[#8B6508]">Sign In</Link>
        </p>
      </div>
    </main>
  );
}

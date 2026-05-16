import { useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import PageHero from '../../components/ui/PageHero';

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  product: string;
  comment: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  { id: 1, name: 'Sarah Mitchell',  avatar: 'https://i.pravatar.cc/60?img=1',  rating: 5, date: 'Apr 2026', product: 'Modern Sofa',    comment: 'Absolutely stunning piece. The quality exceeded my expectations — the fabric is luxurious and the build is rock solid. Delivery was white-glove and the team was professional.',  verified: true  },
  { id: 2, name: 'James Thornton',  avatar: 'https://i.pravatar.cc/60?img=8',  rating: 5, date: 'Mar 2026', product: 'Dining Table',   comment: 'The solid oak dining table is a masterpiece. My family gathers around it every evening. Worth every penny — the craftsmanship is evident in every detail.',                    verified: true  },
  { id: 3, name: 'Priya Sharma',    avatar: 'https://i.pravatar.cc/60?img=5',  rating: 4, date: 'Mar 2026', product: 'Comfort Chair',  comment: 'Beautiful chair, very comfortable for long reading sessions. Delivery took a bit longer than expected but the product itself is perfect.',                                  verified: true  },
  { id: 4, name: 'Carlos Mendez',   avatar: 'https://i.pravatar.cc/60?img=12', rating: 5, date: 'Feb 2026', product: 'King Bed Frame', comment: 'The walnut bed frame transformed our bedroom completely. The finish is flawless and it arrived perfectly packaged. DECORA has a customer for life.',                  verified: true  },
  { id: 5, name: 'Emma Johansson',  avatar: 'https://i.pravatar.cc/60?img=9',  rating: 4, date: 'Feb 2026', product: 'Coffee Table',   comment: 'Elegant tempered glass table that fits perfectly in our living room. Easy to clean and very sturdy. Minus one star only because assembly instructions could be clearer.', verified: false },
  { id: 6, name: 'David Park',      avatar: 'https://i.pravatar.cc/60?img=15', rating: 5, date: 'Jan 2026', product: 'Bookshelf',      comment: 'The pine wood bookshelf is gorgeous. It holds all my books and looks like a piece of art. The natural wood grain is beautiful and unique on every shelf.',              verified: true  },
];

function Stars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <div className={`flex gap-0.5 ${sz}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= rating ? 'text-[#B8860B]' : 'text-[#ddd]'}>★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setShowForm(false);
    setTimeout(() => setSubmitted(false), 5000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <PageHero
        eyebrow="Customer Stories"
        title={<>What Our <span className="text-[#B8860B]">Clients Say</span></>}
        subtitle="Real reviews from real customers who transformed their homes with DECORA."
      />

      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">

        {/* ── Rating summary ── */}
        <div className="flex flex-wrap gap-8 items-center justify-between bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-8 mb-10">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-[4rem] font-bold text-[#B8860B] font-['Playfair_Display'] leading-none">{avgRating}</div>
              <Stars rating={Math.round(Number(avgRating))} size="lg" />
              <p className="text-[0.85rem] text-[#999] mt-1 m-0">{REVIEWS.length} reviews</p>
            </div>
            <div className="flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map(star => {
                const count = REVIEWS.filter(r => r.rating === star).length;
                const pct = Math.round((count / REVIEWS.length) * 100);
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-[0.8rem] text-[#999] w-4 text-right font-['Inter']">{star}</span>
                    <span className="text-[#B8860B] text-sm">★</span>
                    <div className="w-32 h-2 bg-[#EEEEEE] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                      <div className="h-full bg-[#B8860B] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[0.78rem] text-[#999] font-['Inter']">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Button size="lg" onClick={() => setShowForm(s => !s)}>
            {showForm ? 'Cancel' : '✍ Write a Review'}
          </Button>
        </div>

        {/* ── Success message ── */}
        {submitted && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6 text-green-700 dark:text-green-400 text-center font-semibold">
            ✅ Thank you! Your review has been submitted for moderation.
          </div>
        )}

        {/* ── Write review form ── */}
        {showForm && (
          <div className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-8 mb-10">
            <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-6">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[600px]">
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
                  <label className="text-[0.8rem] font-semibold text-[#4A4A4A] dark:text-[#CCBBAA] uppercase tracking-[0.5px] font-['Inter']">Your Name</label>
                  <input type="text" placeholder="John Doe" required className="w-full px-[14px] py-[11px] font-['Inter'] text-[0.9rem] bg-white dark:bg-[#111] text-[#1A1A1A] dark:text-[#F0EDE8] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-[4px] focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.15)]" />
                </div>
                <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
                  <label className="text-[0.8rem] font-semibold text-[#4A4A4A] dark:text-[#CCBBAA] uppercase tracking-[0.5px] font-['Inter']">Product</label>
                  <select required className="w-full px-[14px] py-[11px] font-['Inter'] text-[0.9rem] bg-white dark:bg-[#111] text-[#1A1A1A] dark:text-[#F0EDE8] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-[4px] focus:outline-none focus:border-[#B8860B] appearance-none cursor-pointer">
                    <option value="">Select product...</option>
                    {['Modern Sofa', 'Dining Table', 'Comfort Chair', 'King Bed Frame', 'Coffee Table', 'Bookshelf'].map(p => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#4A4A4A] dark:text-[#CCBBAA] uppercase tracking-[0.5px] font-['Inter']">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(s => (
                    <label key={s} className="cursor-pointer text-2xl text-[#ddd] hover:text-[#B8860B] transition-colors duration-200">
                      <input type="radio" name="rating" value={s} required className="sr-only" />
                      ★
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#4A4A4A] dark:text-[#CCBBAA] uppercase tracking-[0.5px] font-['Inter']">Your Review</label>
                <textarea
                  placeholder="Tell us about your experience..."
                  rows={4}
                  required
                  className="w-full px-[14px] py-[11px] font-['Inter'] text-[0.9rem] bg-white dark:bg-[#111] text-[#1A1A1A] dark:text-[#F0EDE8] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-[4px] focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.15)] resize-y min-h-[100px]"
                />
              </div>
              <Button type="submit" size="md">Submit Review</Button>
            </form>
          </div>
        )}

        {/* ── Review cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map(review => (
            <Card key={review.id} className="p-6 flex flex-col gap-4" hover>
              {/* Header */}
              <div className="flex items-center gap-3">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#B8860B]" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-[0.95rem] text-[#1A1A1A] dark:text-[#F0EDE8] font-['Inter']">{review.name}</span>
                    {review.verified && (
                      <span className="text-[0.65rem] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <span className="text-[0.78rem] text-[#999] font-['Inter']">{review.date}</span>
                </div>
              </div>

              {/* Stars + product */}
              <div className="flex items-center justify-between">
                <Stars rating={review.rating} />
                <span className="text-[0.75rem] text-[#B8860B] font-semibold uppercase tracking-[0.5px] font-['Inter']">{review.product}</span>
              </div>

              {/* Comment */}
              <p className="text-[0.88rem] text-[#4A4A4A] dark:text-[#CCBBAA] leading-relaxed m-0 flex-1">
                "{review.comment}"
              </p>
            </Card>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-14 py-12 bg-gradient-to-r from-[#8B6508] to-[#B8860B] rounded-lg">
          <h2 className="text-white mb-2.5">Love Your DECORA Furniture?</h2>
          <p className="text-white/90 max-w-[500px] mx-auto mb-7">
            Share your experience and help others discover the art of premium living.
          </p>
          <Button variant="white" size="lg" onClick={() => setShowForm(true)}>Write a Review</Button>
        </div>
      </main>
    </>
  );
}

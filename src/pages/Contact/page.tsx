import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import PageHero from '../../components/ui/PageHero';

const infoCards = [
  { icon: '📍', title: 'Showroom',  main: '45 Design District, Milano, Italy', sub: 'Open Mon–Sat, 10am – 7pm' },
  { icon: '📞', title: 'Phone',     main: '+1 (555) 123-4567',                 sub: 'Available Mon–Fri, 9am – 6pm' },
  { icon: '✉️', title: 'Email',     main: 'hello@decora.com',                  sub: 'We reply within 24 hours' },
  { icon: '🚚', title: 'Delivery',  main: 'Nationwide white-glove delivery.',  sub: 'Free on orders over $2,000' },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title={<>Contact <span className="text-[#B8860B]">DECORA</span></>}
        subtitle="We'd love to hear from you. Reach out for custom orders, delivery questions, or design consultations."
      />

      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">
        <section className="text-center mb-8">
          <h4>We Are Here</h4>
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Send Us a Message</h2>
        </section>

        <div className="flex flex-wrap gap-10 items-start">
          {/* Form */}
          <div className="flex-[1_1_320px] max-w-[560px] bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-[768px]:p-7">
            {submitted && (
              <p className="text-green-600 text-center font-semibold mb-4">
                ✅ Message sent! We'll reply within 24 hours.
              </p>
            )}
            <form onSubmit={handleForm} className="flex flex-col gap-4">
              <Input label="Full Name" type="text" placeholder="John Doe" required />
              <Input label="Email Address" type="email" placeholder="you@example.com" required />
              <Input label="Subject" type="text" placeholder="Custom order / Delivery / General enquiry" />
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#4A4A4A] dark:text-[#CCBBAA] uppercase tracking-[0.5px] font-['Inter']">Message</label>
                <textarea
                  placeholder="Tell us what you're looking for..."
                  rows={5}
                  className="w-full px-[14px] py-[11px] font-['Inter'] text-[0.9rem] bg-white dark:bg-[#111] text-[#1A1A1A] dark:text-[#F0EDE8] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-[4px] transition-all duration-300 focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.15)] resize-y min-h-[120px]"
                />
              </div>
              <Button type="submit" size="lg" fullWidth>Send Message</Button>
            </form>
          </div>

          {/* Info cards */}
          <div className="flex-[1_1_260px] flex flex-col gap-5">
            {infoCards.map(({ icon, title, main, sub }) => (
              <div key={title} className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-6 border-l-4 border-l-[#B8860B]">
                <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8]">{icon} {title}</h3>
                <p className="m-0 text-[#4A4A4A] dark:text-[#CCBBAA]">{main}</p>
                <p className="m-0 text-[#999] text-[0.85rem]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

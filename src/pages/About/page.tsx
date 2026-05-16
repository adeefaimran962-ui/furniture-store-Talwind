import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import PageHero from '../../components/ui/PageHero';

const team = [
  { name: 'Marco Bianchi', role: 'Chief Design Officer',    img: 'https://i.pravatar.cc/150?img=11', bio: '20 years shaping furniture for luxury interiors across Europe and the Middle East.' },
  { name: 'Sofia Ricci',   role: 'Head of Craftsmanship',   img: 'https://i.pravatar.cc/150?img=5',  bio: 'Master carpenter and material scientist ensuring every joint is perfect.' },
  { name: 'Liam Chen',     role: 'Customer Experience Lead', img: 'https://i.pravatar.cc/150?img=12', bio: 'Dedicated to making your DECORA journey seamless from first click to delivery.' },
  { name: 'Aisha Patel',   role: 'Head of Sustainability',  img: 'https://i.pravatar.cc/150?img=9',  bio: 'Ensuring every material we use meets the highest ethical and environmental standards.' },
];

const values = [
  { icon: '🪵', title: 'Sustainable Materials', desc: 'Every wood grain is FSC-certified. Every leather is ethically tanned.' },
  { icon: '🎨', title: 'Bespoke Design',         desc: 'Custom sizes, custom finishes, tailored to your exact space.' },
  { icon: '🏆', title: 'Award-Winning',           desc: 'Recognised by the European Design Awards three years running.' },
];

export default function About() {
  const navigate = useNavigate();
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={<>The Art of <span className="text-[#B8860B]">Craft</span></>}
        subtitle="Since 2004, DECORA has been creating furniture that transforms houses into homes."
      />

      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">

        {/* WHO WE ARE */}
        <section className="flex flex-wrap gap-10 items-center mb-12 max-[768px]:flex-col">
          <div className="flex-[1_1_280px]">
            <h4>Who We Are</h4>
            <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Passion for Premium Living</h2>
            <p className="text-[#4A4A4A] dark:text-[#CCBBAA]">
              DECORA was founded in Milano with a singular vision: to bring the finest European
              craftsmanship to homes around the world. Every piece is designed by award-winning
              artisans and built to last a lifetime.
            </p>
            <p className="text-[#4A4A4A] dark:text-[#CCBBAA]">
              We work exclusively with sustainably sourced materials — hand-selected oak, walnut,
              genuine leather, and hand-blown glass — because quality begins at the source.
            </p>
            <Button size="lg" onClick={() => navigate('/services')}>Explore Collection</Button>
          </div>
          <div className="flex-[1_1_280px] flex flex-col gap-4">
            {values.map(v => (
              <div key={v.title} className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-5 border-l-4 border-l-[#B8860B]">
                <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8]">{v.title}</h3>
                <p className="m-0 text-[#4A4A4A] dark:text-[#CCBBAA]">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#FAF9F6] to-[#F4ECE1] dark:from-[#1E1E1E] dark:to-[#252525] rounded-lg p-8 border border-[#EEEEEE] dark:border-[#2A2A2A]">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-2">Our Mission</h3>
            <p className="text-[#4A4A4A] dark:text-[#CCBBAA] m-0">
              To craft furniture that elevates everyday living — combining timeless aesthetics
              with sustainable practices and uncompromising quality.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#FAF9F6] to-[#F4ECE1] dark:from-[#1E1E1E] dark:to-[#252525] rounded-lg p-8 border border-[#EEEEEE] dark:border-[#2A2A2A]">
            <div className="text-3xl mb-3">🔭</div>
            <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-2">Our Vision</h3>
            <p className="text-[#4A4A4A] dark:text-[#CCBBAA] m-0">
              To become the world's most trusted luxury furniture brand — where every home
              tells a story of craftsmanship, beauty, and conscious living.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg px-5 py-10 mb-12">
          <div className="text-center mb-6">
            <h4>By the Numbers</h4>
            <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">DECORA in Figures</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-center">
            {[
              { val: '500+',  label: 'Unique Products' },
              { val: '12K+',  label: 'Happy Clients' },
              { val: '20+',   label: 'Years of Craft' },
              { val: '4.9 ★', label: 'Average Rating' },
              { val: '30+',   label: 'Countries Served' },
            ].map(({ val, label }) => (
              <div key={label}>
                <h2 className="text-[#B8860B] m-0">{val}</h2>
                <p className="mt-1 m-0 text-[#4A4A4A] dark:text-[#CCBBAA]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section className="text-center mb-8">
          <h4>Meet the Team</h4>
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">The People Behind DECORA</h2>
          <p className="text-[#4A4A4A] dark:text-[#CCBBAA]">
            A passionate team of designers, craftspeople, and customer specialists.
          </p>
        </section>

        <div className="flex flex-wrap justify-center gap-7 mb-12 max-[768px]:gap-5">
          {team.map(member => (
            <div
              key={member.name}
              className="flex-[1_1_220px] max-w-[260px] flex flex-col items-center text-center p-6 gap-3 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(184,134,11,0.15)] hover:border-[#B8860B] max-[768px]:flex-[1_1_100%] max-[768px]:max-w-full"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-[#B8860B]"
              />
              <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0">{member.name}</h3>
              <span className="text-[0.78rem] font-semibold uppercase tracking-[1px] text-[#B8860B] font-['Inter']">{member.role}</span>
              <p className="text-[0.85rem] text-[#4A4A4A] dark:text-[#CCBBAA] m-0">{member.bio}</p>
            </div>
          ))}
        </div>
        
      </main>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#8B6508] to-[#B8860B] px-[5%] py-[72px] text-center max-[768px]:px-5 max-[768px]:py-12">
        <h2 className="text-white mb-2.5">Ready to Transform Your Space?</h2>
        <p className="text-white/90 max-w-[500px] mx-auto mb-7">Browse our full collection and find the perfect pieces for your home.</p>
        <Button variant="white" size="lg" onClick={() => navigate('/services')}>Explore Collection</Button>
      </section>
    </>
  );
}

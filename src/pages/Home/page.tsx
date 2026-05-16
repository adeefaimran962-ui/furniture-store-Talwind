import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useCart } from '../../context/CartContext';

const products = [
  { id: 'p1', name: 'Modern Sofa',   img: '/images/sofa.jpg',          price: 1200, category: 'Sofa',  desc: 'Luxury comfort meets minimalist design.' },
  { id: 'p2', name: 'Dining Table',  img: '/images/table.jpg',         price: 850,  category: 'Table', desc: 'Solid oak craftsmanship for family moments.' },
  { id: 'p3', name: 'Comfort Chair', img: '/images/comfort chair.jpg', price: 420,  category: 'Chair', desc: 'Ergonomic design for lasting comfort.' },
];

const features = [
  { icon: '🪵', title: 'Natural Materials',    desc: 'Premium, sustainably harvested woods and genuine leathers.' },
  { icon: '🎨', title: 'Bespoke Design',        desc: 'Custom sizes, fabrics, and finishes tailored to your space.' },
  { icon: '🚚', title: 'White-Glove Delivery',  desc: 'Professional assembly and placement with full guarantee.' },
];

export default function Home() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  return (
    <>
      {/* HERO */}
      <header className="bg-gradient-to-br from-[#FAF9F6] to-[#F4ECE1] dark:from-[#1A1A1A] dark:to-[#222] text-center px-[5%] pt-[100px] pb-[80px] border-b border-[#EEEEEE] dark:border-[#2A2A2A] max-[768px]:px-5 max-[768px]:pt-[72px] max-[768px]:pb-14">
        <h4>Welcome to DECORA</h4>
        <h1 className="text-[#1A1A1A] dark:text-[#F0EDE8]">
          The Art of <span className="text-[#B8860B]">Living</span>
        </h1>
        <p className="max-w-[520px] mx-auto mb-8 text-[1.05rem] text-[#4A4A4A] dark:text-[#CCBBAA]">
          Premium furniture crafted for modern interiors. Timeless design, unmatched quality.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" onClick={() => navigate('/services')}>Shop Collection</Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/about')}>Our Story</Button>
        </div>
      </header>

      {/* STATS */}
      <div className="bg-[#2C2C2C] dark:bg-[#0A0A0A] px-[5%] py-7">
        <div className="flex flex-wrap justify-center gap-12 max-w-[900px] mx-auto text-center max-[768px]:gap-7">
          {[
            { val: '500+', label: 'Products' },
            { val: '12K+', label: 'Happy Clients' },
            { val: '20+',  label: 'Years of Craft' },
            { val: '4.9 ★', label: 'Avg. Rating' },
          ].map(({ val, label }) => (
            <div key={label}>
              <h2 className="text-[#B8860B] m-0">{val}</h2>
              <p className="text-[#ccc] m-0 text-[0.85rem]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">
        <section className="text-center mb-3">
          <h4>Handpicked for You</h4>
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Featured Products</h2>
          <p className="text-[#4A4A4A] dark:text-[#CCBBAA]">Discover our most-loved pieces, designed to elevate every room.</p>
        </section>

        <div className="flex flex-wrap justify-center gap-7 my-12 max-[768px]:gap-5">
          {products.map(p => (
            <Card key={p.id} className="flex-[1_1_260px] max-w-[320px] flex flex-col max-[768px]:flex-[1_1_100%] max-[768px]:max-w-full">
              <img src={p.img} alt={p.name} className="w-full h-[220px] object-cover" />
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8]">{p.name}</h3>
                <p className="text-[#4A4A4A] dark:text-[#CCBBAA] flex-1">{p.desc}</p>
                <p className="text-[#B8860B] font-semibold text-[1rem] mb-3">${p.price.toLocaleString()}</p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => navigate('/services')} className="flex-1">View Details</Button>
                  <Button size="sm" variant="outline" onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.img, category: p.category })} className="flex-1">Add to Cart</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* WHY DECORA */}
        <section className="text-center mb-3">
          <h4>Why Choose Us</h4>
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">The DECORA Difference</h2>
        </section>
        <div className="flex flex-wrap justify-center gap-7 my-12 max-[768px]:gap-5">
          {features.map(f => (
            <Card key={f.title} className="flex-[1_1_260px] max-w-[320px] p-6 flex flex-col gap-3 max-[768px]:flex-[1_1_100%] max-[768px]:max-w-full">
              <div className="text-4xl">{f.icon}</div>
              <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8]">{f.title}</h3>
              <p className="text-[#4A4A4A] dark:text-[#CCBBAA] m-0">{f.desc}</p>
            </Card>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#8B6508] to-[#B8860B] px-[5%] py-[72px] text-center max-[768px]:px-5 max-[768px]:py-12">
        <h2 className="text-white mb-2.5">Ready to Transform Your Space?</h2>
        <p className="text-white/90 max-w-[500px] mx-auto mb-7">
          Browse our full collection and find the perfect pieces for your home.
        </p>
        <Button variant="white" size="lg" onClick={() => navigate('/services')}>Explore Collection</Button>
      </section>
    </>
  );
}

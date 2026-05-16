import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import PageHero from '../../components/ui/PageHero';
import { useCart } from '../../context/CartContext';

const products = [
  { id: 'p1', name: 'Modern Sofa',     img: '/images/sofa.jpg',          price: 1200, category: 'Sofa',    desc: 'Luxury comfort meets minimalist design. Available in 6 fabric options.' },
  { id: 'p2', name: 'Dining Table',    img: '/images/table.jpg',         price: 850,  category: 'Table',   desc: 'Solid oak craftsmanship for family moments. Seats up to 8.' },
  { id: 'p3', name: 'Comfort Chair',   img: '/images/comfort chair.jpg', price: 420,  category: 'Chair',   desc: 'Ergonomic design for lasting comfort. Perfect for reading nooks.' },
];

const catalogue = [
  { item: 'Modern Sofa',     cat: 'Living Room', mat: 'Premium Fabric',  dim: '220 × 90 cm',  price: '$1,200' },
  { item: 'Dining Table',    cat: 'Dining Room', mat: 'Solid Oak',       dim: '180 × 90 cm',  price: '$850'   },
  { item: 'Comfort Chair',   cat: 'Living Room', mat: 'Leather',         dim: '80 × 85 cm',   price: '$420'   },
  { item: 'Executive Chair', cat: 'Office',      mat: 'Leather',         dim: '65 × 120 cm',  price: '$400'   },
  { item: 'King Bed Frame',  cat: 'Bedroom',     mat: 'Oak Wood',        dim: '200 × 180 cm', price: '$2,200' },
  { item: 'Coffee Table',    cat: 'Living Room', mat: 'Tempered Glass',  dim: '120 × 60 cm',  price: '$300'   },
  { item: 'Bookshelf Unit',  cat: 'Study',       mat: 'Walnut Wood',     dim: '90 × 200 cm',  price: '$550'   },
  { item: 'Wardrobe',        cat: 'Bedroom',     mat: 'MDF + Oak',       dim: '200 × 220 cm', price: '$1,800' },
];

export default function Services() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title={<>The Full <span className="text-[#B8860B]">Collection</span></>}
        subtitle="Every piece is crafted to perfection — from statement sofas to elegant dining sets."
      />

      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">

        <section className="text-center mb-3">
          <h4>Handpicked for You</h4>
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Featured Pieces</h2>
          <p className="text-[#4A4A4A] dark:text-[#CCBBAA]">Timeless designs for every room in your home.</p>
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
                  <Button size="sm" onClick={() => navigate('/contact')} className="flex-1">Enquire</Button>
                  <Button size="sm" variant="outline" onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.img, category: p.category })} className="flex-1">Add to Cart</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Catalogue */}
        <section className="text-center mb-3">
          <h4>Full Price List</h4>
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Product Catalogue</h2>
          <p className="text-[#4A4A4A] dark:text-[#CCBBAA]">All prices inclusive of standard delivery. White-glove service available.</p>
        </section>

        <div className="w-full overflow-x-auto mt-5 rounded-lg">
          <table className="w-full border-collapse rounded-lg overflow-hidden bg-[#FAFAFA] dark:bg-[#1E1E1E] text-[0.9rem]" style={{ minWidth: '620px' }}>
            <thead className="bg-[#2C2C2C] dark:bg-[#0A0A0A]">
              <tr>
                {['Item', 'Category', 'Material', 'Dimensions', 'Price'].map(h => (
                  <th key={h} className="px-[18px] py-[14px] text-left font-['Inter'] font-semibold text-[0.78rem] text-white uppercase tracking-[1px] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {catalogue.map(({ item, cat, mat, dim, price }) => (
                <tr key={item}>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] dark:text-[#CCBBAA] border-b border-[#EEEEEE] dark:border-[#2A2A2A] align-middle">{item}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] dark:text-[#CCBBAA] border-b border-[#EEEEEE] dark:border-[#2A2A2A] align-middle">{cat}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] dark:text-[#CCBBAA] border-b border-[#EEEEEE] dark:border-[#2A2A2A] align-middle">{mat}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] dark:text-[#CCBBAA] border-b border-[#EEEEEE] dark:border-[#2A2A2A] align-middle">{dim}</td>
                  <td className="px-[18px] py-[13px] border-b border-[#EEEEEE] dark:border-[#2A2A2A] align-middle text-[#B8860B] font-semibold">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-9 text-center mt-8">
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Need Custom Sizing?</h2>
          <p className="max-w-[500px] mx-auto mb-6 text-[#4A4A4A] dark:text-[#CCBBAA]">
            We offer bespoke furniture tailored to your exact space and style requirements.
          </p>
          <Button size="lg" onClick={() => navigate('/contact')}>Request Custom Quote</Button>
        </div>
      </main>
    </>
  );
}

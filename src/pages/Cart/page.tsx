import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import PageHero from "../../components/ui/PageHero";

const SUGGESTED = [
  { id: "s1", name: "Velvet Armchair",  img: "/images/comfort chair.jpg", price: 520,  category: "Chair", desc: "Plush velvet upholstery in deep emerald green. Solid beech legs." },
  { id: "s2", name: "Oak Coffee Table", img: "/images/table.jpg",         price: 310,  category: "Table", desc: "Solid oak with a hand-rubbed natural finish. 120 x 60 cm." },
  { id: "s3", name: "L-Shape Sofa",     img: "/images/sofa.jpg",          price: 1850, category: "Sofa",  desc: "Spacious corner sofa in cream boucle fabric. Seats 5." },
];

const TRUST = [
  { icon: "🚚", label: "Free Delivery",   sub: "On orders over $2,000"      },
  { icon: "🔒", label: "Secure Checkout", sub: "256-bit SSL encryption"      },
  { icon: "↩️", label: "Easy Returns",    sub: "30-day hassle-free returns"  },
  { icon: "🏆", label: "Premium Quality", sub: "Award-winning craftsmanship" },
];

const STEPS = ["Cart", "Delivery", "Payment", "Confirm"];

/* ── People who bought items ── */
const PERSON_CARTS = [
  {
    id: "pc1",
    name: "Sarah Mitchell",
    role: "Interior Designer",
    location: "New York, USA",
    avatar: "https://i.pravatar.cc/80?img=1",
    online: true,
    rating: 5,
    review: "Absolutely love this piece — it transformed my living room completely.",
    item: { id: "p1", name: "Modern Sofa", img: "/images/sofa.jpg", price: 1200, category: "Sofa" },
  },
  {
    id: "pc2",
    name: "James Thornton",
    role: "Premium Member",
    location: "London, UK",
    avatar: "https://i.pravatar.cc/80?img=8",
    online: true,
    rating: 5,
    review: "Solid oak craftsmanship — worth every penny. My family gathers here every evening.",
    item: { id: "p2", name: "Dining Table", img: "/images/table.jpg", price: 850, category: "Table" },
  },
  {
    id: "pc3",
    name: "Priya Sharma",
    role: "VIP Member",
    location: "Mumbai, India",
    avatar: "https://i.pravatar.cc/80?img=5",
    online: false,
    rating: 4,
    review: "Perfect for long reading sessions. Ergonomic and beautifully crafted.",
    item: { id: "p3", name: "Comfort Chair", img: "/images/comfort chair.jpg", price: 420, category: "Chair" },
  },
  {
    id: "pc4",
    name: "Carlos Mendez",
    role: "Gold Member",
    location: "Madrid, Spain",
    avatar: "https://i.pravatar.cc/80?img=12",
    online: true,
    rating: 5,
    review: "The walnut finish is flawless. Transformed our bedroom completely.",
    item: { id: "p2", name: "Dining Table", img: "/images/table.jpg", price: 850, category: "Table" },
  },
  {
    id: "pc5",
    name: "Emma Johansson",
    role: "New Member",
    location: "Stockholm, Sweden",
    avatar: "https://i.pravatar.cc/80?img=9",
    online: false,
    rating: 4,
    review: "Elegant design, easy to clean, and very sturdy. Highly recommend.",
    item: { id: "p1", name: "Modern Sofa", img: "/images/sofa.jpg", price: 1200, category: "Sofa" },
  },
  {
    id: "pc6",
    name: "David Park",
    role: "Premium Member",
    location: "Seoul, South Korea",
    avatar: "https://i.pravatar.cc/80?img=15",
    online: true,
    rating: 5,
    review: "The natural wood grain is unique on every piece. Looks like a work of art.",
    item: { id: "p3", name: "Comfort Chair", img: "/images/comfort chair.jpg", price: 420, category: "Chair" },
  },
];

const ROLE_BADGE: Record<string, string> = {
  "Interior Designer": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "VIP Member":        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  "Gold Member":       "bg-amber-100  text-amber-700  dark:bg-amber-900/30  dark:text-amber-300",
  "Premium Member":    "bg-blue-100   text-blue-700   dark:bg-blue-900/30   dark:text-blue-300",
  "New Member":        "bg-green-100  text-green-700  dark:bg-green-900/30  dark:text-green-300",
};

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-sm ${i <= n ? "text-[#B8860B]" : "text-[#ddd] dark:text-[#444]"}`}>★</span>
      ))}
    </div>
  );
}

function PersonCartSection({ onAdd }: { onAdd: (item: typeof PERSON_CARTS[0]["item"]) => void }) {
  return (
    <div className="mt-16 pt-10 border-t border-[#EEEEEE] dark:border-[#2A2A2A]">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[2px] text-[#B8860B] font-[Inter] mb-1">Community Picks</p>
        <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0">People Also Bought</h2>
        <p className="text-[#4A4A4A] dark:text-[#CCBBAA] mt-2 max-w-[480px] mx-auto">
          See what our community members are loving right now — and add their favourites to your cart.
        </p>
      </div>

      {/* Person cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PERSON_CARTS.map(person => (
          <div
            key={person.id}
            className="bg-white dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(184,134,11,0.15)] hover:border-[#B8860B] group"
          >
            {/* Person header */}
            <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-[#EEEEEE] dark:border-[#2A2A2A]">
              {/* Avatar + online dot */}
              <div className="relative shrink-0">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F4ECE1] dark:border-[#2A2A2A] group-hover:border-[#B8860B] transition-all duration-300"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#1E1E1E] ${person.online ? "bg-green-500" : "bg-gray-400"}`}
                  title={person.online ? "Online" : "Offline"}
                />
              </div>

              {/* Name + role + location */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[0.92rem] font-bold text-[#1A1A1A] dark:text-[#F0EDE8] font-[Inter] m-0 leading-tight truncate">{person.name}</p>
                  <span className={`text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full font-[Inter] shrink-0 ${ROLE_BADGE[person.role] ?? "bg-[#B8860B]/10 text-[#B8860B]"}`}>
                    {person.role}
                  </span>
                </div>
                <p className="text-[0.72rem] text-[#999] font-[Inter] m-0 mt-0.5">📍 {person.location}</p>
              </div>
            </div>

            {/* Product they bought */}
            <div className="flex gap-3 items-center px-5 py-4 bg-[#FAFAFA] dark:bg-[#252525]">
              <div className="relative shrink-0">
                <img
                  src={person.item.img}
                  alt={person.item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <span className="absolute -top-1.5 -right-1.5 bg-[#B8860B] text-white text-[0.55rem] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full font-[Inter]">
                  {person.item.category}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.85rem] font-bold text-[#1A1A1A] dark:text-[#F0EDE8] font-[Inter] m-0 truncate">{person.item.name}</p>
                <p className="text-[#B8860B] font-bold text-[0.95rem] font-[Inter] m-0">${person.item.price.toLocaleString()}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  <span className="text-[0.65rem] text-green-600 dark:text-green-400 font-[Inter] font-semibold">In Stock</span>
                </div>
              </div>
            </div>

            {/* Review */}
            <div className="px-5 py-3">
              <Stars n={person.rating} />
              <p className="text-[0.8rem] text-[#4A4A4A] dark:text-[#CCBBAA] font-[Inter] mt-1.5 m-0 leading-relaxed italic">
                "{person.review}"
              </p>
            </div>

            {/* Add to cart button */}
            <div className="px-5 pb-5 pt-2">
              <button
                onClick={() => onAdd(person.item)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#2C2C2C] hover:bg-[#B8860B] text-white text-[0.78rem] font-bold uppercase tracking-[1.5px] font-[Inter] rounded-xl border-2 border-[#2C2C2C] hover:border-[#B8860B] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>🛒</span>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart, addItem } = useCart();
  const navigate = useNavigate();

  const [coupon, setCoupon]       = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [discount, setDiscount]   = useState(0);
  const [savedIds, setSavedIds]   = useState<string[]>([]);
  const [note, setNote]           = useState("");
  const [noteOpen, setNoteOpen]   = useState(false);

  const delivery            = total >= 2000 ? 0 : 150;
  const grandTotal          = total - discount + delivery;
  const freeProgress        = Math.min((total / 2000) * 100, 100);
  const totalQty            = items.reduce((s, i) => s + i.qty, 0);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === "DECORA10") {
      const d = Math.round(total * 0.1);
      setDiscount(d);
      setCouponMsg({ text: `10% discount applied — you save $${d.toLocaleString()}!`, ok: true });
    } else if (code === "WELCOME") {
      setDiscount(50);
      setCouponMsg({ text: "$50 welcome discount applied!", ok: true });
    } else if (code === "FREESHIP") {
      setDiscount(delivery);
      setCouponMsg({ text: "Free delivery unlocked!", ok: true });
    } else {
      setDiscount(0);
      setCouponMsg({ text: "Invalid code. Try DECORA10, WELCOME or FREESHIP.", ok: false });
    }
  };

  const toggleSave = (id: string) =>
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const inputCls =
    "w-full px-3 py-2.5 text-[0.85rem] font-[Inter] bg-white dark:bg-[#111] text-[#1A1A1A] dark:text-[#F0EDE8] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.15)] transition-all duration-200";

  /* ── EMPTY STATE ── */
  if (items.length === 0) return (
    <>
      <PageHero
        eyebrow="Your Selection"
        title={<>Shopping <span className="text-[#B8860B]">Cart</span></>}
        subtitle="Review your selected items before placing your order."
      />
      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">

        {/* Empty hero */}
        <div className="flex flex-col items-center text-center py-16 gap-5">
          <div className="w-24 h-24 rounded-full bg-[#F4ECE1] dark:bg-[#252525] flex items-center justify-center text-5xl">🛒</div>
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0">Your cart is empty</h2>
          <p className="text-[#4A4A4A] dark:text-[#CCBBAA] max-w-[420px] m-0">
            Looks like you have not added anything yet. Browse our curated collection to find the perfect piece for your home.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Button size="lg" onClick={() => navigate("/services")}>Browse Collection</Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-b border-[#EEEEEE] dark:border-[#2A2A2A] mb-12">
          {TRUST.map(({ icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2 p-4 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-xl hover:border-[#B8860B] transition-all duration-300">
              <span className="text-3xl">{icon}</span>
              <p className="text-[0.85rem] font-semibold text-[#1A1A1A] dark:text-[#F0EDE8] font-[Inter] m-0">{label}</p>
              <p className="text-[0.75rem] text-[#999] font-[Inter] m-0">{sub}</p>
            </div>
          ))}
        </div>

        {/* Suggested */}
        <div className="text-center mb-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[2px] text-[#B8860B] font-[Inter] mb-1">Handpicked for You</p>
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0">You May Also Like</h2>
          <p className="text-[#4A4A4A] dark:text-[#CCBBAA] mt-2">Popular pieces our customers love.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {SUGGESTED.map(p => (
            <Card key={p.id} className="flex flex-col group">
              <div className="relative overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 bg-[#2C2C2C] text-white text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full font-[Inter]">{p.category}</span>
              </div>
              <div className="p-5 flex flex-col flex-1 gap-2">
                <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0 text-[1rem]">{p.name}</h3>
                <p className="text-[#4A4A4A] dark:text-[#CCBBAA] text-[0.85rem] flex-1 m-0">{p.desc}</p>
                <p className="text-[#B8860B] font-bold text-[1.1rem] m-0">${p.price.toLocaleString()}</p>
                <div className="flex gap-2 mt-1">
                  <Button size="sm" className="flex-1" onClick={() => navigate("/services")}>View Details</Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.img, category: p.category })}>Add to Cart</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* People Also Bought — empty state */}
        <PersonCartSection onAdd={(item) => addItem({ id: item.id, name: item.name, price: item.price, image: item.img, category: item.category })} />

      </main>
    </>
  );

  /* ── FILLED CART ── */
  return (
    <>
      <PageHero
        eyebrow="Your Selection"
        title={<>Shopping <span className="text-[#B8860B]">Cart</span></>}
        subtitle="Review your selected items before placing your order."
      />

      <main className="min-h-[calc(100vh-70px)] px-[5%] py-10 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">

        {/* ── Checkout steps ── */}
        <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[0.8rem] font-bold font-[Inter] border-2 transition-all duration-300 ${i === 0 ? "bg-[#B8860B] border-[#B8860B] text-white" : "bg-transparent border-[#EEEEEE] dark:border-[#2A2A2A] text-[#999]"}`}>
                  {i === 0 ? "✓" : i + 1}
                </div>
                <span className={`text-[0.7rem] uppercase tracking-wide font-[Inter] font-semibold ${i === 0 ? "text-[#B8860B]" : "text-[#999]"}`}>{step}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-12 mx-1 mb-5 ${i === 0 ? "bg-[#B8860B]" : "bg-[#EEEEEE] dark:bg-[#2A2A2A]"}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── Free delivery progress bar ── */}
        {total < 2000 && (
          <div className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-xl px-6 py-4 mb-6 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[0.85rem] text-[#4A4A4A] dark:text-[#CCBBAA] font-[Inter]">
                🚚 Spend <strong className="text-[#B8860B]">${(2000 - total).toLocaleString()}</strong> more to unlock free white-glove delivery
              </span>
              <span className="text-[0.75rem] font-bold text-[#B8860B] font-[Inter]">{Math.round(freeProgress)}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#EEEEEE] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#8B6508] to-[#B8860B] rounded-full transition-all duration-700" style={{ width: `${freeProgress}%` }} />
            </div>
          </div>
        )}
        {total >= 2000 && (
          <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-6 py-4 mb-6">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="m-0 text-[0.9rem] font-bold text-green-700 dark:text-green-400 font-[Inter]">Free white-glove delivery unlocked!</p>
              <p className="m-0 text-[0.78rem] text-green-600 dark:text-green-500 font-[Inter]">Your order qualifies for complimentary professional assembly and placement.</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-8 items-start">

          {/* ══ LEFT — Cart items ══ */}
          <div className="flex-[1_1_500px] flex flex-col gap-4">

            {/* Header row */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0 text-[1.3rem]">{totalQty} {totalQty === 1 ? "Item" : "Items"}</h2>
                <p className="text-[0.78rem] text-[#999] font-[Inter] m-0 mt-0.5">{items.length} {items.length === 1 ? "product" : "products"} in your cart</p>
              </div>
              <button onClick={clearCart} className="text-[0.78rem] text-[#dc3545] font-semibold uppercase tracking-[1px] hover:underline bg-transparent border-none cursor-pointer font-[Inter] transition-all duration-200">
                Clear All
              </button>
            </div>

            {/* Item cards */}
            {items.map(item => {
              const isSaved = savedIds.includes(item.id);
              return (
                <div key={item.id} className="bg-white dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-2xl p-5 transition-all duration-300 hover:border-[#B8860B] hover:shadow-[0_8px_32px_rgba(184,134,11,0.12)] group">
                  <div className="flex gap-5 max-[480px]:flex-col">

                    {/* Image */}
                    <div className="relative shrink-0">
                      <img src={item.image} alt={item.name} className="w-28 h-28 object-cover rounded-xl max-[480px]:w-full max-[480px]:h-52 transition-transform duration-500 group-hover:scale-[1.02]" />
                      <span className="absolute top-2 left-2 bg-[#2C2C2C]/80 text-white text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full font-[Inter]">{item.category}</span>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-1 gap-3">

                      {/* Name + remove */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0 text-[1.05rem] leading-snug">{item.name}</h3>
                          <p className="text-[0.75rem] text-[#999] font-[Inter] m-0 mt-0.5">Unit price: <span className="text-[#B8860B] font-semibold">${item.price.toLocaleString()}</span></p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="w-8 h-8 flex items-center justify-center rounded-full text-[#999] hover:text-white hover:bg-[#dc3545] bg-[#F4ECE1] dark:bg-[#252525] border-none cursor-pointer text-sm transition-all duration-200 shrink-0" aria-label="Remove item">✕</button>
                      </div>

                      {/* Qty + line total + save */}
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center rounded-xl overflow-hidden border border-[#EEEEEE] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#111]">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-9 h-9 flex items-center justify-center text-[#4A4A4A] dark:text-[#CCBBAA] hover:bg-[#F4ECE1] dark:hover:bg-[#2A2A2A] bg-transparent border-none cursor-pointer text-xl font-bold transition-colors duration-200">−</button>
                          <span className="w-10 text-center text-[0.95rem] font-bold text-[#1A1A1A] dark:text-[#F0EDE8] font-[Inter]">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-9 h-9 flex items-center justify-center text-[#4A4A4A] dark:text-[#CCBBAA] hover:bg-[#F4ECE1] dark:hover:bg-[#2A2A2A] bg-transparent border-none cursor-pointer text-xl font-bold transition-colors duration-200">+</button>
                        </div>

                        <span className="text-[#B8860B] font-bold text-[1.15rem] font-[Inter]">${(item.price * item.qty).toLocaleString()}</span>

                        <button onClick={() => toggleSave(item.id)} className={`flex items-center gap-1.5 text-[0.75rem] font-semibold font-[Inter] uppercase tracking-wide border-none cursor-pointer bg-transparent transition-colors duration-200 ${isSaved ? "text-[#B8860B]" : "text-[#999] hover:text-[#B8860B]"}`}>
                          {isSaved ? "♥ Saved" : "♡ Save"}
                        </button>
                      </div>

                      {/* In-stock badge */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                        <span className="text-[0.72rem] text-green-600 dark:text-green-400 font-[Inter] font-semibold">In Stock — Ready to ship</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Order note */}
            <div className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-xl overflow-hidden">
              <button onClick={() => setNoteOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 bg-transparent border-none cursor-pointer text-left">
                <span className="text-[0.85rem] font-semibold text-[#4A4A4A] dark:text-[#CCBBAA] font-[Inter]">📝 Add order note (optional)</span>
                <span className={`text-[#999] text-lg transition-transform duration-300 ${noteOpen ? "rotate-180" : ""}`}>⌄</span>
              </button>
              {noteOpen && (
                <div className="px-5 pb-4">
                  <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Special delivery instructions, gift message, assembly preferences..." rows={3} className={`${inputCls} resize-none`} />
                </div>
              )}
            </div>
          </div>

          {/* ══ RIGHT — Order summary ══ */}
          <div className="flex-[1_1_300px] max-w-[380px] max-[768px]:max-w-full max-[768px]:w-full">
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-2xl p-6 sticky top-[86px] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">

              <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-5 pb-4 border-b border-[#EEEEEE] dark:border-[#2A2A2A] text-[1.1rem]">Order Summary</h3>

              {/* Line items */}
              <div className="flex flex-col gap-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-[0.82rem] text-[#4A4A4A] dark:text-[#CCBBAA] font-[Inter]">
                    <span className="truncate max-w-[180px]">{item.name} <span className="text-[#999]">x{item.qty}</span></span>
                    <span className="font-semibold shrink-0">${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-2.5 pt-4 border-t border-[#EEEEEE] dark:border-[#2A2A2A] mb-4">
                <div className="flex justify-between text-[0.88rem] text-[#4A4A4A] dark:text-[#CCBBAA]">
                  <span>Subtotal ({totalQty} items)</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[0.88rem] text-green-600 dark:text-green-400">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">−${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[0.88rem] text-[#4A4A4A] dark:text-[#CCBBAA]">
                  <span>Delivery</span>
                  <span className={`font-semibold ${delivery === 0 ? "text-green-600 dark:text-green-400" : ""}`}>{delivery === 0 ? "Free" : `$${delivery}`}</span>
                </div>
              </div>

              {/* Grand total */}
              <div className="flex justify-between items-center pt-4 border-t-2 border-[#B8860B] mb-5">
                <span className="text-[1rem] font-bold text-[#1A1A1A] dark:text-[#F0EDE8] font-[Inter]">Total</span>
                <span className="text-[1.4rem] font-bold text-[#B8860B] font-[Inter]">${grandTotal.toLocaleString()}</span>
              </div>

              {/* Coupon */}
              <div className="mb-5">
                <p className="text-[0.75rem] font-bold text-[#4A4A4A] dark:text-[#CCBBAA] uppercase tracking-[0.5px] font-[Inter] mb-2">🏷 Coupon Code</p>
                <div className="flex gap-2">
                  <input type="text" value={coupon} onChange={e => setCoupon(e.target.value)} onKeyDown={e => e.key === "Enter" && applyCoupon()} placeholder="DECORA10 / WELCOME" className={`${inputCls} flex-1`} />
                  <Button size="sm" onClick={applyCoupon}>Apply</Button>
                </div>
                {couponMsg && (
                  <p className={`text-[0.75rem] mt-1.5 font-[Inter] ${couponMsg.ok ? "text-green-600 dark:text-green-400" : "text-[#dc3545]"}`}>{couponMsg.text}</p>
                )}
                <p className="text-[0.7rem] text-[#999] font-[Inter] mt-1">Try: DECORA10 · WELCOME · FREESHIP</p>
              </div>

              {/* Estimated delivery */}
              <div className="flex items-center gap-3 bg-[#F4ECE1] dark:bg-[#252525] rounded-xl px-4 py-3 mb-5">
                <span className="text-xl shrink-0">📅</span>
                <div>
                  <p className="m-0 text-[0.75rem] font-bold text-[#4A4A4A] dark:text-[#CCBBAA] font-[Inter] uppercase tracking-wide">Estimated Delivery</p>
                  <p className="m-0 text-[0.85rem] text-[#1A1A1A] dark:text-[#F0EDE8] font-[Inter] font-semibold">5 – 10 business days</p>
                </div>
              </div>

              {/* CTA buttons */}
              <Button size="lg" fullWidth onClick={() => { alert("Order placed! Thank you for shopping with DECORA."); clearCart(); navigate("/"); }}>
                Place Order
              </Button>
              <Button size="md" variant="outline" fullWidth className="mt-3" onClick={() => navigate("/services")}>
                Continue Shopping
              </Button>

              {/* Trust list */}
              <div className="mt-5 pt-5 border-t border-[#EEEEEE] dark:border-[#2A2A2A] grid grid-cols-2 gap-2.5">
                {TRUST.map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-[0.75rem] text-[#4A4A4A] dark:text-[#CCBBAA] font-[Inter]">
                    <span className="text-base shrink-0">{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── People Also Bought ── */}
        <PersonCartSection onAdd={(item) => addItem({ id: item.id, name: item.name, price: item.price, image: item.img, category: item.category })} />

        {/* ── You may also like ── */}
        <div className="mt-16 pt-10 border-t border-[#EEEEEE] dark:border-[#2A2A2A]">
          <div className="text-center mb-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[2px] text-[#B8860B] font-[Inter] mb-1">Complete Your Space</p>
            <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0">You May Also Like</h2>
            <p className="text-[#4A4A4A] dark:text-[#CCBBAA] mt-2">Pieces that pair beautifully with your selection.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {SUGGESTED.map(p => (
              <Card key={p.id} className="flex flex-col group">
                <div className="relative overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 bg-[#2C2C2C]/80 text-white text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full font-[Inter]">{p.category}</span>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0 text-[1rem]">{p.name}</h3>
                  <p className="text-[#4A4A4A] dark:text-[#CCBBAA] text-[0.85rem] flex-1 m-0">{p.desc}</p>
                  <p className="text-[#B8860B] font-bold text-[1.1rem] m-0">${p.price.toLocaleString()}</p>
                  <div className="flex gap-2 mt-1">
                    <Button size="sm" className="flex-1" onClick={() => navigate("/services")}>View Details</Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.img, category: p.category })}>Add to Cart</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </main>
    </>
  );
}

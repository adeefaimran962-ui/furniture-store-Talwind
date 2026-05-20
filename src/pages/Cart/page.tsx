import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import PageHero from '../../components/ui/PageHero';

const suggested = [
  { id: 's1', name: 'Velvet Armchair',    img: '/images/comfort chair.jpg', price: 520,  category: 'Chair', desc: 'Plush velvet upholstery in deep emerald green.' },
  { id: 's2', name: 'Oak Coffee Table',   img: '/images/table.jpg',         price: 310,  category: 'Table', desc: 'Solid oak with a hand-rubbed natural finish.' },
  { id: 's3', name: 'L-Shape Sofa',       img: '/images/sofa.jpg',          price: 1850, category: 'Sofa',  desc: 'Spacious corner sofa in cream boucle fabric.' },
];

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart, addItem } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [discount, setDiscount] = useState(0);

  const delivery = total >= 2000 ? 0 : 150;
  const grandTotal = total - discount + delivery;
  const freeDeliveryProgress = Math.min((total / 2000) * 100, 100);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'DECORA10') {
      const d = Math.round(total * 0.1);
      setDiscount(d);
      setCouponMsg({ text: `10% discount applied — you save $${d.toLocaleString()}!`, ok: true });
    } else if (coupon.trim().toUpperCase() === 'WELCOME') {
      setDiscount(50);
      setCouponMsg({ text: '$50 welcome discount applied!', ok: true });
    } else {
      setDiscount(0);
      setCouponMsg({ text: 'Invalid coupon code. Try DECORA10 or WELCOME.', ok: false });
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Your Selection"
        title={<>Shopping <span className="text-[#B8860B]">Cart</span></>}
        subtitle="Review your selected items before placing your order."
      />

      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">

        {items.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="py-16 flex flex-col items-center gap-6">
              <div className="text-7xl">🛒</div>
              <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Your cart is empty</h2>
              <p className="text-[#4A4A4A] dark:text-[#CCBBAA] max-w-[400px]">
                Looks like you haven't added anything yet. Browse our collection to find the perfect piece.
              </p>
              <Button size="lg" onClick={() => navigate('/services')}>Browse Collection</Button>
            </div>

            {/* Trust badges */}
            <div className="w-full flex flex-wrap justify-center gap-4 py-6 border-t border-b border-[#EEEEEE] dark:border-[#2A2A2A] mb-8">
              {[
                { icon: '🚚', label: 'Free Delivery',    sub: 'On orders over $2,000' },
                { icon: '🔒', label: 'Secure Checkout',  sub: '256-bit SSL encryption' },
                { icon: '↩️', label: 'Easy Returns',     sub: '30-day hassle-free returns' },
                { icon: '🏆', label: 'Premium Quality',  sub: 'Award-winning craftsmanship' },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 px-5 py-3 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg min-w-[180px]">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div className="text-left">
                    <div className="text-[0.85rem] font-semibold text-[#1A1A1A] dark:text-[#F0EDE8] font-['Inter']">{label}</div>
                    <div className="text-[0.75rem] text-[#999] font-['Inter']">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* You may also like */}
            <div className="w-full text-center mb-3">
              <h4>Handpicked for You</h4>
              <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">You May Also Like</h2>
              <p className="text-[#4A4A4A] dark:text-[#CCBBAA]">Popular pieces our customers love.</p>
            </div>
            <div className="w-full flex flex-wrap justify-center gap-7 max-[768px]:gap-5">
              {suggested.map(p => (
                <Card key={p.id} className="flex-[1_1_260px] max-w-[320px] flex flex-col max-[768px]:flex-[1_1_100%] max-[768px]:max-w-full">
                  <img src={p.img} alt={p.name} className="w-full h-[200px] object-cover" />
                  <div className="p-5 flex flex-col flex-1 gap-2">
                    <span className="text-[0.72rem] text-[#999] uppercase tracking-[1px] font-['Inter']">{p.category}</span>
                    <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0 text-[1rem]">{p.name}</h3>
                    <p className="text-[#4A4A4A] dark:text-[#CCBBAA] text-[0.88rem] flex-1 m-0">{p.desc}</p>
                    <p className="text-[#B8860B] font-semibold text-[1rem] m-0">${p.price.toLocaleString()}</p>
                    <div className="flex gap-2 mt-1">
                      <Button size="sm" className="flex-1" onClick={() => navigate('/services')}>View Details</Button>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.img, category: p.category })}>Add to Cart</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        ) : (
          <>
            <div className="flex flex-wrap gap-8 items-start">

              {/* ── Cart items ── */}
              <div className="flex-[1_1_500px] flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0">
                    {items.length} {items.length === 1 ? 'Item' : 'Items'}
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-[0.8rem] text-[#dc3545] font-semibold uppercase tracking-[1px] hover:underline bg-transparent border-none cursor-pointer font-['Inter']"
                  >
                    Clear All
                  </button>
                </div>

                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-4 transition-all duration-300 hover:border-[#B8860B] max-[480px]:flex-col"
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shrink-0 max-[480px]:w-full max-[480px]:h-48"
                    />

                    {/* Details */}
                    <div className="flex flex-col flex-1 gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0 text-[1rem]">{item.name}</h3>
                          <span className="text-[0.78rem] text-[#999] uppercase tracking-[1px] font-['Inter']">{item.category}</span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#999] hover:text-[#dc3545] bg-transparent border-none cursor-pointer text-lg leading-none transition-colors duration-200"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Unit price */}
                      <span className="text-[0.8rem] text-[#999] font-['Inter']">
                        ${item.price.toLocaleString()} per item
                      </span>

                      <div className="flex items-center justify-between flex-wrap gap-3 mt-auto">
                        {/* Qty controls */}
                        <div className="flex items-center gap-2 bg-white dark:bg-[#111] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-[4px] overflow-hidden">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#4A4A4A] dark:text-[#CCBBAA] hover:bg-[#F4ECE1] dark:hover:bg-[#2A2A2A] bg-transparent border-none cursor-pointer text-lg font-bold transition-colors duration-200"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-[0.9rem] font-semibold text-[#1A1A1A] dark:text-[#F0EDE8] font-['Inter']">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#4A4A4A] dark:text-[#CCBBAA] hover:bg-[#F4ECE1] dark:hover:bg-[#2A2A2A] bg-transparent border-none cursor-pointer text-lg font-bold transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>

                        {/* Line total */}
                        <span className="text-[#B8860B] font-semibold text-[1rem] font-['Inter']">
                          ${(item.price * item.qty).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Free delivery progress */}
                {total < 2000 && (
                  <div className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg px-5 py-4 mt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[0.82rem] text-[#4A4A4A] dark:text-[#CCBBAA] font-['Inter']">
                        🚚 Add <strong className="text-[#B8860B]">${(2000 - total).toLocaleString()}</strong> more for free delivery
                      </span>
                      <span className="text-[0.75rem] text-[#999] font-['Inter']">{Math.round(freeDeliveryProgress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#EEEEEE] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#B8860B] rounded-full transition-all duration-500"
                        style={{ width: `${freeDeliveryProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {total >= 2000 && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-5 py-4 mt-2 text-green-700 dark:text-green-400 text-[0.88rem] font-['Inter'] font-semibold">
                    🎉 You qualify for free white-glove delivery!
                  </div>
                )}
              </div>

              {/* ── Order summary ── */}
              <div className="flex-[1_1_280px] max-w-[360px] max-[768px]:max-w-full max-[768px]:w-full">
                <div className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-6 sticky top-[86px]">
                  <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-5 pb-4 border-b border-[#EEEEEE] dark:border-[#2A2A2A]">
                    Order Summary
                  </h3>

                  <div className="flex flex-col gap-3 mb-5">
                    <div className="flex justify-between text-[0.9rem] text-[#4A4A4A] dark:text-[#CCBBAA]">
                      <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[0.9rem] text-green-600 dark:text-green-400">
                        <span>Coupon Discount</span>
                        <span>−${discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[0.9rem] text-[#4A4A4A] dark:text-[#CCBBAA]">
                      <span>Delivery</span>
                      <span className="text-green-600 font-semibold">{delivery === 0 ? 'Free' : `$${delivery}`}</span>
                    </div>
                    {total < 2000 && (
                      <p className="text-[0.78rem] text-[#999] m-0">
                        Add ${(2000 - total).toLocaleString()} more for free delivery
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between font-semibold text-[1.05rem] text-[#1A1A1A] dark:text-[#F0EDE8] pt-4 border-t border-[#EEEEEE] dark:border-[#2A2A2A] mb-5">
                    <span>Total</span>
                    <span className="text-[#B8860B]">${grandTotal.toLocaleString()}</span>
                  </div>

                  {/* Coupon code */}
                  <div className="mb-5">
                    <p className="text-[0.78rem] font-semibold text-[#4A4A4A] dark:text-[#CCBBAA] uppercase tracking-[0.5px] font-['Inter'] mb-2">
                      🏷 Coupon Code
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={coupon}
                        onChange={e => setCoupon(e.target.value)}
                        placeholder="e.g. DECORA10"
                        className="flex-1 px-3 py-2 text-[0.85rem] font-['Inter'] bg-white dark:bg-[#111] text-[#1A1A1A] dark:text-[#F0EDE8] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-[4px] focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.15)]"
                      />
                      <Button size="sm" onClick={applyCoupon}>Apply</Button>
                    </div>
                    {couponMsg && (
                      <p className={`text-[0.78rem] mt-2 font-['Inter'] ${couponMsg.ok ? 'text-green-600 dark:text-green-400' : 'text-[#dc3545]'}`}>
                        {couponMsg.text}
                      </p>
                    )}
                  </div>

                  {/* Estimated delivery */}
                  <div className="flex items-center gap-2 bg-[#F4ECE1] dark:bg-[#252525] rounded-lg px-4 py-3 mb-5">
                    <span className="text-lg">📅</span>
                    <div>
                      <p className="m-0 text-[0.78rem] font-semibold text-[#4A4A4A] dark:text-[#CCBBAA] font-['Inter']">Estimated Delivery</p>
                      <p className="m-0 text-[0.82rem] text-[#1A1A1A] dark:text-[#F0EDE8] font-['Inter']">5 – 10 business days</p>
                    </div>
                  </div>

                  <Button size="lg" fullWidth onClick={() => { alert('Order placed! Thank you for shopping with DECORA.'); clearCart(); navigate('/'); }}>
                    Place Order
                  </Button>
                  <Button size="md" variant="outline" fullWidth className="mt-3" onClick={() => navigate('/services')}>
                    Continue Shopping
                  </Button>

                  {/* Trust badges */}
                  <div className="mt-5 pt-5 border-t border-[#EEEEEE] dark:border-[#2A2A2A] flex flex-col gap-2.5">
                    {[
                      { icon: '🔒', text: 'Secure 256-bit SSL checkout' },
                      { icon: '↩️', text: '30-day hassle-free returns' },
                      { icon: '🏆', text: 'Award-winning craftsmanship' },
                      { icon: '📞', text: 'Dedicated support 9am – 6pm' },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-2.5 text-[0.8rem] text-[#4A4A4A] dark:text-[#CCBBAA] font-['Inter']">
                        <span className="text-base shrink-0">{icon}</span>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── You may also like ── */}
            <div className="mt-14">
              <div className="text-center mb-8">
                <h4>Complete Your Space</h4>
                <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">You May Also Like</h2>
                <p className="text-[#4A4A4A] dark:text-[#CCBBAA]">Pieces that pair beautifully with your selection.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-7 max-[768px]:gap-5">
                {suggested.map(p => (
                  <Card key={p.id} className="flex-[1_1_260px] max-w-[320px] flex flex-col max-[768px]:flex-[1_1_100%] max-[768px]:max-w-full">
                    <img src={p.img} alt={p.name} className="w-full h-[200px] object-cover" />
                    <div className="p-5 flex flex-col flex-1 gap-2">
                      <span className="text-[0.72rem] text-[#999] uppercase tracking-[1px] font-['Inter']">{p.category}</span>
                      <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] m-0 text-[1rem]">{p.name}</h3>
                      <p className="text-[#4A4A4A] dark:text-[#CCBBAA] text-[0.88rem] flex-1 m-0">{p.desc}</p>
                      <p className="text-[#B8860B] font-semibold text-[1rem] m-0">${p.price.toLocaleString()}</p>
                      <div className="flex gap-2 mt-1">
                        <Button size="sm" className="flex-1" onClick={() => navigate('/services')}>View Details</Button>
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.img, category: p.category })}>Add to Cart</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

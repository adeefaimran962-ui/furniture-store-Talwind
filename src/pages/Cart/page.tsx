import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import PageHero from '../../components/ui/PageHero';

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();
  const navigate = useNavigate();

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
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <div className="text-7xl">🛒</div>
            <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Your cart is empty</h2>
            <p className="text-[#4A4A4A] dark:text-[#CCBBAA] max-w-[400px]">
              Looks like you haven't added anything yet. Browse our collection to find the perfect piece.
            </p>
            <Button size="lg" onClick={() => navigate('/services')}>Browse Collection</Button>
          </div>
        ) : (
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
                  <div className="flex justify-between text-[0.9rem] text-[#4A4A4A] dark:text-[#CCBBAA]">
                    <span>Delivery</span>
                    <span className="text-green-600 font-semibold">{total >= 2000 ? 'Free' : '$150'}</span>
                  </div>
                  {total < 2000 && (
                    <p className="text-[0.78rem] text-[#999] m-0">
                      Add ${(2000 - total).toLocaleString()} more for free delivery
                    </p>
                  )}
                </div>

                <div className="flex justify-between font-semibold text-[1.05rem] text-[#1A1A1A] dark:text-[#F0EDE8] pt-4 border-t border-[#EEEEEE] dark:border-[#2A2A2A] mb-6">
                  <span>Total</span>
                  <span className="text-[#B8860B]">
                    ${(total + (total >= 2000 ? 0 : 150)).toLocaleString()}
                  </span>
                </div>

                <Button size="lg" fullWidth onClick={() => { alert('Order placed! Thank you for shopping with DECORA.'); clearCart(); navigate('/'); }}>
                  Place Order
                </Button>
                <Button size="md" variant="outline" fullWidth className="mt-3" onClick={() => navigate('/services')}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

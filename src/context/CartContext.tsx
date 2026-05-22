import { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType>({
  items: [], addItem: () => {}, removeItem: () => {},
  updateQty: () => {}, clearCart: () => {}, total: 0, count: 0,
});

const DEFAULT_ITEMS: CartItem[] = [
  {
    id: 'p1',
    name: 'Modern Sofa',
    price: 1200,
    qty: 1,
    image: '/images/sofa.jpg',
    category: 'Sofa',
  },
  {
    id: 'p2',
    name: 'Dining Table',
    price: 850,
    qty: 1,
    image: '/images/table.jpg',
    category: 'Table',
  },
  {
    id: 'p3',
    name: 'Comfort Chair',
    price: 420,
    qty: 2,
    image: '/images/comfort chair.jpg',
    category: 'Chair',
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(DEFAULT_ITEMS);

  const addItem = (item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) { removeItem(id); return; }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

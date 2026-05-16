
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import Button from '../../components/ui/Button';
import PageHero from '../../components/ui/PageHero';

Chart.register(...registerables);

type ModalId = 'view' | 'insert' | 'update' | 'delete' | null;

interface StockItem {
  sku: string; name: string; category: string;
  qty: number; price: string; status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const STOCK: StockItem[] = [
  { sku: 'DEC-001', name: 'Modern Sofa — Charcoal Grey',   category: 'Sofa',    qty: 12, price: '$1,200', status: 'In Stock'     },
  { sku: 'DEC-002', name: 'Dining Table — Solid Oak',      category: 'Table',   qty: 7,  price: '$850',   status: 'In Stock'     },
  { sku: 'DEC-003', name: 'Comfort Chair — Beige',         category: 'Chair',   qty: 3,  price: '$420',   status: 'Low Stock'    },
  { sku: 'DEC-004', name: 'King Bed Frame — Walnut',       category: 'Bed',     qty: 0,  price: '$2,200', status: 'Out of Stock' },
  { sku: 'DEC-005', name: 'Coffee Table — Tempered Glass', category: 'Table',   qty: 15, price: '$300',   status: 'In Stock'     },
  { sku: 'DEC-006', name: 'Bookshelf — Pine Wood',         category: 'Storage', qty: 2,  price: '$380',   status: 'Low Stock'    },
  { sku: 'DEC-007', name: 'L-Shape Sofa — Cream',          category: 'Sofa',    qty: 5,  price: '$1,850', status: 'In Stock'     },
  { sku: 'DEC-008', name: 'Bar Stool — Metal Frame',       category: 'Chair',   qty: 0,  price: '$180',   status: 'Out of Stock' },
];

function Badge({ status }: { status: StockItem['status'] }) {
  const cls = status === 'In Stock' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    : status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  return <span className={`inline-block px-2.5 py-0.5 rounded-full text-[0.72rem] font-bold uppercase tracking-wide ${cls}`}>{status}</span>;
}

const inputCls = 'w-full px-[14px] py-[11px] font-["Inter"] text-[0.9rem] bg-white dark:bg-[#111] text-[#1A1A1A] dark:text-[#F0EDE8] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-[4px] focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.15)] box-border';
const labelCls = 'block text-[0.8rem] font-semibold text-[#4A4A4A] dark:text-[#CCBBAA] uppercase tracking-[0.5px] font-["Inter"] mb-1.5';

export default function Dashboard() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<ModalId>(null);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const barRef = useRef<HTMLCanvasElement>(null);
  const doughRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const barInst = useRef<Chart<any> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doughInst = useRef<Chart<any> | null>(null);

  const filtered = STOCK.filter(item => {
    const q = search.toLowerCase();
    return (!q || item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q) || item.category.toLowerCase().includes(q))
      && (!catFilter || item.category === catFilter)
      && (!statusFilter || item.status === statusFilter);
  });

  useEffect(() => {
    if (barRef.current) {
      barInst.current?.destroy();
      barInst.current = new Chart(barRef.current, {
        type: 'bar',
        data: { labels: ['Sofa','Table','Chair','Bed','Storage'], datasets: [{ label: 'Stock', data: [17,22,8,5,6], backgroundColor: ['#d4af37','#c9a227','#e0c15a','#b68d1e','#f0d878'], borderRadius: 8, borderSkipped: false }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { color: '#999' }, grid: { color: 'rgba(255,255,255,0.08)' } }, x: { ticks: { color: '#999' }, grid: { display: false } } } },
      });
    }
    if (doughRef.current) {
      doughInst.current?.destroy();
      doughInst.current = new Chart(doughRef.current, {
        type: 'doughnut',
        data: { labels: ['In Stock','Low Stock','Out of Stock'], datasets: [{ data: [35,8,5], backgroundColor: ['#22c55e','#facc15','#ef4444'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#999', padding: 20 } } } },
      });
    }
    return () => { barInst.current?.destroy(); doughInst.current?.destroy(); };
  }, []);

  const onInsert = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); alert('Product saved!'); (e.target as HTMLFormElement).reset(); setModal(null); };
  const onUpdate = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); alert('Record updated!'); (e.target as HTMLFormElement).reset(); setModal(null); };
  const onDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = (e.currentTarget.querySelector('#del-confirm') as HTMLInputElement).value;
    if (v !== 'DELETE') { alert('Type DELETE to confirm.'); return; }
    alert('Product removed.'); (e.target as HTMLFormElement).reset(); setModal(null);
  };

  const ModalWrap = ({ id, children }: { id: ModalId; children: React.ReactNode }) => (
    <div
      className={`fixed inset-0 z-[2000] items-center justify-center bg-black/55 ${modal === id ? 'flex' : 'hidden'}`}
      onClick={e => { if ((e.target as HTMLElement).classList.contains('fixed')) setModal(null); }}
    >
      <div className="relative w-full max-w-[500px] bg-white dark:bg-[#1E1E1E] rounded-lg p-9 shadow-[0_24px_60px_rgba(0,0,0,0.2)] max-h-[90vh] overflow-y-auto mx-4">
        <button className="absolute top-4 right-4 bg-transparent border-none text-[1.4rem] cursor-pointer text-[#999] hover:text-[#1A1A1A] dark:hover:text-[#F0EDE8] px-2 py-1 leading-none" onClick={() => setModal(null)}>✕</button>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <PageHero
        eyebrow="Admin Portal"
        title={<>Stock <span className="text-[#B8860B]">Management</span></>}
        subtitle="Monitor inventory levels, manage products, and track stock performance in real time."
      >
        <Button size="lg" onClick={() => setModal('insert')}>+ Add New Stock</Button>
        <Button size="lg" variant="outline" onClick={() => navigate('/services')}>View Collection</Button>
      </PageHero>

      {/* Stats bar */}
      <div className="bg-[#2C2C2C] dark:bg-[#0A0A0A] px-[5%] py-7">
        <div className="flex flex-wrap justify-center gap-12 max-w-[900px] mx-auto text-center max-[768px]:gap-7">
          {[{ v:'48',label:'Total Products'},{v:'35',label:'In Stock'},{v:'8',label:'Low Stock'},{v:'5',label:'Out of Stock'}].map(({v,label})=>(
            <div key={label}><h2 className="text-[#B8860B] m-0">{v}</h2><p className="text-[#ccc] m-0 text-[0.85rem]">{label}</p></div>
          ))}
        </div>
      </div>

      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">

        {/* Action cards */}
        <section className="mb-6">
          <h4>Inventory Control</h4>
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Stock Actions</h2>
          <p className="text-[#4A4A4A] dark:text-[#CCBBAA]">Use the cards below to manage your furniture inventory.</p>
        </section>

        <div className="grid gap-6 my-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {[
            { icon:'📊', title:'View All Stock',   desc:'Browse the complete inventory list.',          btn:'Open Inventory', id:'view'   as ModalId, v:'dark'    as const },
            { icon:'➕', title:'Insert New Stock',  desc:'Add a new furniture product to inventory.',   btn:'Add Product',    id:'insert' as ModalId, v:'dark'    as const },
            { icon:'✏️', title:'Update Stock',      desc:'Edit product details, price, or quantity.',   btn:'Edit Record',    id:'update' as ModalId, v:'outline' as const },
            { icon:'🗑', title:'Delete Stock',      desc:'Remove a product from inventory permanently.', btn:'Delete Record',  id:'delete' as ModalId, v:'danger'  as const },
          ].map(({ icon, title, desc, btn, id, v }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-3 p-7 rounded-lg cursor-pointer bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(184,134,11,0.15)] hover:border-[#B8860B]"
              onClick={() => setModal(id)}
            >
              <div className="text-[2.6rem] leading-none">{icon}</div>
              <h3 className="m-0 text-[1.05rem] text-[#1A1A1A] dark:text-[#F0EDE8]">{title}</h3>
              <p className="m-0 text-[0.85rem] text-[#999]">{desc}</p>
              <Button size="sm" variant={v} className="mt-1 w-full">{btn}</Button>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-8 my-8">
          <h4>Analytics</h4>
          <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Stock Overview</h2>
          <p className="text-[#4A4A4A] dark:text-[#CCBBAA] mb-6">Visual breakdown of inventory levels and category distribution.</p>
          <div className="grid gap-6 max-[900px]:grid-cols-1" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-4">Stock by Category</h3>
              <div className="relative w-full p-5 rounded-xl bg-[#111]" style={{ height: '280px' }}>
                <canvas ref={barRef} className="chart-canvas" />
              </div>
            </div>
            <div>
              <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-4">Status Distribution</h3>
              <div className="relative w-full p-5 rounded-xl bg-[#111]" style={{ height: '280px' }}>
                <canvas ref={doughRef} className="chart-canvas" />
              </div>
            </div>
          </div>
        </div>

        {/* Table header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
          <div>
            <h4>Database Records</h4>
            <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Current Inventory</h2>
          </div>
          <Button size="sm" onClick={() => setModal('insert')}>+ Add Product</Button>
        </div>

        {/* Search bar */}
        <div className="flex gap-3 mb-5 flex-wrap">
          <input type="text" placeholder="Search by name, SKU or category..." value={search} onChange={e => setSearch(e.target.value)} className={`${inputCls} flex-1 min-w-[200px]`} />
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className={`${inputCls} w-auto`} style={{ flex: '0 0 160px' }}>
            <option value="">All Categories</option>
            {['Sofa','Table','Chair','Bed','Storage'].map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={`${inputCls} w-auto`} style={{ flex: '0 0 160px' }}>
            <option value="">All Status</option>
            {['In Stock','Low Stock','Out of Stock'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto mt-5 rounded-lg">
          <table className="w-full border-collapse rounded-lg overflow-hidden bg-[#FAFAFA] dark:bg-[#1E1E1E] text-[0.9rem]" style={{ minWidth: '780px' }}>
            <thead className="bg-[#2C2C2C] dark:bg-[#0A0A0A]">
              <tr>
                {['SKU','Product Name','Category','Qty','Price','Status','Actions'].map(h => (
                  <th key={h} className="px-[18px] py-[14px] text-left font-['Inter'] font-semibold text-[0.78rem] text-white uppercase tracking-[1px] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-10 text-[#999] italic">No products match your search.</td></tr>
              ) : filtered.map(item => (
                <tr key={item.sku}>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] dark:text-[#CCBBAA] border-b border-[#EEEEEE] dark:border-[#2A2A2A] align-middle">{item.sku}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] dark:text-[#CCBBAA] border-b border-[#EEEEEE] dark:border-[#2A2A2A] align-middle break-words max-w-[280px]">{item.name}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] dark:text-[#CCBBAA] border-b border-[#EEEEEE] dark:border-[#2A2A2A] align-middle">{item.category}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] dark:text-[#CCBBAA] border-b border-[#EEEEEE] dark:border-[#2A2A2A] align-middle">{item.qty}</td>
                  <td className="px-[18px] py-[13px] border-b border-[#EEEEEE] dark:border-[#2A2A2A] align-middle text-[#B8860B] font-semibold">{item.price}</td>
                  <td className="px-[18px] py-[13px] border-b border-[#EEEEEE] dark:border-[#2A2A2A] align-middle"><Badge status={item.status} /></td>
                  <td className="px-[18px] py-[13px] border-b border-[#EEEEEE] dark:border-[#2A2A2A] align-middle">
                    <Button size="xs" onClick={() => setModal('update')}>Edit</Button>{' '}
                    <Button size="xs" variant="danger" onClick={() => setModal('delete')}>Del</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Two-col: activity + quick links */}
        <div className="grid gap-6 my-8 max-[900px]:grid-cols-1" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <h4>Live Feed</h4>
            <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Recent Activity</h2>
            <div className="flex flex-col gap-3 mt-4">
              {[
                { dot:'bg-[#28a745]', text:<>New stock added: <strong>L-Shape Sofa — Cream</strong> (x5)</>,                time:'2 min ago'  },
                { dot:'bg-[#B8860B]', text:<>Price updated: <strong>Dining Table — Solid Oak</strong> to $850</>,          time:'18 min ago' },
                { dot:'bg-[#dc3545]', text:<>Stock deleted: <strong>Vintage Armchair — Brown</strong></>,                  time:'1 hr ago'   },
                { dot:'bg-[#17a2b8]', text:<>Low stock alert: <strong>Comfort Chair — Beige</strong> (3 left)</>,          time:'3 hr ago'   },
                { dot:'bg-[#28a745]', text:<>Restock completed: <strong>Coffee Table — Glass</strong> (x15)</>,            time:'Yesterday'  },
              ].map(({ dot, text, time }, i) => (
                <div key={i} className="flex items-center gap-3.5 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg px-[18px] py-[14px]">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${dot}`} />
                  <p className="m-0 text-[0.88rem] flex-1 text-[#4A4A4A] dark:text-[#CCBBAA]">{text}</p>
                  <span className="ml-auto text-[0.78rem] text-[#999] whitespace-nowrap">{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4>Shortcuts</h4>
            <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8]">Quick Links</h2>
            <div className="flex flex-wrap gap-3 my-6">
              <Button size="sm" onClick={() => setModal('insert')}>+ Add Product</Button>
              <Button size="sm" variant="outline" onClick={() => setModal('view')}>📊 View All</Button>
              <Button size="sm" variant="outline" onClick={() => setModal('update')}>✏️ Edit Stock</Button>
              <Button size="sm" variant="outline" onClick={() => navigate('/services')}>🛒 Collection</Button>
              <Button size="sm" variant="outline" onClick={() => navigate('/profile')}>👤 Profile</Button>
              <Button size="sm" variant="outline" onClick={() => navigate('/')}>🏠 Home</Button>
              <Button size="sm" variant="outline" onClick={() => navigate('/reviews')}>⭐ Reviews</Button>
              <Button size="sm" variant="outline" onClick={() => navigate('/login')}>🔒 Log Out</Button>
            </div>

            <div className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-6 mt-4 border-l-4 border-l-[#B8860B]">
              <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-2">⚠ Low Stock Alert</h3>
              <p className="text-[#4A4A4A] dark:text-[#CCBBAA] mb-3">2 products are running low. Restock soon.</p>
              <Button size="sm" variant="outline" onClick={() => { setStatusFilter('Low Stock'); setSearch(''); setCatFilter(''); }}>View Low Stock</Button>
            </div>

            <div className="bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#EEEEEE] dark:border-[#2A2A2A] rounded-lg p-6 mt-4 border-l-4 border-l-[#dc3545]">
              <h3 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-2">🚫 Out of Stock</h3>
              <p className="text-[#4A4A4A] dark:text-[#CCBBAA] mb-3">2 products are currently unavailable.</p>
              <Button size="sm" variant="danger" onClick={() => { setStatusFilter('Out of Stock'); setSearch(''); setCatFilter(''); }}>View Out of Stock</Button>
            </div>
          </div>
        </div>
      </main>

      {/* CTA */}
      <div className="px-[5%] py-[72px] text-center bg-gradient-to-r from-[#8B6508] to-[#B8860B] max-[768px]:px-5 max-[768px]:py-12">
        <h2 className="text-white mb-2.5">Ready to Grow Your Inventory?</h2>
        <p className="text-white/90 max-w-[500px] mx-auto mb-7">Add new products, update prices, and keep your stock database up to date.</p>
        <Button variant="white" size="lg" onClick={() => setModal('insert')}>+ Insert New Stock</Button>
      </div>

      {/* ── MODALS ── */}

      {/* VIEW */}
      <ModalWrap id="view">
        <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-1">📊 All Stock</h2>
        <p className="text-[#4A4A4A] dark:text-[#CCBBAA] mb-5">Full inventory list.</p>
        <div className="w-full overflow-x-auto rounded-lg">
          <table className="w-full border-collapse bg-[#FAFAFA] dark:bg-[#111] text-[0.85rem]" style={{ minWidth: '400px' }}>
            <thead className="bg-[#2C2C2C]">
              <tr>{['SKU','Product','Qty','Status'].map(h=><th key={h} className="px-4 py-3 text-left text-white text-[0.75rem] uppercase tracking-[1px] font-['Inter']">{h}</th>)}</tr>
            </thead>
            <tbody>
              {STOCK.map(item=>(
                <tr key={item.sku}>
                  <td className="px-4 py-3 text-[#4A4A4A] dark:text-[#CCBBAA] border-b border-[#EEEEEE] dark:border-[#2A2A2A]">{item.sku}</td>
                  <td className="px-4 py-3 text-[#4A4A4A] dark:text-[#CCBBAA] border-b border-[#EEEEEE] dark:border-[#2A2A2A]">{item.name.split(' — ')[0]}</td>
                  <td className="px-4 py-3 text-[#4A4A4A] dark:text-[#CCBBAA] border-b border-[#EEEEEE] dark:border-[#2A2A2A]">{item.qty}</td>
                  <td className="px-4 py-3 border-b border-[#EEEEEE] dark:border-[#2A2A2A]"><Badge status={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-3 mt-5 flex-wrap">
          <Button size="sm" onClick={() => { setModal(null); setTimeout(() => setModal('insert'), 100); }}>+ Add Product</Button>
          <Button size="sm" variant="outline" onClick={() => setModal(null)}>Close</Button>
        </div>
      </ModalWrap>

      {/* INSERT */}
      <ModalWrap id="insert">
        <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-1">+ Insert New Stock</h2>
        <p className="text-[#4A4A4A] dark:text-[#CCBBAA] mb-5">Fill in the details to add a new product.</p>
        <form onSubmit={onInsert} className="flex flex-col gap-4">
          <div><label className={labelCls} htmlFor="ins-sku">SKU / Product Code</label><input type="text" id="ins-sku" placeholder="e.g. DEC-009" required className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="ins-name">Product Name</label><input type="text" id="ins-name" placeholder="e.g. Velvet Armchair — Navy" required className={inputCls} /></div>
          <div>
            <label className={labelCls} htmlFor="ins-cat">Category</label>
            <select id="ins-cat" required defaultValue="" className={inputCls}>
              <option value="" disabled>Select category...</option>
              {['Sofa','Table','Chair','Bed','Storage','Other'].map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div><label className={labelCls} htmlFor="ins-qty">Quantity</label><input type="number" id="ins-qty" placeholder="e.g. 10" min="0" required className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="ins-price">Price (USD)</label><input type="number" id="ins-price" placeholder="e.g. 599" min="0" step="0.01" required className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="ins-desc">Description (optional)</label><textarea id="ins-desc" placeholder="Brief description..." className={`${inputCls} resize-y min-h-[80px]`} /></div>
          <Button type="submit" size="lg" fullWidth className="mt-2">Save to Inventory</Button>
        </form>
      </ModalWrap>

      {/* UPDATE */}
      <ModalWrap id="update">
        <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-1">✏️ Update Stock</h2>
        <p className="text-[#4A4A4A] dark:text-[#CCBBAA] mb-5">Search by SKU and update product details.</p>
        <form onSubmit={onUpdate} className="flex flex-col gap-4">
          <div><label className={labelCls} htmlFor="upd-sku">SKU / Product Code</label><input type="text" id="upd-sku" placeholder="e.g. DEC-003" required className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="upd-name">Product Name</label><input type="text" id="upd-name" placeholder="Updated name..." className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="upd-qty">New Quantity</label><input type="number" id="upd-qty" placeholder="Updated quantity..." min="0" className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="upd-price">New Price (USD)</label><input type="number" id="upd-price" placeholder="Updated price..." min="0" step="0.01" className={inputCls} /></div>
          <div className="flex gap-3 flex-wrap mt-2">
            <Button type="submit" size="md">Save Changes</Button>
            <Button type="button" size="md" variant="outline" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </form>
      </ModalWrap>

      {/* DELETE */}
      <ModalWrap id="delete">
        <h2 className="text-[#1A1A1A] dark:text-[#F0EDE8] mb-1">🗑 Delete Stock</h2>
        <p className="text-[#4A4A4A] dark:text-[#CCBBAA] mb-5">Enter the SKU to permanently remove. This cannot be undone.</p>
        <form onSubmit={onDelete} className="flex flex-col gap-4">
          <div><label className={labelCls} htmlFor="del-sku">SKU / Product Code</label><input type="text" id="del-sku" placeholder="e.g. DEC-004" required className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="del-confirm">Type DELETE to confirm</label><input type="text" id="del-confirm" placeholder="DELETE" required className={inputCls} /></div>
          <div className="flex gap-3 flex-wrap mt-2">
            <Button type="submit" size="md" variant="danger">Confirm Delete</Button>
            <Button type="button" size="md" variant="outline" onClick={() => setModal(null)}>Cancel</Button>
          </div>
        </form>
      </ModalWrap>
    </>
  );
}

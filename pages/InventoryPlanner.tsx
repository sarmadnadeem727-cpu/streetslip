
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, AlertCircle, RefreshCcw, Search, BarChart3, Filter } from 'lucide-react';
import { ALL_PRODUCTS } from '../constants';

const InventoryPlanner: React.FC = () => {
  // Simulate inventory data for sizes 7-10
  const [stock, setStock] = useState(
    ALL_PRODUCTS.flatMap(p => 
      p.sizes.map(size => ({
        id: `${p.id}-${size}`,
        product: p.name,
        size: size,
        quantity: Math.floor(Math.random() * 20),
        status: 'In Stock'
      }))
    )
  );

  const [searchTerm, setSearchTerm] = useState('');

  const handleRestock = (id: string) => {
    setStock(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 10 } : item
    ));
  };

  const filteredStock = stock.filter(item => 
    item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 pb-32 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16">
        <div>
          <span className="text-[#00ff88] font-black text-xs tracking-[0.5em] uppercase mb-4 block">Staff Dashboard</span>
          <h1 className="text-6xl md:text-9xl font-extrabold italic uppercase tracking-tight leading-none">STOCK<br/><span className="neon-text-gradient">PLANNER.</span></h1>
        </div>
        <div className="flex gap-4">
           <div className="glass p-8 rounded-[2.5rem] border-[#00ff88]/20 flex items-center gap-6">
              <Package className="h-10 w-10 text-[#00ff88]" />
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Units</p>
                 <p className="text-3xl font-extrabold">{stock.reduce((acc, i) => acc + i.quantity, 0)}</p>
              </div>
           </div>
           <div className="glass p-8 rounded-[2.5rem] border-[#ff0080]/20 flex items-center gap-6">
              <AlertCircle className="h-10 w-10 text-[#ff0080]" />
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Low Stock</p>
                 <p className="text-3xl font-extrabold">{stock.filter(i => i.quantity < 5).length}</p>
              </div>
           </div>
        </div>
      </div>

      <div className="glass p-10 rounded-[4rem] border-white/5 space-y-10 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
           <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-8 py-5 text-white focus:border-[#00ff88] outline-none font-bold"
              />
           </div>
           <div className="flex gap-4">
              <button className="px-8 py-4 glass rounded-2xl flex items-center gap-3 text-sm font-black uppercase tracking-widest italic hover:bg-white/10 transition-all"><Filter className="h-4 w-4" /> Filter</button>
              <button className="px-8 py-4 glass rounded-2xl flex items-center gap-3 text-sm font-black uppercase tracking-widest italic hover:bg-white/10 transition-all"><BarChart3 className="h-4 w-4" /> Report</button>
           </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Product</th>
                <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Size (EU)</th>
                <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">In Stock</th>
                <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Condition</th>
                <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-bold italic">
              {filteredStock.map((item, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.id} 
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-6 px-4 uppercase text-lg">{item.product}</td>
                  <td className="py-6 px-4 text-gray-400">{item.size}</td>
                  <td className={`py-6 px-4 text-center text-2xl ${item.quantity < 5 ? 'text-[#ff0080]' : 'text-[#00ff88]'}`}>
                    {item.quantity}
                  </td>
                  <td className="py-6 px-4">
                    {item.quantity < 5 ? (
                      <span className="flex items-center gap-2 text-[#ff0080] text-[10px] uppercase tracking-widest"><AlertCircle className="h-3 w-3" /> Critical</span>
                    ) : (
                      <span className="flex items-center gap-2 text-[#00ff88] text-[10px] uppercase tracking-widest"><TrendingUp className="h-3 w-3" /> Stable</span>
                    )}
                  </td>
                  <td className="py-6 px-4 text-right">
                    <button 
                      onClick={() => handleRestock(item.id)}
                      className="p-3 glass rounded-xl hover:text-[#00ff88] hover:border-[#00ff88]/50 transition-all transform active:scale-90"
                      title="Quick Restock +10"
                    >
                      <RefreshCcw className="h-5 w-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryPlanner;

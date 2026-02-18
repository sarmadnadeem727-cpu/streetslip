
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Truck, Banknote, Mail } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="pt-40 pb-32 px-4 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 md:p-20 rounded-[4rem] border-white/5"
      >
        <div className="flex items-center gap-4 text-[#00d4ff] mb-10">
          <FileText className="h-10 w-10" />
          <h1 className="text-5xl font-black tracking-tight uppercase italic bebas">Terms of Service</h1>
        </div>
        
        <div className="space-y-12 text-gray-400 font-medium leading-relaxed">
          <section>
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3 bebas">
              <Banknote className="h-6 w-6 text-[#00ff88]" /> Payment & COD
            </h2>
            <p className="mb-4 text-lg">
              We operate exclusively on Cash on Delivery (COD). By placing an order, you agree to pay the courier upon delivery. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3 bebas">
              <Truck className="h-6 w-6 text-[#00d4ff]" /> Shipping & Delivery
            </h2>
            <p className="text-lg">
              Standard delivery takes 6-7 business days across major cities in Pakistan. While we aim for speed, urban traffic and logistical hurdles might occasionally add 1-2 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest bebas">Returns & Exchanges</h2>
            <p className="text-lg">
              Items can be exchanged within 7 days if they are unworn and in original packaging. Because these are slippers, hygiene is priority. Used items cannot be returned.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest bebas">Support</h2>
            <p className="text-lg mb-6">For any queries regarding your order, reach out to us:</p>
            <a href="mailto:streetslipp@gmail.com" className="inline-flex items-center gap-3 text-[#00ff88] font-bold text-lg hover:text-[#00d4ff] transition-colors bebas tracking-widest">
              <Mail className="h-5 w-5" /> streetslipp@gmail.com
            </a>
          </section>

          <div className="pt-10 border-t border-white/5 text-sm font-bold uppercase tracking-[0.3em] text-gray-500">
            STREETSLIPP • EST 2024 • THE ONLY VIBE THAT MATTERS.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;

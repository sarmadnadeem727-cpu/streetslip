import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-40 pb-32 px-4 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 md:p-20 rounded-[4rem] border-white/5"
      >
        <div className="flex items-center gap-4 text-[#00ff88] mb-10">
          <ShieldCheck className="h-10 w-10" />
          <h1 className="text-5xl font-black tracking-tight uppercase italic bebas">Privacy Policy</h1>
        </div>
        
        <div className="space-y-12 text-gray-400 font-medium leading-relaxed">
          <section>
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3 bebas">
              <Eye className="h-6 w-6 text-[#00d4ff]" /> Data Collection
            </h2>
            <p className="mb-4 text-lg">
              At StreetSlipp, we keep it real. We only collect the info we need to get your drip to your door. This includes your name, phone number, and shipping address.
            </p>
            <p className="text-lg">
              When you check out using our Cash on Delivery system, your data is handled locally in Pakistan to ensure the fastest delivery through our logistics partners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3 bebas">
              <Lock className="h-6 w-6 text-[#ff0080]" /> Data Protection
            </h2>
            <p className="text-lg">
              Your data isn't for sale. Period. We use it solely for order fulfillment and occasional "Fam Only" drops if you've signed up for our newsletter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest bebas">Contact Us</h2>
            <p className="text-lg mb-6">
              You can request to see or delete your info at any time. Just hit us up on WhatsApp or email the squad directly.
            </p>
            <a href="mailto:streetslipp@gmail.com" className="inline-flex items-center gap-3 text-[#00ff88] font-bold text-lg hover:text-[#00d4ff] transition-colors bebas tracking-widest">
              <Mail className="h-5 w-5" /> streetslipp@gmail.com
            </a>
          </section>

          <div className="pt-10 border-t border-white/5 text-sm font-bold uppercase tracking-[0.3em] text-gray-500">
            Last Updated: January 2026 • STREETSLIPP HQ
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
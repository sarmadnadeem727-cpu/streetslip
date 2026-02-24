
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Zap, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-32 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-32"
      >
        <span className="text-[#00ff88] font-black text-xs tracking-[0.5em] uppercase mb-8 block">The Brand Story</span>
        <h1 className="text-7xl md:text-[12rem] font-black tracking-widest mb-12 uppercase italic">NOT JUST<br /><span className="neon-text-gradient">SLIPPERS.</span></h1>
        <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium italic">
          Born in the streets, engineered for the clouds. StreetSlipp is a movement for those who value trust over transactions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-32 mb-48 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-6 rounded-[4rem] relative overflow-hidden group shadow-2xl"
        >
          <img src="/images/fleet-red.jpg" className="w-full h-full object-cover rounded-[3.5rem] grayscale group-hover:grayscale-0 transition-all duration-1000" alt="StreetSlipp Product" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00ff88]/20 to-transparent" />
        </motion.div>

        <div className="space-y-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-black tracking-widest uppercase italic"
          >
            Our Philosophy
          </motion.h2>
          <div className="space-y-12">
            {[
              { icon: ShieldCheck, title: "Trust First", color: "text-[#00ff88]", text: "We hate hidden fees and pre-payment traps. That's why we're COD only. Secure payment at your doorstep." },
              { icon: Zap, title: "Cloud Tech", color: "text-[#00d4ff]", text: "Every pair features our proprietary dual-density cloud foam. It's like walking on a vibe that never dies." },
              { icon: Heart, title: "Community Driven", color: "text-[#ff0080]", text: "We're built on your feedback. From the colors we drop to the speed we deliver, you run the show." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/5">
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-2 uppercase tracking-widest italic">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg font-medium">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center bg-[#00ff88]/10 p-24 md:p-32 rounded-[5rem] border border-[#00ff88]/20 relative overflow-hidden"
      >
        <div className="absolute -top-20 -left-20 text-[15rem] font-black text-[#00ff88]/5 rotate-12 select-none pointer-events-none">VIBE</div>
        <h2 className="text-6xl font-black mb-12 tracking-widest uppercase relative z-10 italic">Join the movement.</h2>
        <p className="text-2xl text-gray-300 mb-16 relative z-10 font-bold max-w-2xl mx-auto italic leading-relaxed">
          "We're not just selling slides. We're providing a trust-worthy portal to comfort."
        </p>
        <Link
          to="/collection"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-block px-16 py-8 bg-white text-black font-black text-2xl rounded-[2.5rem] hover:bg-[#00ff88] hover:scale-110 transition-all relative z-10 shadow-2xl"
        >
          Explore The Drops
        </Link>
      </motion.div>
    </div>
  );
};

export default About;

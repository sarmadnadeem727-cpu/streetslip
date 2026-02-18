import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, Link, useLocation } from 'react-router-dom';
import { CartContextType, CartItem } from '../types';
import { SOCIAL_LINKS } from '../constants';
import { ShieldCheck, Truck, Banknote, Search, MessageSquare, Sparkles, CheckCircle2, Copy, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as emailjs from '@emailjs/browser';
import { PostExService } from '../services/PostExService';
import { BoxTruckLoader, ThermalPrinterReceipt } from '../components/PostExAnimations';
import ErrorBoundary from '../components/ErrorBoundary';


const PAKISTAN_CITIES = [
  "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Sukkur", "Kasur", "Sheikhupura", "Peshawar", "Quetta", "Hyderabad",
  "Sahiwal", "Multan", "Sargodha", "Sialkot", "Gujranwala", "Jhelum", "Mirpur (AJK)", "Abbottabad", "Bahawalpur", "Faisalabad",
  "Dera Ismail Khan", "Gwadar", "Turbat", "Dera Ghazi Khan", "Hafizabad", "Mandi Bahauddin", "Phool Nagar", "Rahim Yar Khan", "Okara", "Sadiqabad",
  "Mianwali", "Layyah", "Depalpur", "Toba Tek Singh", "Vehari", "Lala Musa", "Kohat", "Bagh (AJK)", "Gujrat", "Kot Addu",
  "Hassan Abdal", "Attock", "Wah Cantt", "Gilgit", "Jaranwala", "Bahawalnagar", "Fort Abbas", "Mian Channu", "Gojra", "Gujar Khan",
  "Bhai Pheru", "Jhang", "Mirpur Khas", "Muridke", "Muzaffargarh", "Tank", "Khanewal", "Shakargarh", "Pind Dadan Khan", "Narowal",
  "Murree", "Pakpattan", "Bhakkar", "Rawalakot (AJK)", "Burewala", "Kamoke", "Hattar", "Khanpur", "Chichawatni", "Haripur",
  "Nawabshah", "Swabi", "Chakwal", "Muzaffarabad (AJK)", "Deharki", "Mardan", "Tandliawala", "Nowshera", "Haroonabad", "Jacobabad",
  "Shikarpur", "Larkana", "Kamalia", "Kharian", "Ghotki", "Thatta", "Bannu", "Nankana Sahib", "Khushab", "Kotli (AJK)",
  "Other"
];

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart, showToast } = useOutletContext<CartContextType>();
  const navigate = useNavigate();
  const location = useLocation();

  const buyNowItem = location.state?.buyNowItem as CartItem | undefined;
  const activeItems = buyNowItem ? [buyNowItem] : cart;
  const activeTotal = buyNowItem ? buyNowItem.price * buyNowItem.quantity : cartTotal;

  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [lastOrder, setLastOrder] = useState<{ items: CartItem[], total: number } | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: 'Lahore',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const filteredCities = PAKISTAN_CITIES.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem('streetslipp_shipping_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
        setSearchTerm(parsed.city || 'Lahore');
      }
    } catch (e) { }
  }, []);

  const shippingFee = 0;
  const finalTotal = activeTotal + shippingFee;

  if (activeItems.length === 0 && !isOrdered) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCitySelect = (city: string) => {
    setFormData(prev => ({ ...prev, city }));
    setSearchTerm(city);
    setShowCityDropdown(false);
  };

  const getOrderSummaryText = () => {
    return activeItems.map(item => `- ${item.name} (EU ${item.selectedSize}, ${item.selectedColor.name}) x${item.quantity}`).join('\n');
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Capture snapshot of order details immediately
    const currentItems = [...activeItems];
    const currentTotal = finalTotal;

    const generatedId = `STSLIP-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    try {
      localStorage.setItem('streetslipp_shipping_info', JSON.stringify(formData));
    } catch (err) { }

    const orderSummary = getOrderSummaryText();
    // const adminPhone = "923248866737";  // Kept for reference or backup notifications

    // 1. PostEx Automated Order Booking (Try-Catch to not block order if API is down)
    let trackingNumber = "";
    try {
      trackingNumber = await PostExService.createOrder({
        orderRefNumber: generatedId,
        invoicePayment: finalTotal,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerPhone: formData.phone,
        deliveryAddress: `${formData.address}, ${formData.city}`,
        cityName: formData.city,
        items: activeItems.length
      });
    } catch (postExError) {
      console.error("PostEx Booking Failed:", postExError);
      // We continue to EmailJS so the order isn't lost
    }

    // 2. Email Notification (Success Backup) Always runs
    try {
      await emailjs.send(
        'service_vr9e2cn',
        'template_r2p0zqh',
        {
          order_id: generatedId,
          tracking_number: trackingNumber || "PENDING",
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_phone: formData.phone,
          customer_email: formData.email,
          shipping_address: `${formData.address}, ${formData.city}`,
          order_items: orderSummary,
          total_price: `Rs. ${finalTotal}`
        },
        'TK5obsmQa9hOp1oKt'
      );
    } catch (emailError) {
      console.error("EmailJS Failed:", emailError);
    }

    // Success sequence - Always show the receipt if we at least attempted
    setLastOrder({ items: currentItems, total: currentTotal });
    setIsOrdered(true);
    if (!buyNowItem) clearCart();

    if (trackingNumber) {
      setTrackingNumber(trackingNumber);
      showToast("ORDER SECURED & BOOKED");
    } else {
      showToast("ORDER PLACED (Tracking Pending)");
    }

    window.scrollTo(0, 0);
    setIsSubmitting(false);
  };

  const sendOrderToWhatsAppManual = () => {
    const MY_PHONE_NUMBER = "923248866737";
    const orderItems = getOrderSummaryText();

    const message = `🚀 *STREETSLIPP ORDER CONFIRMATION: ${orderId}* 🚀\n\n` +
      `*Customer:* ${formData.firstName} ${formData.lastName}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Address:* ${formData.address}, ${formData.city}\n\n` +
      `*Items:*\n${orderItems}\n\n` +
      `*Total:* Rs. ${finalTotal}\n` +
      `*Method:* Cash On Delivery`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${MY_PHONE_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isOrdered) {
    // Safety check to prevent crash if lastOrder is missing
    if (!lastOrder) {
      return <div className="min-h-screen pt-32 text-white text-center">LOADING RECEIPT...</div>;
    }

    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center bg-black">
        <ErrorBoundary>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full relative">

            {/* HIGH-CONTRAST DIGITAL RECEIPT - WHITE PAPER STYLE */}
            <ThermalPrinterReceipt>
              <div className="text-center mb-10 border-b-2 border-black pb-6">
                <h1 className="text-5xl font-black bebas uppercase tracking-tight mb-2">STREETSLIPP</h1>
                <p className="text-[10px] uppercase font-bold tracking-[0.4em] mb-4">THE ONLY VIBE THAT MATTERS</p>
                <div className="flex justify-between text-[11px] py-2 uppercase font-black">
                  <span>ORDER: {orderId}</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 text-[12px]">
                <div className="flex justify-between font-black border-b border-black pb-2">
                  <span>PRODUCT / SPEC</span>
                  <span>TOTAL</span>
                </div>
                {lastOrder?.items && lastOrder.items.length > 0 ? (
                  lastOrder.items.map(item => (
                    <div key={item.cartId} className="space-y-1">
                      <div className="flex justify-between font-bold">
                        <span className="uppercase">{item.name} x{item.quantity}</span>
                        <span>RS. {item.price * item.quantity}</span>
                      </div>
                      <div className="text-[10px] text-black/70 uppercase tech-mono">
                        SZ: {item.selectedSize || 'OS'} | CLR: {item.selectedColor?.name || 'STD'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 font-bold text-red-500">ITEMS DATA MISSING</div>
                )}
              </div>

              <div className="border-t-2 border-dashed border-black/30 pt-6 space-y-2 mb-10">
                <div className="flex justify-between text-[13px] tech-mono">
                  <span>SUBTOTAL</span>
                  <span>RS. {lastOrder?.total || 0}</span>
                </div>
                <div className="flex justify-between text-[13px] tech-mono">
                  <span>LOGISTICS (POSTEX)</span>
                  <span className="font-black">FREE</span>
                </div>
                <div className="flex justify-between text-3xl font-black bebas pt-4 border-t border-black/20">
                  <span>GRAND TOTAL</span>
                  <span className="tech-mono">RS. {lastOrder?.total || 0}</span>
                </div>
              </div>

              <div className="text-center space-y-4 text-[11px]">
                <div className="p-3 bg-black text-white rounded uppercase font-black tracking-widest text-center">CASH ON DELIVERY</div>
                <p className="italic font-bold uppercase tracking-tight">Secured. We're prepping your drip.</p>

                <div className="flex flex-col gap-3">
                  <Link to={`/track-order${trackingNumber ? `?tracking=${trackingNumber}` : ''}`} className="block w-full py-2 border-2 border-black text-black font-black uppercase hover:bg-black hover:text-white transition-colors">
                    TRACK LIVE STATUS
                  </Link>
                  {trackingNumber && (
                    <a
                      href={`https://api.postex.pk/services/integration/api/order/v1/get-invoice?trackingNumbers=${trackingNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2 bg-black text-white font-black uppercase hover:bg-[#00ff88] hover:text-black transition-colors"
                    >
                      PRINT AIRWAY BILL
                    </a>
                  )}
                </div>

                <div className="pt-6">
                  {trackingNumber ? (
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(SOCIAL_LINKS.instagram)}`}
                      className="w-24 h-24 mx-auto opacity-90 invert grayscale border-2 border-black p-1"
                      alt="Instagram QR"
                    />
                  ) : (
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(SOCIAL_LINKS.instagram)}`} className="w-20 h-20 mx-auto opacity-90 invert grayscale" alt="QR" />
                  )}
                  <p className="mt-3 tracking-widest font-black uppercase text-[10px]">SCAN TO FOLLOW</p>
                  <p className="text-[9px] font-bold text-gray-500 mt-1 uppercase">PostEX Verified Delivery</p>
                </div>
              </div>
            </ThermalPrinterReceipt>

            <div className="mt-12 flex flex-col gap-4">
              <button
                onClick={sendOrderToWhatsAppManual}
                className="w-full py-6 bg-[#25D366] text-white font-black text-xl rounded-full flex items-center justify-center gap-4 shadow-xl uppercase italic tracking-tight transition-transform hover:scale-105 active:scale-95 bebas"
              >
                <MessageSquare className="h-6 w-6" /> Manual WhatsApp Confirmation
              </button>
              <Link to="/" className="w-full py-6 glass text-white text-center font-black text-xl rounded-full hover:bg-white/10 transition-all uppercase tracking-widest italic bebas">Return to Vault</Link>
            </div>
          </motion.div>
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-40 pb-20 sm:pb-32 px-4 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 sm:mb-20">
        <h1 className="text-5xl sm:text-6xl lg:text-9xl font-extrabold italic uppercase tracking-wider leading-none mb-4 bebas">CHECKOUT</h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 px-6 py-2 bg-[#00ff88]/10 text-[#00ff88] rounded-full text-[10px] font-black uppercase tracking-[0.4em] w-fit italic">
            <ShieldCheck className="h-4 w-4" /> SECURE COD GATEWAY
          </div>
          <div className="flex items-center gap-3 px-6 py-2 bg-[#00d4ff]/10 text-[#00d4ff] rounded-full text-[10px] font-black uppercase tracking-[0.4em] w-fit italic">
            <Truck className="h-4 w-4" /> DELIVERED BY PostEX
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7">
          {/* Loader Overlay */}
          <AnimatePresence>
            {isSubmitting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
              >
                <BoxTruckLoader />
                <p className="text-white font-mono mt-8 text-sm">Securely connecting to PostEX Logistics Grid...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleOrder} className="space-y-12">
            <div className="glass p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] border-white/5 space-y-8 relative z-20">
              <h2 className="text-3xl font-extrabold uppercase italic tracking-wider bebas">1. Shipping Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="vibes@street.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 sm:px-10 py-4 sm:py-5 text-white focus:border-[#00ff88] outline-none text-base sm:text-lg font-bold tech-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">First Name</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Alex" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-[#00ff88] outline-none text-lg font-bold tech-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Last Name</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Vibe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-[#00ff88] outline-none text-lg font-bold tech-mono" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Mobile Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="03XXXXXXXXX" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 sm:px-10 py-5 text-white focus:border-[#00ff88] outline-none text-lg font-bold tech-mono" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Full Shipping Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="House #, Street, Block" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 sm:px-10 py-5 text-white focus:border-[#00ff88] outline-none text-lg font-bold tech-mono" />
                </div>

                <div className="relative space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">City</label>
                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <input type="text" value={searchTerm} onFocus={() => setShowCityDropdown(true)} onChange={(e) => { setSearchTerm(e.target.value); setShowCityDropdown(true); }} placeholder="Search City..." className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-8 py-5 text-white focus:border-[#00ff88] outline-none text-lg font-bold tech-mono" />
                  </div>
                  <AnimatePresence>
                    {showCityDropdown && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute z-50 left-0 right-0 mt-3 max-h-60 overflow-y-auto glass rounded-3xl border border-white/10 no-scrollbar flex flex-col bg-[#050505]">
                        {filteredCities.map(city => (
                          <button key={city} type="button" onClick={() => handleCitySelect(city)} className="w-full text-left px-10 py-4 hover:bg-[#00ff88] hover:text-black transition-all text-sm font-bold uppercase italic tracking-widest bebas">{city}</button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="glass p-8 sm:p-12 rounded-[2.5rem] border-[#00ff88]/20 bg-[#00ff88]/5">
              <div className="flex items-center gap-6 p-6 sm:p-10 bg-black/40 border-2 border-[#00ff88]/40 rounded-[2rem] sm:rounded-[3rem] shadow-lg">
                <div className="w-16 h-16 sm:w-20 bg-[#00ff88] text-black rounded-2xl flex items-center justify-center shrink-0"><Banknote className="h-8 w-8 sm:h-10" /></div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase italic tracking-widest leading-none mb-1 bebas">CASH ON DELIVERY</h3>
                  <p className="text-gray-500 text-xs sm:text-base font-medium">Safe and secure payment at your doorstep. Delivered by PostEX.</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-8 sm:py-10 bg-[#00ff88] text-black font-extrabold text-2xl sm:text-4xl rounded-[2rem] sm:rounded-[3rem] transition-all flex items-center justify-center gap-6 shadow-[0_30px_80px_rgba(0,255,136,0.3)] disabled:opacity-50 uppercase italic tracking-wider bebas"
            >
              {isSubmitting ? 'CONNECTING TO VAULT...' : `SECURE MY ORDER - RS. ${finalTotal}`}
            </motion.button>
          </form>
        </div>

        <div className="lg:col-span-5">
          <div className="glass p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[4rem] lg:sticky lg:top-32 border-white/10">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-extrabold italic tracking-wider uppercase bebas">ORDER SUMMARY</h2>
              <div className="px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase tracking-widest text-[#00ff88] italic">
                {activeItems.length} {activeItems.length === 1 ? 'Item' : 'Items'}
              </div>
            </div>

            <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto no-scrollbar">
              {activeItems.map(item => (
                <div key={item.cartId} className="flex gap-6 p-4 glass rounded-[2rem] bg-white/5 border-white/5 group hover:border-[#00ff88]/30 transition-all">
                  <img src={item.image} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <h4 className="font-extrabold text-lg text-white uppercase leading-none mb-1 italic bebas tracking-wider">{item.name}</h4>
                      <span className="text-gray-500 text-xs font-black italic tech-mono">x{item.quantity}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 tech-mono">EU {item.selectedSize} • {item.selectedColor.name}</p>
                    <p className="text-xl font-extrabold text-[#00ff88] tech-mono">Rs. {item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
              <div className="flex justify-between items-center text-gray-500 font-black uppercase text-[10px] tracking-[0.3em]"><span>Subtotal</span><span className="text-white text-base font-extrabold tech-mono">Rs. {activeTotal}</span></div>
              <div className="flex justify-between items-center text-gray-400 font-black uppercase text-[10px] tracking-[0.3em]">
                <span className="flex items-center gap-2">Logistics <Sparkles className="h-3 w-3 text-[#00ff88]" /></span>
                <span className="text-[#00ff88] text-base font-extrabold italic uppercase tracking-wider bebas">FREE LAUNCH</span>
              </div>
              <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-4">
                <span className="text-2xl font-extrabold uppercase italic tracking-wider bebas">GRAND TOTAL</span>
                <span className="text-4xl sm:text-6xl font-extrabold neon-text-gradient italic tracking-widest leading-none bebas tech-mono">Rs. {finalTotal}</span>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Checkout;
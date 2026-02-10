
import React, { useState } from 'react';
import { CustomizationState, BagType, BAG_CATEGORIES } from './types';
import { Bag3D } from './components/Bag3D';
import CustomizerUI from './components/CustomizerUI';
import { ShoppingBag, Star, Layout, Palette, ArrowRight, Menu, X, Instagram, Facebook, Twitter, Package, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_STATE: CustomizationState = {
  type: 'College Bag',
  frontColor: '#1a1a1a',
  backColor: '#1a1a1a',
  strapColor: '#444444',
  gripColor: '#1a1a1a',
  foamType: 'Medium',
  strapDesign: 'Solid',
  frontTexture: null,
  strapTexture: null
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'browse' | 'custom'>('home');
  const [bagState, setBagState] = useState<CustomizationState>(INITIAL_STATE);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectBagForCustomization = (type: BagType) => {
    setBagState({ ...INITIAL_STATE, type });
    setView('custom');
  };

  const renderHome = () => (
    <div className="min-h-screen bg-[#fcfcfc]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setView('home')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-serif text-2xl group-hover:rotate-6 transition-transform">L</div>
          <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">LUXEBAG</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          <button onClick={() => setView('browse')} className="hover:text-indigo-600 transition-colors">Collections</button>
          <button onClick={() => setView('custom')} className="hover:text-indigo-600 transition-colors">Design Lab</button>
          <button className="hover:text-indigo-600 transition-colors">Stories</button>
          <div className="h-4 w-px bg-slate-200"></div>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-black transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
            <ShoppingBag className="w-4 h-4" /> 0
          </button>
        </div>

        <button className="md:hidden p-2 text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <section className="relative h-screen flex flex-col md:flex-row items-center pt-20 overflow-hidden">
        <div className="flex-1 px-8 md:px-24 z-10 pt-10 md:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-lg">Version 2.0 Studio</span>
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 shadow-sm" />)}
                <div className="w-6 h-6 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-[8px] text-white font-bold">+12k</div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-[7rem] font-serif font-bold text-slate-900 leading-[0.9] mb-8 tracking-tighter">
              Bespoke <br />
              <span className="text-indigo-600 italic">Carry.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-lg mb-12 leading-relaxed font-light">
              Craft your perfect companion in our real-time 3D studio. From high-capacity <span className="font-semibold text-slate-900">College Bags</span> to elegant Evening Clutches.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => setView('browse')}
                className="group px-10 py-5 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:border-indigo-600 transition-all flex items-center justify-center gap-3 shadow-sm"
              >
                <Package className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                Select Silhouettes
              </button>
              <button 
                onClick={() => setView('custom')}
                className="px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-300"
              >
                <Zap className="w-5 h-5 text-yellow-400" />
                Customise Your Own <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 h-full w-full relative group">
          <div className="absolute inset-0 z-0">
             <Bag3D state={bagState} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000"></div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
            <div className="max-w-xl">
              <h2 className="text-5xl font-serif font-bold text-slate-900 mb-6">Designed by You, Handcrafted by Us.</h2>
              <p className="text-slate-500 text-lg">We use aerospace-grade hardware and sustainable leathers to bring your digital design to life.</p>
            </div>
            <button className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-4 transition-all pb-2 border-b-2 border-indigo-100">
              Explore Our Process <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Layout, title: "32+ Shapes", desc: "From business to college to casual events." },
              { icon: Palette, title: "Unlimited Color", desc: "Every part can be unique to your style." },
              { icon: Star, title: "Luxe Hardware", desc: "Precision-milled zippers and buckles." }
            ].map((feature, idx) => (
              <div key={idx} className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  <feature.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-24 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black font-serif text-3xl">L</div>
              <span className="font-serif text-3xl font-bold tracking-tight">LUXEBAG</span>
            </div>
            <p className="text-slate-400 text-lg mb-10 font-light">Redefining luxury through radical personalization. Based in Milan, delivered worldwide.</p>
            <div className="flex gap-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white hover:text-slate-900 transition-all">
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-white">Collections</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">College Series</li>
                <li className="hover:text-white cursor-pointer transition-colors">Business Elite</li>
                <li className="hover:text-white cursor-pointer transition-colors">Casual Weekenders</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-white">Service</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">Track Order</li>
                <li className="hover:text-white cursor-pointer transition-colors">Custom Gifting</li>
                <li className="hover:text-white cursor-pointer transition-colors">Care Guide</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] flex justify-between">
          <span>&copy; 2024 LUXEBAG Studio</span>
          <span>Designed with Precision</span>
        </div>
      </footer>
    </div>
  );

  const renderBrowse = () => (
    <div className="min-h-screen pt-32 pb-24 px-8 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl font-serif font-bold text-slate-900 mb-4 tracking-tight">Choose Your Silhouette</h2>
            <p className="text-slate-500 text-lg font-light">Our artisans have perfected 32 base structures for you to begin your journey.</p>
          </div>
          <button 
            onClick={() => setView('home')}
            className="px-6 py-3 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-slate-900 font-bold hover:border-indigo-600 transition-all shadow-sm"
          >
            <X className="w-4 h-4" /> Close Gallery
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {BAG_CATEGORIES.map((cat) => (
            <motion.div 
              key={cat}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all cursor-pointer"
              onClick={() => selectBagForCustomization(cat)}
            >
              <div className="h-64 bg-slate-50/50 flex items-center justify-center p-12 group-hover:bg-indigo-50/30 transition-colors">
                 <div className="relative">
                    <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ring-1 ring-slate-100">
                       <ShoppingBag className="w-12 h-12 text-indigo-600" />
                    </div>
                    {cat === 'College Bag' && (
                      <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[9px] font-bold px-3 py-1 rounded-full shadow-lg">NEW</div>
                    )}
                 </div>
              </div>
              <div className="p-8">
                <h3 className="font-bold text-slate-900 text-xl mb-2 group-hover:text-indigo-600 transition-colors">{cat}</h3>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-6">Fully Customisable Base</p>
                <div className="flex items-center justify-between">
                   <span className="text-sm font-bold text-slate-900">From $249</span>
                   <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCustomizer = () => (
    <div className="h-screen flex flex-col md:flex-row bg-[#f5f5f7] overflow-hidden">
      <div className="relative flex-1">
        <Bag3D state={bagState} />
        
        <div className="absolute top-8 left-8 z-10">
          <button 
            onClick={() => setView('browse')}
            className="bg-white/90 backdrop-blur-xl px-8 py-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 font-bold text-slate-900 hover:bg-white transition-all transform active:scale-95"
          >
            <X className="w-4 h-4" /> Exit Studio
          </button>
        </div>

        <div className="absolute bottom-10 left-10 z-10 flex gap-4">
           <div className="px-6 py-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-sm font-bold text-slate-900 uppercase tracking-tighter">Synchronized in 3D</span>
              </div>
           </div>
        </div>

        <div className="absolute top-1/2 right-8 -translate-y-1/2 z-10 flex flex-col gap-4">
           {[1,2,3,4].map(i => (
             <div key={i} className="w-12 h-12 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/50 flex items-center justify-center cursor-pointer hover:bg-indigo-600 hover:text-white transition-all">
                <Star className="w-5 h-5" />
             </div>
           ))}
        </div>
      </div>

      <CustomizerUI 
        state={bagState} 
        setState={setBagState} 
        onClose={() => setView('home')} 
      />
    </div>
  );

  return (
    <div className="font-sans antialiased text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {view === 'home' && renderHome()}
          {view === 'browse' && renderBrowse()}
          {view === 'custom' && renderCustomizer()}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-white pt-32 px-10"
          >
            <div className="flex flex-col gap-10 text-4xl font-serif font-bold">
              <button onClick={() => { setView('browse'); setMobileMenuOpen(false); }}>Collections</button>
              <button onClick={() => { setView('custom'); setMobileMenuOpen(false); }}>Design Studio</button>
              <button onClick={() => setMobileMenuOpen(false)}>Brand Story</button>
              <button className="bg-slate-900 text-white px-10 py-6 rounded-[2rem] flex items-center justify-center gap-4 mt-20 text-xl font-sans">
                <ShoppingBag /> Bag (0)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

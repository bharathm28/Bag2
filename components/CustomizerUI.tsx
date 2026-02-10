
import React from 'react';
import { CustomizationState, COLORS, BagType, BAG_CATEGORIES, PRESET_THEMES } from '../types';
import { Palette, Layers, ImageIcon, ShoppingBag, ChevronRight, Check, Sparkles } from 'lucide-react';

interface Props {
  state: CustomizationState;
  setState: React.Dispatch<React.SetStateAction<CustomizationState>>;
  onClose: () => void;
}

const CustomizerUI: React.FC<Props> = ({ state, setState, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'presets' | 'base' | 'parts' | 'custom'>('presets');

  const updateState = (key: keyof CustomizationState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const applyTheme = (theme: typeof PRESET_THEMES[0]) => {
    setState(prev => ({ ...prev, ...theme.state }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'frontTexture' | 'strapTexture') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateState(target, event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white shadow-2xl w-full md:w-[420px] border-l border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{state.type}</h2>
          <p className="text-sm text-slate-500">Real-time Customization</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white rounded-full transition-colors border border-slate-200"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="flex bg-slate-100/50 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('presets')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'presets' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
        >
          <Sparkles className="w-4 h-4" /> Themes
        </button>
        <button 
          onClick={() => setActiveTab('base')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'base' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
        >
          <Palette className="w-4 h-4" /> Colors
        </button>
        <button 
          onClick={() => setActiveTab('parts')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'parts' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
        >
          <Layers className="w-4 h-4" /> Specs
        </button>
        <button 
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'custom' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
        >
          <ImageIcon className="w-4 h-4" /> Prints
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {activeTab === 'presets' && (
          <section>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">Signature Themes</label>
            <div className="grid grid-cols-2 gap-4">
              {PRESET_THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => applyTheme(theme)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all hover:shadow-lg ${state.frontColor === theme.state.frontColor ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 bg-slate-50'}`}
                >
                  <div className="w-full h-12 rounded-lg mb-3 flex gap-1 overflow-hidden shadow-inner">
                    <div className="flex-1 h-full" style={{ backgroundColor: theme.state.frontColor }}></div>
                    <div className="flex-1 h-full" style={{ backgroundColor: theme.state.strapColor }}></div>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{theme.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">One-tap Style</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'base' && (
          <>
            <section>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">Body Color</label>
              <div className="grid grid-cols-5 gap-3">
                {COLORS.map(c => (
                  <button
                    key={c.value}
                    onClick={() => {
                      updateState('frontColor', c.value);
                      updateState('backColor', c.value);
                    }}
                    className={`w-full aspect-square rounded-full border-2 p-0.5 transition-all ${state.frontColor === c.value ? 'border-indigo-600 scale-110 shadow-lg' : 'border-transparent'}`}
                  >
                    <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: c.value }} />
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">Trim & Strap</label>
              <div className="grid grid-cols-5 gap-3">
                {COLORS.map(c => (
                  <button
                    key={c.value}
                    onClick={() => {
                      updateState('strapColor', c.value);
                      updateState('gripColor', c.value);
                    }}
                    className={`w-full aspect-square rounded-full border-2 p-0.5 transition-all ${state.strapColor === c.value ? 'border-indigo-600 scale-110 shadow-lg' : 'border-transparent'}`}
                  >
                    <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: c.value }} />
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'parts' && (
          <>
            <section>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">Foam Comfort Type</label>
              <div className="grid grid-cols-1 gap-2">
                {['Soft', 'Medium', 'Rigid'].map(type => (
                  <button
                    key={type}
                    onClick={() => updateState('foamType', type as any)}
                    className={`w-full py-4 px-5 text-left rounded-xl border-2 flex items-center justify-between transition-all ${state.foamType === type ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-100 text-slate-600 hover:border-indigo-200'}`}
                  >
                    <div>
                      <span className="font-bold block">{type}</span>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">
                        {type === 'Soft' && 'Maximum cushion for lighter loads'}
                        {type === 'Medium' && 'The perfect everyday balance'}
                        {type === 'Rigid' && 'Structured support for heavy items'}
                      </span>
                    </div>
                    {state.foamType === type && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">Strap Weave</label>
              <div className="grid grid-cols-1 gap-2">
                {['Solid', 'Patterned', 'Braided'].map(design => (
                  <button
                    key={design}
                    onClick={() => updateState('strapDesign', design as any)}
                    className={`w-full py-4 px-5 text-left rounded-xl border-2 flex items-center justify-between transition-all ${state.strapDesign === design ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-100 text-slate-600 hover:border-indigo-200'}`}
                  >
                    <span className="font-bold">{design}</span>
                    {state.strapDesign === design && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'custom' && (
          <section>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">Personalized Print</label>
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
              {state.frontTexture ? (
                <div className="relative group">
                  <img src={state.frontTexture} className="w-40 h-40 object-cover rounded-2xl shadow-2xl mb-6 ring-4 ring-white" alt="Custom Preview" />
                  <button 
                    onClick={() => updateState('frontTexture', null)}
                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <Check className="w-4 h-4 rotate-45" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6">
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                </div>
              )}
              <p className="text-sm font-medium text-slate-900 mb-1">Upload Your Logo or Photo</p>
              <p className="text-xs text-slate-500 mb-6 px-4">The image will be applied directly to the front panel in real-time.</p>
              <label className="cursor-pointer bg-slate-900 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-black transition-all">
                Select Artwork
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'frontTexture')} />
              </label>
            </div>
          </section>
        )}
      </div>

      <div className="p-8 bg-white border-t border-slate-100">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest block mb-1">Current Price</span>
            <span className="text-3xl font-bold text-slate-900 tracking-tight">$285<span className="text-lg text-slate-400">.00</span></span>
          </div>
          <div className="text-right">
             <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-md">Ships in 48h</span>
          </div>
        </div>
        <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]">
          <ShoppingBag className="w-5 h-5" />
          Review & Buy
        </button>
      </div>
    </div>
  );
};

export default CustomizerUI;

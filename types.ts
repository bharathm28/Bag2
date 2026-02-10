
export type BagType = 
  | 'Messenger Bag' | 'Clutch' | 'Satchel' | 'Briefcase' | 'Tote Bag' 
  | 'Fanny Pack' | 'Box Clutch' | 'Bucket Bag' | 'Canteen Bag' 
  | 'Crossbody Bag' | 'Flap Bag' | 'Envelope Bag' | 'Duffel Bag' 
  | 'Backpack Bag' | 'Half Moon Bag' | 'Wallet' | 'Coin Purse' 
  | 'Bindle' | 'Pouch' | 'Bowling Bag' | 'Hobo Bag' | 'Doctor Bag' 
  | 'Barrel Bag' | 'Micro Bag' | 'Camera Bag' | 'Phone Pouch' 
  | 'Saddle Bag' | 'Sling Bag' | 'Belt Bag' | 'Evening Bag' 
  | 'Frame Bag' | 'College Bag';

export interface CustomizationState {
  type: BagType;
  frontColor: string;
  backColor: string;
  strapColor: string;
  gripColor: string;
  foamType: 'Soft' | 'Medium' | 'Rigid';
  strapDesign: 'Solid' | 'Patterned' | 'Braided';
  frontTexture?: string | null;
  strapTexture?: string | null;
}

export const BAG_CATEGORIES: BagType[] = [
  'College Bag', 'Messenger Bag', 'Backpack Bag', 'Tote Bag', 'Duffel Bag', 
  'Satchel', 'Briefcase', 'Bucket Bag', 'Doctor Bag', 'Bowling Bag', 
  'Clutch', 'Box Clutch', 'Flap Bag', 'Envelope Bag', 'Evening Bag',
  'Fanny Pack', 'Sling Bag', 'Belt Bag', 'Crossbody Bag', 'Half Moon Bag',
  'Canteen Bag', 'Saddle Bag', 'Hobo Bag', 'Barrel Bag', 'Camera Bag',
  'Wallet', 'Coin Purse', 'Phone Pouch', 'Micro Bag', 'Bindle', 'Pouch', 'Frame Bag'
];

export const COLORS = [
  { name: 'Noir Black', value: '#1a1a1a' },
  { name: 'Pure White', value: '#ffffff' },
  { name: 'Deep Tan', value: '#8b4513' },
  { name: 'Royal Navy', value: '#002366' },
  { name: 'Bordeaux Red', value: '#800020' },
  { name: 'Forest Green', value: '#228b22' },
  { name: 'Dusty Rose', value: '#dca3a3' },
  { name: 'Mustard Gold', value: '#e1ad01' },
  { name: 'Slate Grey', value: '#708090' },
  { name: 'Camel', value: '#c19a6b' },
];

export const PRESET_THEMES = [
  {
    id: 'midnight',
    name: 'Midnight Pro',
    state: { frontColor: '#1a1a1a', strapColor: '#444444', gripColor: '#1a1a1a', strapDesign: 'Solid' }
  },
  {
    id: 'heritage',
    name: 'Classic Heritage',
    state: { frontColor: '#8b4513', strapColor: '#5c2e0a', gripColor: '#8b4513', strapDesign: 'Braided' }
  },
  {
    id: 'neon',
    name: 'Cyber Neon',
    state: { frontColor: '#000000', strapColor: '#39ff14', gripColor: '#39ff14', strapDesign: 'Patterned' }
  },
  {
    id: 'blossom',
    name: 'Pink Blossom',
    state: { frontColor: '#dca3a3', strapColor: '#ffffff', gripColor: '#dca3a3', strapDesign: 'Patterned' }
  }
];

export const categories = [
  { id: '1', name: 'Used Sheetfed Presses', icon: 'print', image: 'https://picsum.photos/seed/cat1/300/200' },
  { id: '2', name: 'Used Guillotines & Accessories', icon: 'cut', image: 'https://picsum.photos/seed/cat2/300/200' },
  { id: '3', name: 'Finishing Machines', icon: 'color-wand', image: 'https://picsum.photos/seed/cat3/300/200' },
  { id: '4', name: 'Pre-Press Machines', icon: 'color-palette', image: 'https://picsum.photos/seed/cat4/300/200' },
  { id: '5', name: 'Digital Press Machines', icon: 'hardware-chip', image: 'https://picsum.photos/seed/cat5/300/200' },
  { id: '6', name: 'Paper Cutting Machines', icon: 'document', image: 'https://picsum.photos/seed/cat6/300/200' },
  { id: '7', name: 'Folders & Accessories', icon: 'folder', image: 'https://picsum.photos/seed/cat7/300/200' },
  { id: '8', name: 'Stitching Machines', icon: 'albums', image: 'https://picsum.photos/seed/cat8/300/200' },
  { id: '9', name: 'Letterpress', icon: 'book', image: 'https://picsum.photos/seed/cat9/300/200' },
  { id: '10', name: 'Other Printing Equipment', icon: 'construct', image: 'https://picsum.photos/seed/cat10/300/200' },
];

export const manufacturers = [
  'Heidelberg', 'Komori', 'RMGT / Ryobi', 'KBA', 'MAN Roland', 
  'Polar', 'Mitsubishi', 'Shinohara', 'Sakurai', 'Adast', 
  'Bobst', 'Muller Martini', 'Wohlenberg'
];

export const searchByMachines = categories;
export const searchByColour = [
  { id: '1', name: '1 COLOUR', image: 'https://picsum.photos/seed/color1/150/80' },
  { id: '2', name: '2 COLOUR', image: 'https://picsum.photos/seed/color2/150/80' },
  { id: '3', name: '4 COLOUR', image: 'https://picsum.photos/seed/color4/150/80' },
  { id: '4', name: '5 COLOUR', image: 'https://picsum.photos/seed/color5/150/80' },
  { id: '5', name: '6 COLOUR', image: 'https://picsum.photos/seed/color6/150/80' },
  { id: '6', name: '8 COLOUR', image: 'https://picsum.photos/seed/color8/150/80' },
];

export const searchByFormat = [
  { id: '1', name: 'Sheetfed Offset', image: 'https://picsum.photos/seed/fmt1/150/80' },
  { id: '2', name: 'Web Offset', image: 'https://picsum.photos/seed/fmt2/150/80' },
  { id: '3', name: 'Flexo', image: 'https://picsum.photos/seed/fmt3/150/80' },
];

export const testimonials = [
  {
    id: '1', name: 'Vikas Ji Agarwal', company: 'Printolent', rating: 5, image: 'https://ui-avatars.com/api/?name=Vikas+Agarwal&background=random',
    text: 'I was a bit sceptical about purchasing a refurbished cutting machine, but when I saw the assortment of top-condition and premium-quality machines, I knew I was at the right place. The best part is that they are quite transparent about the whole process, whether it is the history and condition of the machine or pricing point.'
  },
  {
    id: '2', name: 'Sourbh Ji', company: 'ASV Papers', rating: 5, image: 'https://ui-avatars.com/api/?name=Sourbh+Ji&background=random',
    text: 'When I started my business four years ago, I was looking for a high-quality cutting machine that could fit into my budget and fulfil my business needs. This company provided me with an array of high-quality machines that exceeded my expectations and were priced at affordable rates.'
  },
];

export const partners = [
  { id: '1', image: 'https://ui-avatars.com/api/?name=KOMORI&background=0F172A&color=fff&size=120&font-size=0.25' },
  { id: '2', image: 'https://ui-avatars.com/api/?name=HEIDELBERG&background=0F172A&color=fff&size=120&font-size=0.25' },
  { id: '3', image: 'https://ui-avatars.com/api/?name=ADAST&background=0F172A&color=fff&size=120&font-size=0.25' },
  { id: '4', image: 'https://ui-avatars.com/api/?name=MAN+Roland&background=0F172A&color=fff&size=120&font-size=0.25' },
  { id: '5', image: 'https://ui-avatars.com/api/?name=POLAR&background=0F172A&color=fff&size=120&font-size=0.25' },
];

export const events = [
  { id: '1', title: 'PAMEX 2024', date: '6-9 Feb 2024', location: 'Mumbai, India', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=300&auto=format&fit=crop', desc: 'Join us at PAMEX 2024 to see our latest imported machines live in action.' },
  { id: '2', title: 'PrintPack India', date: '1-5 Feb 2025', location: 'Greater Noida', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=300&auto=format&fit=crop', desc: 'We are exhibiting at PrintPack India. Visit our stall for premium refurbished offset presses.' },
];

export const clients = [
  { id: '1', image: 'https://picsum.photos/seed/install1/300/200', title: 'Komori Lithrone 428 Installation in Delhi' },
  { id: '2', image: 'https://picsum.photos/seed/install2/300/200', title: 'Heidelberg SM 74 in Jaipur' },
  { id: '3', image: 'https://picsum.photos/seed/install3/300/200', title: 'Polar 115 Paper Cutter in Mumbai' },
  { id: '4', image: 'https://picsum.photos/seed/install4/300/200', title: 'Ryobi 524 GX in Gujarat' },
];

// Generate 30 detailed B2B machines
export const machines = Array.from({ length: 30 }).map((_, i) => {
  const brand = manufacturers[i % manufacturers.length];
  const colors = ['1', '2', '4', '5', '6', '8'];
  const color = colors[i % colors.length];
  const sheetSizes = ['52 x 74 cm', '72 x 102 cm', '37 x 52 cm', '102 x 142 cm'];
  const maxSheetSize = sheetSizes[i % sheetSizes.length];
  
  return {
    id: (i + 1).toString(),
    name: `${brand} Speedmaster ${2000 + i}`,
    brand: brand,
    categoryId: ((i % 10) + 1).toString(),
    categoryName: categories[i % 10].name,
    color: color,
    year: (2000 + (i % 20)).toString(),
    price: `Contact for Price`,
    availability: i % 3 === 0 ? 'In Stock (India)' : 'Available for Import',
    condition: 'Excellent / Refurbished',
    image: `https://picsum.photos/seed/machine${i}/600/400`,
    images: [
      `https://picsum.photos/seed/machine${i}/600/400`,
      `https://picsum.photos/seed/machine${i}_1/600/400`,
      `https://picsum.photos/seed/machine${i}_2/600/400`
    ],
    description: `High precision ${brand} printing machine with ${color} colors. Featuring advanced automation and reliability. Fully refurbished and tested by our expert engineers at Sneha Graphics & Solutions. Pan-India delivery and installation available.`,
    specs: { 
      power: `${100 + i * 5}kW`, 
      weight: `${5000 + i * 200}kg`, 
      speed: `${10000 + i * 500} sheets/hr`, 
      format: i % 2 === 0 ? 'Sheetfed Offset' : 'Web Offset',
      maxSheetSize: maxSheetSize,
    },
    features: [
      'Autoplate',
      'Alcolor dampening',
      'Preset feeder',
      'Powder spray'
    ],
    featured: i % 5 === 0,
  };
});

export const banners = [
  { id: '1', image: 'https://picsum.photos/seed/banner10/800/500', title: 'SNEHA GRAPHICS & SOLUTIONS', subtitle: 'PREMIUM PRINTING MACHINERY' },
  { id: '2', image: 'https://picsum.photos/seed/banner20/800/500', title: 'IMPORTED OFFSET PRESSES', subtitle: 'EXPERT ENGINEERING & PAN-INDIA SUPPORT' },
  { id: '3', image: 'https://picsum.photos/seed/banner30/800/500', title: 'END-TO-END INSTALLATION', subtitle: 'YOUR TRUSTED B2B PARTNER' },
];

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
  { id: '1', title: 'PAMEX 2026', date: '27 – 30 January 2026', location: 'Bombay Exhibition Centre, Mumbai, India', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=300&auto=format&fit=crop', desc: 'Join us at PAMEX 2026. Sneha Graphics & Solutions will be showcasing premium printing solutions and imported machines live in action.' },
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

export const services = [
  {
    "id": "89",
    "title": "Technical Service Manual For Komori Offset Printing Machine",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17331317431929.jpeg",
    "slug": "komori-offset-printing-machine-technical-service-manual",
    "desc": null
  },
  {
    "id": "96",
    "title": "Komori Technical Services",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17333904689233.png",
    "slug": "komori-technical-services",
    "desc": null
  },
  {
    "id": "94",
    "title": "Komori Lithrone 426, 5 Colors Installation Completed at Beawar Rajasthan",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17333889102556.jpeg",
    "slug": "komori-lithrone-426-5-colors-installation-completed-at-beawar-rajasthan",
    "desc": null
  },
  {
    "id": "126",
    "title": "Komori LITHRONE 628 +LX 1998 Model Loading",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17793574532708.jpeg",
    "slug": "komori-426-model-loading",
    "desc": null
  },
  {
    "id": "127",
    "title": "LITHRONE 628 +LX 1998",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17793575886382.jpeg",
    "slug": "lithrone-628-lx-1998",
    "desc": null
  },
  {
    "id": "125",
    "title": "Komori 426 2000 Model Loading",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17779092898882.jpeg",
    "slug": "43",
    "desc": null
  },
  {
    "id": "124",
    "title": "Heidelberg SBG Cylinder Loading",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17761060861093.jpeg",
    "slug": "heidelberg-sbg-cylinder-loading",
    "desc": null
  },
  {
    "id": "91",
    "title": "Machines Being Loaded In Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17331319909914.jpeg",
    "slug": "technical-service-machine-load",
    "desc": null
  },
  {
    "id": "119",
    "title": "Komori Machine Service",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17397900999782.jpeg",
    "slug": "komori-machine-service-5",
    "desc": null
  },
  {
    "id": "111",
    "title": "Komori Machine Service",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17380027017078.jpeg",
    "slug": "komori-machine-service-3",
    "desc": null
  },
  {
    "id": "115",
    "title": "Komori Machine Unloading",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17397058524530.jpeg",
    "slug": "komori-machine-service-6",
    "desc": null
  },
  {
    "id": "113",
    "title": "Komori Machine Service",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17397057807565.jpeg",
    "slug": "komori-machine-service-4",
    "desc": null
  },
  {
    "id": "121",
    "title": "Installation Done Komori Lithrone 426 2012  at Krishna Printer Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17423834811113.jpeg",
    "slug": "installation-done-komori-lithrone-426-2012-at-krishna-printer-jaipur",
    "desc": null
  },
  {
    "id": "122",
    "title": "Komori Machine Unloading Gaya Bihar",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17468129237369.jpeg",
    "slug": "komori-machine-unloading-gaya-bihar",
    "desc": null
  },
  {
    "id": "123",
    "title": "Komori Machine Unloading Gaya, Bihar",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17468129372544.jpeg",
    "slug": "komori-machine-unloading-gaya-bihar-1",
    "desc": null
  },
  {
    "id": "105",
    "title": "Komori Offset Machine",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17370268515739.jpeg",
    "slug": "komori-offset-machine",
    "desc": null
  },
  {
    "id": "116",
    "title": "Sheetfed Presses",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17397060911518.jpeg",
    "slug": "sheetfed-presses",
    "desc": null
  },
  {
    "id": "114",
    "title": "Komori Machine Loading",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17397058193156.jpeg",
    "slug": "komori-machine-service-5",
    "desc": null
  },
  {
    "id": "92",
    "title": "Komori Lithrone 426, 5 Colors Installation Completed at Chennai",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17333888351851.jpeg",
    "slug": "komori-lithrone-426-5-colors-installation-completed-at-chennai",
    "desc": null
  },
  {
    "id": "120",
    "title": "Komori Machine Service",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17397901654781.jpeg",
    "slug": "komori-machine-service-6",
    "desc": null
  },
  {
    "id": "117",
    "title": "Machine Service",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17397899373554.jpeg",
    "slug": "machine-service",
    "desc": null
  },
  {
    "id": "118",
    "title": "Heidelberg Machine Unloading",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17397900401432.jpeg",
    "slug": "heidelberg-machine-unloading",
    "desc": null
  },
  {
    "id": "110",
    "title": "Komori Machine Loading",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17380025173606.jpeg",
    "slug": "komori-machine-loading",
    "desc": null
  },
  {
    "id": "109",
    "title": "Komori Machine Service",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17370295371942.jpeg",
    "slug": "komori-machine-service-2",
    "desc": null
  },
  {
    "id": "112",
    "title": "Komori Lithrone 426 Machine Sevices",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17380027651093.jpeg",
    "slug": "komori-lithrone-426-machine-sevices",
    "desc": null
  },
  {
    "id": "108",
    "title": "Komori Machine Service",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17370294506962.jpeg",
    "slug": "komori-machine-service-1",
    "desc": null
  },
  {
    "id": "107",
    "title": "Komori Machine Service",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17370294385592.jpeg",
    "slug": "komori-machine-service",
    "desc": null
  },
  {
    "id": "59",
    "title": "Komori Lithrone 426 1993 Model Installation In Udaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023657782876.jpeg",
    "slug": "komori-lithrone-426-1993-model-at-udaipur",
    "desc": "<p>komori lithrone 426 1993 model &nbsp;at udaipur</p>"
  },
  {
    "id": "104",
    "title": "Komori Lithrone 426 Machine",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17370268136175.jpeg",
    "slug": "komori-lithrone-426-machine-1",
    "desc": null
  },
  {
    "id": "106",
    "title": "Komori Machine",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17370290263600.jpeg",
    "slug": "komori-machine",
    "desc": null
  },
  {
    "id": "102",
    "title": "Komori Lithrone Machine",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17370265276758.jpeg",
    "slug": "komori-lithrone-machine",
    "desc": null
  },
  {
    "id": "101",
    "title": "Komori Lithrone 426 Machine",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17370265064762.jpeg",
    "slug": "komori-lithrone-426-machine",
    "desc": null
  },
  {
    "id": "100",
    "title": "Komori Lithrone 4 Colors Installation Completed",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17359890796646.jpeg",
    "slug": "komori-lithrone-5-colors-installation-completed",
    "desc": null
  },
  {
    "id": "98",
    "title": "Polar Paper Cutting Machine",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17359889139026.jpeg",
    "slug": "polar-paper-cutting-machine",
    "desc": null
  },
  {
    "id": "99",
    "title": "Komori Technical Service Done",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17359889638769.jpeg",
    "slug": "komori-technical-services-done",
    "desc": null
  },
  {
    "id": "73",
    "title": "Komori Lithrone 240 Loading In Malviya Nagar Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023670274650.jpeg",
    "slug": "komori-lithrone-240-malviya-nagar-jaipur",
    "desc": null
  },
  {
    "id": "103",
    "title": "Komori Lithrone Machine's",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17370265713252.jpeg",
    "slug": "komori-lithrone-machines",
    "desc": null
  },
  {
    "id": "69",
    "title": "Komori Lithrone 426 2001 Model Successfully Installed at Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023666594513.jpeg",
    "slug": "komori-lithrone-426-2001-model-at-jaipur-2",
    "desc": null
  },
  {
    "id": "95",
    "title": "Komori Lithrone 426, 5 Color Installation Completed",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17333893488793.jpeg",
    "slug": "komori-lithrone-426-5-colors-installation-completed-technical-services",
    "desc": null
  },
  {
    "id": "51",
    "title": "Komori Lithrone 426 NL 2003 Model Installed in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023648787805.jpeg",
    "slug": "komori-lithrone-426-nl-2003-model",
    "desc": null
  },
  {
    "id": "90",
    "title": "Technical service komori offset machine",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17331318403231.jpeg",
    "slug": "technical-service-komori-offset-machine",
    "desc": null
  },
  {
    "id": "57",
    "title": "Komori Lithrone 526 2001 Model Successfully Installed at Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023655909972.jpeg",
    "slug": "komori-lithrone-526-2001-model-at-jaipur",
    "desc": null
  },
  {
    "id": "66",
    "title": "Komori 440 Machine Unloading in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023664472125.jpeg",
    "slug": "komori-440-machine-unloading",
    "desc": null
  },
  {
    "id": "53",
    "title": "Komori 540 5 Colour 1995 Model Installation Done in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023653498140.jpeg",
    "slug": "komori-540-5color1995-model-instolation-done-in-jaipur",
    "desc": null
  },
  {
    "id": "56",
    "title": "Komori Lithrone 1995 Model Installation Done In Jodhpur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023655303445.jpeg",
    "slug": "komori-lithrone-1995-model-instolation-done-in-jaipur",
    "desc": null
  },
  {
    "id": "58",
    "title": "Komori Lithrone 426 1994 Model Installation At Bharatpur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023656772861.jpeg",
    "slug": "komori-lithrone-426-1994-model-at-bharatpur",
    "desc": null
  },
  {
    "id": "5",
    "title": "Komori Lithrone 840+L 8 Colour With Coter 2003 Model, Installation In Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781831676171.jpeg",
    "slug": "komori-lithrone-840l-8-color-with-coter-2003-model-fully-loaded-printing-machine-installation-in-jaipur",
    "desc": null
  },
  {
    "id": "27",
    "title": "Heidelberg SORSZ  28x40 2 Colour Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781852077000.jpeg",
    "slug": "heidelberg-sorsz-28x40-2-color-fully-loaded-printing-machine-installation-in-jaipur",
    "desc": null
  },
  {
    "id": "64",
    "title": "Komori 526 1999 Model ,Fully Loaded Printing Machine Unloading in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023661503452.jpeg",
    "slug": "komori-526-1999-model-fully-loaded-printing-machine-unloading-in-jaipur",
    "desc": null
  },
  {
    "id": "4",
    "title": "Komori Lithrone 426 1999 Model , Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781817365601.jpeg",
    "slug": "komori-lithrone-4261999-model-fully-loaded-printing-machine-installation-in-jaipur",
    "desc": null
  },
  {
    "id": "7",
    "title": "Komori Lithrone 840+L 8 Colour with Coter 2005 Model , Fully Loaded Printing Machine Installation in Delhi",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781832978187.jpeg",
    "slug": "komori-lithrone-840l-8-color-with-coter-2005-model-fully-loaded-printing-machine-installation-in-delhi",
    "desc": null
  },
  {
    "id": "8",
    "title": "Komori 426 1992 Model , Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781833656503.jpeg",
    "slug": "komori-426-1992-model-fully-loaded-printing-machine-installation-in-jaipur",
    "desc": null
  },
  {
    "id": "16",
    "title": "Komori Lithrone 640+L 6 Colour with Coter  2003 Model , Fully Loaded Printing Machine Installation in Punjab",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781839842370.jpeg",
    "slug": "komori-lithrone-640l-6-color-with-coter-2003-model-fully-loaded-printing-machine-installation-in-punjab",
    "desc": null
  },
  {
    "id": "17",
    "title": "Komori 526 1998 Model , Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781840543144.jpeg",
    "slug": "komori-526-1998-model-fully-loaded-printing-machine-installation-in-jaipur",
    "desc": null
  },
  {
    "id": "18",
    "title": "Komori 426 1999 Model , Fully Loaded Printing Machine Installation in Ajmer",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781841817915.jpeg",
    "slug": "komori-426-1999-model-fully-loaded-printing-machine-installation-in-ajmer",
    "desc": null
  },
  {
    "id": "19",
    "title": "Komori Lithrone 540 8 Colour  1999 Model , Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781843118918.jpeg",
    "slug": "komori-lithrone-540-8-color-1999-model-fully-loaded-printing-machine-installation-in-jaipur",
    "desc": null
  },
  {
    "id": "20",
    "title": "Komori 440 2001 Model , Fully Loaded Printing Machine Installation in Udaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781843811162.jpeg",
    "slug": "komori-440-2001-model-fully-loaded-printing-machine-installation-in-udaipur",
    "desc": null
  },
  {
    "id": "21",
    "title": "Komori 526 1998 Model , Fully Loaded Printing Machine Installation in Lucknow",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781844675385.jpeg",
    "slug": "komori-526-1998-model-fully-loaded-printing-machine-installation-in-lucknow",
    "desc": null
  },
  {
    "id": "22",
    "title": "ADAST 715 Printing Machine Installation in Bikaner ",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781845889540.jpeg",
    "slug": "adast-715-printing-machine-installation-in-bikaner",
    "desc": null
  },
  {
    "id": "23",
    "title": "Komori 526 1999 Model , Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781846693631.jpeg",
    "slug": "komori-526-1999-model-fully-loaded-printing-machine-installation-in-jaipur-4",
    "desc": null
  },
  {
    "id": "24",
    "title": "Komori 440 1996 Model, Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781847937063.jpeg",
    "slug": "komori-440-1996-model-fully-loaded-printing-machine-installation-in-jaipur-1",
    "desc": null
  },
  {
    "id": "25",
    "title": "Komori 540 1993 Model, Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781849396444.jpeg",
    "slug": "komori-540-1993-model-fully-loaded-printing-machine-installation-in-jaipur",
    "desc": null
  },
  {
    "id": "26",
    "title": "Komori 440 1996 Model, fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781851095300.jpeg",
    "slug": "komori-440-1996-model-fully-loaded-printing-machine-installation-in-jaipur-2",
    "desc": null
  },
  {
    "id": "29",
    "title": "Pollar 92x Model Insolation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781854423126.jpeg",
    "slug": "polar-92x-model-insolation-in-jaipur",
    "desc": null
  },
  {
    "id": "30",
    "title": "Mullar Martini 1509 6 + Cover Insolation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781855937054.jpeg",
    "slug": "mullar-martini-1509-6-cover-insolation-in-jaiour",
    "desc": null
  },
  {
    "id": "31",
    "title": "Komori 426 1992 Model , Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781856402778.jpeg",
    "slug": "komori-426-1992-model-fully-loaded-printing-machine-installation-in-jaipur-2",
    "desc": null
  },
  {
    "id": "32",
    "title": "UV DRIP OFF 2 Colour With Insolation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781857443178.jpeg",
    "slug": "uv-drip-off-2-color-with-insolation-in-jaipur",
    "desc": null
  },
  {
    "id": "33",
    "title": "UV DRIP OFF 2 Colour With Coter Installation in Delhi",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781858489161.jpeg",
    "slug": "uv-drip-off-2-color-with-coter-insolation",
    "desc": null
  },
  {
    "id": "34",
    "title": "Komori 528 + Coter 2002 Model , Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781859324564.jpeg",
    "slug": "komori-528-coter2002-model-fully-loaded-printing-machine-installation-in-delhi",
    "desc": null
  },
  {
    "id": "36",
    "title": "Komori 540 1993 Model , Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781861043932.jpeg",
    "slug": "komori-540-1993-model-fully-loaded-printing-machine-installation-in-jaipur-1",
    "desc": null
  },
  {
    "id": "37",
    "title": "Komori 526 1996 Model , Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781861627491.jpeg",
    "slug": "komori-526-1996-model-fully-loaded-printing-machine-installation-in-jaipur-1",
    "desc": null
  },
  {
    "id": "38",
    "title": "Komori 526 2001 Model , Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781862087336.jpeg",
    "slug": "komori-526-2001-model-fully-loaded-printing-machine-installation-in-jaipur",
    "desc": null
  },
  {
    "id": "39",
    "title": "Komori 426 1997 Model, Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781862574176.jpeg",
    "slug": "komori-426-1997-model-fully-loaded-printing-machine-installation-in-jaipur",
    "desc": null
  },
  {
    "id": "40",
    "title": "Komori 526 1996 Model , Fully Loaded Printing Machine Installation in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/16781863402011.jpeg",
    "slug": "komori-526-1996-model-fully-loaded-printing-machine-installation-in-jaipur-2",
    "desc": null
  },
  {
    "id": "42",
    "title": "Komori Lithrone 426 NL 2005 Model Installation Completed in Udaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17013215175292.jpeg",
    "slug": "komori-lithrone-426-nl-2005-model-1",
    "desc": null
  },
  {
    "id": "43",
    "title": "Komori Lithrone 426 NL 2005 Model Installed in Delhi",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17013215557832.jpeg",
    "slug": "komori-lithrone-426-nl-2005-model-2",
    "desc": null
  },
  {
    "id": "44",
    "title": "Komori Lithrone 426 NL 2005 Model Installed in Udaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17013215988967.jpeg",
    "slug": "komori-lithrone-426-nl-2005-model-3",
    "desc": null
  },
  {
    "id": "45",
    "title": "Heidelberg CD 102 6+ L 1997 Model Installed in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17013216824835.jpeg",
    "slug": "heidelberg-cd-102-6-l-1997-model-in-jaipur",
    "desc": null
  },
  {
    "id": "47",
    "title": "Komori Lithrone 426 1994 Model Installed in Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023645203782.jpeg",
    "slug": "komori-lithrone-426-1994-model-at-jaipur",
    "desc": null
  },
  {
    "id": "48",
    "title": "Komori Lithrone 640+L 1998 Model Successfully Installed at Punjab",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023646251772.jpeg",
    "slug": "komori-lithrone-640l-6-1998-model-at-punjab",
    "desc": null
  },
  {
    "id": "52",
    "title": "Komori Lithrone 426 2002 Model Successfully Installed at Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023650145498.jpeg",
    "slug": "komori-lithrone-426-2002-model-at-jaipur",
    "desc": null
  },
  {
    "id": "61",
    "title": "Komori Lithrone 540 1994 Model Installed at Nagar Printer Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023659181885.jpeg",
    "slug": "komori-lithrone540-1994-model-at-nagar-printer-jaipur-1",
    "desc": null
  },
  {
    "id": "67",
    "title": "Komori Lithrone 426 2002 Model Installation Completed at Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023665123108.jpeg",
    "slug": "komori-lithrone-426-2002-model-jaipur",
    "desc": null
  },
  {
    "id": "68",
    "title": "Komori Lithrone 426 2000 Model Loading at Jaipur",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17023665881593.jpeg",
    "slug": "komori-lithrone-426-2000-model-at-jaipur",
    "desc": null
  },
  {
    "id": "93",
    "title": "Komori Lithrone Installation Completed at Jaipur, Rajasthan",
    "image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/17333888829070.jpeg",
    "slug": "komori-lithrone-installation-completed-at-jaipur-rajasthan",
    "desc": null
  }
];
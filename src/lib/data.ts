import { Product } from './types';

export const products: Product[] = [
  {
    id: 'barista-express',
    name: 'the Barista Express',
    description:
      'The best-selling, home espresso machine, with a built-in grinder',
    price: 998,
    discountedPrice: 798,
    images: [
      '/images/products/barista-express/barista-express-1-stell.avif',
      '/images/products/barista-express/barista-express-2-black.avif',
      '/images/products/barista-express/barista-express-3.avif',
      '/images/products/barista-express/barista-express-4.avif',
      '/images/products/barista-express/barista-express-5-accessories.avif',
    ],
    colors: [
      { name: 'Stainless Steel', image: '/images/products/barista-express/barista-express-1-stell.avif' },
      { name: 'Black Truffle', image: '/images/products/barista-express/barista-express-2-black.avif' },
    ],
    longDescription: "One of the world's popular and well-recommended espresso machines for home use, the Barista Express is perfect for anyone wanting to get into coffee.\n\nThis semi-automatic machine balances simplicity and flexibility. With automated, low pressure pre-infusion and shot timers, you can pull espresso at just the press of a button. Hone your skills tamping, and experimenting with various beans, doses and grind sizes.\n\nWith an in-built grinder and steam wand, this all-in-one setup is all you need is freshly roasted coffee beans and a weighing scale, to take your espresso to the next level and make cafe-level, specialty coffee at home.",
    whatsInBox: [
      '54mm Portafilter, stainless steel with double spout',
      '4 Espresso Filter Baskets – 9g & 18g pressurised, 9g & 18g unpressurised',
      'Integrated, Magnetic Tamper',
      '480ml (16oz) Thermal Milk Jug',
      'Dosing Funnel',
      'Leveling Tool',
      'Water Filter',
      'Maintenance Kit – cleaning brush, Allen key, cleaning disc, steam wand pin',
      '1 Descaling Dose, and 2 Cleaning Tablets'
    ]
  },
  {
    id: 'bambino',
    name: 'the Bambino',
    description:
      'The best value for money, standalone espresso machine',
    price: 598,
    discountedPrice: 498,
    images: [
      '/images/products/bambino/bambino-1.avif',
      '/images/products/bambino/bambino-2.avif',
      '/images/products/bambino/bambino-3.avif',
      '/images/products/bambino/bambino-4.avif',
    ],
    colors: [
      { name: 'Stainless Steel', image: '/images/products/barista-express/barista-express-1-stell.avif' },
    ],
    longDescription: "The Bambino is a compact and powerful espresso machine, perfect for small kitchens and coffee enthusiasts who value simplicity and speed. It heats up in just 3 seconds, allowing you to go from bean to cup faster than ever. Its intuitive controls make it easy to pull a perfect shot of espresso every time, while the powerful steam wand creates velvety microfoam for latte art.",
    whatsInBox: [
      '54mm Portafilter',
      'Pressurized Filter Baskets (1 & 2 Cup)',
      'Tamper',
      'Milk Jug',
      'Cleaning Tool',
      'Descaling Powder'
    ]
  },
  {
    id: 'bambino-plus',
    name: 'the Bambino Plus',
    description:
      'Everything in the Bambino, plus automatic milk frothing',
    price: 698,
    discountedPrice: 598,
    images: [
      '/images/products/bambino-plus/bambino-plus-1.avif',
      '/images/products/bambino-plus/bambino-plus-2.avif',
      '/images/products/bambino-plus/bambino-plus-3.avif',
      '/images/products/bambino-plus/bambino-plus-4.avif',
    ],
    colors: [
      { name: 'Stainless Steel', image: '/images/products/barista-express/barista-express-1-stell.avif' },
    ],
    longDescription: "Building on the success of the Bambino, the Bambino Plus adds automatic milk frothing for effortless lattes and cappuccinos. With its innovative auto steam wand, it can texture milk to perfection, automatically adjusting temperature and texture to your preference. This machine combines speed, simplicity, and advanced features, making it ideal for those who want cafe-quality drinks at home without the learning curve.",
    whatsInBox: [
      '54mm Portafilter',
      'Pressurized Filter Baskets (1 & 2 Cup)',
      'Tamper',
      'Milk Jug',
      'Cleaning Tool',
      'Descaling Powder',
      'Steam Wand Cleaning Tool'
    ]
  },
  {
    id: 'oracle-touch',
    name: 'the Oracle Touch',
    description:
      'Top of the line Dual Boiler performance with touch screen usability.',
    price: 4888,
    discountedPrice: 3988,
    images: [
      '/images/products/oracle-touch/oracle-touch-1.avif',
      '/images/products/oracle-touch/oracle-touch-2.avif',
      '/images/products/oracle-touch/oracle-touch-3.avif',
      '/images/products/oracle-touch/oracle-touch-4.avif',
    ],
    colors: [
      { name: 'Stainless Steel', image: '/images/products/barista-express/barista-express-1-stell.avif' },
    ],
    longDescription: "The Oracle Touch is the pinnacle of home espresso machines, offering automated grinding, dosing, tamping, and milk texturing with a simple touch screen. It features dual stainless steel boilers for simultaneous espresso extraction and milk steaming, ensuring optimal temperature stability and powerful steam. Create your favorite coffee creations with ease, from perfectly balanced espressos to silky smooth lattes, all at the touch of a button.",
    whatsInBox: [
      '58mm Full Stainless Steel Portafilter',
      '1 & 2 Cup Single Wall Filter Baskets',
      '58mm Razor Dose Trimming Tool',
      '480ml Stainless Steel Milk Jug',
      'Steam Wand Cleaning Tool',
      'Cleaning Disc',
      'Cleaning Tablets',
      'Water Filter Holder and Water Filter'
    ]
  },
];
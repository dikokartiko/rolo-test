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
  },
];
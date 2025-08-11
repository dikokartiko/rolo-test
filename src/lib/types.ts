export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  colors?: Array<{
    name: string;
    image: string;
  }>;
  longDescription?: string;
  whatsInBox?: string[];
};
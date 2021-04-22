interface Price {
  originalPrice: number;
  dealPrice?: number;
  percentage?: number;
}

export interface Product {
  id: number;
  ean: number;
  name: string;
  images: string[];
  price: Price;
}

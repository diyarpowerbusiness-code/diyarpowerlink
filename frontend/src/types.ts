export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  features?: string[];
  sku?: string;
  price?: number;
  barcodeValue?: string;
  barcodeFormat?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
}

export interface Partner {
  name: string;
  logo: string;
  url: string;
}

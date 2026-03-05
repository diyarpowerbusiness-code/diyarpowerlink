export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  features?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Partner {
  name: string;
  logo: string;
  url: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingPropos;
}

export interface RatingPropos {
  rate: number;
  count: number;
}

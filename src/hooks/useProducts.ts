import { useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { database } from '../firebase';


export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  discount: number;
  colors: string[];
  category: string;
  brand: string;
  rating: number;
  stock: number;
  description: string;
  image: string;
  tags: string[];
  reviews: {
    user: string;
    comment: string;
    rating: number;
  }[];
}

type UseProductsOptions = {
  tag?: string;
  sortBy?: 'price' | 'rating' | 'discount';
  limit?: number;
};

export function useProducts(options?: UseProductsOptions) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const productsRef = ref(database, 'products');

    const unsubscribe = onValue(productsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          let loadedProducts = Object.values(data) as Product[];

          if (options?.tag) {
            loadedProducts = loadedProducts.filter((product) =>
              product.tags && product.tags.includes(options.tag!)
            );
          }

          if (options?.sortBy) {
            loadedProducts.sort((a, b) => b[options.sortBy!] - a[options.sortBy!]);
          }

          if (options?.limit) {
            loadedProducts = loadedProducts.slice(0, options.limit);
          }

          setProducts(loadedProducts);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch products.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [options]);

  return { products, loading, error };
}


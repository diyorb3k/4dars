import create from 'zustand';

// Mahsulotlar turini aniqlash
interface Product {
  id: string;
  title: string;
}

// Store holatining tipi
interface ProductStore {
  loading: boolean;
  products: Product[];
  error: string | null;
  fetchProducts: () => Promise<void>; // fetchProducts funksiya tipi
}

// Store yaratish
export const useProductStore = create<ProductStore>((set) => ({
  loading: false,
  products: [],
  error: null,
  fetchProducts: async () => {
    set({ loading: true });
    try {
      // API chaqiruvi
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false });
    }
  },
}));

import React, { useEffect } from 'react';
import { useProductStore } from '../../app/productStore';

const Products: React.FC = () => {
  const { loading, products, error, fetchProducts } = useProductStore((state) => ({
    loading: state.loading,
    products: state.products,
    error: state.error,
    fetchProducts: state.fetchProducts,
  }));

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {products.length > 0 && (
        <div>
          {products.map((product, i) => (
            <div key={product.id}>
              {i + 1}. {product.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

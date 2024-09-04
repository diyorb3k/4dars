import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  images: string[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    title: "",
    description: "",
    brand: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    images: [],
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:3000/products", {
        ...newProduct,
        id: String(new Date().getTime()), 
        rating: 0,
      });
      setProducts([...products, response.data]);
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async () => {
    if (editingProduct) {
      try {
        const response = await axios.put(
          `http://localhost:3000/products/${editingProduct.id}`,
          editingProduct
        );

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editingProduct.id ? response.data : product
          )
        );
        setIsModalOpen(false);
        setEditingProduct(null);
        resetForm();
      } catch (error) {
        console.error("Mahsulotni tahrirlashda xato:", error);
      }
    }
  };
  
  const resetForm = () => {
    setNewProduct({
      id: "",
      title: "",
      description: "",
      brand: "",
      category: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      images: [],
    });
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
    
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Products</h1>
      
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full"
      />

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Title</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Description</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Brand</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Category</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Price</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Percentage</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Edit</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="border-t border-gray-300">
              <td className="py-2 px-4">{product.title}</td>
              <td className="py-2 px-4">{product.description}</td>
              <td className="py-2 px-4">{product.brand}</td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">{product.price}</td>
              <td className="py-2 px-4">{product.discountPercentage}%</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setIsModalOpen(true);
                    setNewProduct(product);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={async () => {
                    try {
                      await axios.delete(`http://localhost:3000/products/${product.id}`);
                      setProducts((prevProducts) =>
                        prevProducts.filter((p) => p.id !== product.id)
                      );
                    } catch (error) {
                      console.error("Error deleting product:", error);
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          setIsModalOpen(true);
          setEditingProduct(null);
          resetForm();
        }}
        className="bg-blue-500 text-white py-2 px-4 my-10 rounded"
      >
        Add
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">{editingProduct ? "Edit Product" : "Add Product"}</h2>
            <input
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              className="border border-gray-300 p-2 rounded mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border border-gray-300 p-2 rounded mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Brand"
              value={newProduct.brand}
              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
              className="border border-gray-300 p-2 rounded mb-4 w-full"
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="border border-gray-300 p-2 rounded mb-4 w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              className="border border-gray-300 p-2 rounded mb-4 w-full"
            />
            <input
              type="number"
              placeholder="Discount Percentage"
              value={newProduct.discountPercentage}
              onChange={(e) => setNewProduct({ ...newProduct, discountPercentage: parseFloat(e.target.value) })}
              className="border border-gray-300 p-2 rounded mb-4 w-full"
            />
            <button
              onClick={editingProduct ? handleEditProduct : handleAddProduct}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {editingProduct ? "Update" : "Add"}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white py-2 px-4 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

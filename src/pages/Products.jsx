import { useState, useEffect } from 'react';
import ProductCard from '../components/common/ProductCard';
import { productApi } from '../api/productApi';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Noise-Canceling Headphones',
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'Smart Fitness Tracker Watch',
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    name: 'Classic Minimalist Leather Backpack',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    name: 'Mechanical Gaming Keyboard RGB',
    price: 3499,
    originalPrice: 4299,
    discount: 18,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 5,
    name: 'Ergonomic Wireless Mouse',
    price: 899,
    originalPrice: 1299,
    discount: 30,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 6,
    name: 'Stainless Steel Water Bottle 1L',
    price: 599,
    originalPrice: 799,
    discount: 25,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60',
  },
];

const Products = () => {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productApi.getAllProducts();
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.log('Using default catalog products:', err.message);
      }
    };
    loadProducts();
  }, []);

  const categories = ['All', 'Electronics', 'Wearables', 'Fashion', 'Gaming', 'Lifestyle'];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Explore Catalog</h1>
        <p className="text-sm text-gray-500 mt-1">Browse all our premium collections</p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { productApi } from '../api/productApi';

// Demo fallback products so the app looks complete out of the box
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
];

const Home = () => {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try fetching products from Node.js backend if available
    const fetchBackendProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getAllProducts();
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        // Fallback to sample items if backend is not yet running
        console.log('Using sample products (Backend is not connected yet):', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBackendProducts();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-6 px-6 sm:px-12 py-16 sm:py-24 shadow-xl">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 backdrop-blur-md px-3 py-1 rounded-full text-indigo-200 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-indigo-300" />
            <span>Discover The Best Deals</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Elevate Your Everyday <span className="text-indigo-300">Shopping</span>
          </h1>
          <p className="text-indigo-100 text-base sm:text-lg">
            Shop the latest premium gadgets, accessories, and lifestyle essentials with fast delivery and guaranteed quality.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-indigo-900 font-bold rounded-xl shadow-lg hover:bg-indigo-50 transition transform active:scale-95"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Free & Fast Delivery</h4>
              <p className="text-xs text-gray-500">On all orders over ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">100% Genuine Products</h4>
              <p className="text-xs text-gray-500">Directly sourced from trusted brands</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">7-Day Easy Returns</h4>
              <p className="text-xs text-gray-500">Hassle-free replacement policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-sm text-gray-500">Handpicked trending items for you</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Login from '../pages/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      {/* 404 Fallback */}
      <Route
        path="*"
        element={
          <div className="py-24 text-center">
            <h1 className="text-4xl font-bold text-gray-800">404</h1>
            <p className="text-gray-500 mt-2">Page Not Found</p>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

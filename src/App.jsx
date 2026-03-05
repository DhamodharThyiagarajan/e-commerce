/**
 * App.jsx - Root component and routing configuration
 * Wraps the app in React Router, defines all routes, and lays out
 * Header, Navbar, main content area, and Footer.
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/layout/Header';
import Ecommerce_dashboard from './Pages/Home';
import Cart_Page from './Pages/CartPage';
import Wishlist from './Pages/Wishlist';
import Footer from './Components/layout/Footer';
import Navbar from './Components/layout/Navbar';
import ProductDetails from './Pages/Product_Detail_Page';
import Electronics from './Components/categories/Electronics';
import Womens from './Components/categories/Womens';
import Mens from './Components/categories/Mens';
import Jewellery from './Components/categories/Jewellery';
import Form from './Components/Form';

function App() {
  return (
    <Router>
      {/* Full-height layout: header offset for fixed header, flex-grow for content */}
      <div className="flex flex-col h-screen lg:pt-28 pt-32">
        <Header />
        <div className="flex-grow mt-2 md:mt-12 lg:mt-0">
          <Navbar />
          {/* Route definitions: home, category pages, cart, wishlist, product detail, auth form */}
          <Routes>
            <Route path="/" element={<Ecommerce_dashboard />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/womens" element={<Womens />} />
            <Route path="/mens" element={<Mens />} />
            <Route path="/jewellerys" element={<Jewellery />} />
            <Route path="/cart" element={<Cart_Page />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/productdetails" element={<ProductDetails />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
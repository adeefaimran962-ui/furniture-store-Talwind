import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider }  from './context/AuthContext';
import { CartProvider }  from './context/CartContext';

import Navbar    from './components/Navbar/page';
import Footer    from './components/Footer/page';

import Home      from './pages/Home/page';
import About     from './pages/About/page';
import Services  from './pages/Services/page';
import Contact   from './pages/Contact/page';
import Login     from './pages/Login/page';
import Register  from './pages/Register/page';
import Dashboard from './pages/Dashboard/page';
import Cart      from './pages/Cart/page';
import Reviews   from './pages/Reviews/page';
import Profile   from './pages/Profile/page';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/"          element={<Home />}      />
              <Route path="/about"     element={<About />}     />
              <Route path="/services"  element={<Services />}  />
              <Route path="/contact"   element={<Contact />}   />
              <Route path="/login"     element={<Login />}     />
              <Route path="/register"  element={<Register />}  />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cart"      element={<Cart />}      />
              <Route path="/reviews"   element={<Reviews />}   />
              <Route path="/profile"   element={<Profile />}   />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

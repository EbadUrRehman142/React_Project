"use client"
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import Register from "./MultiStepRegistration.js";
import Cart from "./Cart";
import Login from "./Login";
import { AuthProvider, useAuth } from "./AuthContext";  // Assuming AuthContext is already created
import "./App.css";

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();  // Assuming user data is fetched from context
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Path where header/footer should be hidden
  const hideNavbarRoutes = ["/Login","/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Redirect to home if user is logged in and visiting login page
  if (user && location.pathname === "/login") {
    return <Navigate to="/home" />;
  }

  return (
    <>
      {/* Only show Navbar if not on login page */}
      {!shouldHideNavbar && (
        <header className="navbar">
          <div className="navbar-container">
            <div className="logo">
              <Link to="/home">ShopHub</Link>
            </div>

            <button className="menu-toggle" onClick={toggleMenu}>
              <span className={`menu-icon ${isMenuOpen ? "open" : ""}`}></span>
            </button>

            <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
              <Link to="/Home" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link to="/cart" className="nav-link" onClick={() => setIsMenuOpen(false)}>Cart</Link>
              <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
            </nav>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="content">
        <Routes>
        <Route path="/register" element={<Register />} /> {/* Yeh new route */}
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          {/* Default route: Redirect to /login */}
          <Route path="*" element={<Navigate to="/Login" />} />
        </Routes>
      </main>

      {/* Footer Section */}
      {!shouldHideNavbar && (
        <footer className="footer">
          <div className="footer-container">
            <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
            <div className="footer-links">
              <Link to="/about">About Us</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart</Link>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;

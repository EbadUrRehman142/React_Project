"use client"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { useState } from "react"
import Home from "./Home"
import About from "./About"
import Products from "./Products"
import Cart from "./Cart"
import "./App.css"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Router>
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Link to="/">ShopHub</Link>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            <span className={`menu-icon ${isMenuOpen ? "open" : ""}`}></span>
          </button>

          <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <i className="nav-icon home-icon"></i>
              Home
            </Link>
            <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <i className="nav-icon products-icon"></i>
              Products
            </Link>
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <i className="nav-icon about-icon"></i>
              About Us
            </Link>
            <Link to="/cart" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <i className="nav-icon cart-icon"></i>
              
              Cart
            </Link>
          </nav>
        </div>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
       {/* Footer Section */}
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
    </Router>
  )
}

export default App


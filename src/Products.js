"use client"

import { useState, useEffect } from "react"
import { supabase } from "./supaBaseClient"
import "./Products.css"

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [cart, setCart] = useState(() => {
    // Retrieve cart from localStorage or set to an empty array
    const savedCart = JSON.parse(localStorage.getItem("cart"))
    return savedCart || []
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("products").select("*")
      if (error) throw error
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Failed to load products. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Function to add product to cart
  const addToCart = (product, event) => {
    // Add animation to the button
    const button = event.currentTarget
    button.classList.add("added")

    setTimeout(() => {
      button.classList.remove("added")
    }, 1500)

    // Check if the product already exists in the cart
    const productInCart = cart.find((item) => item.id === product.id)

    if (productInCart) {
      // If product already exists in cart, just increase the quantity
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      // If product is not in cart, add it
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // Function to update product description in the database
  const updateProductDescription = async (productId, newDescription) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .update({ description: newDescription })
        .match({ id: productId })
      if (error) throw error
      // Update the product description in the state (UI)
      setProducts(products.map((product) => 
        product.id === productId ? { ...product, description: newDescription } : product
      ));
    } catch (error) {
      console.error("Error updating product description:", error)
    }
  }

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Get unique categories from products
  const categories = ["All", ...new Set(products.map((product) => product.category))]

  // Filter products by category
  const filteredProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover our wide range of high-quality products</p>
      </div>

      {/* Categories filter */}
      <div className="categories-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={fetchProducts} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {/* Products grid */}
      {!loading && !error && (
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image_url || "/placeholder.svg"} alt={product.name} />
                  {product.discount && <span className="product-badge">{product.discount}% OFF</span>}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>

                  {/* Editable description */}
                  <div className="product-description-container">
                    <p className="product-description">
                      {product.description}
                    </p>

                    {/* Edit Button */}
                    <button
                      className="edit-description-btn"
                      onClick={() => {
                        const newDescription = prompt("Edit Description", product.description);
                        if (newDescription && newDescription !== product.description) {
                          updateProductDescription(product.id, newDescription);
                        }
                      }}
                    >
                      Edit
                    </button>
                  </div>

                  <div className="product-price-row">
                    <span className="product-price">${product.price}</span>
                    {product.original_price && (
                      <span className="product-original-price">${product.original_price}</span>
                    )}
                  </div>
                  <button className="add-to-cart-btn" onClick={(e) => addToCart(product, e)}>
                    <span className="btn-text">Add to Cart</span>
                    <span className="btn-icon">+</span>
                    <span className="btn-success">Added ✓</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Products

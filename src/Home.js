import { FaShoppingBag, FaArrowRight, FaTag, FaTruck, FaHeadset } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';  
import "./Home.css";

function Home() {
    const navigate = useNavigate(); 
  
    const handleClick = () => {
      navigate('/products');  // Navigate to the Products page
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient">
        <div className="home-card bg-white p-8 rounded-lg shadow-custom max-w-md w-full text-center">
          <div className="icon-container">
            <FaShoppingBag size={40} className="text-indigo-600" />
          </div>
  
          <h1 className="title text-4xl font-bold text-indigo-600 mb-6">Welcome to Our E-commerce Store</h1>
  
          <p className="description text-xl text-gray-600 mb-6">Explore a variety of products at amazing prices!</p>
  
          <div className="features">
            <div className="feature">
              <div className="feature-dot"></div>
              <span>
                <FaTag className="inline mr-2 text-indigo-500" /> Best deals and discounts
              </span>
            </div>
            <div className="feature">
              <div className="feature-dot"></div>
              <span>
                <FaTruck className="inline mr-2 text-indigo-500" /> Free shipping on orders over $50
              </span>
            </div>
            <div className="feature">
              <div className="feature-dot"></div>
              <span>
                <FaHeadset className="inline mr-2 text-indigo-500" /> 24/7 customer support
              </span>
            </div>
          </div>
  
          <button className="cta-button mt-6" onClick={handleClick}>  {/* Add onClick to navigate */}
            Shop Now <FaArrowRight className="ml-1" />
          </button>
        </div>
      </div>
    );
  }
  
  export default Home;
  


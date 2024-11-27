import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import silderimage from "../assets/Slider.png"; 
import textimage from "../assets/Header.png";
import Logo from "../assets/logo.png";
import { FaTrashAlt } from 'react-icons/fa'; // For the remove icon

const Homee = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const [cart, setCart] = useState([]); // For cart state
  const [isCartOpen, setIsCartOpen] = useState(false); // To toggle the cart sidebar
  const [isProfileOpen, setIsProfileOpen] = useState(false); // To toggle the profile sidebar

  // Use navigate for redirecting
  const navigate = useNavigate(); 
  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Check if auth token is available
    if (!authToken) {
      navigate('/'); // Redirect to homepage if not authenticated
    }
  }, [navigate]);

  // Fetch products using the updated API endpoint
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/product/getproducts");
        const data = await response.json();

        if (response.ok) {
          setProducts(data.products); // Set products from the API response
          setLoading(false); // Set loading state to false after data is fetched
        } else {
          setError(data.message || 'Failed to load products');
          setLoading(false);
        }
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]); // Add product to the cart
    setIsCartOpen(true); // Automatically open the cart sidebar
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(product => product._id !== productId));
  };

  const toggleCartSidebar = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleProfileSidebar = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove authToken on logout
    setIsProfileOpen(false); // Close the profile sidebar after logout
    alert('You have been logged out!');
    navigate('/'); // Redirect to the homepage after logout
  };

  const saleMessageStyle = {
    fontSize: '16px',
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: '#F3F5F7',
    padding: '10px 0',
    margin: 0,
    position: 'relative',
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    fontSize: '30px',
    color: 'white',
    cursor: 'pointer',
    backgroundColor: 'black',
    borderRadius: '50%',
    padding: '10px',
    transform: 'translateY(-50%)',
  };

  return (
    <div>
      {/* Sale Message */}
      <div style={saleMessageStyle}>
        <span>Limited Time Offer: 50% Off on All Items!</span>
      </div>

      <div className="container" style={{ margin: '0 150px' }}>
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center py-3">
          <img src={Logo} alt="3legant Logo" style={{ height: '35px' }} />
          <nav>
            <a href="#" className="text-decoration-none text-dark mx-3" style={{ fontSize: '18px' }}>Home</a>
            <a href="#" className="text-decoration-none text-dark mx-3" style={{ fontSize: '18px' }}>Shop</a>
            <a href="#" className="text-decoration-none text-dark mx-3" style={{ fontSize: '18px' }}>Product</a>
            <a href="#" className="text-decoration-none text-dark mx-3" style={{ fontSize: '18px' }}>Contact Us</a>
          </nav>
          <div className="d-flex gap-3">
            <i className="fa fa-search" style={{ fontSize: '20px' }}></i>
            <i 
              className="fa fa-shopping-cart" 
              style={{ fontSize: '20px', cursor: 'pointer' }} 
              onClick={toggleCartSidebar}
            ></i>
            <i 
              className="fa fa-user" 
              style={{ fontSize: '20px', cursor: 'pointer' }} 
              onClick={toggleProfileSidebar}
            ></i>
          </div>
        </header>

        {/* Slider */}
        <div className="slider-container position-relative mt-1">
          <div 
            className="slider d-flex justify-content-center align-items-center" 
            style={{
              width: '100%', 
              height: '500px', 
              backgroundColor: '#f1f1f1', 
              backgroundImage: `url(${silderimage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}></div>
        </div>

        {/* Unique Text */}
        <div className="textImage d-flex justify-content-center align-items-center mt-4" style={{
          width: '100%', 
          height: '200px', 
          backgroundImage: `url(${textimage})`, 
          backgroundSize: '1200px', 
          backgroundPosition: 'center 8px', 
          backgroundRepeat: 'no-repeat'
        }}></div>

        {/* Product Cards Section */}
        <div className="products-section mt-5">
          <h2 className="text-center">Featured Products</h2>

          {/* Loading State */}
          {loading && <p className="text-center">Loading products...</p>}

          {/* Error State */}
          {error && <p className="text-center text-danger">{error}</p>}

          <div className="row">
            {products.length > 0 ? products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="card" style={{ width: '18rem', marginBottom: '20px' }}>
                  <img src={'http://127.0.0.1:3000/uploads/1732362648689.jpg'} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text"><strong>${product.price}</strong></p>
                    <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-center">No products available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="cart-sidebar" style={{
          position: 'fixed', 
          top: 0, 
          right: 0, 
          width: '300px', 
          height: '100%', 
          backgroundColor: '#fff', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
          padding: '20px', 
          zIndex: 1000
        }}>
          <h4>Your Cart</h4>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cart.map((product) => (
              <li key={product._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <img 
                  src={'http://127.0.0.1:3000/uploads/1732362648689.jpg'} 
                  alt={product.name} 
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
                <div style={{ flexGrow: 1 }}>
                  <span>{product.name}</span>
                  <br />
                  <span style={{ color: '#888' }}>${product.price}</span>
                </div>
                <FaTrashAlt 
                  style={{ cursor: 'pointer', color: 'red' }} 
                  onClick={() => handleRemoveFromCart(product._id)}
                />
              </li>
            ))}
          </ul>
          <button onClick={toggleCartSidebar} className="btn btn-secondary">Close Cart</button>
        </div>
      )}

      {/* Profile Sidebar */}
      {isProfileOpen && (
        <div className="profile-sidebar" style={{
          position: 'fixed', 
          top: 0, 
          right: 0, 
          width: '300px', 
          height: '100%', 
          backgroundColor: '#fff', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
          padding: '20px', 
          zIndex: 1000
        }}>
          <h4>My Profile</h4>
          <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
        </div>
      )}
    </div>
  );
};

export default Homee;

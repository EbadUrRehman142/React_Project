import { useState, useEffect } from 'react';

function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    return savedCart || [];
  });

  const increaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      fontSize: '2.5rem',
      textAlign: 'center',
      marginBottom: '1.5rem',
      color: '#333',
    },
    emptyCart: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#777',
    },
    cartItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      borderBottom: '2px solid #eee',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      marginBottom: '1rem',
    },
    itemName: {
      flex: 2,
      fontWeight: '600',
    },
    itemPrice: {
      flex: 1,
      textAlign: 'center',
      color: '#555',
    },
    itemQuantity: {
      flex: 1,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    quantityButton: {
      padding: '0.4rem 0.8rem',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    quantityButtonHover: {
      backgroundColor: '#0056b3',
    },
    removeButton: {
      padding: '0.4rem 0.8rem',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    total: {
      textAlign: 'right',
      marginTop: '2rem',
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#222',
    }
   
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Cart</h1>

      {cart.length === 0 ? (
        <p style={styles.emptyCart}>Your cart is empty!</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <div style={styles.itemName}>{item.name}</div>
              <div style={styles.itemPrice}>${item.price.toFixed(2)}</div>
              <div style={styles.itemQuantity}>
                <button style={styles.quantityButton} onClick={() => decreaseQuantity(item.id)}>-</button>
                {item.quantity}
                <button style={styles.quantityButton} onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
              <div style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</div>
              <div>
                <button style={styles.removeButton} onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div style={styles.total}>Total: ${totalPrice.toFixed(2)}</div>
          <button style={{ 
  padding: '12px 30px', 
  backgroundColor: '#007bff', 
  color: '#fff', 
  fontSize: '1.1rem', 
  fontWeight: 'bold', 
  border: 'none', 
  borderRadius: '5px', 
  cursor: 'pointer', 
  textAlign: 'center', 
  position:'absolute',
  top: '448px',
    right: '848px',
  transition: 'background-color 0.3s, transform 0.3s', 
}} 
  onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
  onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
>
  Proceed To Checkout
</button>

        </div>
      )}
    </div>
  );
}

export default Cart;

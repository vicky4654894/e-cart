import React, { useState } from 'react';

import './App.css';

// Rest of the component code...

const Product = [
  {
    id: 1,
    title: 'Smart Watch',
    description:
      'A smartwatch is a portable device worn on the wrist that supports apps and acts as an extension of your mobile phone in some cases.',
    img:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1999&q=80',
    price: 4000,
  },
  {
    id: 2,
    title: 'Samsung Mobile',
    description: 'Samsung Mobile Ultra Pro Max',
    img:
      'https://images.samsung.com/is/image/samsung/p6pim/in/2202/gallery/in-galaxy-a53-5g-a536-416923-sm-a536elbgins-thumb-531436248?$264_264_PNG$',
    price: 15000,
  },
  {
    id: 3,
    title: 'Trimmer',
    description: 'NOVA NG 1145 Trimmer 60 min Runtime 8 Length Settings (Black, Blue)',
    img:
      'https://rukminim2.flixcart.com/image/416/416/kr6oeq80/trimmer/g/h/y/0-5-15-mm-ng-1145-stainless-steel-cordless-nova-original-imag5yzwu7pcsgep.jpeg?q=70',
    price: 15000,
  },
  {
    id: 4,
    title: 'Hero-Cycle',
    description:
      'LEADER E-Power L6 27.5T Electric Cycle with Front Suspension & Dual Disc Brake 27.5 inches Single Speed Lithium-ion (Li-ion) Electric Cycle',
    img:
      'https://rukminim2.flixcart.com/image/416/416/xif0q/electric-cycle/z/i/m/e-power-l6-27-5t-electric-cycle-with-front-suspension-dual-disc-original-imaghyzgbsmqstex.jpeg?q=70',
    price: 15000,
  },
];

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart.filter((item) => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className="products">
        {Product.map((product) => (
          <div key={product.id} className="product">
            <img src={product.img} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div>
              {cart.find((item) => item.id === product.id) ? (
                <div>
                  <button onClick={() => removeFromCart(product.id)}>-</button>
                  {cart.find((item) => item.id === product.id).quantity}
                  <button onClick={() => addToCart(product)}>+</button>
                </div>
              ) : (
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <h2 className="heading_Cart">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <img  className="image"src={item.img} alt={item.title} />
                {item.title} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className='showprice'>Total Price: ${getTotalPrice()}</p>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

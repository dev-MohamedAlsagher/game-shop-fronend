import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refreshCart, setRefreshCart] = useState(false);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems).map((item) => ({ ...item, quantity: item.quantity || 1 })));
    }
  }, [refreshCart]);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, game) => total + game.prijs * game.quantity, 0).toFixed(2);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const addToCart = (game) => {
    setCartItems((prevCartItems) => {
      const existingCartItemIndex = prevCartItems.findIndex((item) => item.id === game.id);

      if (existingCartItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        const currentQuantity = updatedCartItems[existingCartItemIndex].quantity || 1;

        updatedCartItems[existingCartItemIndex].quantity = currentQuantity + 1;

        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setRefreshCart((prev) => !prev);
        return updatedCartItems;
      } else {
        const updatedCartItems = [...prevCartItems, { ...game, quantity: 1 }];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setRefreshCart((prev) => !prev);
        return updatedCartItems;
      }
    });

    setCartVisible(true);
  };

  const removeFromCart = (index) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];
      updatedCartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setRefreshCart((prev) => !prev);
      return updatedCartItems;
    });
  };

  const increaseQuantity = (index) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];
      updatedCartItems[index].quantity += 1;
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setRefreshCart((prev) => !prev);
      return updatedCartItems;
    });
  };

  const decreaseQuantity = (index) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];
      if (updatedCartItems[index].quantity > 1) {
        updatedCartItems[index].quantity -= 1;
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setRefreshCart((prev) => !prev);
      return updatedCartItems;
    });
  };

  const clearCart = () => {
    console.log('Before clearing cart:', refreshCart);
    setCartItems([]);
    localStorage.removeItem('cartItems');
    setRefreshCart((prev) => !prev);
    console.log('After clearing cart:', refreshCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartVisible,
        setCartVisible,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node,
};

export default CartContext;

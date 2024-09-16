import '../css/cart.css';
import PropTypes from 'prop-types';
import { useCart } from './context/cartHooks';

function Cart({ cartItems, handlePayment }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity, totalPrice } = useCart();


  return (
    <div className={`cart-container ${cartItems.length > 0 ? 'open' : ''}`} data-cy="cart-container">
      <h3 data-cy="cart-heading">Shopping Cart</h3>
      <div className="cart" data-cy="cart-items">
        <ul>
          {cartItems.map((game, index) => (
            <li key={index}>
              <div className="details" data-cy={`cart-item-${index}`}>
                <span className='naam'>{game.name}</span>
                <span className='prijs'>{game.prijs}€</span>
              </div>
              <div className='quantity-container'>
                  <button onClick={() => decreaseQuantity(index)} data-cy="decrease-quantity">-</button>
                  <span className='quantity' data-cy="quantity">{game.quantity}</span>
                  <button onClick={() => increaseQuantity(index)} data-cy="increase-quantity">+</button>
                </div>
              <button onClick={() => removeFromCart(index)} data-cy="remove-button">x</button>
            </li>
          ))}
        </ul>
        <div className='TotaalPrijs'>
          <p>Total Price: {totalPrice}€</p>
          <button onClick={handlePayment} data-cy="pay-button">Pay</button>
        </div>
      </div>
    </div>
  );
}



Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      prijs: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  handlePayment: PropTypes.func.isRequired,
};


export default Cart;

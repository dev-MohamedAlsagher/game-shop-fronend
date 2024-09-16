import { useEffect } from 'react';
import '../css/payment.css';
import { useCart } from './context/cartHooks';
import { createBestelling } from '../api/bestellingInformation';
import { useToken } from './context/tokenHooks';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';

const Payment = () => {
  const { cartItems, clearCart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice} = useCart();
  const {token} = useToken();
  const navigate = useNavigate();

  const { handleSubmit, control, formState: { errors } } = useForm();


  const mutationPayment = useMutation(createBestelling(token), {
    onError: (error) => {
      console.log(error);
      if (error) {
        console.error('Error during updating:', error);
        console.error('An unexpected error occurred during the update.');
      }
       else {
        if (!error) {
          console.error('Network error during payment:', error);
          console.error('Network error: Unable to connect to the server');
        }
      }
    },
   });



  const onSubmit = (data) => {    
    

    const gamesData = cartItems.map((game) => ({
      gameID: game.id,
      quantity: game.quantity, 
      price: game.prijs,
    }));

    const mutationData = {
      games: gamesData,
      betaalmethode: data.paymentMethod,
      totaalbedrag: totalPrice,
    };

    mutationPayment.mutate(mutationData);

  };

  useEffect(() => {
    if (mutationPayment.isSuccess) {
      toast.success(
        'Payment successful! Codes will be sent to your email.',
        {
          autoClose: false,
          draggable: false,
          closeButton: (
            <button
              onClick={() => {
                toast.dismiss();
                clearCart();
                console.log("it worked");
                mutationPayment.reset();
                navigate('/');
              }}
            >
              Continue
            </button>
          ),
          className: 'custom-toast',
        }
      );
    }
  }, [mutationPayment, clearCart, navigate]);
  


  return (
    <div className="container-winkelmand">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='payment-page'>
        <div className="winkelmand-games">
        <h2>Winkelmand:</h2>
        {cartItems.map((game, index) => (
          <div key={index} className="winkelmand-game-details">
            <span><img src={game.image_url} alt="" /></span>
            <span>{game.name}</span>
            <div className='quantity-container-payment'>
              <button onClick={() => decreaseQuantity(index)}>-</button>
              <span className='quantity-payment'>{game.quantity}</span>
              <button onClick={() => increaseQuantity(index)}>+</button>
            </div>
            <span>{game.prijs}€</span>
            <button onClick={() => removeFromCart(index)}>&times;</button>
          </div>
        ))}
      </div>
      <div className="payment-details">
        <h2>Total Price: {totalPrice}€</h2>
        <div className="payment-method">
          <label>Payment Method:</label>
          <Controller
            name="paymentMethod"
            control={control}
            rules={{ required: 'Please select a payment method' }}
            render={({ field }) => (
              <select {...field}>
                <option value="">Kies betaalmethode</option>
                <option value="bancontact">Bancontact</option>
                <option value="creditcard">Visa/Mastercard</option>
                <option value="klarna">Klarna</option>
                <option value="paypal">PayPal</option>
              </select>
            )}
          />
          {errors.paymentMethod && <span>{errors.paymentMethod.message}</span>}
        </div>
        <div className="email">
              Stuur de game codes naar email:
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
                rules={{
                  required: 'Email is verplicht voor deze optie.',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Ongeldig e-mailadres',
                  },
                }}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
          <button type="submit">Betaal</button>
        </div>
        </div>
      </form>
      <ToastContainer
      position="top-center"
      autoClose={false}
      closeButton={false}
      closeOnClick={false}
      pauseOnHover={false}
      className="custom-toast-container"
      />
    </div>
  );
};

export default Payment;

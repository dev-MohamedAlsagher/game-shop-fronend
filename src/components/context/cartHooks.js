import CartContext from './cartContext';
import { useContext } from 'react';

export function useCart() {
  return useContext(CartContext);
}
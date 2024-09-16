import { useContext } from 'react';
import TokenContext from './tokenContext';

export const useToken = () => {
  return useContext(TokenContext);
};

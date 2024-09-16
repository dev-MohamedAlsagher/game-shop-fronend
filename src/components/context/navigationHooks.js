import NavigationContext from './navigationContext';
import { useContext } from 'react';

export function useNavigation() {
  return useContext(NavigationContext);
}
import GameContext from './gameContext';
import { useContext } from 'react';

export function useGame() {
  return useContext(GameContext);
}
import { createContext, useState, useEffect } from 'react';
import { useGames } from '../../api/gamesGetter';
import PropTypes from 'prop-types';


const GameContext = createContext();


export const GameProvider = ({ children }) => {

  const [games, setGames] = useState([]);
  const { data: fetchedGames, isLoading } = useGames();

  useEffect(() => {
    if (!isLoading) {
      setGames(fetchedGames);
    }
  }, [fetchedGames, isLoading]);
  
  return (
    <GameContext.Provider value={{ games }}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node,
};

export default GameContext;
import { useEffect, useState } from "react";
import '../css/Catalogus.css';
import { useCart } from './context/cartHooks';
import {useGame} from './context/gameHooks';


function Catalogus() {
  const { games } = useGame();
  const { addToCart } = useCart();
  const [selectedGame, setselectedGame] = useState(null);
  const [console, setConsole] = useState('all');

  const handleConsoleChange = (event) => {
    setConsole(event.target.value);
  };

  const filteredGames = games.filter((game) => {
    return console === 'all' || game.console === console;
  });



  const handleAddToCart = (game) => {
    addToCart(game); 
  };


  useEffect(() => {
    const storedSelectedGame = localStorage.getItem('selectedGame');
    if (storedSelectedGame) {
      setselectedGame(JSON.parse(storedSelectedGame))
    }
  }, []);

  const openGameDetails = (game) => {
    setselectedGame(game);
  };

  const closeGameDetails = () => {
    setselectedGame(null);
    localStorage.removeItem('selectedGame');
  };


  return (
    <div className="container">
      <div className="catalogus-filters">
        <h1>Catalogus</h1>
        <p>Filters: </p>
        <div>
        <label>
          <select value={console} onChange={handleConsoleChange} data-cy="console-filter">
            <option value="all">All</option>
            <option value="pc">PC</option>
            <option value="ps5">PlayStation</option>
            <option value="Xbox One">Xbox</option>
          </select>
        </label>
      </div>
      </div>
      
      <div className="games-row" data-cy="catalogus-games">
        {filteredGames.map((game) => (
          <div className="game-card" key={game.id} onClick={() => openGameDetails(game)} data-cy={`game-card-${game.console.toLowerCase()}`}>
            <div>
              <img src={game.image_url !== 'N/A' ? game.image_url : 'https://via.placeholder.com/400'} alt={game.name} />
            </div>
            <div className="game-info">
              <h3>{game.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedGame && (
        <div className="game-popup active" data-cy="game-popup-catalogus">
          <button data-cy="popup-sluiten" className="close-button" onClick={closeGameDetails}></button>
          <div className="img-container">
            <img src={selectedGame.image_url !== 'N/A' ? selectedGame.image_url : 'https://via.placeholder.com/400'} alt={selectedGame.name} />
          </div>
          <div className="game-details">
            <h2>{selectedGame.name}</h2>
            <p className="beschrijving">
              Beschrijving: <br />
              {selectedGame.beschrijving}
            </p>
            <p>
              Console: <br />
              {selectedGame.console}
            </p>
            <p>
              Prijs: <br />
              {selectedGame.prijs}€
            </p>
            <button data-cy="games-toevoegen" onClick={() => handleAddToCart(selectedGame)}>voeg toe aan winkelmandje</button>
          </div>
        </div>
      )}
    </div>
  );
}


export default Catalogus;

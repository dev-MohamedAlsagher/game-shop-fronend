import { useGame } from './context/gameHooks';
import { useNavigation } from './context/navigationHooks';
import { useGetAllBestellingen } from '../api/bestellingInformation';
import '../css/bestellingen.css'
import Loader from './Loader';

const Bestellingen = () => {
  const navigation = useNavigation();
  const { games } = useGame();

  const { data: bestellingen } = useGetAllBestellingen();

  const GameImageUrl = (gameName) => {
    const game = games.find((g) => g.name === gameName);
    return game ? game.image_url : '';
  };

  const handleGameClick = (game) => {
    const selectedGame = games.find((g) => g.name === game.gameName);
    localStorage.setItem('selectedGame', JSON.stringify(selectedGame));
    console.log(selectedGame)
    navigation.navigateTo('/catalogus');
  };

  return (
    <div className="container-bestelling">
      <h1>Bestellingen</h1>
      <div className="bestelling-row">
      {bestellingen === undefined || bestellingen === null ? (
          <Loader data-cy="loader"/>
        ) : bestellingen.length === 0 ? (
          <p data-cy="no-bestellingen">Geen bestellingen gevonden</p>
        ) : (
          bestellingen
            .slice() 
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((bestelling, index) => (
            <div key={bestelling.id} data-cy={`bestelling-${index}`}>
              <h2> {new Date(bestelling.createdAt).toLocaleString()} | bestellingID {bestelling.id} | Totaal: {bestelling.totaalbedrag}€</h2>
              {bestelling.games.map((game, gameIndex) => (
                <div
                  className="bestelling-game"
                  key={game.id}
                  data-cy={`bestelling-game-${gameIndex}`}
                  onClick={() => {
                    handleGameClick(game)}}
                >
                  <div>
                  <img src={GameImageUrl(game.gameName)} alt={game.gameName} />
                  </div>
                  <div className="bestelling-info">
                    <p>{game.gameName}</p>
                  </div>
                  <div>
                    <p>quantity:{game.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bestellingen;

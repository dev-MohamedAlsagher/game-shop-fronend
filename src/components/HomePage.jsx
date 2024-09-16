import '../css/HomePage.css'
import { useNavigate } from 'react-router';

function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/catalogus')
  }


  return (
    <div className="home-page">
      <h1>Welkom bij GameStart!</h1>
      <p>Ontdek een breed scala aan geweldige games en profiteer van de scherpste prijzen op het hele web.</p>
      <button onClick={handleClick} data-cy="switch-catalogus">Bekijk Catalogus</button>
    </div>
  );
}

export default HomePage;

import HomePage from './components/HomePage';
import Cat from './components/Catalogus';
import Log from './components/login';
import Cart from './components/cart';
import { useLocation } from 'react-router-dom';
import Register from './components/register';
import Bestel from './components/bestellingen';
import Account from './components/profiel';
import Pay from './components/payment'


export const Home = () => (
  <div>
    <HomePage/>
  </div>
);

export const About = () => (
  <div>
    <h1>Over Ons</h1>
    <p>
      Welkom bij GameStart, jouw ultieme bestemming voor de nieuwste en meest opwindende online games!
      Bij GameStart delen we een diepe passie voor gaming en streven we ernaar om elke gamer de ultieme digitale speelervaring te bieden.
    </p>
    <p>
      Ons team bestaat uit fervente gamers die gepassioneerd zijn over de gamingwereld en de nieuwste trends op de voet volgen.
      We begrijpen de opwinding van het ontdekken nieuwe werelden, het behalen van epische overwinningen en het delen van deze ervaringen met medegamers.
    </p>
    <p>
      Bij GameStart geloven we in kwaliteit, diversiteit en toegankelijkheid. Daarom bieden we een zorgvuldig samengestelde selectie van de meest gewilde games in verschillende genres.
      Of je nu een doorgewinterde gamer bent of net begint aan je gaming avontuur, we hebben iets voor iedereen.
    </p>
    <p>
      Onze missie is om een vertrouwde plek te zijn voor gamers, waar je niet alleen de nieuwste releases kunt vinden, maar ook kunt rekenen op uitstekende klantenservice en deskundig advies.
      GameStart is meer dan een winkel; het is een gemeenschap die gamers verbindt en ondersteunt.
    </p>
    <p>
      Dank je wel voor het kiezen van GameStart als jouw gamingpartner. We kijken ernaar uit om samen met jou de grenzen van virtuele werelden te verkennen en onvergetelijke gamingmomenten te creëren!
    </p>
    <p>Happy gaming!</p>
  </div>
);

export const Catalogus = () => (
  <div>
    <Cat/>
  </div>
);

export const Winkelwagen = () => (
  <div>
    <Cart/>
  </div>
);

export const Bestellingen = () => (
  <div>
    <Bestel/>
  </div>
);

export const Profiel = () => (
    <div>
      <Account/>
    </div>
)

export const Payment = () => (
  <div>
    <Pay/>
  </div>
)


export const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <h1>Pagina niet gevonden</h1>
      <p>Er is geen pagina met als url {pathname}, probeer iets anders.</p>
    </div>
  );
};

export const Registreer = () => {
  return (
    <div>
      <Register/>
    </div>
  );
};

export const Login = () => {
  return (
    <div>
      <Log/>
    </div>
  );
};

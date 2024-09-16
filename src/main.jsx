import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFound, About, Catalogus, Home, Login, Winkelwagen, Registreer, Bestellingen, Profiel, Payment } from './pages.jsx';
import Root from './root';
import { CartProvider } from '../src/components/context/cartContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { TokenProvider } from '../src/components/context/tokenContext';
import { NavigationProvider } from '../src/components/context/navigationContext';
import { GameProvider } from './components/context/gameContext';
import PrivateRoute from './components/PrivateRoute.jsx';



const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root /> ,
    children: [
      { index: true, element: <Home/>},
      { path: '/', element: <Home/>},
      { path: 'over', element: <About/>},
      { path: 'catalogus', element: <Catalogus/> },
      { path: 'cart', element: <Winkelwagen/> },
      { path: '*', element: <NotFound/> },
      { path: 'login', element: <Login/>},
      { path: 'registreer', element: <Registreer/> },
      { 
        path: 'bestellingen', 
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Bestellingen/>
          }
        ]
      },
      { 
        path: 'profiel', 
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Profiel/>
          }
        ]
      },
      { 
        path: 'payment', 
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Payment/>
          }
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TokenProvider>
          <CartProvider>
            <NavigationProvider>
              <GameProvider>
                <RouterProvider router={router} />
              </GameProvider>
            </NavigationProvider>
          </CartProvider> 
        </TokenProvider>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </React.StrictMode> 
)



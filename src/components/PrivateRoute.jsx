import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useToken } from './context/tokenHooks';

export default function PrivateRoute() {
  const { token } = useToken();
  const { pathname } = useLocation();

  const loginPath = `/login?redirect=${pathname}`; 


  if (token !== 'null') {
    return <Outlet />;
  }

  return <Navigate replace to={loginPath} />;
}

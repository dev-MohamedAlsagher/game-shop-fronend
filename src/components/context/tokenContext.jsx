import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("null");

  useEffect(() => {
    const localToken = localStorage.getItem('authToken');
    if(localToken) {
      setAuthToken(localToken);
    }
  }, [])
  
  const setAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken)
  };

  return (
    <TokenContext.Provider value={{ token, setAuthToken }}>
      {children}
    </TokenContext.Provider>
  );
};

TokenProvider.propTypes = {
  children: PropTypes.node,
};

export default TokenContext;

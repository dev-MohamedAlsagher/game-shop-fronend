import { createContext } from 'react';
import PropTypes from 'prop-types';

const NavigationContext = createContext();



export const NavigationProvider = ({ children }) => {
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

NavigationProvider.propTypes = {
  children: PropTypes.node,
};

export default NavigationContext;

import { useState, useEffect } from "react";
import "./index.css";
import { Outlet, ScrollRestoration, NavLink } from "react-router-dom";
import Cart from "./components/cart";
import Register from "./components/register";
import { useCart } from "./components/context/cartHooks";
import { useToken } from "./components/context/tokenHooks";
import { useNavigate } from "react-router";

export default function Root() {
  //////////////////////////
  ///header
  //////////////////////////
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  //////////////////////////
  ///Login
  //////////////////////////
  const { token, setAuthToken } = useToken();

  const handleLogout = () => {
    setAuthToken("null");
    navigate("/");
  };

  //////////////////////////
  ///winkelwagen
  //////////////////////////
  const { cartItems, isCartVisible, setCartVisible } = useCart();

  const toggleCart = () => {
    setCartVisible(!isCartVisible);
  };

  const handlePayment = () => {
    if (cartItems.length > 0) {
      if (!token || token == "null") {
        navigate("/login");
      } else {
        navigate("/payment");
        setCartVisible(false);
      }
    }
  };

  //////////////////////////
  ///registratie
  //////////////////////////
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [registerSucceeded, setRegisterSucceeded] = useState(false);

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  const registerCallback = () => {
    setRegisterSucceeded(true);
  };

  useEffect(() => {
    if (registerSucceeded) {
      navigate("/login");
      setRegisterModalOpen(false);
    }
  }, [registerSucceeded, navigate]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  return (
    <div>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/over">Over ons</NavLink>
          </li>
          <li>
            <NavLink to="/catalogus">Catalogus</NavLink>
          </li>
          <li>
            <button onClick={toggleCart}>Winkelwagen</button>
          </li>
          <ul className="nav-rechts">
            {token !== "null" ? (
              <li className="dropdown-container">
                <button onClick={toggleDropdown}>
                  Account
                </button>
                {isDropdownOpen && (
                  <ul className="dropdown-content">
                    <li>
                      <NavLink to="/profiel">Profiel</NavLink>
                    </li>
                    <li>
                      <NavLink to="/bestellingen">Bestellingen</NavLink>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Uitloggen</button>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => openRegisterModal()}
                    data-cy="registreer-button"
                  >
                    Registreer
                  </button>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </ul>
      </nav>

      <Outlet />
      {isCartVisible && (
        <div className="cart-popup">
          <Cart cartItems={cartItems} handlePayment={handlePayment} />
        </div>
      )}
      {isRegisterModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={closeRegisterModal}>
              &times;
            </button>
            <Register
              isOpen={isRegisterModalOpen}
              onClose={closeRegisterModal}
              onRegister={registerCallback}
            />
          </div>
        </div>
      )}
      <ScrollRestoration />
    </div>
  );
}

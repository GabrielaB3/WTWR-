import React, { useContext } from "react"; // 1. Importamos useContext
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Se añade isLoggedIn, onRegisterClick y onLoginClick a las props
function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onRegisterClick,
  onLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  //  contexto para obtener los datos reales (name y avatar)
  const currentUser = useContext(CurrentUserContext);

  // Lógica para el placeholder (primera letra del nombre)
  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="Logo WTWR" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt={currentUser.name}
                />
              ) : (
                /* Placeholder si no hay imagen de avatar */
                <div className="header__avatar-placeholder">{userInitial}</div>
              )}
            </div>
          </NavLink>
        </>
      ) : (
        /* Si NO está logueado, mostramos botones de Registro e Ingreso */
        <div className="header__auth-container">
          <button className="header__add-clothes-btn" onClick={onRegisterClick}>
            Sign Up
          </button>
          <button className="header__add-clothes-btn" onClick={onLoginClick}>
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

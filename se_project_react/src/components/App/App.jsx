import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import * as api from "../../utils/api";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();

  // --- ESTADOS ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    _id: "",
  });
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  // --- MANEJADORES DE INTERFAZ ---
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const handleEditProfileClick = () => setActiveModal("edit-profile");
  const closeActiveModal = () => setActiveModal("");

  // --- LÓGICA DE USUARIO (API) ---

  const handleRegistration = ({ name, avatar, email, password }) => {
    api
      .register({ name, avatar, email, password })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;
    api
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          closeActiveModal();
          navigate("/profile");
        }
      })
      .catch(console.error);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const jwt = localStorage.getItem("jwt");
    api
      .updateCurrentUser({ name, avatar }, jwt)
      .then((updatedUser) => {
        // Usamos una función de actualización para asegurar el estado previo
        setCurrentUser((prevUser) => ({
          ...prevUser, // Mantenemos el _id y email existentes
          ...updatedUser, // Sobrescribimos con los nuevos name y avatar
        }));
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Limpieza total al salir
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({ name: "", avatar: "", _id: "" }); // Reseteamos el contexto
    navigate("/");
  };

  // --- LÓGICA DE PRENDAS ---

  const onAddItem = (inputValues) => {
    const jwt = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    setIsLoading(true);
    api
      .addItem(newCardData, jwt)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error al añadir prenda:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteCard = (cardId) => {
    const jwt = localStorage.getItem("jwt");
    api
      .removeItem(cardId, jwt)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== cardId));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");

    // Decidimos el método basado en el estado actual de isLiked
    const apiMethod = !isLiked ? api.addCardLike : api.removeCardLike;

    apiMethod(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch((err) => console.log(err));
  };

  // --- EFECTOS ---

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);

    api
      .getItems()
      .then((data) => setClothingItems(data.reverse()))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    // Si no hay token, no hacemos nada
    if (!jwt) return;

    // Si hay token, lo validamos una sola vez al cargar la app
    api
      .checkToken(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error("No valid token", err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      });
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      onLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
            isLoading={isLoading}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteCard={handleDeleteCard}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegistration}
            onClose={closeActiveModal}
            handleSecondaryAction={handleLoginClick}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onClose={closeActiveModal}
            handleSecondaryAction={handleRegisterClick}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

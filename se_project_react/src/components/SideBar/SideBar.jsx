import React, { useContext } from "react"; // Importar el hook
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext"; //  Importamos el contexto

export default function SideBar({ onEditProfileClick, onLogout }) {
  // Consumimos el contexto para obtener los datos reales del usuario
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {/* Mostramos el avatar del usuario o un placeholder  */}
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar}
          alt={currentUser?.name}
        />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>

      <div className="sidebar__controls">
        {/* Botón para abrir el modal de edición */}
        <button
          className="sidebar__edit-btn"
          type="button"
          onClick={onEditProfileClick}
        >
          Change profile data
        </button>

        {/* Botón para cerrar sesión */}
        <button
          className="sidebar__logout-btn"
          type="button"
          onClick={onLogout}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}

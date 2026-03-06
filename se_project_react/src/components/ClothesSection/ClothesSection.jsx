import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  // --- CORRECCIÓN DE SEGURIDAD PARA EL FILTRO ---
  const userItems = clothingItems.filter((item) => {
    // 1. Normalizamos: si owner es un objeto, tomamos el _id. Si es un string, lo usamos directo.
    const ownerId =
      typeof item.owner === "object" ? item.owner?._id : item.owner;

    // 2. Comparamos el ID normalizado con el del usuario actual
    return ownerId === currentUser?._id;
  });

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes__section-title">Your items</p>
        <button
          onClick={handleAddClick}
          className="clothes-section__add-btn"
          type="button"
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

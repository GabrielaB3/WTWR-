import React, { useContext } from "react"; // 1. Importamos el hook
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext"; // 2. Importamos el contexto

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Filtrar las prendas solo las que el owner coincide con el ID del usuario
  const userItems = clothingItems.filter((item) => {
    return item.owner === currentUser?._id;
  });

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes__section-title">Your items</p>
        <button onClick={handleAddClick} className="clothes-section__add-btn">
          + Add new
        </button>
      </div>

      <ul className="clothes-section__list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id} // Usamos _id que es el estándar de MongoDB
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

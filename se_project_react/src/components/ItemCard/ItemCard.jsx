import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Verificamos si al usuario actual le gusta esta prenda
  // item.likes es un array de IDs de usuarios
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // Clase dinámica para el botón (puedes definir el estilo en CSS)
  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  // Esta es la función que pide el Task 4
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {/* Mostramos el botón solo si el usuario está logueado */}
        {currentUser?._id && (
          <button
            className={itemLikeButtonClassName}
            type="button"
            onClick={handleLike}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;

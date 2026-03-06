import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    Array.isArray(item.likes) &&
    item.likes.some((user) => {
      const userId = typeof user === "string" ? user : user?._id;
      return userId === currentUser?._id;
    });

  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item._id, isLiked);
  };

  return (
    <li className="card">
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {/* Mostramos el botón solo si el usuario está logueado */}
        {currentUser?._id && (
          <button
            className={itemLikeButtonClassName}
            type="button"
            onClick={handleLike}
            aria-label={isLiked ? "Unlike" : "Like"}
          />
        )}
      </div>
    </li>
  );
}

export default ItemCard;

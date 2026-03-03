import React, { useContext } from "react"; // 1. Importar el hook
import "./ItemModal.css";
import closeBtn from "../../assets/closebtn.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDeleteCard }) {
  // 3. Suscribirse al contexto para obtener el usuario actual
  const currentUser = useContext(CurrentUserContext);

  // 4. Verificar si el usuario actual es el dueño de la prenda
  // Comparamos el ID del dueño de la carta con el ID del usuario logueado
  const isOwn = card.owner === currentUser?._id;

  const handleDeleteClick = () => {
    onDeleteCard(card._id);
  };

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeBtn}
            alt="close button"
            className="modal__close-icon modal__close-icon-item"
          />
        </button>
        <div className="modal__image-container">
          <img src={card.imageUrl} alt={card.name} className="modal__image" />
        </div>

        <div className="modal__footer">
          <div className="modal__info-wrapper">
            <h2 className="modal__caption">{card.name}</h2>

            {isOwn && (
              <button
                type="button"
                className="modal__delete-btn"
                onClick={handleDeleteClick}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

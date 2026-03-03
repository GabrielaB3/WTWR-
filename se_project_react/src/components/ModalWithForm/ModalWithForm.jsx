import closeBtn from "../../assets/closebtn.svg";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  children,
  buttonText = "Add garment",
  isOpen,
  onClose,
  onSubmit,
  secondaryButton,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeBtn}
            alt="close button"
            className="modal__close-icon"
          />
        </button>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <div className="modal__button-container">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {secondaryButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

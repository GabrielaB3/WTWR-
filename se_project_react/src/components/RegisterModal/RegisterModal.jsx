import React, { useEffect, useState } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  isOpen,
  onRegister,
  onClose,
  handleSecondaryAction,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 1. Valores iniciales
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatar: "",
  };

  // 2. Reglas de validación (Like AddItemModal)
  const validationRules = {
    email: {
      required: true,
      pattern: /^\S+@\S+\.\S+$/,
      requiredMessage: "Email is required",
      patternMessage: "Please enter a valid email address",
    },
    password: {
      required: true,
      minLength: 8,
      requiredMessage: "Password is required",
      minLengthMessage: "Password must be at least 8 characters long",
    },
    name: {
      required: true,
      minLength: 2,
      maxLength: 30,
      requiredMessage: "Name is required",
      minLengthMessage: "Name must be at least 2 characters",
    },
    avatar: {
      required: true,
      pattern: /^https?:\/\/.+/,
      requiredMessage: "Avatar URL is required",
      patternMessage: "Please enter a valid URL",
    },
  };

  const {
    values,
    handleChange,
    resetForm,
    errors,
    validateForm,
    getFormErrors,
  } = useFormWithValidation(defaultValues, validationRules);

  // Limpiar el formulario al cerrar
  useEffect(() => {
    if (!isOpen) {
      resetForm();
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const formErrors = getFormErrors(values);
    const isFormValid = Object.keys(formErrors).length === 0;

    setIsSubmitted(true);
    validateForm(values);

    if (isFormValid) {
      onRegister(values); // Esta función la crearemos en App.jsx
      // No reseteamos aquí, lo hace el useEffect al cerrar tras el éxito
    }
  };

  const handleFormChange = (evt) => {
    setIsSubmitted(true);
    handleChange(evt);
  };

  const secondaryBtn = (
    <button type="button" className="or__btn" onClick={handleSecondaryAction}>
      or Log In
    </button>
  );

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      secondaryButton={secondaryBtn}
    >
      {/* Campo Email */}
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className={`modal__input ${isSubmitted && errors.email ? "form-input-error" : ""}`}
          placeholder="Email"
          value={values.email}
          onChange={handleFormChange}
          required
        />
        <span
          className={`modal__error form-error ${isSubmitted && errors.email ? "visible" : ""}`}
        >
          {errors.email}
        </span>
      </label>

      {/* Campo Password */}
      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          className={`modal__input ${isSubmitted && errors.password ? "form-input-error" : ""}`}
          placeholder="Password"
          value={values.password}
          onChange={handleFormChange}
          required
        />
        <span
          className={`modal__error form-error ${isSubmitted && errors.password ? "visible" : ""}`}
        >
          {errors.password}
        </span>
      </label>

      {/* Campo Name */}
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          className={`modal__input ${isSubmitted && errors.name ? "form-input-error" : ""}`}
          placeholder="Name"
          value={values.name}
          onChange={handleFormChange}
          required
        />
        <span
          className={`modal__error form-error ${isSubmitted && errors.name ? "visible" : ""}`}
        >
          {errors.name}
        </span>
      </label>

      {/* Campo Avatar URL */}
      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatar"
          className={`modal__input ${isSubmitted && errors.avatar ? "form-input-error" : ""}`}
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleFormChange}
          required
        />
        <span
          className={`modal__error form-error ${isSubmitted && errors.avatar ? "visible" : ""}`}
        >
          {errors.avatar}
        </span>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;

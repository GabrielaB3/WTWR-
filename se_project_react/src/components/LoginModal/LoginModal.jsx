import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onLogin, onClose, handleSecondaryAction }) => {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation(
      { email: "", password: "" },
      {
        email: {
          required: true,
          pattern: /^\S+@\S+\.\S+$/,
          requiredMessage: "Email is required",
        },
        password: { required: true, requiredMessage: "Password is required" },
      },
    );

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) onLogin(values);
  };

  const secondaryBtn = (
    <button type="button" className="or__btn" onClick={handleSecondaryAction}>
      or Register
    </button>
  );

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryButton={secondaryBtn}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <span className="modal__error visible">{errors.email}</span>
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        <span className="modal__error visible">{errors.password}</span>
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;

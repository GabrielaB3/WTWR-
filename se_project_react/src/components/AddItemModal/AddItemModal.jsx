import React, { useEffect, useState } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "../../hooks/useFormWithValidation.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };

  const validationRules = {
    name: {
      required: true,
      minLength: 1,
      maxLength: 30,
      requiredMessage: "Name is required",
      maxLengthMessage: "Name must not exceed 30 characters",
    },
    imageUrl: {
      required: true,
      pattern: /^https?:\/\/.+/,
      requiredMessage: "Image URL is required",
      patternMessage: "Please enter a valid URL",
    },
    weatherType: {
      required: true,
      requiredMessage: "Please select a weather type",
    },
  };

  const {
    values,
    handleChange,
    resetForm,
    errors,
    getFormErrors,
    validateForm,
  } = useFormWithValidation(defaultValues, validationRules);

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
      onAddItem(values);
    }
  };

  const handleFormChange = (evt) => {
    handleChange(evt);
  };

  return (
    <ModalWithForm
      title="New Garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      buttonText="Add garment"
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="name"
          className={`modal__input ${
            isSubmitted && errors.name ? "modal__input_type_error" : ""
          }`}
          placeholder="Name"
          value={values.name}
          onChange={handleFormChange}
        />
        <span
          className={`modal__error ${isSubmitted && errors.name ? "modal__error_visible" : ""}`}
        >
          {errors.name}
        </span>
      </label>

      <label className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          id="clothing-imageUrl"
          className={`modal__input ${
            isSubmitted && errors.imageUrl ? "modal__input_type_error" : ""
          }`}
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleFormChange}
        />
        <span
          className={`modal__error ${isSubmitted && errors.imageUrl ? "modal__error_visible" : ""}`}
        >
          {errors.imageUrl}
        </span>
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-options">
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              name="weatherType"
              type="radio"
              className="modal__radio-input"
              value="hot"
              checked={values.weatherType === "hot"}
              onChange={handleFormChange}
            />{" "}
            Hot
          </label>

          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              name="weatherType"
              type="radio"
              className="modal__radio-input"
              value="warm"
              checked={values.weatherType === "warm"}
              onChange={handleFormChange}
            />{" "}
            Warm
          </label>

          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              name="weatherType"
              type="radio"
              className="modal__radio-input"
              value="cold"
              checked={values.weatherType === "cold"}
              onChange={handleFormChange}
            />{" "}
            Cold
          </label>
        </div>
        <span
          className={`modal__error ${isSubmitted && errors.weatherType ? "modal__error_visible" : ""}`}
        >
          {errors.weatherType}
        </span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

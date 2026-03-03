import React, { useEffect, useState } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "../../hooks/useFormWithValidation.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

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
    validateForm,
    getFormErrors,
  } = useFormWithValidation(defaultValues, validationRules);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const onSubmit = (formValues) => {
    onAddItem(formValues);
    onClose();
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    // Get validation errors synchronously
    const formErrors = getFormErrors(values);
    const isFormValid = Object.keys(formErrors).length === 0;

    setIsSubmitted(true);
    validateForm(values); // Update hook's state for error display

    if (isFormValid) {
      onSubmit(values);
      resetForm();
      setIsSubmitted(false);
    }
  };

  const handleFormChange = (evt) => {
    // Activar isSubmitted en la primera interacción
    setIsSubmitted(true);
    handleChange(evt);
  };

  return (
    <ModalWithForm
      title="New Garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="name"
          className={`modal__input modal__input_type_card-name ${
            isSubmitted && errors.name ? "form-input-error" : ""
          }`}
          placeholder="Name"
          value={values.name}
          onChange={handleFormChange}
        />
        <span
          className={`modal__error form-error ${
            isSubmitted && errors.name ? "visible" : ""
          }`}
          id="place-name-error"
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
          className={`modal__input modal__input_type_url ${
            isSubmitted && errors.imageUrl ? "form-input-error" : ""
          }`}
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleFormChange}
        />
        <span
          className={`modal__error form-error ${
            isSubmitted && errors.imageUrl ? "visible" : ""
          }`}
          id="place-name-erorr"
        >
          {errors.imageUrl}
        </span>
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleFormChange}
          />{" "}
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleFormChange}
          />{" "}
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleFormChange}
          />{" "}
          Cold
        </label>
        <span
          className={`modal__error form-error ${
            isSubmitted && errors.weatherType ? "visible" : ""
          }`}
        >
          {errors.weatherType}
        </span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

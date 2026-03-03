import { useState, useCallback } from "react";

export function useFormWithValidation(defaultValues, validationRules) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const validateField = useCallback(
    (name, value) => {
      if (!validationRules || !validationRules[name]) {
        return "";
      }

      const rule = validationRules[name];
      if (rule.required && (!value || value.trim() === "")) {
        return rule.requiredMessage || `${name} is required`;
      }

      if (rule.minLength && value.length < rule.minLength) {
        return (
          rule.minLengthMessage ||
          `${name} must be at least ${rule.minLength} characters`
        );
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        return (
          rule.maxLengthMessage ||
          `${name} must not exceed ${rule.maxLength} characters`
        );
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.patternMessage || `${name} is invalid`;
      }

      return "";
    },
    [validationRules],
  );

  const getFormErrors = useCallback(
    (formValues) => {
      const newErrors = {};

      Object.keys(formValues).forEach((fieldName) => {
        const error = validateField(fieldName, formValues[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
        }
      });

      return newErrors;
    },
    [validateField],
  );

  const validateForm = useCallback(
    (formValues) => {
      const newErrors = getFormErrors(formValues);
      const formIsValid = Object.keys(newErrors).length === 0;

      setErrors(newErrors);
      setIsValid(formIsValid);
      return formIsValid;
    },
    [getFormErrors],
  );

  function handleChange(evt) {
    const { name, value } = evt.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    // Validate the field as user types
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  }

  const resetForm = () => {
    setValues(defaultValues);
    setErrors({});
    setIsValid(true);
  };

  const handleSubmit = useCallback(
    (onSubmit) => {
      return (evt) => {
        evt.preventDefault();
        if (validateForm(values)) {
          onSubmit(values);
          resetForm();
        }
      };
    },
    [values, validateForm],
  );

  return {
    values,
    setValues,
    handleChange,
    handleSubmit,
    resetForm,
    errors,
    isValid,
    validateForm,
    getFormErrors,
  };
}

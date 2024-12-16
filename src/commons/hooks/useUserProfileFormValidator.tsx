import { useState } from "react";

const useUserProfileFormValidator = (fields) => {
  
  const initializeState = () => {
    return fields.reduce((acc, field) => {
      acc[field] = false;
      return acc;
    }, {});
  };

  const [fieldValidationStatus, setFieldValidationStatus] = useState(initializeState);
  const [displayEmptyErrorMessage, setDisplayEmptyErrorMessage] = useState(initializeState);

  const handleValidationChange = (field, isValid) => {
    setFieldValidationStatus((prevStatus) => ({
      ...prevStatus,
      [field]: isValid,
    }));
  };

  const allFieldsValid = Object.values(fieldValidationStatus).every((status) => status);

  return {
    fieldValidationStatus,
    setFieldValidationStatus,
    displayEmptyErrorMessage,
    setDisplayEmptyErrorMessage,
    handleValidationChange,
    allFieldsValid,
  };
};

export default useUserProfileFormValidator;
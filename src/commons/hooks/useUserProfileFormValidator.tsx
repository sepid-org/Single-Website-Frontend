import { useState } from "react";

const useUserProfileFormValidator = (fields) => {
  
  const initializeState = () => {
    return fields.reduce((acc, field) => {
      acc[field] = false;
      return acc;
    }, {});
  };

  const [fieldValidationStatus, setFieldValidationStatus] = useState(initializeState);
  const [displayEmptyErrorMessages, setDisplayEmptyErrorMessages] = useState(initializeState);

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
    displayEmptyErrorMessages,
    setDisplayEmptyErrorMessages,
    handleValidationChange,
    allFieldsValid,
  };
};

export default useUserProfileFormValidator;
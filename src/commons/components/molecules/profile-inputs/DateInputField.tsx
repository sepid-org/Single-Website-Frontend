import React, { useState, useEffect } from "react";
import { FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";

export default function DateInputField({
  label = null,
  date,
  setDate,
  handleValidationChange,
  isRequired,
  displayEmptyErrorMessage,
}) {

  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (displayEmptyErrorMessage) {
      setError(true);
      setHelperText('این فیلد نمی‌تواند خالی باشد.');
    }
    else {
      setError(false);
      setHelperText("");
    }
  }, [displayEmptyErrorMessage]);

  const minDate = new Date(new Date().getFullYear() - 120, new Date().getMonth(), new Date().getDate());
  const maxDate = new Date();

  useEffect(() => {
    if (date) {
      try {
        const parsedDate = new Date(date);
        setSelectedDate(parsedDate);
        validateDate(parsedDate);
      } catch (error) {
        setSelectedDate(null);
        handleValidationChange(false);
      }
    }
  }, [date]);

  const validateDate = (date) => {
    if (!date || date < minDate || date > maxDate) {
      setError(true);
      setHelperText("تاریخ وارد شده در بازه‌ی مجاز نیست.");
      handleValidationChange(false);
      return false;
    }
    setError(false);
    setHelperText("");
    handleValidationChange(true);
    return true;
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);

    if (newValue) {
      const isValid = validateDate(newValue);
      if (isValid) {
        const year = newValue.getFullYear();
        const month = String(newValue.getMonth() + 1).padStart(2, "0");
        const day = String(newValue.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
        setError(false);
        setHelperText('');
      } else {
        setDate(null);
      }
    } else {
      setDate(null);
      setError(true);
      setHelperText("تاریخ وارد شده در بازه‌ی مجاز نیست.");
      handleValidationChange(false);
    }
  };

  const handleBlur = () => {
    if (isRequired && !date?.trim()) {
      setError(true);
      setHelperText('این فیلد نمی‌تواند خالی باشد.');
    }
  };

  return (
    <FormControl required={isRequired} fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali} dateFormats={{ monthShort: "MMMM" }}>
        <DatePicker
          label={label}
          openTo="year"
          views={["year", "month", "day"]}
          value={selectedDate}
          onChange={handleDateChange}
          minDate={minDate}
          maxDate={maxDate}
          sx={{ overflow: "visible" }}
          slotProps={{
            textField: {
              error: error,
              helperText: helperText,
              onBlur: handleBlur,
              required: isRequired,
            },
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
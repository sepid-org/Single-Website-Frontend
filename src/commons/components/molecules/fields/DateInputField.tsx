import React, { useState, useEffect } from "react";
import { FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";

export default function DateInputField({ date, setDate, handleValidationChange }) {
  // Internal state to handle the date object and validation
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const minDate = new Date(new Date().getFullYear() - 120, new Date().getMonth(), new Date().getDate());
  const maxDate = new Date();

  // Initialize the date when the component mounts or the date prop changes
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

  const persianToEnglish = (str) => {
    const persianDigits = ["\u06F0", "\u06F1", "\u06F2", "\u06F3", "\u06F4", "\u06F5", "\u06F6", "\u06F7", "\u06F8", "\u06F9"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return str.replace(/[\u06F0-\u06F9]/g, (char) => englishDigits[persianDigits.indexOf(char)] || char);
  };

  const handleInput = (event) => {
    const normalizedValue = persianToEnglish(event.target.value);
    event.target.value = normalizedValue; // Replace the input value with the normalized value
  };

  const handleBlur = () => {
    if (!date?.trim()) {
      setError(true);
      setHelperText('این فیلد نمی‌تواند خالی باشد.');
    }
  };

  return (
    <FormControl required fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali} dateFormats={{ monthShort: "MMMM" }}>
        <DatePicker
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
              onInput: handleInput,
              onBlur: handleBlur,
            },
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

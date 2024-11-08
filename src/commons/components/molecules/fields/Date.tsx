import React, { useState, useEffect } from "react";
import { FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";

export default function DateInputField({ date, setDate }) {
  // Internal state to handle the date object
  const [selectedDate, setSelectedDate] = useState(null);

  // Initialize the date when the component mounts or date prop changes
  useEffect(() => {
    if (date) {
      try {
        setSelectedDate(new Date(date));
      } catch (error) {
        console.error("Invalid date format:", error);
        setSelectedDate(null);
      }
    }
  }, [date]);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);

    if (newValue) {
      // Format the date as YYYY-MM-DD
      const year = newValue.getFullYear();
      const month = String(newValue.getMonth() + 1).padStart(2, '0');
      const day = String(newValue.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setDate(formattedDate);
    } else {
      setDate(null);
    }
  };

  return (
    <FormControl required fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali} dateFormats={{ monthShort: 'MMMM' }}>
        <DatePicker
          openTo='year'
          views={['year', 'month', 'day']}
          value={selectedDate}
          onChange={handleDateChange}
          sx={{ overflow: "visible" }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

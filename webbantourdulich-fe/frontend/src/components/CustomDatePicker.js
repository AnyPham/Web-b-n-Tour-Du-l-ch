import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datePickerCustom.scss'; // Tạo file CSS tùy chỉnh
import { formatDate } from '../utils/utill';

const CustomDatePicker = (prop) => {
  const [date, setDate] = useState(null); // Giá trị ngày được chọn

  const startDates = prop.date;
  const transformedDates = startDates.map((date) => {
    const [day, month, year] = date.split('/');
    return new Date(`${year}-${month}-${day}`);
  });

  const handleDateChange = (selectedDate) => {
     if (transformedDates.some((date) => date.getTime() === selectedDate.getTime())) {
      setDate(selectedDate);
      const formattedDate = formatDate(selectedDate);
      prop.onDateChange(formattedDate); // Gọi hàm callback để truyền giá trị date về cho thành phần cha
    } 
  };

  return (
    <DatePicker
      selected={date}
      onChange={handleDateChange}
      className="custom-datepicker"
      placeholderText="Chọn tour"
      calendarClassName="custom-calendar"
      highlightDates={transformedDates}
    />
  );
};

export default CustomDatePicker;


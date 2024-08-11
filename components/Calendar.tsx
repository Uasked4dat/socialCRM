"use client";
// A dropdown calendar component that allows users to select a date

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarProps {
    initialDate?: Date;
    onDateChange?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ initialDate = new Date(), onDateChange }) => {
    const [startDate, setStartDate] = useState<Date | null>(initialDate);

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
        if (date && onDateChange) {
            onDateChange(date);
        }
    };

    return (
        <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            aria-label="Select a date"
        />
    );
};

export default Calendar; // Export the Calendar component
import { useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, isAfter, isBefore } from "date-fns";
import { DateRangePickerProps } from "./DateRangePickerProps";

const DateRangePicker = ({
    onDateRangeChange,
    minDate = new Date(),
    maxDate = addDays(new Date(), 365),
    excludeDates = [],
    includeDates = [],
    disabledDaysOfWeek = [],
  }: DateRangePickerProps) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
  
    const handleStartDateChange = (date: Date | null) => {
      setStartDate(date);
      if (date && endDate && isAfter(date, endDate)) {
        setEndDate(null);
      }
      onDateRangeChange({ startDate: date, endDate });
    };
  
    const handleEndDateChange = (date: Date | null) => {
      setEndDate(date);
      onDateRangeChange({ startDate, endDate: date });
    };
  
    const isDayDisabled = (date: Date) => {
      // Disable dates before minDate or after maxDate
      if (isBefore(date, minDate) || isAfter(date, maxDate)) return true;
      
      // Disable specific dates
      if (excludeDates.some(excluded => excluded.toDateString() === date.toDateString())) return true;
      
      // Only allow specific dates (if provided)
      if (includeDates.length > 0 && !includeDates.some(included => included.toDateString() === date.toDateString())) {
        return true;
      }
      
      // Disable specific days of week
      if (disabledDaysOfWeek.includes(date.getDay())) return true;
      
      return false;
    };
  
    return (
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={maxDate}
            filterDate={isDayDisabled}
            placeholderText="Select start date"
            className="w-full p-2 border rounded"
            dateFormat="MMMM d, yyyy"
            isClearable
          />
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || minDate}
            maxDate={maxDate}
            filterDate={isDayDisabled}
            placeholderText="Select end date"
            className="w-full p-2 border rounded"
            dateFormat="MMMM d, yyyy"
            isClearable
            disabled={!startDate}
          />
        </div>
      </div>
    );
  };
  
  export default DateRangePicker;
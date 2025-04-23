export interface DateRangePickerProps {
    onDateRangeChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
    minDate?: Date;
    maxDate?: Date;
    excludeDates?: Date[];
    includeDates?: Date[];
    disabledDaysOfWeek?: number[]; // 0 (Sunday) to 6 (Saturday)
  }
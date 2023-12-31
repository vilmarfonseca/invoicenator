import { useGlobalState } from "@/context/globalStateContext";
import React, { useEffect, useRef, useState } from "react";

interface DateInputFieldProps {
  action:string
}

const DateInputField:React.FC<DateInputFieldProps> = ({action}) => {
  const today = new Date().toISOString().split("T")[0];
  const { currentInvoice, setCurrentInvoice } = useGlobalState();
  const [selectedDate, setSelectedDate] = useState(
    action === "edit" ? currentInvoice?.dueDate : today,
  );
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleDatePickerClick = (e: MouseEvent) => {
      if (
        dateInputRef.current &&
        !dateInputRef.current.contains(e.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener("click", handleDatePickerClick);

    return () => {
      document.removeEventListener("click", handleDatePickerClick);
    };
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setCurrentInvoice({
        ...currentInvoice,
        ...{ dueDate: selectedDate },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="relative max-w-xs min-w-[200px] text-base">
      <span className="block py-2 text-gray-500 font-bold">Due Date</span>
      <div
        ref={dateInputRef}
        className="flex items-center justify-between gap-2 w-full px-3 py-2 text-gray-500 bg-white border rounded-md shadow-sm cursor-pointer outline-none focus:border-indigo-600"
        onClick={toggleDatePicker}
      >
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-full text-sm cursor-pointer appearance-none bg-transparent border-none focus:outline-none"
        />
      </div>
    </div>
  );
};

export default DateInputField;

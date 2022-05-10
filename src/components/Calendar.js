import { useState } from "react";
import DatePicker from "react-date-picker"

const Calendar = () => {
  const [dateValue, setDateValue] = useState(new Date());
  console.log(dateValue);

  return (
    <div>
      <DatePicker 
      onChange={setDateValue} value={dateValue}
      />
    </div>
  )
}

export default Calendar
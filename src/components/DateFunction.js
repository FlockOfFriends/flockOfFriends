

const DateFunction = (date) => {
  const altDate = date.toISOString();
  const newDate = altDate.replace(/[/]/g, "-");
  const shortDate = newDate.substring(0,newDate.indexOf("T"));
  const finalDate = `${shortDate}T23:00:00Z`; 
  return finalDate;
}

export default DateFunction
const parseDate = (date: Date | null) => {
  // take raw date and return a string in the format dd-mm-yyyy
  if (date == null) return "";
  return date
    .toLocaleString("es", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");
};

export default parseDate;

export function formatDate(dateInput) {
  const inputDate = new Date(dateInput);
  const today = new Date();
  const yesterday = new Date();

  // Set yesterday's date
  yesterday.setDate(today.getDate() - 1);

  // Helper function to reset time for comparison
  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  if (isSameDay(inputDate, today)) {
    return "Today";
  } else if (isSameDay(inputDate, yesterday)) {
    return "Yesterday";
  } else {
    // Return in 'Month Day, Year' format
    return inputDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

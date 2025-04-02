export const formatTime = (date = "") => {
  const options = { hour: "numeric", minute: "2-digit", hour12: true };
  const formattedTime = new Date(date).toLocaleTimeString("en-US", options);

  return formattedTime;
};

const formatDateWithDay = (date) => {
  const day = date.toLocaleDateString("en-IN", {
    weekday: "long",
  });

  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return `${day}, ${formattedDate}`;
};

export default formatDateWithDay;

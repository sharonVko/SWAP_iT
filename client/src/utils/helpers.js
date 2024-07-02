// utils/helpers.js

export const truncateDescription = (description, maxLength = 8) => {
  const words = description.split(" ");
  if (words.length > maxLength) {
    return words.slice(0, maxLength).join(" ") + "...";
  } else {
    return description;
  }
};

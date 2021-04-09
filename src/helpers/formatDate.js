export const formatDate = (date) => {
  const getDateNacimiento = new Date(date);
  const getDay = getDateNacimiento.getDate();
  const getMonth = getDateNacimiento.getMonth() + 1;
  const getYear = getDateNacimiento.getFullYear();
  return getDay + "/" + getMonth + "/" + getYear;
};

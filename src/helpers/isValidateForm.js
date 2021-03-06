export const isValidateForm = (userData) => {
  let res = [],
    result = true;
  Object.values(userData).forEach((v) => {
    if (Array.isArray(v)) {
      res.push(...v);
    } else {
      res.push(v);
    }
  });

  if (res.includes("") || res.includes(undefined)) {
    result = false;
  }
  return result;
};

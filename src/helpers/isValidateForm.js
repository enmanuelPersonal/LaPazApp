export const isValidateForm = (userData) => {
  console.log("Estoy qui",userData)
  let res = [],
    result = true;
  Object.values(userData).forEach((v) => {
    if (Array.isArray(v)) {
      res.push(...v);
    } else {
      res.push(v);
    }
  });
  console.log(res.includes(""), res.includes(undefined))
  if (res.includes("") || res.includes(undefined)) {
    result = false;
  }
  return result;
};

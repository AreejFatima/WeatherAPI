let apiKey = "c73aa228bfba692462f96e89080aa39a";

export const getApiReturnedValue = (searchText) => {
  let callWithZip =
    `http://api.openweathermap.org/data/2.5/forecast?zip=` +
    searchText +
    "&units=metric&appid=" +
    apiKey;

  let callWithCity =
    `http://api.openweathermap.org/data/2.5/forecast?q=` +
    searchText +
    "&units=metric&appid=" +
    apiKey;

  let isNumber = !isNaN(searchText);

  if (isNumber) {
    return callWithZip;
  } else {
    return callWithCity;
  }
};

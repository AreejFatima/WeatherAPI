let apiKey = "60bdbccc439a6a9cdc5612e9139e7458";

export const getApiReturnedValue = (searchText) => {
  const callWithZip =
    `http://api.openweathermap.org/data/2.5/forecast?zip=` +
    searchText +
    "&units=metric&appid=" +
    apiKey;

  const callWithCity =
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

export const cities = [
    "Mumbai","Pune","Bengaluru","Chennai","Kolkata","Jaipur"
  ];

export const airportData = {
  Mumbai: {
    code: "BOM",
    name: "Chhatrapati Shivaji Maharaj International Airport",
  },
  Pune: {
    code: "PNQ",
    name: "Pune International Airport",
  },
  Bengaluru: {
    code: "BLR",
    name: "Kempegowda International Aiport",
  },
  Chennai : {
    code: "MAA",
    name: "Chennai International Airport",
  },
  Kolkata: {
    code: "CCU",
    name: "Netaji Subhas Chandra Bose International Airport",
  },
  Jaipur: {
    code: "JAI",
    name: "Jaipur International Airport",
  }
}


export const getCityFromCode = (code) => {
  for (const [city, data] of Object.entries(airportData)) {
    if (data.code === code) {
      return city;
    }
  }
  return null; 
}

export const getCodeFromCity = (cityName) => {
  const data = airportData[cityName];
  return data ? data.code : null;
};
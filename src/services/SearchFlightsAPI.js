import axios from "axios";
import { getCodeFromCity } from "../utils/airportInfo";

const SearchFlightsAPI = async ({ from, to, date }) => {

  const departure = getCodeFromCity(from)
  const arrival = getCodeFromCity(to)
  
  const trips = `${departure}-${arrival}`
  const tripDate = date

  const response = await axios.get("http://localhost:3000/api/v1/flightinstance/", {
    params: {
      trips,
      tripDate
    },
  });  
  return response;
};

export default SearchFlightsAPI;

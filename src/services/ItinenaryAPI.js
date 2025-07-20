import axios from 'axios';
import SHA256 from 'crypto-js/sha256';

const CreateItinenary = async (userid,flightid,from,to,date,time,passengerCount,price) => {
  const currTime = Date.now()
  const input = `${userid}-${currTime}`;
  const itineraryid =  SHA256(input).toString();
  await axios.post("http://localhost:4000/api/v1/itinerary",
      {
      itineraryid,
      userid,
      flightid,
      from,
      to,
      date,
      time,
      passengerCount,
      price
   } 
  )
  return itineraryid
}

const GetItinerary =  async (itineraryid) => {
  const response = await axios.get(`http://localhost:4000/api/v1/itinerary/${itineraryid}`)
  console.log(response)
  return response
}

const FillItinerary = async (itinenaryid,passengers) => {
  await axios.patch(`http://localhost:4000/api/v1/itinerary/${itinenaryid}`,{
      passengers
  })
}

export { CreateItinenary,GetItinerary,FillItinerary }

import axios from 'axios';
import SHA256 from 'crypto-js/sha256';

const CreateBooking = async (flightInstanceId,userId,totalCost,noofSeats,itineraryid) => {
  console.log(flightInstanceId,userId,totalCost,noofSeats,itineraryid)
  const currTime = Date.now()
  const input = `${currTime}-${userId}`;
  const bookingid =  SHA256(input).toString();
  await axios.post("http://localhost:4000/api/v1/bookings/",
    {
     flightInstanceId,
     userId,
     totalCost,
     noofSeats,
     itineraryid,
     bookingid
   } 
  )
  return bookingid
}

const GetBooking = async (bookingid) => {
   console.log(bookingid)
   const data =  await axios.get(`http://localhost:4000/api/v1/bookings/${bookingid}`)
   return data
}


export { CreateBooking ,GetBooking }
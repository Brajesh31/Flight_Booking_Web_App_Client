import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, Calendar, Clock, User, CreditCard, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { useSelector } from "react-redux";

import CustomButton from "../components/button";
import Navbar from '../components/navbar';
import { FillItinerary, GetItinerary } from '../services/itinenaryAPI';
import { useToast } from '../context/toastContext';
import { getCityFromCode } from '../utils/airportInfo';
import SeatView from '../components/seatView';
import { CreateBooking } from '../services/bookingAPI';
import dayjs from 'dayjs';

const CheckoutPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const {showInfo,showError} = useToast()

  const userid = useSelector((state) => state.user.user?.id);
  const itineraryid = searchParams.get("itineraryid")

   const handleProceed = async () => {
      if(currentPassengerIndex+1 !== travellers){
        showError("Fill all Passenger Details as per count")
        return 
      }

      const incompletePassenger = passengers.find(
      (p) => !p.name || !p.age || !p.gender
      );

      if (incompletePassenger) {
      showError("Fill all passenger details before proceeding");
      return;
      }
      FillItinerary(itineraryid,passengers)
      const data= await GetItinerary(itineraryid)
      console.log(data)
      const bookingid =await CreateBooking(data.data.data.flightid,userid,data.data.data.totalPrice,travellers,itineraryid)

      navigate(`/payment?bookingId=${bookingid}`, { state: { from: location.pathname }}); 
    }
  
   const [travellers,setTravellers] = useState()
   const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);
   const [showSeatView, setShowSeatView] = useState(false);


   const [journeyDetails, setJourneyDetails] = useState({
    from: "",
    to: "",
    date: "",
    time: ""
  });


 const [passengers, setPassengers] = useState([
    { name: "", age: "", gender: "", seat: "" , class: "Economy"}
  ]);

  const handleChange = (index, e) => {
    const updated = [...passengers];
    updated[index][e.target.name] = e.target.value;
    setPassengers(updated);
  };

  const handleAddPassenger = () => {
    if(currentPassengerIndex+1 >= travellers){
      showInfo("Passengers already selected")
      return
    }
    const newPassengers = [...passengers, { name: "", age: "", gender: "", seat: "" , class: ""}];
    setPassengers(newPassengers);
    setCurrentPassengerIndex(newPassengers.length - 1); 
  };

 const handleSeatSelect = (seat) => {
  const updated = [...passengers];
  updated[currentPassengerIndex].seat = seat;
  setPassengers(updated);
};


 useEffect(()=>{
    const fetchItinerary = async () => {
    try {
      const response = await GetItinerary(itineraryid); 
      const data = response.data.data
      const traveller = data.totalPrice / data.price

      setJourneyDetails({
        from: data.from,
        to: data.to,
        date: data.date,
        time: data.time
      });

      setTravellers(traveller);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
    }
  };

  fetchItinerary();
}, [itineraryid, userid]);

  return(
    <>
      <Navbar/>
      <div className="absolute top-18 left-0 w-full h-[40vh]  bg-gradient-to-b from-gray-100 via-blue-200 to-orange-300 z-0 " />  
       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="relative max-w-3xl mx-auto">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl opacity-50 blur-3xl -z-10" />
        
        <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-slate-800 p-6 text-white">
            <div className="flex items-center gap-3 justify-center">
              <CreditCard className="w-6 h-6" />
              <h2 className="text-2xl" style={{ fontFamily: "Lobster, cursive" }}>Complete Your Booking</h2>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Journey Details Card */}
            <div className="bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Flight Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <PlaneTakeoff/>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">From</p>
                      <p className="font-semibold text-gray-800">{journeyDetails.from}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                      <p className="font-semibold text-gray-800">{dayjs(journeyDetails.date).format("DD MMMM YYYY")}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <PlaneLanding/>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">To</p>
                      <p className="font-semibold text-gray-800">{journeyDetails.to}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Time</p>
                      <p className="font-semibold text-gray-800">{journeyDetails.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         <div className="space-y-6">


   <div className="flex items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-200 to-purple-400 rounded-lg shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          Traveller Information
        </h3>
        <div className="text-sm font-semibold text-purple-700 bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-2 rounded-full shadow-md border border-purple-200">
          Passenger {currentPassengerIndex + 1} of {travellers || 0}
        </div>
      </div>
      
      <div className='text-sm font-medium text-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 rounded-xl shadow-md border border-amber-200 mb-6 flex items-center gap-2'>
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
        Please enter valid Passenger information as per Government IDs, Tripzy wont be responsible for any mismatch during check-in
      </div>

      {passengers.map((travellerDetails, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 mb-6 relative overflow-hidden"
        >
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-purple-400"></div>
          
          <div className="text-xl font-bold text-gray-800 mb-4 col-span-full flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-200 to-purple-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {index + 1}
            </div>
            Passenger {index + 1}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Full Name
            </label>
            <input
              name="name"
              type="text"
              autoComplete='off'
              placeholder="Enter your full name"
              value={travellerDetails.name}
              onChange={(e) => handleChange(index, e)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Age
            </label>
            <input
              name="age"
              type="number"
              autoComplete='off'
              placeholder="Enter your age"
              value={travellerDetails.age}
              onChange={(e) => handleChange(index, e)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              Gender
            </label>
            <select
              name="gender"
              value={travellerDetails.gender}
              onChange={(e) => handleChange(index, e)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <option value="" className="text-gray-400">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Seat
            </label>
            <CustomButton
              text="Select Seat"
              onClick={() => setShowSeatView(true)} 
            />
            <div className="text-sm font-medium text-gray-600 bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-2 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
              <span>Seat Selected:</span>
              <span className="font-bold text-blue-600">
                {travellerDetails.seat || "None"}
              </span>
            </div>
        
           { showSeatView && currentPassengerIndex === index && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
                <SeatView
                  onSeatSelect={(seat) => {
                    handleSeatSelect(seat)
                    setShowSeatView(false)
                  }}
                />
              </div>
            </div>
          )}
          </div>
        </div>
      ))}

      <div className="mb-6">
        <CustomButton 
          text="+ Add Another Passenger" 
          onClick={handleAddPassenger}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        />
      </div>
    </div>

    <div className='text-sm font-semibold text-red-800 bg-gradient-to-r from-red-50 to-pink-50 px-4 py-3 rounded-xl shadow-md border border-red-200 mb-6 flex items-center gap-2'>
      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      Confirm Details before Proceeding as you wont be able to change details after this
    </div> 

    <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            Cost Breakdown
          </h4>
          <div className="space-y-2">
             <div className="flex justify-between text-gray-600">
              <span>Base Fare</span>
              <span>₹5999</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes & Fees</span>
              <span>₹{(passengers.length * 450).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Discount</span>
              <span>₹{(passengers.length * 450).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Seat Selection</span>
              <span>₹0</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-3">
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total Amount</span>
                <span className="text-emerald-600">
                  ₹5999
                </span>
              </div>
            </div>
          </div>
        </div>
    
    <div className="flex justify-center"> 
      <CustomButton 
        onClick={handleProceed} 
        text="Proceed to Payment"
      />
    </div>
        </div>
      </div>
    </div>
  </div>
  </>
 )
}
export default CheckoutPage

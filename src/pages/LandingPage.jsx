import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Plane, Calendar, Users, MapPin } from "lucide-react";

import { useToast } from "../context/toastContext";
import CustomButton from "../components/button";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Trending from "../components/promotion/trending";
import AutoCompleteInput from "../components/common/AutoCompleteInput";

const LandingPage = () => {

  const navigate = useNavigate()
  const { showError,showInfo } = useToast()

  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
    travelClass: "Economy",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

     const handleSubmit = () => {
     const { from, to, date, passengers, travelClass } = form;
  
     if (!from || from.trim() === "") {
       showError("Please select a Departure city");
       return;
     }
   
     if (!to || to.trim() === "") {
       showError("Please select a destination city");
       return;
     }
   
     if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
       showInfo("Source and destination cannot be the same");
       return;
     }
   
     if (!date) {
       showError("Please select a travel date");
       return;
     }
   
     if (!passengers || passengers <= 0) {
       showError("Please select at least one passenger");
       return;
     }
   
     if (!travelClass) {
       showError("Please select a travel class");
       return;
     }
   
     const query = new URLSearchParams({
       from,
       to,
       date,
       passengers,
       class: travelClass,
     });
   
     navigate(`/search?${query.toString()}`);
   };


  return (
    <>
      <Navbar />
      <div className="relative min-h-screen w-full font-sans overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Airplane Background"
          className="absolute top-0 left-0 w-full h-[80vh] md:h-[75vh] sm:h-[100vh] object-cover brightness-75 -z-10"
        />

        {/* Form Card */}
        <div className="relative z-10 flex flex-col justify-center items-center pt-10 mb-12">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            {/* Decorative Bubbles */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-900 rounded-full -ml-4 z-10"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-900 rounded-full -mr-4 z-10"></div>
            <div className="absolute left-8 right-8 top-1/2 border-t-2 border-dashed border-gray-300 transform -translate-y-1/2"></div>

            {/* Header */}
            <div className="bg-slate-800 p-4 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-12 translate-y-12"></div>

              <div className="relative z-10 flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <img src="../../public/Tripzy logo.png" className="w-4 h-4" alt="Logo" />
                </div>
                <h1 className="text-2xl" style={{ fontFamily: "Lobster, cursive" }}>
                  Find the best flights to your destination
                </h1>
              </div>
            </div>

            {/* Inputs */}
            <div className="p-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-48 sm:gap-4">
                {/* From */}
                <div className="relative">
                  <label className="flex items-center text-gray-600 mb-3 font-semibold text-sm uppercase tracking-wide">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    Departure
                  </label>
                  <div className="relative">
                    <AutoCompleteInput
                     label="Departure"
                     name="from"
                     value={form.from}
                     onChange={(name, value) => setForm({ ...form, [name]: value })}
                     icon={<MapPin />}
                     color="blue"
                    />
                  </div>
                </div>

                {/* To */}
                <div className="relative">
                  <label className="flex items-center text-gray-600 mb-3 font-semibold text-sm uppercase tracking-wide">
                    <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                    Destination
                  </label>
                  <div className="relative">
                    <AutoCompleteInput
                     label="Destination"
                     name="to"
                     value={form.to}
                     onChange={(name, value) => setForm({ ...form, [name]: value })}
                     icon={<MapPin />}
                     color="indigo"
                   />
                  </div>
                </div>
              </div>

              {/* Plane icon */}
              <div className="flex items-center justify-center my-6 relative">
                <div className="w-full h-px bg-gradient-to-r from-blue-500 via-gray-300 to-indigo-500"></div>
                <div className="absolute bg-white p-2 rounded-full border-2 border-gray-200">
                  <Plane className="w-5 h-5 text-blue-600 transform rotate-90" />
                </div>
              </div>
            </div>

            {/* Extra Fields */}
            <div className="px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date */}
                <div>
                  <label className="flex items-center text-gray-600 mb-2 font-semibold text-sm uppercase tracking-wide">
                    <Calendar className="w-4 h-4 mr-2 text-green-500" />
                    Departure Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gray-50 hover:bg-white font-medium"
                  />
                </div>

                {/* Passengers */}
                <div>
                  <label className="flex items-center text-gray-600 mb-2 font-semibold text-sm uppercase tracking-wide">
                    <Users className="w-4 h-4 mr-2 text-orange-500" />
                    Passengers
                  </label>
                  <input
                    name="passengers"
                    type="number"
                    min="1"
                    max="9"
                    value={form.passengers}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-gray-50 hover:bg-white font-medium text-center text-xl"
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="flex items-center text-gray-600 mb-2 font-semibold text-sm uppercase tracking-wide">
                    <div className="w-4 h-4 mr-2 bg-purple-500 rounded"></div>
                    Travel Class
                  </label>
                  <select
                    name="travelClass"
                    value={form.travelClass}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-gray-50 hover:bg-white font-medium appearance-none cursor-pointer"
                  >
                    <option value="Economy">Economy Class</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <CustomButton text={"search"} icon={FaSearch} onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
        <Trending />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;

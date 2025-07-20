import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Plane, Clock, ArrowRight, Search } from "lucide-react";
import { useEffect, useState } from "react";

import SearchFlightsAPI from "../services/SearchFlightsAPI";
import Navbar from "../components/navbar";
import CustomButton from "../components/button";
import { CreateItinenary } from "../services/itinenaryAPI";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  

  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [time, setTime] = useState("")

  const userid = useSelector((state) => state.user.user?.id);

  const query = new URLSearchParams(location.search);
  const from = query.get("from");
  const to = query.get("to");
  const date = query.get("date");
  const passengerCount = Number(query.get("passengers"));

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleEmptySearch = () => {
    navigate("/");
  };

  const handleCheckout = async (price,flightid) => {
  try {
    const itineraryid = await CreateItinenary( userid, flightid, from, to, date, time, passengerCount, price);
    navigate(`/checkout?itineraryid=${itineraryid}`);
  } catch (err) {
    console.error("Failed to create itinerary", err);
  }
}

  const filteredFlights = flights.filter((flight) => {
    const min = filters.minPrice ? parseInt(filters.minPrice) : 0;
    const max = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
    return flight.flight.price >= min && flight.flight.price <= max;
  });

  const calculateFlightDuration = (departureTime, arrivalTime) => {
  const dep = new Date(`2000-01-01T${departureTime}`);
  const arr = new Date(`2000-01-01T${arrivalTime}`);
  if (arr < dep) arr.setDate(arr.getDate() + 1); 
  const diff = arr - dep;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  setTime(`${hours}h ${minutes}m`)
  return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
        setLoading(true);
        const data = {
          from,
          to,
          date
        }
        SearchFlightsAPI( data )
          .then((res) => {
            const processedFlights = res.data.data.map((flightInstance) => {
              const { departureTime, arrivalTime } = flightInstance.flight;
              const duration = calculateFlightDuration(departureTime, arrivalTime);
              return { ...flightInstance, duration }; 
            });
            setFlights(processedFlights);
            setError("");
          })
          .catch((err) => {
            setError("Failed to fetch flights",err)
          })
          .finally(() => setLoading(false))
         } , [from, to, date])

          console.log(flights)

  return (
    <>
      <Navbar />
      <div className="absolute top-18 left-0 w-full h-[40vh] bg-gradient-to-b from-gray-100 via-blue-200 to-orange-300 z-0" />
      <div className="relative z-10 p-4 sm:p-6 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className="w-full lg:w-1/4 bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700">Min Price</label>
                <input
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  type="number"
                  className="w-full mt-1 border rounded p-2"
                  placeholder="e.g. 4000"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Max Price</label>
                <input
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  type="number"
                  className="w-full mt-1 border rounded p-2"
                  placeholder="e.g. 6000"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="w-full lg:w-3/4 space-y-4">
            {loading ? (
              <p className="text-center">Loading flights...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : filteredFlights.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 max-w-md mx-auto">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 text-gray-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    No flights found
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    No flights match your search criteria. Try adjusting your filters or search dates.
                  </p>
                  <div className="mt-8">
                    <CustomButton text={"modify search"} onClick={handleEmptySearch} />
                  </div>
                </div>
              </div>
            ) : (
              filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                          <Plane className="w-5 h-5 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{flight.flight.flightNumber}</h3>
                      </div>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 mb-1">{flight.flight.departureAirport.City.name}</div>
                          <div className="text-sm text-gray-500"></div>
                        </div>
                        <div className="flex-1 flex items-center justify-center relative">
                          <div className="w-full h-0.5 bg-gray-200 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 group-hover:from-blue-500 group-hover:to-blue-600 transition-all"></div>
                          </div>
                          <div className="absolute bg-white border-2 border-blue-400 rounded-full p-1 group-hover:border-blue-500 transition-colors">
                            <ArrowRight className="w-4 h-4 text-blue-500" />
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 mb-1">{flight.flight.arrivalAirport.City.name}</div>
                          <div className="text-sm text-gray-500"></div>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">{flight.duration}</span>
                      </div>
                    </div>

                    <div className="ml-8 text-right">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-2xl p-6 group-hover:from-green-100 group-hover:to-emerald-100 transition-all">
                        <div className="text-3xl font-bold text-slate-800 mb-1">
                          ₹{flight.flight.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 mb-4">per person</div>
                           <CustomButton text={"select flight"} onClick={() => handleCheckout(flight.flight.price,flight.id)} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;

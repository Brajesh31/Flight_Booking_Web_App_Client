import { useState, useRef, useEffect } from "react";
import { cities,airportData } from "../../utils/airportInfo";

const defaultCities = ["Mumbai","Pune","Bengaluru"];


const AutoCompleteInput = ({ name, value, onChange, color }) => {

 const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef();

  const handleInputChange = (e) => {
  const val = e.target.value;
  onChange(name, val);
  setActiveIndex(-1);

  if (val.length > 0) {
    const filtered = cities
      .filter(city => city.toLowerCase().startsWith(val.toLowerCase()))
      .slice(0, 3);
    setSuggestions(filtered);
  } else {
    setSuggestions(defaultCities.slice(0, 3))
  }
};


  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[activeIndex]);
    }
  };

  const selectSuggestion = (val) => {
    onChange(name, val);
    setSuggestions([]);
    setActiveIndex(-1);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        const isValid = cities.some(city => city.toLowerCase() === value.toLowerCase());
        if (!isValid) onChange(name, "")
        setSuggestions([]);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value, name, onChange]);

  return (
    <div className="relative" ref={containerRef}>
  <div className={`relative border-2 border-gray-200 rounded-xl transition-all duration-300 bg-gray-50 hover:bg-white focus-within:border-${color}-500 focus-within:ring-4 focus-within:ring-${color}-100`}>
    <input
     name={name}
     type="text"
     autoComplete="off"
     placeholder={name}
     value={value}
     onChange={handleInputChange}
     onKeyDown={handleKeyDown}
     onFocus={() => {
       if (!value) {
         setSuggestions(defaultCities.slice(0, 3));
       }
     }}
  className="w-full px-4 py-3 text-xl font-bold bg-transparent focus:outline-none rounded-xl"
/>
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
      <div className={`w-3 h-3 bg-${color}-500 rounded-full`}></div>
    </div>
  </div>

  {suggestions.length > 0 && (
    <ul className="absolute z-50 bg-white shadow-lg border border-gray-200 w-full mt-2 rounded-lg overflow-hidden max-h-40 overflow-y-auto">
      {suggestions.map((city, index) => (
        <li
          key={index}
          onMouseDown={() => selectSuggestion(city)}
          className={`px-4 py-2 cursor-pointer ${
            index === activeIndex ? "bg-indigo-100 font-semibold" : "hover:bg-gray-100"
          } text-gray-700`}
        >
          {city}
        </li>
      ))}
    </ul>
  )}

  {value && airportData[value] && (
    <div className="mt-2 text-sm px-4 pb-2 rounded-md w-fit">
      {airportData[value].code} |{" "}
      {airportData[value].name.length > 30
        ? airportData[value].name.slice(0, 30) + "..."
        : airportData[value].name}
    </div>
  )}
</div>
  );
};

export default AutoCompleteInput;

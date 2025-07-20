import React from 'react';
import { Download, Plane, Clock, MapPin, User, Hash } from 'lucide-react';

const AirlineTicket = () => {
  const ticketData = {
    passengerName: "JOHN SMITH",
    from: "NEW YORK",
    to: "LOS ANGELES",
    fromCode: "JFK",
    toCode: "LAX",
    date: "15 JUL 2025",
    time: "14:30",
    gate: "A12",
    seat: "12A",
    flight: "AA 1234",
    class: "ECONOMY",
    terminal: "Terminal 3",
    boardingTime: "14:00",
    pnr: "ABC123",
    airline: "American Airlines"
  };

  const downloadTicket = () => {
    // Create a canvas element to render the ticket
    const ticketElement = document.getElementById('airline-ticket');
    
    // For a real implementation, you would use html2canvas or similar library
    // Here we'll create a simple download simulation
    const ticketInfo = `
BOARDING PASS
${ticketData.airline}
${ticketData.flight}

Passenger: ${ticketData.passengerName}
From: ${ticketData.from} (${ticketData.fromCode})
To: ${ticketData.to} (${ticketData.toCode})
Date: ${ticketData.date}
Departure: ${ticketData.time}
Gate: ${ticketData.gate}
Seat: ${ticketData.seat}
Class: ${ticketData.class}
PNR: ${ticketData.pnr}
    `;
    
    const blob = new Blob([ticketInfo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boarding-pass-${ticketData.pnr}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Ticket Container */}
        <div 
          id="airline-ticket"
          className="bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Plane className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold">{ticketData.airline}</h1>
                  <p className="text-gray-300">Boarding Pass</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">Flight</p>
                <p className="text-xl font-bold">{ticketData.flight}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Passenger Info */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Passenger</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{ticketData.passengerName}</h2>
            </div>

            {/* Flight Route */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">From</span>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">{ticketData.fromCode}</p>
                  <p className="text-lg text-gray-600">{ticketData.from}</p>
                </div>
                
                <div className="flex-1 mx-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-white px-4">
                        <Plane className="w-8 h-8 text-gray-400 transform rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">To</span>
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">{ticketData.toCode}</p>
                  <p className="text-lg text-gray-600">{ticketData.to}</p>
                </div>
              </div>
            </div>

            {/* Flight Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{ticketData.date}</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Departure</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{ticketData.time}</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Gate</span>
                <p className="text-lg font-bold text-gray-900">{ticketData.gate}</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-2">Seat</span>
                <p className="text-lg font-bold text-gray-900">{ticketData.seat}</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
              <div>
                <span className="text-gray-500 uppercase tracking-wide">Class:</span>
                <span className="ml-2 font-medium text-gray-900">{ticketData.class}</span>
              </div>
              <div>
                <span className="text-gray-500 uppercase tracking-wide">Terminal:</span>
                <span className="ml-2 font-medium text-gray-900">{ticketData.terminal}</span>
              </div>
              <div>
                <span className="text-gray-500 uppercase tracking-wide">Boarding:</span>
                <span className="ml-2 font-medium text-gray-900">{ticketData.boardingTime}</span>
              </div>
            </div>

            {/* PNR and Barcode Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">PNR</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{ticketData.pnr}</span>
              </div>
              
              {/* Simulated Barcode */}
              <div className="mb-6">
                <div className="flex space-x-px">
                  {Array.from({ length: 50 }, (_, i) => (
                    <div
                      key={i}
                      className={`h-12 ${
                        Math.random() > 0.5 ? 'bg-gray-900 w-1' : 'bg-gray-900 w-0.5'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-center text-xs text-gray-500 mt-2">{ticketData.pnr}1234567890</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-8 text-center">
          <button
            onClick={downloadTicket}
            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">Download Boarding Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AirlineTicket;
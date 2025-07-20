import React, { useState } from 'react';
import { Plane, User, X } from 'lucide-react';
import CustomButton from './button';

const SeatView = ({ onSeatSelect }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const seatMap = [
  { row: 1, seats: ['1A', '1B', '1C', '', '1D', '1E', '1F'], class: 'economy' },
  { row: 2, seats: ['2A', '2B', '2C', '', '2D', '2E', '2F'], class: 'economy' },
  { row: 3, seats: ['3A', '3B', '3C', '', '3D', '3E', '3F'], class: 'economy' },
  { row: 4, seats: ['4A', '4B', '4C', '', '4D', '4E', '4F'], class: 'economy' },
  { row: 5, seats: ['5A', '5B', '5C', '', '5D', '5E', '5F'], class: 'economy' },
  ];

  // Define occupied seats
  const occupiedSeats = new Set([
    '1A', '2C', '3B', '4A', '5D', '6B', '7F', '8C',
    '9A', '10B', '11C', '12D', '13E', '14F', '15A',
    '16B', '17C', '18D', '19E', '20F', '21A', '22B',
    '23C', '24D', '25E', '26F', '27A', '28B', '29C', '30D'
  ]);

  const getSeatStatus = (seat) => {
    if (!seat) return 'empty';
    if (occupiedSeats.has(seat)) return 'occupied';
    if (seat === selectedSeat) return 'selected';
    return 'available';
  };

  const getSeatPrice = (seatClass) => {
    switch (seatClass) {
      case 'first': return 500;
      case 'business': return 200;
      case 'economy': return 0;
      default: return 0;
    }
  };

  const getSeatStyles = (seat, seatClass) => {
    const status = getSeatStatus(seat);
    const baseStyles = 'w-8 h-8 rounded-t-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-medium relative';
    
    switch (status) {
      case 'occupied':
        return `${baseStyles} bg-red-100 border-red-300 cursor-not-allowed`;
      case 'selected':
        return `${baseStyles} bg-blue-500 border-blue-600 text-white shadow-lg transform scale-110`;
      case 'available':
        switch (seatClass) {
          case 'first':
            return `${baseStyles} bg-amber-50 border-amber-300 hover:bg-amber-100 hover:border-amber-400 hover:shadow-md`;
          case 'business':
            return `${baseStyles} bg-purple-50 border-purple-300 hover:bg-purple-100 hover:border-purple-400 hover:shadow-md`;
          case 'economy':
            return `${baseStyles} bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:shadow-md`;
          default:
            return `${baseStyles} bg-gray-50 border-gray-300`;
        }
      default:
        return baseStyles;
    }
  };

  const handleSeatClick = (seat) => {
    if (!seat || occupiedSeats.has(seat)) return;

   const newSeat = seat === selectedSeat ? null : seat;
   setSelectedSeat(newSeat);
   onSeatSelect(newSeat);
  };

  const renderSeat = (seat, seatClass) => {
    if (!seat) {
      return <div key="empty" className="w-8 h-8"></div>;
    }

    const status = getSeatStatus(seat);
    const isWindow = seat.endsWith('A') || seat.endsWith('F');
    const isAisle = seat.endsWith('C') || seat.endsWith('D');

    return (
      <div
        key={seat}
        className={getSeatStyles(seat, seatClass)}
        onClick={() => handleSeatClick(seat, seatClass)}
        title={`Seat ${seat} - ${seatClass} class ${status === 'occupied' ? '(Occupied)' : status === 'available' ? `(+$${getSeatPrice(seatClass)})` : ''}`}
      >
        {status === 'occupied' ? (
          <User size={12} className="text-red-500" />
        ) : status === 'selected' ? (
          <User size={12} className="text-white" />
        ) : (
          <span className="text-gray-600">{seat.slice(-1)}</span>
        )}
        
        {isWindow && (
          <div className="absolute -left-1 top-0 w-1 h-full bg-blue-200 rounded-l"></div>
        )}
        {isAisle && status === 'available' && (
          <div className="absolute -right-0.5 top-1 w-0.5 h-6 bg-yellow-300 rounded"></div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">

      <div className="flex justify-center gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-100 border-2 border-gray-300 rounded-t-lg"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-100 border-2 border-red-300 rounded-t-lg flex items-center justify-center">
            <User size={12} className="text-red-500" />
          </div>
          <span className="text-sm">Occupied</span>
        </div>
      </div>

      {/* Aircraft Layout */}
      <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl p-6 mb-6">
        {/* Cockpit */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-8 bg-gray-300 rounded-t-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">COCKPIT</span>
          </div>
        </div>

        {/* Seat Map */}
        <div className="space-y-2">
          {seatMap.map((rowData, index) => {
            if (rowData.class === 'divider') {
              return (
                <div key={index} className="flex justify-center py-2">
                  <div className="h-px bg-gray-300"></div>
                </div>
              );
            }

            return (
              <div key={rowData.row} className="flex items-center justify-center gap-1">
                {/* Row number */}
                <div className="w-8 text-center text-sm font-medium text-gray-600">
                  {rowData.row}
                </div>
                
                {/* Seats */}
                <div className="flex gap-1">
                  {rowData.seats.map((seat, seatIndex) => (
                    <React.Fragment key={seatIndex}>
                      {renderSeat(seat, rowData.class)}
                      {/* Aisle space */}
                      {(seatIndex === 2 || seatIndex === 3) && (
                        <div className="w-4"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <CustomButton disabled={!selectedSeat}  text = { `Continue with ${selectedSeat || 'Selected Seat'}`}
        />
      </div>
    </div>
  );
};

export default SeatView;
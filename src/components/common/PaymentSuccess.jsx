import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CustomButton from '../button';

const PaymentSuccess = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  // Redux state
  const status = useSelector((state) => state.payment.success); // true or false

  const handleSubmit = () => {
    navigate('/');
  };

  const handleRetry = () => {
    navigate('/payment')
  }

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative overflow-hidden">
          <div className={`transition-all duration-500 transform ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative z-10 text-center">
              {/* Success or Failure Icon */}
              <div className="mb-8">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg ${status ? 'bg-green-500' : 'bg-red-500'} animate-bounce`}>
                  {status ? (
                    <CheckCircle className="w-12 h-12 text-white" />
                  ) : (
                    <XCircle className="w-12 h-12 text-white" />
                  )}
                </div>
              </div>

              {/* Status Message */}
              <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up">
                {status ? 'Payment Successful!' : 'Payment Failed'}
              </h1>

              <p className={`mb-6 ${status ? 'text-gray-600' : 'text-red-500'} text-md`}>
                {status ? 'Thank you for choosing Tripzy!' : 'Your transaction was unsuccessful.'}
              </p>

              {/* Payment details (only if success) */}
              {status && (
                <>
                  <p className="text-gray-500 mb-8 text-sm">
                    Booking ID: #BN-2024-001234
                  </p>
                  <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600 text-sm">Payment Method</span>
                      </div>
                      <span className="text-gray-800 font-medium">••••</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm">Amount Paid</span>
                      <span className="text-2xl font-bold text-green-600">₹ 4999.99</span>
                    </div>
                  </div>
                </>
              )}

           <div className="space-y-4">
             <CustomButton 
               onClick={handleSubmit} 
               text="Go to home" 
             />
           
             {!status && (
               <CustomButton 
                 onClick={handleRetry} 
                 text="Retry Payment Again" 
               />
             )}
           
             {status && (
               <CustomButton 
                 text="View Ticket" 
                 className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
               />
             )}
           </div>

            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;

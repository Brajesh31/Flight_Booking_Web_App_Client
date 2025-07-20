import React, { useState, useEffect } from 'react';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

const PaymentFailure = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative overflow-hidden">
          <div className={`transition-all duration-500 transform ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative">
              {/* Animated background circles */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-100 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-pink-100 rounded-full opacity-40 animate-pulse delay-300"></div>
              
              <div className="relative z-10">
                {/* Failure Icon with animation */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <XCircle className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-red-200 animate-ping opacity-20"></div>
                </div>

                {/* Content */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up">
                  Payment Failed
                </h1>
                <p className="text-gray-600 mb-2 text-lg">
                  We couldn't process your payment
                </p>
                <p className="text-gray-500 mb-8 text-sm">
                  Error Code: DECLINED_INSUFFICIENT_FUNDS
                </p>

                {/* Error details card */}
                <div className="bg-red-50 rounded-2xl p-6 mb-8 border border-red-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <XCircle className="w-5 h-5 text-red-400" />
                      <span className="text-red-600 text-sm font-medium">Transaction Details</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Attempted Amount:</span>
                      <span className="text-gray-800 font-medium">$129.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="text-gray-800 font-medium">•••• 4242</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-red-600 font-medium">Declined</span>
                    </div>
                  </div>
                </div>

                {/* Helpful suggestions */}
                <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-100">
                  <h3 className="font-semibold text-gray-800 mb-3 text-sm">What you can try:</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Check your card balance and try again</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Use a different payment method</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Contact your bank if the issue persists</span>
                    </li>
                  </ul>
                </div>

                {/* Action buttons */}
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:from-blue-600 hover:to-indigo-700 flex items-center justify-center space-x-2">
                    <RefreshCw className="w-5 h-5" />
                    <span>Try Again</span>
                  </button>
                  <button className="w-full border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

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
    </div>
  );
};

export default PaymentFailure;
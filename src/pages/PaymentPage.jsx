// src/pages/PaymentPage.js
import { useDispatch, useSelector } from "react-redux";
import { useToast } from '../context/toastContext';
import { makeDummyPayment } from "../redux/Slices/paymentSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { CreditCard, Smartphone, Building2, Wallet, Clock, Check } from 'lucide-react';
import { GetBooking } from "../services/bookingAPI";
import CustomButton from "../components/button";

// Official or reputable logo URLs
const logoUrls = {
  'Credit Card': 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
  'Debit Card': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
  'PhonePe': 'https://eu-images.contentstack.com/v3/assets/blt7dacf616844cf077/blt85b08b4917701bc0/67997d68d8a86f00203713cc/phonepe-logo-icon.jpg',
  'Google Pay': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4QulV_V84gTegB1XWL9pOycJd2-kTrxHNgQ&s',
  'Paytm': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2pquF8Mipu7bnOZ1m2hvOOiOV36J-Hv6RYA&s',
  'Amazon Pay': 'https://pbs.twimg.com/profile_images/1214220012979920898/N4tFtfjN_400x400.png',
  'Mobikwik': 'https://images.firstpost.com/wp-content/uploads/2017/10/mobikwik-380.png',
  'LazyPay': 'https://pbs.twimg.com/profile_images/1300724353198206976/FBE75Was_400x400.jpg',
  'Simpl': 'https://media.instahyre.com/images/profile/base/employer/462/a52850670c/logo3.webp',
  'State Bank of India': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/State_Bank_of_India_logo.svg',
  'HDFC Bank': 'https://upload.wikimedia.org/wikipedia/commons/0/04/HDFC_Bank_Logo.svg',
  'ICICI Bank': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/ICICI_Bank_Logo.svg',
  'Axis Bank': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Axis_Bank_logo.svg',
  'Punjab National Bank': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Punjab_National_Bank_Logo.svg',
  'Bank of Baroda': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Bank_of_Baroda_logo.svg'
};

const PaymentPage = () => {

  const upiApps = [
    { name: "PhonePe", color: "bg-purple-100 hover:bg-purple-200 border-purple-200" },
    { name: "Google Pay", color: "bg-blue-100 hover:bg-blue-200 border-blue-200" },
    { name: "Paytm", color: "bg-indigo-100 hover:bg-indigo-200 border-indigo-200" },
  ];

  const wallets = [
    { name: "Amazon Pay", color: "bg-orange-100 hover:bg-orange-200 border-orange-200" },
    { name: "Mobikwik", color: "bg-red-100 hover:bg-red-200 border-red-200" },
  ];

  const payLaterOptions = [
    { name: "LazyPay", color: "bg-green-100 hover:bg-green-200 border-green-200" },
    { name: "Simpl", color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-200" },
  ];

  const banks = [
    "State Bank of India",
    "HDFC Bank", 
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank",
    "Bank of Baroda"
  ];

  const [searchParams] = useSearchParams()

  const userId = useSelector((state) => state.user.user?.id)
  const bookingId = searchParams.get("bookingId")

  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const { showSuccess,showError } = useToast()
  const [selectedMethod, setSelectedMethod] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [bookingDetails, setBookingDetails] = useState('')

  const handlePay = async () => {
    try {
      await dispatch(makeDummyPayment({totalCost : bookingDetails.totalCost , userId : userId , bookingid : bookingId })).unwrap()
      Navigate('/confirmation')
      showSuccess('Payment Successful!', 'success')
    } catch (error) {
      showError('Error in payment',error)
    }
  };

  const handleCancel = async () => {
    try{
    await dispatch(makeDummyPayment({ amount: 0}))
    Navigate('/confirmation')
    }catch (error) {
      showError('Try Again',error)
    }
  }

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await GetBooking(bookingId)
      setBookingDetails(data.data.data)
    } catch (error) {
      console.error("Error fetching booking:", error)
      Navigate('/')
    }
  };

    fetchData()

}, [userId])

  return (
    <>
      <Navbar/>
      <div className="absolute top-18 left-0 w-full h-[40vh]  bg-gradient-to-b from-gray-100 via-blue-200 to-orange-300 z-0" />
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-8 mt-8 border border-gray-100 relative overflow-hidden">
        <div className="relative">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Select Payment Method</h2>
          <p className="text-gray-500">Choose your preferred way to pay securely</p>
        </div>

        {/* Cards Section */}
        <div className="space-y-4 relative">
          <div className="flex items-center gap-3 mb-4">
           <CreditCard className="w-5 h-5 text-blue-600" />
           <h3 className="text-gray-700 font-semibold text-lg">Cards</h3>
          </div>
          
          <div 
            className={`group relative border-2 rounded-xl p-4 transition-all duration-300 cursor-pointer ${
              selectedMethod === 'card' 
                ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]' 
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-gray-50'
            }`}
            onClick={() => setSelectedMethod('card')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <img src={logoUrls['Credit Card']} alt="Credit Card" className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Credit/Debit Card</p>
                  <p className="text-sm text-gray-500">Visa, Mastercard, RuPay</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedMethod === 'card' 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-300 group-hover:border-blue-400'
              }`}>
                {selectedMethod === 'card' && (
                  <span className="w-4 h-4 bg-white rounded-full block" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* UPI Section */}
        <div className="space-y-4 relative">
           <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-5 h-5 text-green-600" />
            <h3 className="text-gray-700 font-semibold text-lg">UPI</h3>
           </div>
          
          <div className="grid grid-cols-3 gap-4">
            {upiApps.map((upi, index) => (
              <div 
                key={upi.name}
                className={`group relative border-2 rounded-xl p-4 transition-all duration-300 cursor-pointer ${
                  selectedMethod === `upi-${index}` 
                    ? 'border-green-500 bg-green-50 shadow-lg transform scale-105' 
                    : `border-gray-200 ${upi.color}`
                }`}
                onClick={() => setSelectedMethod(`upi-${index}`)}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border">
                    <img src={logoUrls[upi.name]} alt={upi.name} className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{upi.name}</p>
                    <p className="text-xs text-gray-500">Instant transfer</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedMethod === `upi-${index}`
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300 group-hover:border-green-400'
                  }`}>
                    {selectedMethod === `upi-${index}` && (
                      <span className="w-3 h-3 bg-white rounded-full block" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Net Banking */}
        <div className="space-y-4 relative">
          <div className="flex items-center gap-3 mb-4">
           <Building2 className="w-5 h-5 text-blue-600" />
           <h3 className="text-gray-700 font-semibold text-lg">Net Banking</h3>
          </div>
          
          <div className="relative">
            <select 
              className="w-full border-2 border-gray-200 rounded-xl p-4 pr-12 text-gray-700 bg-white hover:border-blue-300 focus:border-blue-500 focus:outline-none transition-all appearance-none cursor-pointer"
              value={selectedBank}
              onChange={(e) => {
                setSelectedBank(e.target.value);
                if (e.target.value) setSelectedMethod('netbanking');
              }}
            >
              <option value="">Select Your Bank</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {selectedBank && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-gray-700">{selectedBank}</span>
              </div>
            )}
          </div>
        </div>

        {/* Wallets */}
        <div className="space-y-4 relative">
           <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-5 h-5 text-purple-600" />
            <h3 className="text-gray-700 font-semibold text-lg">Wallets</h3>
           </div>
          
          <div className="grid grid-cols-2 gap-4">
            {wallets.map((wallet, index) => (
              <div 
                key={wallet.name}
                className={`group relative border-2 rounded-xl p-4 transition-all duration-300 cursor-pointer ${
                  selectedMethod === `wallet-${index}` 
                    ? 'border-purple-500 bg-purple-50 shadow-lg transform scale-105' 
                    : `border-gray-200 ${wallet.color}`
                }`}
                onClick={() => setSelectedMethod(`wallet-${index}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border">
                      <img src={logoUrls[wallet.name]} alt={wallet.name} className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{wallet.name}</p>
                      <p className="text-xs text-gray-500">Digital wallet</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedMethod === `wallet-${index}`
                      ? 'border-purple-500 bg-purple-500' 
                      : 'border-gray-300 group-hover:border-purple-400'
                  }`}>
                    {selectedMethod === `wallet-${index}` && (
                      <span className="w-3 h-3 bg-white rounded-full block" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pay Later */}
        <div className="space-y-4 relative">
          <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-amber-600" />
          <h3 className="text-gray-700 font-semibold text-lg">Pay Later</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {payLaterOptions.map((payLater, index) => (
              <div 
                key={payLater.name}
                className={`group relative border-2 rounded-xl p-4 transition-all duration-300 cursor-pointer ${
                  selectedMethod === `paylater-${index}` 
                    ? 'border-amber-500 bg-amber-50 shadow-lg transform scale-105' 
                    : `border-gray-200 ${payLater.color}`
                }`}
                onClick={() => setSelectedMethod(`paylater-${index}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border">
                      <img src={logoUrls[payLater.name]} alt={payLater.name} className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{payLater.name}</p>
                      <p className="text-xs text-gray-500">0% interest</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedMethod === `paylater-${index}`
                      ? 'border-amber-500 bg-amber-500' 
                      : 'border-gray-300 group-hover:border-amber-400'
                  }`}>
                    {selectedMethod === `paylater-${index}` && (
                      <span className="w-3 h-3 bg-white rounded-full block" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <button 
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
            selectedMethod 
              ? 'bg-slate-800 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedMethod}
          onClick={handlePay}
        >
          {selectedMethod ? 'Continue to Payment' : 'Select a Payment Method'}
        </button>
        <CustomButton onClick={handleCancel} text={"Cancel Payement"}></CustomButton>
      </div>   
    </>
  );
};

export default PaymentPage;

// libraries
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, ClerkLoaded, ClerkLoading, RedirectToSignIn} from "@clerk/clerk-react";
import { useEffect } from "react";


//pages
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmationPage from "./pages/ConfirmationPage";

//file imports
//import Auth from "./components/Auth"
import ClerkAuthHandler from "./clerk/clerkAuthhandler";
import { useToast } from '../src/context/toastContext';
import Loader from "../src/components/common/loader";
import SeatView from "./components/seatView";

function App() {
  const {showSuccess} = useToast() 

  useEffect(() => {
    const show = sessionStorage.getItem("showLoginToast");
    if (show) {
      showSuccess("Login successful!");
      sessionStorage.removeItem("showLoginToast");
     }
   }, []);
 

  return (
    <>
      <ClerkLoading>
        <Loader/>
      </ClerkLoading>

      <ClerkLoaded>
        <SignedIn>
          <ClerkAuthHandler/>
        </SignedIn>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        
          <Route
                 path="/payment"
                 element={
                   <>
                   <SignedIn>
                     <PaymentPage />
                   </SignedIn>
                   <SignedOut>
                    <RedirectToSignIn redirectUrl="/payment"/>
                   </SignedOut>
                   </>
                 }
           />

           <Route
                 path="/confirmation"
                 element={
                   <>
                   <SignedIn>
                     <ConfirmationPage />
                   </SignedIn>
                   <SignedOut>
                    <RedirectToSignIn redirectUrl="/confirmation"/>
                   </SignedOut>
                   </>
                 }
           />

        </Routes>
      </ClerkLoaded>
    </>
  );
}

export default App;

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Offers from "./promotion/offers";
import { SignedIn, SignedOut, SignInButton, UserButton} from '@clerk/clerk-react';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-md px-6 py-4 flex items-center justify-between flex-wrap relative">
      {/* Logo with Instagram-style font */}
      <div className="text-3xl text-black" style={{ fontFamily: "Lobster, cursive" }}>
        Tripzy
      </div>

      <Offers/>
      
      {/* Hamburger Icon (Mobile Only) */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-black">
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Menu Items (Desktop) */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <button className="hover:text-blue-600 transition">Offers</button>
        <button className="hover:text-blue-600 transition">Customer Helpline</button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-start px-6 py-4 space-y-4 text-gray-700 font-medium z-50">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button className="w-full text-left hover:text-blue-600">Offers</button>
          <button className="w-full text-left hover:text-blue-600">Customer Helpline</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

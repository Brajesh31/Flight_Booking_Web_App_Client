import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <div className="text-3xl text-black mb-2" style={{ fontFamily: "Lobster, cursive" }}>
            Tripzy
          </div>
          <p className="text-sm text-gray-500">
            Book your flights seamlessly and securely with our trusted platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">Search Flights</a></li>
            <li><a href="#" className="hover:text-blue-600">Offers</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-5 text-xl">
            <a href="#"><FaFacebook className="hover:text-blue-600" /></a>
            <a href="#"><FaTwitter className="hover:text-blue-400" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-500" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-center text-sm py-4 text-gray-500 px-4">
        © {new Date().getFullYear()} Tripzy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

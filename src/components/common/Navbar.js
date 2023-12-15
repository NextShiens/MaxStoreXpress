import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import 'tailwindcss/tailwind.css';
const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white">
          <Link to="/" className="text-xl font-bold">
            Your Logo
          </Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/products" className="text-white">
            Products
          </Link>
          <Dropdown
            trigger={<span className="text-white">More</span>}
            options={[
              <Link to="/about" key="about" className="text-gray-700">
                About Us
              </Link>,
              <Link to="/contact" key="contact" className="text-gray-700">
                Contact
              </Link>,
            ]}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

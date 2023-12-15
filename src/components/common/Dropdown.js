import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'tailwindcss/tailwind.css';
const Dropdown = ({ trigger, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleToggle}
        className="cursor-pointer text-gray-300 hover:text-gray-100 focus:outline-none"
      >
        {trigger}
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md"
        >
          {options.map((option, index) => (
            <li key={index} className="p-2 hover:bg-gray-100">
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Dropdown;
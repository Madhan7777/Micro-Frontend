import React from 'react';
import { useCart } from 'react-use-cart'; // Import useCart hook
import { FaShoppingCart, FaHome } from 'react-icons/fa';
import { MdOutlineContactSupport } from 'react-icons/md';
 
const Header = () => {
  const { totalItems } = useCart(); // Destructure totalItems from useCart
 
  return (
    <header className="bg-blue-800 text-white p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Food and Beverages</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:underline">
                <FaHome className="w-6 h-6 mr-3 text-blue-300" />
              </a>
            </li>
            <li className="relative">
              <a href="/cart" className="flex items-center">
                <FaShoppingCart className="w-6 h-6 mr-3 text-blue-300" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 transform translate-x-1/2 -translate-y-1/2">
                    {totalItems}
                  </span>
                )}
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                <MdOutlineContactSupport className="w-6 h-6 mr-3 text-blue-300" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
 
export default Header;
 
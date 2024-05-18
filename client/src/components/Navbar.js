import React from "react";
import { useState } from "react";

// import icons
import { HiOutlineMenu } from "react-icons/hi";
import { FaChevronDown } from 'react-icons/fa';

import { navLinks } from "../constant";
import { logo } from "../assets";

const Navbar = () => {
  const [isMenuOpen, setMobileMenu] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const dropdown_hover_timing = 0;

  const toggleMobileMenu = () => {
    setMobileMenu(!isMenuOpen);
  };

  function togglePortfolioMenu(hasDropdown) {
    if (hasDropdown)
      setIsSubMenuOpen(!isSubMenuOpen);
  }

  return (
    <header className="h-[10vh] bg-[#FFFFFFea] backdrop-blur-md w-full sticky top-0 left-0 right-0 z-[100]">
      <nav className="h-full">
        <div className="h-full flex items-center justify-between py-4 md:px-8 px-4">
          <div className="h-full font-bold cursor-pointer ">
            <a href="/"><img className="h-full" src={logo} alt="logo" /></a>
          </div>

          <ul className="list-none lg:flex items-center gap-8 hidden">
            {navLinks.map((e) => (
              <li
                key={e.id}
                className="relative"
                onMouseEnter={() => togglePortfolioMenu(e.dropdown)}
                onMouseLeave={() => togglePortfolioMenu(e.dropdown)}
              >
                <a
                  href={e.link}
                  className="text-[#000000] hover:text-[#706cac] transition-all duration-200 flex items-center"
                >
                  {e.id} {e.dropdown && <FaChevronDown size='16px' style={{ margin: '3px 0 0 4px' }} />}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-[#706cac] text-3xl ">
          
            <HiOutlineMenu />
          </button>
        </div>

        {isMenuOpen && (
          <div className="items-end">
           <div className=" absolute right-0 w-[110px] bg-[#F8F7F1] text-[#00297A] text-[20px] font-bold rounded py-4">
            
            <a href="/" className="block hover:text-grey-400 my-2 mx-4">
              Home
            </a>
            <a href="/portfolio" className="block hover:text-grey-400 my-2 mx-4">
              About
            </a>
            <a href="/sponsorship" className="block hover:text-grey-400 my-2 mx-4">
              Service
            </a>
            <a href="/recruitment" className="block hover:text-grey-400 my-2 mx-4">
              Contact
            </a>
            <a href="/contactus" className="block hover:text-grey-400 my-2 mx-4">
              Account
            </a>
           </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

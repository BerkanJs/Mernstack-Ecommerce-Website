import React from "react";
import { Package } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const NavbarData = [
    { id: 1, page: "Home", url: "/" },
    { id: 2, page: "About", url: "/about" },
    { id: 3, page: "Collection", url: "/collections" },
    { id: 4, page: "Contact", url: "/contact" },
  ];

  return (
    <div className="w-full h-auto bg-black text-white flex flex-col space-y-7 items-center justify-between px-5 sm:px-8 md:px-16 lg:px-20 py-6">
      {/* UP */}
      <div className="flex flex-col sm:flex-row w-full justify-between mt-8">
        {/* Logo Section */}
        <div className="flex flex-col w-full sm:w-[300px] space-y-5">
          <div className="flex items-center justify-center sm:justify-start text-3xl">
            <Package className="mr-3 text-4xl" />
            <h3 className="font-extralight tracking-widest text-xl sm:text-2xl md:text-3xl">
              E-Commerce
            </h3>
          </div>

          <h4 className="text-sm sm:text-base text-center sm:text-left">
            Welcome to our store, where quality meets affordability. Explore a
            wide selection of the latest gadgets, fashion, and accessories
            designed to elevate your lifestyle.
          </h4>
        </div>

        {/* Right Side */}
        <div className="flex flex-col sm:flex-row w-full sm:w-[600px] mt-6 sm:mt-0">
          {/* Contact Section */}
          <div className="flex flex-col items-center space-y-5 w-full sm:w-[300px] h-full sm:items-start sm:text-left">
            <h1 className="text-2xl text-white">Contact</h1>
            <span>+90 0530 00 00</span>
            <span>lorem@gmail.com</span>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center sm:items-start sm:w-[400px] mt-6 sm:mt-0">
            <h1 className="text-2xl text-white">Links</h1>
            {NavbarData.map((data) => (
              <NavLink
                key={data.id}
                to={data.url}
                className={({ isActive }) =>
                  `flex flex-col py-1 w-[200px] mx-5 text-sm sm:text-lg md:text-xl font-light tracking-wide transition-all duration-300 ease-in-out ${
                    isActive
                      ? "border-b-2 border-white"
                      : "border-b-2 border-transparent hover:border-gray-400"
                  }`
                }
              >
                {data.page}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Down */}
      <div className="w-full flex items-center justify-center py-6 border-t-1 border-gray-300">
        <h1 className="text-lg text-white font-light tracking-widest">
          © 2025 Berkan Özçelik. All rights reserved.
        </h1>
      </div>
    </div>
  );
};

export default Footer;
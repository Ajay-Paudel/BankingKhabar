"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

function Header() {
  const [categories, setCategories] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isClickedInside, setIsClickedInside] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch("https://bankingkhabar.com/wp-json/wp/v2/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setIsClickedInside(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Header */}
      <header className="bg-[#2C2C33] py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex">
            <div className="border-x px-2 text-center">
              <Icon
                className="text-[40px] text-white grayscale hover:grayscale-0"
                icon="devicon:facebook"
              />
            </div>
            <div className="border-x px-2 text-center">
              <Icon
                className="text-[40px] text-white grayscale hover:grayscale-0"
                icon="logos:youtube-icon"
              />
            </div>
            <div className="border-x px-2 flex items-center">
              <h2 className="text-white">English</h2>
            </div>
          </div>

          <div className="flex items-center">
            <div className="border-x px-2 text-center">
              <Icon className="text-[40px] text-gray-300 hover:text-white" icon="mdi:location" />
            </div>
            <div className="border-x px-2 text-center">
              <Icon className="text-[40px] text-gray-300 hover:text-white" icon="mdi:user" />
            </div>

            <div
              ref={searchRef}
              className="border-x px-2 flex items-center relative"
              onMouseEnter={() => setIsSearchOpen(true)}
              onMouseLeave={() => !isClickedInside && setIsSearchOpen(false)}
            >
              {isSearchOpen && (
                <input
                  type="text"
                  className="absolute left-[-150px] w-40 px-3 py-1 rounded-md bg-white text-black outline-none shadow-md z-30 transition-all duration-300 opacity-100"
                  placeholder="Search..."
                  onFocus={() => setIsClickedInside(true)}
                />
              )}

              <button className="ml-2 p-2 bg-red-500 rounded-md">
                <Icon className="text-[30px] text-white" icon="material-symbols:search" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Logo & Ad Section */}
      <section className="container mx-auto">
        <div className="grid grid-cols-6 items-center">
          <div className="col-span-2 col-start-1">
            <Link href="/">
              <img
                src="https://bankingkhabar.com/wp-content/uploads/2022/08/logo1-1.jpg"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="col-span-3 col-start-4">
            <img
              className="w-full"
              src="https://bankingkhabar.com/wp-content/uploads/2025/03/1000-by-100-new.gif"
              alt="Ad"
            />
          </div>
        </div>
      </section>

      {/* Navigation Menu */}
      <nav className="container mx-auto pb-1">
        <button
          className="p-2 text-black rounded-md sm:block lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`w-6 h-0.5 bg-black mb-1 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-black mb-1 transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
          />
          <div
            className={`w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>

        <div className="bg-red-500 relative">
          <ul
            className={`lg:flex lg:justify-between lg:static absolute top-1 left-0 w-full bg-red-500 lg:bg-transparent text-center transition-all duration-300 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            {categories.map((category) => (
              <li className="border-l-[1px] pl-5 py-3 text-white pr-2 font-bold" key={category.id}>
                <Link href={`/category/${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;

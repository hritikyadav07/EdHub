import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Who we are", href: "/" },
    { name: "Learning Modules", href: "/courses" },
    // { name: 'Resources', href: '/about' },
    { name: "Our Team", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  // Track scroll direction and show/hide navbar
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY === 0) {
            setShowNavbar(true);
          } else {
            setShowNavbar(false);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="flex bg-transparent" onClick={() => setShowNavbar(true)}>
        <div className="flex-none text-white mx-16 pb-10 ">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="text-3xl font-bold mt-5">
              EdHub
              {/* Rectangular "dot" */}
              <span
                className="inline-block align-middle bg-blue-700"
                style={{
                  width: "5px",
                  height: "5px",
                  marginLeft: "4px",
                  marginBottom: "6px",
                  verticalAlign: "bottom",
                }}
              ></span>
            </Link>
          </motion.div>
          <span className="text-blue-400 text-sm font-normal my-10">
            Learn and Teach
          </span>
        </div>
        <div className="flex-1 flex-row mx-16  my-6">
          <div className=" flex justify-end mb-3">
            <Link
              to="/login"
              className="px-8 py-2 text-white hover:text-gray-200 hover:bg-gray-500 "
            >
              Login
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="bg-blue-600 text-white px-10 py-2  
             hover:bg-transparent font-medium transition-colors duration-200 hover:border-white hover:border"
            >
              <Link to="/signup" className="flex items-center justify-center">
                Enroll Now
              </Link>
            </motion.button>
          </div>
          <div className="flex justify-end mt-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={`font-medium transition-colors pl-20 duration-200 ${
                    isActive(item.href)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;

//done - dont touch this file

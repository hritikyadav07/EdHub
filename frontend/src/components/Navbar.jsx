import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  AcademicCapIcon,
  UserCircleIcon,
  BookOpenIcon,
  ChartBarIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

function Navbar() {
  const { theme, toggleTheme, ThemeMenu, setIsThemeMenuOpen } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = {
    main: [
      { name: 'Courses', to: '/courses', icon: BookOpenIcon },
      { name: 'About', to: '/about', icon: AcademicCapIcon },
    ],
    instructor: [
      { name: 'Dashboard', to: '/instructor/dashboard', icon: ChartBarIcon },
      { name: 'Create Course', to: '/instructor/courses/create', icon: PlusCircleIcon },
      { name: 'My Courses', to: '/instructor/courses', icon: BookOpenIcon },
      { name: 'Analytics', to: '/instructor/analytics', icon: ChartBarIcon },
    ],
    student: [
      { name: 'My Dashboard', to: '/dashboard', icon: ChartBarIcon },
      { name: 'My Courses', to: '/dashboard/courses', icon: BookOpenIcon },
      { name: 'Profile', to: '/dashboard/profile', icon: UserCircleIcon },
    ]
  };

  const NavLink = ({ to, children, className = '' }) => (
    <Link
      to={to}
      className={`relative group ${className}`}
    >
      <motion.span
        className={`font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-primary-600'} cursor-pointer`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"
        initial={false}
      />
    </Link>
  );

  const DropdownMenu = ({ title, items }) => (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={`flex items-center font-medium ${
              theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-primary-600'
            }`}
          >
            <span>{title}</span>
            <motion.svg
              animate={{ rotate: open ? 180 : 0 }}
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </Menu.Button>

          <Transition
            as={motion.div}
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              {items.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      to={item.to}
                      className={`${
                        active
                          ? theme === 'dark'
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-100 text-gray-900'
                          : theme === 'dark'
                          ? 'text-gray-300'
                          : 'text-gray-700'
                      } group flex items-center px-4 py-2 text-sm`}
                    >
                      <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );

  return (
    <motion.nav
      className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-md`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className={`text-2xl font-bold ${theme === 'dark' ? 'text-primary-300' : 'text-primary-600'}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              EdHub
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.main.map((item) => (
              <NavLink key={item.name} to={item.to}>
                {item.name}
              </NavLink>
            ))}
            <DropdownMenu title="Instructor" items={navigation.instructor} />
            <DropdownMenu title="Dashboard" items={navigation.student} />

            {/* Theme Toggle and Auth Buttons */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setIsThemeMenuOpen(true)}
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'
                }`}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                {theme === 'dark' ? '🌙' : '🌞'}
              </motion.button>
              <ThemeMenu />

              <Link to="/login">
                <motion.button
                  className={`px-4 py-2 rounded-md ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md focus:outline-none"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.main.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="inline-block h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                ))}

                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="px-2 space-y-1">
                    {navigation.instructor.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          theme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="inline-block h-5 w-5 mr-2" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="px-2 space-y-1">
                    {navigation.student.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          theme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="inline-block h-5 w-5 mr-2" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <motion.button
                      onClick={toggleTheme}
                      className={`p-2 rounded-full ${
                        theme === 'dark' ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'
                      }`}
                      whileTap={{ scale: 0.9 }}
                    >
                      {theme === 'dark' ? '🌙' : '🌞'}
                    </motion.button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Link
                      to="/login"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <ArrowRightOnRectangleIcon className="inline-block h-5 w-5 mr-2" />
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                      onClick={() => setIsOpen(false)}
                    >
                      <UserCircleIcon className="inline-block h-5 w-5 mr-2" />
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
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
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = {
    main: [
      { name: 'Courses', to: '/courses', icon: BookOpenIcon },
      { name: 'About', to: '/about', icon: AcademicCapIcon },
    ],
    student: [
      { name: 'My Dashboard', to: '/dashboard', icon: ChartBarIcon },
      { name: 'My Courses', to: '/dashboard/courses', icon: BookOpenIcon },
      { name: 'Profile', to: '/dashboard/profile', icon: UserCircleIcon },
    ],
    admin: [
      { name: 'Admin Dashboard', to: '/admin', icon: ChartBarIcon },
      { name: 'Manage Courses', to: '/admin/courses', icon: BookOpenIcon },
      { name: 'Manage Users', to: '/admin/users', icon: UserCircleIcon },
      { name: 'Analytics', to: '/admin/analytics', icon: ChartBarIcon },
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

  // const isAdmin = currentUser && currentUser.role === 'admin';
  const isAdmin = true;

  return (
    <motion.nav
      className={`sticky top-0 py-1 z-50 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-md`}
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
            
            {isAdmin && (
              <DropdownMenu title="Admin" items={navigation.admin} />
            )}
            
            {currentUser && (
              <DropdownMenu title="Dashboard" items={navigation.student} />
            )}

            {/* /* Theme Toggle and Auth Buttons */ }
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

              {currentUser ? (
                <Menu as="div" className="relative ml-3">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="flex items-center">
                          <UserCircleIcon className="h-8 w-8 text-gray-400" />
                          <span className="ml-2">{currentUser.displayName || 'User'}</span>
                        </Menu.Button>
                      </div>
                      <Transition
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
                          <Menu.Item>
                            {({ active }) => (<>
                              <Link
                                to="/dashboard/profile"
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
                                <UserCircleIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                                Profile
                              </Link>
                              <Link
                                to="/dashboard/"
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
                                <AcademicCapIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                                Achievements
                              </Link>
                              <Link
                                to="/dashboard/"
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-3 h-5 w-5" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                Settings
                              </Link>
                            </>)}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? theme === 'dark'
                                      ? 'bg-gray-700 text-white'
                                      : 'bg-gray-100 text-gray-900'
                                    : theme === 'dark'
                                    ? 'text-gray-300'
                                    : 'text-gray-700'
                                } group flex w-full items-center px-4 py-2 text-sm`}
                                onClick={logout}
                              >
                                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              ) : (
                <>
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
                      className={`px-4 py-2 rounded-md ${
                        theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                      } transition-colors`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </>
              )}
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

            {currentUser ? (
              <>
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
                  <div className="flex items-center px-5 mb-3">
              <div className="flex-shrink-0">
                <UserCircleIcon className="h-10 w-10 text-gray-400" />
              </div>
              <div className="ml-3">
                <div className={`text-base font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {currentUser.displayName || 'User'}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {currentUser.email || ''}
                </div>
              </div>
              <motion.button
                onClick={() => setIsThemeMenuOpen(true)}
                className={`ml-auto p-2 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'dark' ? '🌙' : '🌞'}
              </motion.button>
                  </div>
                  <div className="px-2">
              <button
                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => {
                  logout()
                  setIsOpen(false);
                }}
              >
                <ArrowRightOnRectangleIcon className="inline-block h-5 w-5 mr-2" />
                Logout
              </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <motion.button
              onClick={() => setIsThemeMenuOpen(true)}
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
            )}

            {/* Add Admin section to mobile menu if user is admin */}
                {isOpen && isAdmin && (
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="px-2 space-y-1">
                      {navigation.admin.map((item) => (
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
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
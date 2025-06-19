import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import newlogo from "./../images/whitelogo.png";
import blacklogo from "./../images/blacklogo.png";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";

const navigation = [
  { name: "HOME", href: "/home", current: false },
  { name: "ABOUT US", href: "/aboutus", current: false },
  { name: "COURSES", href: "/coursecat", current: false },
  { name: "GUIDE", href: "/popup", current: false },
];

function MenuItem({ text, href, onClick }) {
  const { speak } = useSpeechSynthesis();
  return (
    <a
      href={href}
      onClick={onClick}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      onMouseOver={() => speak({ text })}
    >
      {text}
    </a>
  );
}

function NavigationItem({ item }) {
  const { name, href, current } = item;
  const { t } = useTranslation();
  
  return (
    <a
      href={href}
      className={`block rounded-md px-3 py-2 text-sm font-medium ${
        current
          ? "bg-blue-600 text-white"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {t(name.toLowerCase().replace(/\s+/g, ''), name)}
    </a>
  );
}

export default function Navbar({ fixed }) {
  const { speak } = useSpeechSynthesis();
  const { currentUser, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const logo = "Saarthi logo.";
  const profile = "Profile menu.";
  const themeToggle = isDarkMode ? "Switch to light mode" : "Switch to dark mode";

  // Check if current user is admin
  const isAdmin = currentUser?.email === process.env.REACT_APP_ADMIN_EMAIL;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };return (
    <>
      <Toaster position="top-right" />      <Disclosure as="nav" className="bg-white dark:bg-black relative z-40 border-b border-gray-200 dark:border-gray-700">
        {({ open }) => (
          <>
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 dark:focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">                  <div className="flex items-center flex-shrink-0">
                    <img
                      className="block w-auto h-8 lg:hidden"
                      src={isDarkMode ? newlogo : blacklogo}
                      alt="logo"
                      onMouseOver={() => speak({ text: logo })}
                    />
                    <img
                      className="hidden w-auto h-8 lg:block"
                      src={isDarkMode ? newlogo : blacklogo}
                      alt="logo"
                      onMouseOver={() => speak({ text: logo })}
                    />
                  </div>
                  <div className="hidden sm:ml-10 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavigationItem key={item.name} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Theme toggle button */}                  <button
                    onClick={toggleTheme}
                    onMouseOver={() => speak({ text: themeToggle })}
                    className="p-2 text-gray-600 dark:text-gray-400 rounded-full hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">Toggle theme</span>
                    {isDarkMode ? (
                      <SunIcon className="w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MoonIcon className="w-6 h-6" aria-hidden="true" />
                    )}
                  </button>{/* Profile dropdown */}
                  {currentUser ? (
                    <Menu as="div" className="relative ml-3 z-50">
                      <div>
                        <Menu.Button className="flex text-sm bg-gray-200 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800">
                          <span className="sr-only">Profile</span>
                          {currentUser.photoURL ? (
                            <img
                              className="w-8 h-8 rounded-full"
                              src={currentUser.photoURL}
                              alt="Profile"
                              onMouseOver={() => speak({ text: profile })}
                            />
                          ) : (                            <div className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center">
                              <UserIcon className="w-5 h-5 text-white dark:text-gray-300" />
                            </div>
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                            <p className="font-medium">{currentUser.displayName || 'User'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                          </div>                          <Menu.Item>
                            {({ active }) => (
                              <MenuItem
                                text={t('profile', 'Profile')}
                                href="#"
                                onClick={handleProfile}
                              />
                            )}
                          </Menu.Item>
                          {isAdmin && (
                            <Menu.Item>
                              {({ active }) => (
                                <MenuItem
                                  text={t('admin', 'Admin Panel')}
                                  href="#"
                                  onClick={handleAdmin}
                                />
                              )}
                            </Menu.Item>
                          )}
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                onMouseOver={() => speak({ text: t('signout', 'Sign out') })}
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                                {t('signout', 'Sign out')}
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>                  ) : (
                    <button
                      onClick={() => navigate("/")}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {t('signin', 'Sign In')}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <NavigationItem key={item.name} item={item} />
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

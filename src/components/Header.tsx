import { useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Bell, ChevronDown, User, LogOut, Settings, Menu as MenuIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Templates', path: '/templates' },
  { name: 'Utilisateurs', path: '/users' },
  { name: 'Paramètres', path: '/settings' },
];

const Header = ({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) => {
  const location = useLocation();
  const currentPage = navItems.find(item => item.path === location.pathname)?.name || 'Dashboard';

  return (
    <header className="h-20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-40">
      {/* Left side: Mobile Menu Button & Page Title */}
      <div className="flex items-center space-x-4">
        <button 
          className="lg:hidden text-gray-600 dark:text-gray-300" 
          onClick={() => setSidebarOpen(true)}
        >
          <MenuIcon size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{currentPage}</h1>
      </div>

      {/* Right side icons & avatar */}
            <div className="flex items-center space-x-6">
        <ThemeToggle />
        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors relative">
          <Bell size={22} />
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-primary-600 ring-2 ring-white dark:ring-gray-800"></span>
        </button>
        
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="flex items-center space-x-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg">
              <img 
                src="https://i.pravatar.cc/40"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="hidden md:block">
                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">John Doe</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
              </div>
              <ChevronDown size={16} className="text-gray-500 dark:text-gray-400 hidden md:block" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black dark:ring-gray-600 ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <button
                      className={`${active ? 'bg-primary-500 text-white' : 'text-gray-900 dark:text-gray-200'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <User className="mr-2 h-5 w-5" aria-hidden="true" />
                      Mon Profil
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <button
                      className={`${active ? 'bg-primary-500 text-white' : 'text-gray-900 dark:text-gray-200'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <Settings className="mr-2 h-5 w-5" aria-hidden="true" />
                      Paramètres
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <button
                      className={`${active ? 'bg-primary-500 text-white' : 'text-gray-900 dark:text-gray-200'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <LogOut className="mr-2 h-5 w-5" aria-hidden="true" />
                      Déconnexion
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default Header;

import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FileText, User, Settings, ChevronLeft, ChevronRight, ChevronDown, PlusCircle, List, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  {
    name: 'Templates',
    icon: FileText,
    subItems: [
      { name: 'Lister les templates', icon: List, path: '/templates' },
      { name: 'Ajouter un template', icon: PlusCircle, path: '/templates/add' },
    ],
  },
  { name: 'Utilisateurs', icon: User, path: '/users' },
  { name: 'Paramètres', icon: Settings, path: '/settings' },
];

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <motion.div
      animate={{ width: isOpen ? '16rem' : '5rem' }}
      className="bg-white dark:bg-gray-800 h-screen fixed top-0 left-0 border-r border-gray-200 dark:border-gray-700 flex flex-col z-50 shadow-lg"
    >
      {/* Logo */}
            <div className="flex items-center justify-between h-20 p-4 border-b border-gray-200 dark:border-gray-700">
        <AnimatePresence>
          {isOpen && (
            <motion.h1 
              className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              STUDYA<span className="text-primary-600">CREATOR</span>
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => <NavItem key={item.name} item={item} isOpen={isOpen} />)}
      </nav>

      {/* Collapse Button - Positioned on the border */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-20 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full p-1.5 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-600 hover:text-primary-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* User Profile Section */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center min-w-0">
            <img 
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  className="ml-3 whitespace-nowrap overflow-hidden"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  {isLoading ? (
                    <div className="space-y-1">
                      <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-12 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  ) : user ? (
                    <>
                      <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 truncate">{`${user.firstName} ${user.lastName}`}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                    </>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {isOpen && !isLoading && user && (
              <motion.button 
                onClick={handleLogout}
                className="p-2 text-gray-500 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-800/50 hover:text-red-600 dark:hover:text-red-400 rounded-full flex-shrink-0"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
                exit={{ opacity: 0, scale: 0.5 }}
                aria-label="Déconnexion"
              >
                <LogOut size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const NavItem = ({ item, isOpen }: { item: any; isOpen: boolean }) => {
  const location = useLocation();
  const isTemplatesRoute = location.pathname.startsWith('/templates');
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(isTemplatesRoute);

  if (item.subItems) {
    return (
      <div>
        <button 
          onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${ 
            isTemplatesRoute
            ? 'bg-primary-100 dark:bg-gray-700 text-primary-700 dark:text-primary-300' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600'}`
          }
        >
          <div className="flex items-center">
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="ml-4 font-medium whitespace-nowrap">{item.name}</span>}
          </div>
          {isOpen && <ChevronDown className={`w-5 h-5 transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} />}
        </button>
        <AnimatePresence>
          {isOpen && isSubMenuOpen && (
            <motion.div 
              className="ml-4 mt-2 space-y-1 border-l-2 border-primary-100 dark:border-gray-700 pl-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {item.subItems.map((subItem: any) => (
                <Link
                  key={subItem.name}
                  to={subItem.path}
                  className={`flex items-center p-2 rounded-md text-sm transition-colors ${ 
                    location.pathname === subItem.path
                    ? 'text-primary-600 dark:text-primary-300 font-semibold'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`
                  }
                >
                  <subItem.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                  {subItem.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      to={item.path}
            className={`flex items-center p-3 rounded-lg transition-colors ${ 
        (location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard'))
        ? 'bg-primary-600 text-white shadow-lg' 
        : 'text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600'}`
      }
    >
      <item.icon className="w-5 h-5 flex-shrink-0" />
      {isOpen && <span className="ml-4 font-medium whitespace-nowrap">{item.name}</span>}
    </Link>
  );
};

export default Sidebar;

import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
        style={{ x: theme === 'light' ? 0 : 24 }}
      >
        {theme === 'light' ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-primary-300" />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;

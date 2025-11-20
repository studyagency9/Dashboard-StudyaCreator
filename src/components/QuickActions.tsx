import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, UserPlus, ShieldPlus } from 'lucide-react';

const actions = [
  { name: 'Ajouter un Template', icon: PlusCircle, path: '/templates/add' },
  { name: 'Ajouter un Utilisateur', icon: UserPlus, path: '/users' },
  { name: 'Ajouter un Administrateur', icon: ShieldPlus, path: '/admins/add' },
];

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
            <h3 className="font-bold text-gray-800 dark:text-white text-lg">Actions rapides</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map((action, i) => (
                    <motion.button
            key={action.name}
            onClick={() => navigate(action.path)}
            className="group relative w-full flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-700 dark:to-gray-700/50 text-primary-700 dark:text-primary-300 font-semibold text-center transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
          >
            <span className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <div className="relative z-10 flex flex-col items-center">
                            <action.icon className="w-8 h-8 mb-2 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                            <span className="group-hover:text-white dark:group-hover:text-white transition-colors duration-300">{action.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;

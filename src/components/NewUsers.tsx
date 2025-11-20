import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getNewUsers, type User } from '../services/userService';
import { Loader2 } from 'lucide-react';


const NewUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async (isInitialLoad = false) => {
      if (isInitialLoad) setIsLoading(true);
      try {
        const data = await getNewUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Impossible de charger les utilisateurs.');
      } finally {
        if (isInitialLoad) setIsLoading(false);
      }
    };

    fetchUsers(true);

    const intervalId = setInterval(fetchUsers, 240000); // 4 minutes

    return () => clearInterval(intervalId);
  }, []);
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-800 dark:text-white text-lg">Nouveaux utilisateurs</h3>
        <button 
          onClick={() => navigate('/users')}
          className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          Voir tout
        </button>
      </div>
            <div className="mt-4 space-y-4 min-h-[150px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full pt-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center text-sm pt-8">{error}</div>
        ) : (
          users.map((user, i) => (
          <motion.div 
            key={user.id}
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
              <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.phone}</p>
              </div>
            </div>
            <div className="relative">
                            <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">Nouveau</span>
              <span className="absolute top-0 right-0 -mr-1 -mt-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
          </motion.div>
                ))
        )}
      </div>
    </motion.div>
  );
};

export default NewUsers;

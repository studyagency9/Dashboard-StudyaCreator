import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'increase' | 'decrease';
  isPrimary?: boolean;
}

const KpiCard = ({ title, value, icon, change, changeType, isPrimary = false }: KpiCardProps) => {
  return (
    <motion.div
      className={cn(
        'rounded-2xl p-6 shadow-xl flex flex-col justify-between',
        isPrimary 
          ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-primary-500/40'
          : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-primary-500/10 border border-white/20 dark:border-gray-700'
      )}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 10px 20px -5px rgba(108, 71, 255, 0.15)'
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
            <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className={cn('text-sm font-medium', isPrimary ? 'text-primary-200' : 'text-gray-500 dark:text-gray-400')}>{title}</p>
          <p className={cn('text-3xl font-bold mt-2', isPrimary ? 'text-white' : 'text-gray-900 dark:text-white')}>{value}</p>
        </div>
        <div className={cn('p-3 rounded-full shadow-lg', isPrimary ? 'bg-white/20 text-white' : 'bg-gradient-to-br from-primary-500 to-primary-600 text-white')}>
          {icon}
        </div>
      </div>
            <div className="mt-4">
        {change && (
          <div className="flex items-center space-x-1">
            {changeType === 'increase' ? 
              <ArrowUpRight className="w-4 h-4 text-green-500" /> : 
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            }
            <p className={cn('text-sm font-medium', 
              isPrimary 
                ? 'text-white/90'
                : changeType === 'increase' ? 'text-green-500' : 'text-red-500'
            )}>
              {change}
            </p>
            <p className={cn('text-xs', isPrimary ? 'text-primary-200/80' : 'text-gray-400 dark:text-gray-500')}>vs mois précédent</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default KpiCard;

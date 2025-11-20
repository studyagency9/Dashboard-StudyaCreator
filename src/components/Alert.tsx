import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../utils/cn';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

const alertConfig = {
  success: {
    icon: <CheckCircle className="w-5 h-5" />,
    bgClass: 'bg-green-100 border-green-400',
    textClass: 'text-green-800',
  },
  error: {
    icon: <AlertTriangle className="w-5 h-5" />,
    bgClass: 'bg-red-100 border-red-400',
    textClass: 'text-red-800',
  },
};

const Alert = ({ type, message }: AlertProps) => {
  const config = alertConfig[type];

  return (
    <motion.div
      className={cn('flex items-center p-4 rounded-lg border', config.bgClass, config.textClass)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      role="alert"
    >
      <div className="flex-shrink-0">{config.icon}</div>
      <div className="ml-3 text-sm font-medium">{message}</div>
    </motion.div>
  );
};

export default Alert;

import { motion } from 'framer-motion';
import { Square, RectangleHorizontal, RectangleVertical } from 'lucide-react';

const ratios = [
  { name: '1:1', icon: <Square size={24} /> },
  { name: '4:5', icon: <RectangleVertical size={24} /> },
  { name: '9:16', icon: <RectangleVertical size={24} className="transform scale-y-150" /> },
  { name: '16:9', icon: <RectangleHorizontal size={24} className="transform scale-x-150" /> },
];

interface RatioSelectorProps {
  value: string | null;
  onChange: (ratio: string) => void;
}

const RatioSelector = ({ value, onChange }: RatioSelectorProps) => {

  return (
    <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Ratio</h3>
      <div className="flex items-center space-x-4">
        {ratios.map((ratio) => (
          <motion.div
            key={ratio.name}
            className={`relative p-4 rounded-lg cursor-pointer border-2 transition-colors ${value === ratio.name ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
            onClick={() => onChange(ratio.name)}
            whileHover={{ scale: 1.05 }}
                      >
            <div className={`flex flex-col items-center justify-center w-16 h-16 ${value === ratio.name ? 'text-primary-600 dark:text-primary-300' : 'text-gray-500 dark:text-gray-400'}`}>
              {ratio.icon}
              <p className="mt-2 text-sm font-semibold">{ratio.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RatioSelector;

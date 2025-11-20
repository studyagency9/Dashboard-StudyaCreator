import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
  disabled: boolean;
}

const CategorySelector = ({ categories, selectedCategory, onSelectCategory, disabled }: CategorySelectorProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Catégorie</h3>
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <Menu.Button 
            disabled={disabled}
            className="inline-flex justify-between w-full rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-3 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
          >
            <span className="flex items-center">
              <LayoutGrid className="w-5 h-5 mr-3 text-gray-400" />
              {selectedCategory || 'Sélectionnez une catégorie'}
            </span>
                        <ChevronDown className="-mr-1 ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0 w-full mt-2 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
              {categories.map(category => (
                <Menu.Item key={category}>
                  {({ active }) => (
                    <button onClick={() => onSelectCategory(category)} className={`${active ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'} group flex rounded-md items-center w-full px-4 py-2 text-sm`}>
                      {category}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </motion.div>
  );
};

export default CategorySelector;

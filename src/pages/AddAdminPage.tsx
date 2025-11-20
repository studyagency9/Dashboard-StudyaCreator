import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { ShieldPlus, User, Mail, Phone, ChevronDown } from 'lucide-react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const roles = ['Admin', 'Superadmin'];

const AddAdminPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <DashboardLayout>
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">Ajouter un nouvel administrateur</h2>
        <p className="text-gray-500 mt-2">Remplissez le formulaire pour créer un compte administrateur.</p>
        
        <form className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <FloatingLabelInput id="firstName" label="Prénom" icon={<User size={20} />} value={formData.firstName} onChange={handleChange} />
            <FloatingLabelInput id="lastName" label="Nom" icon={<User size={20} />} value={formData.lastName} onChange={handleChange} />
            <FloatingLabelInput id="email" label="Adresse e-mail" type="email" icon={<Mail size={20} />} containerClassName="md:col-span-2" value={formData.email} onChange={handleChange} />
            <FloatingLabelInput id="phone" label="Téléphone" type="tel" icon={<Phone size={20} />} containerClassName="md:col-span-2" value={formData.phone} onChange={handleChange} />
            
            {/* Role Selector */}
            <div className="md:col-span-2">
              <Menu as="div" className="relative inline-block text-left w-full">
                <div>
                  <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    {selectedRole}
                    <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {roles.map(role => (
                        <Menu.Item key={role}>
                          {({ active }) => (
                            <a href="#" onClick={() => setSelectedRole(role)} className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                              {role}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button type="submit" className="flex items-center justify-center px-6 py-3 bg-gradient-to-br from-primary-500 to-primary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/40 transition-all duration-300" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <ShieldPlus className="w-5 h-5 mr-2" />
              Créer l'administrateur
            </motion.button>
          </div>
        </form>
      </motion.div>
    </DashboardLayout>
  );
};

export default AddAdminPage;

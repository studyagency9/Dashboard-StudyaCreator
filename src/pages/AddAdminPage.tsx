import { useState, useEffect, Fragment } from 'react';
import type { FormEvent } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldPlus, User, Mail, Lock, ChevronDown, Loader2 } from 'lucide-react';
import { createAdmin } from '../services/adminService';
import Alert from '../components/Alert';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { Menu, Transition } from '@headlessui/react';

const roles = ['Admin', 'Superadmin'];

const AddAdminPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    if (!formData.password) {
      setStatus({ message: 'Le mot de passe est requis.', type: 'error' });
      setIsLoading(false);
      return;
    }

    const adminData = {
      ...formData,
      role: selectedRole.toLowerCase() as 'admin' | 'superadmin',
    };

    try {
      await createAdmin(adminData);
      setStatus({ message: 'Administrateur créé avec succès !', type: 'success' });
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      setSelectedRole(roles[0]);
    } catch (err: any) {
      setStatus({ message: err.response?.data?.message || 'Une erreur est survenue lors de la création.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
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
        <p className="text-gray-500 mt-2 mb-6">Remplissez le formulaire pour créer un compte administrateur.</p>
        
        <AnimatePresence>
          {status && <Alert type={status.type} message={status.message} />}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <FloatingLabelInput id="firstName" label="Prénom" icon={<User size={20} />} value={formData.firstName} onChange={handleChange} />
            <FloatingLabelInput id="lastName" label="Nom" icon={<User size={20} />} value={formData.lastName} onChange={handleChange} />
            <FloatingLabelInput id="email" label="Adresse e-mail" type="email" icon={<Mail size={20} />} containerClassName="md:col-span-2" value={formData.email} onChange={handleChange} />
            <FloatingLabelInput id="password" label="Mot de passe" type="password" icon={<Lock size={20} />} containerClassName="md:col-span-2" value={formData.password} onChange={handleChange} />
            
            <div className="md:col-span-2">
              <Menu as="div" className="relative inline-block text-left w-full">
                <div>
                  <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    {selectedRole}
                    <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
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

          <div className="flex justify-end pt-4">
            <motion.button type="submit" disabled={isLoading} className="flex items-center justify-center px-6 py-3 bg-gradient-to-br from-primary-500 to-primary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <ShieldPlus className="w-5 h-5 mr-2" />}
              {isLoading ? 'Création en cours...' : "Créer l'administrateur"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </DashboardLayout>
  );
};

export default AddAdminPage;

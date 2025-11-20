import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Phone } from 'lucide-react';
import FloatingLabelInput from '../components/FloatingLabelInput';

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

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
        <h2 className="text-2xl font-bold text-gray-800">Ajouter un nouvel utilisateur</h2>
        <p className="text-gray-500 mt-2">Remplissez le formulaire pour créer un compte utilisateur.</p>
        
        <form className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <FloatingLabelInput 
              id="firstName"
              label="Prénom"
              icon={<User size={20} />}
              value={formData.firstName}
              onChange={handleChange}
            />
            <FloatingLabelInput 
              id="lastName"
              label="Nom"
              icon={<User size={20} />}
              value={formData.lastName}
              onChange={handleChange}
            />
            <FloatingLabelInput 
              id="email"
              label="Adresse e-mail"
              type="email"
              icon={<Mail size={20} />}
              containerClassName="md:col-span-2"
              value={formData.email}
              onChange={handleChange}
            />
            <FloatingLabelInput 
              id="phone"
              label="Téléphone"
              type="tel"
              icon={<Phone size={20} />}
              containerClassName="md:col-span-2"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <motion.button
              type="submit"
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-br from-primary-500 to-primary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/40 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Créer l'utilisateur
            </motion.button>
          </div>
        </form>
      </motion.div>
    </DashboardLayout>
  );
};

export default AddUserPage;

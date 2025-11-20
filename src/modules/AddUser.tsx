import { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingLabelInput from '../components/FloatingLabelInput';

const AddUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation and submission logic can be added here
    console.log({ firstName, lastName, email, phone, password });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Ajouter un Utilisateur</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingLabelInput
            id="firstName"
            label="Prénom"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <FloatingLabelInput
            id="lastName"
            label="Nom"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <FloatingLabelInput
          id="email"
          label="Adresse e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FloatingLabelInput
          id="phone"
          label="Téléphone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <FloatingLabelInput
          id="password"
          label="Mot de passe temporaire"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex justify-end gap-3 pt-4">
          <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Annuler
          </button>
          <motion.button
            type="submit"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Créer l'utilisateur
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;

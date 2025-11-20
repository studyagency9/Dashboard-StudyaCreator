import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Gem, ShoppingBag, Palette, GraduationCap, Mic, Utensils, Tag, Briefcase, Dumbbell, Search } from 'lucide-react';

export const themesData = [
  {
    name: 'Beauté & Bien-être',
    icon: <Gem />,
    color: 'from-pink-400 to-rose-400',
    categories: ['Manicure & Pédicure', 'Vente de mèches', 'Coiffure', 'Maquillage', 'Skin Care', 'Massages & Spa'],
  },
  {
    name: 'Mode & Lifestyle',
    icon: <Palette />,
    color: 'from-purple-400 to-indigo-400',
    categories: ['Vente de vêtements', 'Accessoires', 'Chaussures', 'Bijoux', 'Sacs', 'Tendances'],
  },
  {
    name: 'Commerce & Promotion',
    icon: <ShoppingBag />,
    color: 'from-sky-400 to-cyan-400',
    categories: ['Promo smartphone', 'Ouverture de boutique', 'Deals', 'Offres de la semaine', 'Ventes de produits'],
  },
  {
    name: 'Éducation & Formation',
    icon: <GraduationCap />,
    color: 'from-blue-500 to-indigo-500',
    categories: ['Formations pro', 'Back to School', 'Admissions', 'Cours en ligne'],
  },
  {
    name: 'Événements & Loisirs',
    icon: <Mic />,
    color: 'from-red-500 to-orange-500',
    categories: ['Concerts', 'Événement culturel', 'Soirées', 'Pool Party', 'Conférences'],
  },
  {
    name: 'Food & Restauration',
    icon: <Utensils />,
    color: 'from-amber-400 to-orange-400',
    categories: ['Fast Food', 'Plat du jour', 'Menu restaurant', 'Jus & Smoothies'],
  },
  {
    name: 'Produits & Marque',
    icon: <Tag />,
    color: 'from-teal-400 to-cyan-500',
    categories: ['Parfums', 'Produits beauté', 'Skincare', 'Produits haut de gamme'],
  },
  {
    name: 'Services',
    icon: <Briefcase />,
    color: 'from-gray-500 to-gray-600',
    categories: ['Immobilier', 'Abonnements streaming', 'Voyage & Tourisme', 'Freelance'],
  },
  {
    name: 'Sport & Fitness',
    icon: <Dumbbell />,
    color: 'from-lime-500 to-green-500',
    categories: ['Salle de sport', 'Vente accessoires', 'Produits sportifs', 'Goodies'],
  },
  {
    name: 'Recrutement & Emploi',
    icon: <Search />,
    color: 'from-slate-600 to-slate-700',
    categories: ['Annonces d’emploi', 'Campagnes de recrutement', 'Startup hiring', 'Tech talent'],
  },
];

const themes = themesData;

interface ThemeSelectorProps {
  onThemeSelect: (theme: string | null) => void;
}

const ThemeSelector = ({ onThemeSelect }: ThemeSelectorProps) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const handleSelectTheme = (themeName: string) => {
    const newSelectedTheme = selectedTheme === themeName ? null : themeName;
    setSelectedTheme(newSelectedTheme);
    onThemeSelect(newSelectedTheme);
  };

  return (
    <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Thème</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {themes.map((theme) => (
          <motion.div
            key={theme.name}
            className={`relative rounded-xl cursor-pointer h-28 flex flex-col items-center justify-center text-white font-semibold bg-gradient-to-br ${theme.color} p-2 text-center`}
            onClick={() => handleSelectTheme(theme.name)}
            whileHover={{ scale: 1.05 }}
            animate={selectedTheme === theme.name ? { scale: 1.05, y: -5 } : { scale: 1, y: 0 }}
          >
            {selectedTheme === theme.name && (
              <motion.div 
                className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
            )}
                        <div className="mb-2">{theme.icon}</div>
            <p className="text-xs font-bold drop-shadow-md leading-tight">{theme.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const categoryTags: { [key: string]: string[] } = {
  'Manicure & Pédicure': ['Nail Art', 'French Manicure', 'Gel', 'Vernis'],
  'Coiffure': ['Tresse', 'Chignon', 'Coloration', 'Coupe Homme'],
  'Vente de vêtements': ['Nouvelle Collection', 'Soldes', 'Lookbook', 'Streetwear'],
  'Promo smartphone': ['iPhone', 'Samsung', 'Android', 'Réduction'],
  'Formations pro': ['Marketing Digital', 'Code', 'Design', 'Langues'],
  'Concerts': ['Live Music', 'Festival', 'DJ Set', 'Billetterie'],
  'Fast Food': ['Burger', 'Pizza', 'Tacos', 'Livraison'],
  'Immobilier': ['Vente', 'Location', 'Appartement', 'Maison'],
};

const themeSubTags: { [key: string]: string[] } = {
  'Beauté & Bien-être': ['Promo', 'Soin', 'Nouveau Produit', 'Salon'],
  'Mode & Lifestyle': ['Collection', 'Promo', 'Tendance', 'Lookbook'],
  'Commerce & Promo': ['Deal', 'Nouveauté', 'Flash Sale', 'Livraison Gratuite'],
  'Éducation & Formation': ['Inscription', 'Cours', 'Certification', 'Webinaire'],
  'Événements & Loisirs': ['Concert', 'Festival', 'Soirée', 'Conférence'],
  'Food & Restauration': ['Menu', 'Plat du Jour', 'Promo', 'Nouveau'],
  'Produits & Marque': ['Lancement', 'Packaging', 'Promo', 'Edition Limitée'],
  'Services': ['Immobilier', 'Voyage', 'Abonnement', 'Consulting'],
  'Sport & Fitness': ['Promo', 'Challenge', 'Équipement', 'Cours'],
  'Recrutement & Emploi': ['Offre d\'emploi', 'Nous recrutons', 'Tech', 'Startup'],
};

const genericTags = ['Promo', 'Événement', 'Produit', 'Service'];
const formatTags = ['Carrousel', 'Flyer', 'Carré', 'Portrait', 'Story'];

interface TagInputProps {
  selectedTheme: string | null;
  selectedCategory: string | null;
  value: string[];
  onChange: (tags: string[]) => void;
}

const TagInput = ({ selectedTheme, selectedCategory, value, onChange }: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const suggestedThemeTags = (selectedTheme && themeSubTags[selectedTheme]) || [];
  const suggestedCategoryTags = (selectedCategory && categoryTags[selectedCategory]) || [];
  const allSuggestedTags = [...new Set([...suggestedThemeTags, ...suggestedCategoryTags])];
  
  const handleAddTag = (tag: string) => {
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInputValue('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Tags</h3>
            <div className="flex flex-wrap items-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg">
        <AnimatePresence>
          {value.map(tag => (
            <motion.div
              key={tag}
              className="flex items-center bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200 text-sm font-semibold px-3 py-1.5 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <span>{tag}</span>
              <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100">
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTag(inputValue)}
          className="flex-grow bg-transparent focus:outline-none text-gray-800 dark:text-gray-200"
          placeholder="Ajouter un tag..."
        />
      </div>
                  {allSuggestedTags.length > 0 && <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 my-3">Suggestions</h4>}
      <div className="flex flex-wrap gap-2">
                {allSuggestedTags.map(tag => (
          !value.includes(tag) && (
            <button 
              key={tag}
              onClick={() => handleAddTag(tag)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              + {tag}
            </button>
          )
        ))}
      </div>

            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 my-3">Type de contenu</h4>
      <div className="flex flex-wrap gap-2">
                {genericTags.map(tag => (
          !value.includes(tag) && (
            <button 
              key={tag}
              onClick={() => handleAddTag(tag)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              + {tag}
            </button>
          )
        ))}
      </div>

            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 my-3">Formats</h4>
      <div className="flex flex-wrap gap-2">
        {formatTags.map(tag => (
          <button 
            key={tag}
            onClick={() => handleAddTag(tag)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${value.includes(tag) ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            {value.includes(tag) ? '✓' : '+'} {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagInput;

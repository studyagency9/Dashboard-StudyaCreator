import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Image } from 'lucide-react';

const themes = [
  { name: 'Minimaliste', color: 'bg-gray-100' },
  { name: 'Corporate', color: 'bg-blue-100' },
  { name: 'Créatif', color: 'bg-pink-100' },
  { name: 'Tech', color: 'bg-indigo-100' },
  { name: 'Nature', color: 'bg-green-100' },
  { name: 'Luxe', color: 'bg-amber-100' },
  { name: 'Vintage', color: 'bg-orange-100' },
  { name: 'Futuriste', color: 'bg-purple-100' },
  { name: 'Éducation', color: 'bg-cyan-100' },
];

const ratios = ['1:1', '4:5', '9:16', '16:9'];

const AddTemplate = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0].name);
  const [selectedRatio, setSelectedRatio] = useState(ratios[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Ajouter un Nouveau Template</h1>

      {/* Theme Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Thème Principal</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {themes.map((theme) => (
            <motion.div
              key={theme.name}
              className={`p-4 rounded-xl ${theme.color} text-center cursor-pointer border ${selectedTheme === theme.name ? 'border-primary-500 ring-2 ring-primary-300' : 'border-transparent'}`}
              onClick={() => setSelectedTheme(theme.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className="font-medium text-gray-800">{theme.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ratio Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Format (Ratio)</h2>
        <div className="flex flex-wrap gap-3">
          {ratios.map((ratio) => (
            <motion.button
              key={ratio}
              type="button"
              className={`px-4 py-2 rounded-lg font-medium border ${selectedRatio === ratio ? 'bg-primary-50 text-primary-600 border-primary-500' : 'bg-white text-gray-700 border-gray-300'}`}
              onClick={() => setSelectedRatio(ratio)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {ratio}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Image URL Input with Preview */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Image Principale</h2>
        <div className="flex gap-4 items-start">
          <div className="flex-1 relative">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Entrez l'URL de l'image"
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>
          {imageUrl && (
            <motion.div 
              className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={() => setImageUrl('')} />
              {!imageUrl && <div className="flex items-center justify-center w-full h-full text-gray-400"><Image size={20} /></div>}
            </motion.div>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tags</h2>
        <div className="flex gap-2 mb-3 flex-wrap">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center bg-primary-50 text-primary-700 font-medium px-3 py-1 rounded-full">
              {tag}
              <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-primary-600 hover:text-primary-800">
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Ajouter un tag..."
            className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
          <button
            onClick={handleAddTag}
            className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
          >
            <Plus size={16} className="mr-1" /> Ajouter
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500">Suggestions: {selectedTheme.toLowerCase()}, design, template, premium</div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Description</h2>
        <textarea
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="Décrivez brièvement ce template..."
        />
      </div>

      {/* Credits */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Crédits</h2>
        <input
          type="text"
          placeholder="Auteur ou source (facultatif)"
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Annuler
        </button>
        <motion.button
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Créer le Template
        </motion.button>
      </div>
    </div>
  );
};

export default AddTemplate;

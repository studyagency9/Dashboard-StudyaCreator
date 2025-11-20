import DashboardLayout from '../layouts/DashboardLayout';
import ThemeSelector, { themesData } from '../components/ThemeSelector';
import CategorySelector from '../components/CategorySelector';
import RatioSelector from '../components/RatioSelector';
import ImagePreviewInput from '../components/ImagePreviewInput';
import TagInput from '../components/TagInput';
import { useState, useEffect } from 'react';
import { createTemplate } from '../services/templateService';
import { motion } from 'framer-motion';
import { Send, Loader2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import { AnimatePresence } from 'framer-motion';

const AddTemplatePage = () => {
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState({
    theme: '',
    category: '',
    ratio: '1:1', // Default value
    imageUrl: '',
    tags: [] as string[],
  });

    useEffect(() => {
    const { theme, category, ratio, imageUrl } = formData;
    setIsFormValid(!!(theme && category && ratio && imageUrl));
  }, [formData]);

  useEffect(() => {
    if (apiStatus) {
      const timer = setTimeout(() => {
        setApiStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [apiStatus]);

  const handleThemeChange = (themeName: string | null) => {
    const newCategories = themesData.find(t => t.name === themeName)?.categories || [];
    setAvailableCategories(newCategories);
    setFormData(prev => ({
      ...prev,
      theme: themeName || '',
      category: '', // Reset category when theme changes
    }));
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

      const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiStatus(null);

    try {
      await createTemplate(formData);
      setApiStatus({ type: 'success', message: 'Template créé avec succès !' });
      // Optionnel : réinitialiser le formulaire après un succès
      // setFormData({ theme: '', category: '', ratio: '', imageUrl: '', tags: [] });
    } catch (error) {
      setApiStatus({ type: 'error', message: 'Erreur lors de la création du template. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DashboardLayout>
      <motion.div 
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
                        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/templates" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                  Templates
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Ajouter</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <AnimatePresence>
          {apiStatus && <Alert type={apiStatus.type} message={apiStatus.message} />}
        </AnimatePresence>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-6">Ajouter un nouveau template</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Remplissez les informations ci-dessous pour créer un template.</p>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
                        <ThemeSelector onThemeSelect={handleThemeChange} />
            {formData.theme && (
              <CategorySelector 
                categories={availableCategories} 
                selectedCategory={formData.category} 
                onSelectCategory={(category) => handleChange('category', category)} 
                disabled={!formData.theme}
              />
            )}
            <RatioSelector value={formData.ratio} onChange={(ratio) => handleChange('ratio', ratio)} />
            <ImagePreviewInput 
              value={formData.imageUrl} 
              onChange={(url) => handleChange('imageUrl', url)} 
              onRatioDetect={(ratio) => handleChange('ratio', ratio)}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <TagInput selectedTheme={formData.theme} selectedCategory={formData.category} value={formData.tags} onChange={(tags) => handleChange('tags', tags)} />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10 flex justify-end">
                              <motion.button
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid}
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-br from-primary-500 to-primary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: isLoading ? 1 : 1.05, y: isLoading ? 0 : -2 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Publication en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Publier le template
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AddTemplatePage;

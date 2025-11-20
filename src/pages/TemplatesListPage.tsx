import { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getAllTemplates, deleteTemplate } from '../services/templateService';
import { Loader2, Trash2, ChevronDown, Plus, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { themesData } from '../components/ThemeSelector';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import TemplateDetailModal from '../components/TemplateDetailModal';
import { motion, AnimatePresence } from 'framer-motion';

// Définir une interface claire pour les données de template
interface Template {
  _id: string;
  theme: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

const TemplatesListPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [alert, setAlert] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [openTheme, setOpenTheme] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    const fetchTemplates = async (isInitialLoad = false) => {
      if (isInitialLoad) setIsLoading(true);
      try {
        const data = await getAllTemplates();
        setTemplates(data);
      } catch (err) {
        setError('Impossible de charger les templates. Veuillez réessayer plus tard.');
      } finally {
        if (isInitialLoad) setIsLoading(false);
      }
    };

    fetchTemplates(true);

    const intervalId = setInterval(() => {
      fetchTemplates();
    }, 240000); // 4 minutes

    return () => clearInterval(intervalId);
  }, []);

  const openDetailModal = (template: Template, index: number) => {
    console.log('Template cliqué pour détails :', template);
    setSelectedTemplate(template);
    setSelectedTemplateIndex(index);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTemplate(null);
    setSelectedTemplateIndex(-1);
  };

  const openDeleteModalFromList = (templateId: string) => {
    const templateToDelete = templates.find(t => t._id === templateId);
    if (templateToDelete) {
      setTemplateToDelete(templateToDelete);
      setIsModalOpen(true);
    }
  };

  const openDeleteModalFromDetail = () => {
    if (selectedTemplate) {
      setTemplateToDelete(selectedTemplate);
      setIsModalOpen(true);
      setIsDetailModalOpen(false);
    }
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setTemplateToDelete(null);
    setIsDeleting(false);
    setAlert(null);
  };

  const handleDelete = async () => {
    if (!templateToDelete) return;
    setIsDeleting(true);
    try {
      await deleteTemplate(templateToDelete._id);
      setTemplates(prev => prev.filter(t => t._id !== templateToDelete._id));
      setIsModalOpen(false);
      setTemplateToDelete(null);
      setAlert({ type: 'success', message: 'Template supprimé avec succès !' });
    } catch (err) {
      console.error('Failed to delete template');
      setAlert({ type: 'error', message: 'Erreur lors de la suppression du template.' });
    } finally {
      setIsDeleting(false);
      setTimeout(() => setAlert(null), 5000);
    }
  };

  const handleNextTemplate = () => {
    if (selectedTemplateIndex < templates.length - 1) {
      const nextIndex = selectedTemplateIndex + 1;
      setSelectedTemplateIndex(nextIndex);
      setSelectedTemplate(templates[nextIndex]);
    }
  };

  const handlePreviousTemplate = () => {
    if (selectedTemplateIndex > 0) {
      const prevIndex = selectedTemplateIndex - 1;
      setSelectedTemplateIndex(prevIndex);
      setSelectedTemplate(templates[prevIndex]);
    }
  };

  const hasNext = selectedTemplateIndex < templates.length - 1;
  const hasPrevious = selectedTemplateIndex > 0;

  const groupedTemplates = templates.reduce((acc, template) => {
    const theme = template.theme || 'Sans Thème';
    if (!acc[theme]) {
      acc[theme] = [];
    }
    acc[theme].push(template);
    return acc;
  }, {} as Record<string, Template[]>);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full pt-20">
          <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-red-500 text-center p-8">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8 relative min-h-screen">
        <AnimatePresence>
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: '-50%' }}
              animate={{ opacity: 1, y: 20, x: '-50%' }}
              exit={{ opacity: 0, y: -50, x: '-50%' }}
              transition={{ duration: 0.3 }}
              className={`fixed top-0 left-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white flex items-center ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {alert.type === 'success' ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
              {alert.message}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mes Templates</h1>
          <span className="text-lg font-semibold bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 px-4 py-1 rounded-full">{templates.length} au total</span>
        </div>
        <AnimatePresence>
          {Object.entries(groupedTemplates).map(([theme, templatesInTheme]) => (
            <div key={theme} className="mb-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <button onClick={() => setOpenTheme(openTheme === theme ? null : theme)} className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <span className="mr-3 text-primary-500">{themesData.find(t => t.name === theme)?.icon}</span>
                  <span className="font-bold text-lg text-gray-800 dark:text-white">{theme}</span>
                  <span className="ml-4 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold px-2 py-0.5 rounded-full">{templatesInTheme.length}</span>
                </div>
                <ChevronDown className={`w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform ${openTheme === theme ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openTheme === theme && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {templatesInTheme.map((template, index) => (
                        <motion.div key={template._id} className="relative group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" whileHover={{ y: -5 }} onClick={() => openDetailModal(template, index)}>
                          <img src={template.imageUrl} alt={template.category} className="w-full h-48 object-cover" />
                          <div className="p-4">
                            <h3 className="font-bold text-gray-800 dark:text-white truncate">{template.category}</h3>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {template.tags.slice(0, 3).map((tag, index) => (
                                <span key={`${template._id}-${tag}-${index}`} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <div className="absolute top-2 right-2">
                            <button onClick={(e) => { e.stopPropagation(); openDeleteModalFromList(template._id); }} className="p-2 bg-white/80 dark:bg-gray-900/80 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </AnimatePresence>
        <Link to="/templates/add">
          <motion.button 
            className="fixed bottom-8 right-8 w-16 h-16 bg-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-primary-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Ajouter un template"
          >
            <Plus size={32} />
          </motion.button>
        </Link>
      </div>
      <DeleteConfirmModal 
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Supprimer le Template"
        message={`Êtes-vous sûr de vouloir supprimer définitivement le template "${templateToDelete?.category}" ? Cette action est irréversible.`}
        isDeleting={isDeleting}
      />
      {selectedTemplate && (
        <TemplateDetailModal 
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          template={selectedTemplate}
          onDeleteClick={openDeleteModalFromDetail}
          onNext={handleNextTemplate}
          onPrevious={handlePreviousTemplate}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      )}
    </DashboardLayout>
  );
};

export default TemplatesListPage;

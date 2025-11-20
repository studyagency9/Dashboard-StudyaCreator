import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X, Tag, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

// Assurez-vous que cette interface est importée ou définie de manière cohérente
interface Template {
  _id: string;
  theme: string;
  category: string;
  imageUrl: string;
  tags: string[];
}

interface TemplateDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
  onDeleteClick: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const TemplateDetailModal = ({ isOpen, onClose, template, onDeleteClick, onNext, onPrevious, hasNext, hasPrevious }: TemplateDetailModalProps) => {
  if (!template) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"><X /></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="w-full h-96 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 relative">
                    <img src={template.imageUrl} alt={template.category} className="w-full h-full object-contain" />
                    <div className="absolute top-0 left-0 right-0 p-2 flex justify-between">
                      <button 
                        onClick={onPrevious} 
                        disabled={!hasPrevious}
                        className={`p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white ${!hasPrevious ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={onNext} 
                        disabled={!hasNext}
                        className={`p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white ${!hasNext ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 dark:text-white">
                      {template.category}
                    </Dialog.Title>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Thème : <span className="font-semibold text-primary-600 dark:text-primary-400">{template.theme}</span></p>
                    
                    <div className="mt-4 pt-4 border-t dark:border-gray-700">
                      <h4 className="text-md font-bold text-gray-800 dark:text-white flex items-center"><Tag className="w-4 h-4 mr-2"/> Tags</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {template.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <button 
                        onClick={onDeleteClick}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer le template
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TemplateDetailModal;

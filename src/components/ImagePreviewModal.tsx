import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FocusOn } from 'react-focus-on';

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImagePreviewModal = ({ isOpen, onClose, imageUrl }: ImagePreviewModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <FocusOn onClickOutside={onClose} onEscapeKey={onClose}>
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div 
              className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold text-lg">Aperçu de l'image</h3>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                  <X size={24} />
                </button>
              </div>
              <div className="p-4 flex-grow overflow-auto">
                <img src={imageUrl} alt="Aperçu en grand format" className="max-w-full max-h-full mx-auto" />
              </div>
            </motion.div>
          </div>
        </FocusOn>
      )}
    </AnimatePresence>
  );
};

export default ImagePreviewModal;

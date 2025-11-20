import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Image as ImageIcon, ZoomIn } from 'lucide-react';
import ImagePreviewModal from './ImagePreviewModal';

interface ImagePreviewInputProps {
  value: string;
  onChange: (url: string) => void;
  onRatioDetect: (ratio: string) => void;
}

const ImagePreviewInput = ({ value, onChange, onRatioDetect }: ImagePreviewInputProps) => {
  const [isValidImage, setIsValidImage] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    onChange(newUrl);

    if (newUrl === '') {
      setIsValidImage(null);
      return;
    }

    // Simple check for image extension
    const isImage = /\.(jpeg|jpg|gif|png|webp|bmp|tiff|svg)$/i.test(newUrl);
    setIsValidImage(isImage);
  };

  useEffect(() => {
    if (value && isValidImage) {
      const img = new Image();
      img.src = value;
      img.onload = () => {
        const { width, height } = img;
        const aspectRatio = width / height;
        let closestRatio = '1:1';

        if (aspectRatio > 1.2) closestRatio = '16:9'; // Landscape
        else if (aspectRatio < 0.9) closestRatio = '9:16'; // Tall Portrait
        else if (aspectRatio < 1) closestRatio = '4:5'; // Portrait
        
        onRatioDetect(closestRatio);
      };
    }
  }, [value, isValidImage, onRatioDetect]);

  return (
    <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">URL de l'image</h3>
      <div className="flex items-center space-x-4">
        <div className="relative flex-grow">
          <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="url"
            value={value}
            onChange={handleUrlChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="https://exemple.com/image.png"
          />
        </div>
        <AnimatePresence>
          {value && isValidImage && (
                        <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative w-32 h-32 rounded-lg overflow-hidden shadow-lg border-2 border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <img src={value} alt="Aperçu" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
              </button>
            </motion.div>
          )}
          {value && !isValidImage && (
             <motion.div
              className="w-32 h-32 rounded-lg bg-gray-100 dark:bg-gray-700 flex flex-col items-center justify-center text-center p-2 border-2 border-red-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <ImageIcon className="w-8 h-8 text-red-500 mb-2" />
              <p className="text-xs text-red-600">URL invalide ou image non supportée.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ImagePreviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        imageUrl={value} 
      />
    </div>
  );
};

export default ImagePreviewInput;

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatFileSize, getFileType, getFileIcon } from "@/utils/fileUtils";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FilePreview = ({ file, isOpen, onClose }) => {
  if (!isOpen || !file) return null;

  const fileType = getFileType(file.name);
  const fileIcon = getFileIcon(fileType);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="bg-surface rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">
                File Preview
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1 h-8 w-8"
              >
                <ApperIcon name="X" size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <ApperIcon name={fileIcon} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">
                    {file.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {formatFileSize(file.size)} • {fileType}
                  </p>
                </div>
              </div>
              
              {file.preview && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>
              )}
              
              {file.url && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    File URL
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={file.url}
                      readOnly
                      className="flex-1 px-3 py-2 bg-surface border border-gray-300 rounded-lg text-sm"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(file.url)}
                    >
                      <ApperIcon name="Copy" size={14} className="mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilePreview;
import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ variant = "default", onAction }) => {
  if (variant === "upload-history") {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Upload" size={32} className="text-primary" />
        </div>
        
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No uploads yet
        </h3>
        
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Your uploaded files will appear here once you start uploading. Drag and drop files or click to browse.
        </p>
        
        <button
          onClick={onAction}
          className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Upload Your First File
        </button>
      </motion.div>
    );
  }

  if (variant === "active-uploads") {
    return (
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="CheckCircle" size={24} className="text-accent" />
        </div>
        
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          All caught up!
        </h3>
        
        <p className="text-text-secondary">
          No active uploads at the moment.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="text-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <ApperIcon name="FileText" size={32} className="text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        No files here
      </h3>
      
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        Get started by uploading your first file. We support images, documents, videos, and more.
      </p>
      
      <button
        onClick={onAction}
        className="inline-flex items-center px-6 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
      >
        <ApperIcon name="Upload" size={20} className="mr-2" />
        Upload Files
      </button>
    </motion.div>
  );
};

export default Empty;
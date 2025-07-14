import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <motion.header
      className="bg-surface/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="Upload" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DropZone
              </h1>
              <p className="text-xs text-text-secondary hidden sm:block">
                Upload and manage your files
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-text-secondary">
              <ApperIcon name="Shield" size={16} />
              <span>Secure uploads</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-text-secondary">
              <ApperIcon name="Zap" size={16} />
              <span>Fast processing</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
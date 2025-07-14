import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry, variant = "default" }) => {
  if (variant === "inline") {
    return (
      <motion.div
        className="flex items-center space-x-2 text-error text-sm"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ApperIcon name="AlertCircle" size={16} />
        <span>{message}</span>
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
      <div className="w-16 h-16 bg-gradient-to-br from-error/20 to-error/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name="AlertTriangle" size={24} className="text-error" />
      </div>
      
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        Something went wrong
      </h3>
      
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        {message || "An unexpected error occurred. Please try again."}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
        >
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </button>
      )}
    </motion.div>
  );
};

export default Error;
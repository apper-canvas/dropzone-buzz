import React from "react";
import { motion } from "framer-motion";

const Loading = ({ variant = "default" }) => {
  if (variant === "file-card") {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="bg-surface rounded-lg p-4 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer" />
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 shimmer" />
              </div>
              <div className="w-20 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer" />
            </div>
            <div className="mt-3 h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "drop-zone") {
    return (
      <motion.div
        className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-surface/50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 shimmer" />
        <div className="space-y-2">
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto w-48 shimmer" />
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto w-32 shimmer" />
        </div>
        <div className="mt-6 h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto shimmer" />
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-12 h-12 border-4 border-primary/20 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-secondary rounded-full animate-spin animation-delay-75"></div>
      </motion.div>
    </div>
  );
};

export default Loading;
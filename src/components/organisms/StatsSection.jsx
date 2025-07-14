import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatFileSize } from "@/utils/fileUtils";
import ApperIcon from "@/components/ApperIcon";
import uploadService from "@/services/api/uploadService";

const StatsSection = () => {
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalSize: 0,
    completedUploads: 0,
    activeUploads: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const [allFiles, activeFiles] = await Promise.all([
        uploadService.getAllUploads(),
        uploadService.getActiveUploads()
      ]);
      
      const totalSize = allFiles.reduce((sum, file) => sum + file.size, 0);
      const completedFiles = allFiles.filter(file => file.status === "completed");
      
      setStats({
        totalFiles: allFiles.length,
        totalSize,
        completedUploads: completedFiles.length,
        activeUploads: activeFiles.length
      });
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    
    // Update stats every 10 seconds
    const interval = setInterval(loadStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: "Total Files",
      value: stats.totalFiles,
      icon: "Files",
      color: "from-primary/20 to-secondary/20",
      textColor: "text-primary"
    },
    {
      title: "Total Size",
      value: formatFileSize(stats.totalSize),
      icon: "HardDrive",
      color: "from-accent/20 to-success/20",
      textColor: "text-accent"
    },
    {
      title: "Completed",
      value: stats.completedUploads,
      icon: "CheckCircle",
      color: "from-success/20 to-accent/20",
      textColor: "text-success"
    },
    {
      title: "Active",
      value: stats.activeUploads,
      icon: "Upload",
      color: "from-info/20 to-primary/20",
      textColor: "text-info"
    }
  ];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-surface rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shimmer" />
                <div className="text-right">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 shimmer" />
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12 mt-2 shimmer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-surface rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                <ApperIcon name={stat.icon} size={20} className={stat.textColor} />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-secondary">
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StatsSection;
import React from "react";
import { motion } from "framer-motion";
import { formatFileSize, getFileType, getFileIcon } from "@/utils/fileUtils";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import StatusBadge from "@/components/atoms/StatusBadge";
import ProgressBar from "@/components/atoms/ProgressBar";

const FileCard = ({ file, onAction, showActions = true }) => {
  const fileType = getFileType(file.name);
  const fileIcon = getFileIcon(fileType);
  
  const handleCopy = () => {
    onAction("copy", file.Id);
  };
  
  const handleShare = () => {
    onAction("share", file.Id);
  };
  
  const handleRemove = () => {
    onAction("remove", file.Id);
  };
  
  const handlePause = () => {
    onAction("pause", file.Id);
  };
  
  const handleResume = () => {
    onAction("resume", file.Id);
  };
  
  const handleCancel = () => {
    onAction("cancel", file.Id);
  };

  return (
    <motion.div
      className={`file-card bg-surface rounded-lg p-4 shadow-sm border-l-4 file-type-${fileType}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
              <ApperIcon name={fileIcon} size={20} className="text-primary" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-text-primary truncate">
              {file.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-text-secondary">
                {formatFileSize(file.size)}
              </span>
              <span className="text-xs text-text-muted">•</span>
              <span className="text-xs text-text-secondary">
                {formatDistanceToNow(new Date(file.uploadedAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <StatusBadge status={file.status} />
          
          {showActions && (
            <div className="flex items-center space-x-1">
              {file.status === "completed" && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="p-1 h-8 w-8"
                  >
                    <ApperIcon name="Copy" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="p-1 h-8 w-8"
                  >
                    <ApperIcon name="Share" size={14} />
                  </Button>
                </>
              )}
              
              {file.status === "uploading" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePause}
                  className="p-1 h-8 w-8"
                >
                  <ApperIcon name="Pause" size={14} />
                </Button>
              )}
              
              {file.status === "paused" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResume}
                  className="p-1 h-8 w-8"
                >
                  <ApperIcon name="Play" size={14} />
                </Button>
              )}
              
              {["uploading", "paused"].includes(file.status) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="p-1 h-8 w-8 text-error hover:text-error"
                >
                  <ApperIcon name="X" size={14} />
                </Button>
              )}
              
              {file.status === "completed" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="p-1 h-8 w-8 text-error hover:text-error"
                >
                  <ApperIcon name="Trash2" size={14} />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {["uploading", "paused"].includes(file.status) && (
        <div className="mt-3">
          <ProgressBar value={file.progress} />
        </div>
      )}
      
      {file.preview && (
        <div className="mt-3">
          <img
            src={file.preview}
            alt={file.name}
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      )}
    </motion.div>
  );
};

export default FileCard;
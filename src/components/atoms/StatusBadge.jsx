import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const StatusBadge = ({ status, className }) => {
  const statusConfig = {
    pending: {
      icon: "Clock",
      text: "Pending",
      className: "bg-warning/10 text-warning border-warning/20"
    },
    uploading: {
      icon: "Upload",
      text: "Uploading",
      className: "bg-info/10 text-info border-info/20"
    },
    paused: {
      icon: "Pause",
      text: "Paused",
      className: "bg-gray-100 text-gray-600 border-gray-200"
    },
    completed: {
      icon: "CheckCircle",
      text: "Completed",
      className: "bg-success/10 text-success border-success/20"
    },
    failed: {
      icon: "XCircle",
      text: "Failed",
      className: "bg-error/10 text-error border-error/20"
    },
    cancelled: {
      icon: "X",
      text: "Cancelled",
      className: "bg-gray-100 text-gray-600 border-gray-200"
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
      config.className,
      className
    )}>
      <ApperIcon name={config.icon} size={12} className="mr-1" />
      {config.text}
    </span>
  );
};

export default StatusBadge;
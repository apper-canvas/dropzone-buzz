import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import FileCard from "@/components/molecules/FileCard";
import FilePreview from "@/components/molecules/FilePreview";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import uploadService from "@/services/api/uploadService";

const FileHistory = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const loadUploadHistory = async () => {
    try {
      setIsLoading(true);
      setError("");
      const history = await uploadService.getUploadHistory();
      setFiles(history);
    } catch (err) {
      setError("Failed to load upload history");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUploadHistory();
  }, []);

  const handleFileAction = async (action, fileId) => {
    try {
      switch (action) {
        case "copy":
          await uploadService.copyFileUrl(fileId);
          toast.success("File URL copied to clipboard!");
          break;
        case "share":
          await uploadService.shareFile(fileId);
          toast.success("File shared successfully!");
          break;
        case "remove":
          await uploadService.removeFile(fileId);
          setFiles(prev => prev.filter(file => file.Id !== fileId));
          toast.success("File removed successfully!");
          break;
        case "preview":
          const file = files.find(f => f.Id === fileId);
          if (file) {
            setPreviewFile(file);
            setIsPreviewOpen(true);
          }
          break;
        default:
          break;
      }
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleRetry = () => {
    loadUploadHistory();
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading variant="file-card" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Empty variant="upload-history" onAction={() => {}} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">
            Upload History
          </h2>
          <div className="text-sm text-text-secondary">
            {files.length} file{files.length !== 1 ? "s" : ""} uploaded
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <FileCard
              key={file.Id}
              file={file}
              onAction={handleFileAction}
              showActions={true}
            />
          ))}
        </div>
      </motion.div>

      <FilePreview
        file={previewFile}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewFile(null);
        }}
      />
    </div>
  );
};

export default FileHistory;
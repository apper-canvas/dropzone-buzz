import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import DropZone from "@/components/molecules/DropZone";
import FileCard from "@/components/molecules/FileCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import uploadService from "@/services/api/uploadService";

const UploadSection = () => {
  const [activeUploads, setActiveUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFilesSelected = async (files) => {
    setIsLoading(true);
    setError("");
    
    try {
      const uploadPromises = files.map(file => {
        return uploadService.uploadFile(file, (progress) => {
          setActiveUploads(prev => 
            prev.map(upload => 
              upload.name === file.name 
                ? { ...upload, progress: progress.progress }
                : upload
            )
          );
        });
      });

      // Add files to active uploads immediately
      const newUploads = files.map(file => ({
        Id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        progress: 0,
        uploadedAt: new Date()
      }));
      
      setActiveUploads(prev => [...prev, ...newUploads]);
      
      // Wait for all uploads to complete
      const results = await Promise.allSettled(uploadPromises);
      
      // Update active uploads based on results
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          toast.success(`${files[index].name} uploaded successfully!`);
          setActiveUploads(prev => prev.filter(upload => upload.name !== files[index].name));
        } else {
          toast.error(`Failed to upload ${files[index].name}: ${result.reason.message}`);
          setActiveUploads(prev => 
            prev.map(upload => 
              upload.name === files[index].name 
                ? { ...upload, status: "failed" }
                : upload
            )
          );
        }
      });
      
    } catch (err) {
      setError(err.message || "An error occurred while uploading files");
      toast.error("Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadAction = async (action, fileId) => {
    try {
      switch (action) {
        case "pause":
          await uploadService.pauseUpload(fileId);
          toast.info("Upload paused");
          break;
        case "resume":
          await uploadService.resumeUpload(fileId);
          toast.info("Upload resumed");
          break;
        case "cancel":
          await uploadService.cancelUpload(fileId);
          setActiveUploads(prev => prev.filter(upload => upload.Id !== fileId));
          toast.info("Upload cancelled");
          break;
        default:
          break;
      }
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleRetry = () => {
    setError("");
    setActiveUploads([]);
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={handleRetry} />
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
        <DropZone
          onFilesSelected={handleFilesSelected}
          disabled={isLoading}
          multiple={true}
        />
      </motion.div>

      {activeUploads.length > 0 && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Active Uploads
          </h2>
          <div className="space-y-4">
            {activeUploads.map((file) => (
              <FileCard
                key={file.Id}
                file={file}
                onAction={handleUploadAction}
                showActions={true}
              />
            ))}
          </div>
        </motion.div>
      )}

      {isLoading && activeUploads.length === 0 && (
        <div className="mt-8">
          <Loading variant="file-card" />
        </div>
      )}
    </div>
  );
};

export default UploadSection;
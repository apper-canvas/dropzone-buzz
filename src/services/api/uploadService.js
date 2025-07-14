import { generateFileId, validateFile, createFilePreview } from "@/utils/fileUtils";

class UploadService {
  constructor() {
    this.uploads = new Map();
    this.simulateNetworkDelay = true;
  }

  async uploadFile(file, onProgress) {
    const validation = validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    const fileId = generateFileId();
    const fileItem = {
      Id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
      progress: 0,
      uploadedAt: new Date(),
      url: "",
      preview: await createFilePreview(file)
    };

    this.uploads.set(fileId, fileItem);

    // Simulate upload with progress
    return new Promise((resolve, reject) => {
      let progress = 0;
      const totalSize = file.size;
      const chunkSize = Math.max(totalSize / 100, 1024); // At least 1KB chunks
      let uploadedBytes = 0;
      const startTime = Date.now();

      const simulateUpload = () => {
        uploadedBytes += chunkSize;
        progress = Math.min((uploadedBytes / totalSize) * 100, 100);
        
        const currentTime = Date.now();
        const timeElapsed = (currentTime - startTime) / 1000;
        const speed = uploadedBytes / timeElapsed;
        const timeRemaining = (totalSize - uploadedBytes) / speed;

        fileItem.progress = Math.round(progress);
        this.uploads.set(fileId, { ...fileItem });

        if (onProgress) {
          onProgress({
            progress: Math.round(progress),
            loaded: uploadedBytes,
            total: totalSize,
            speed,
            timeRemaining: isFinite(timeRemaining) ? timeRemaining : 0
          });
        }

        if (progress >= 100) {
          // Simulate final processing
          setTimeout(() => {
            const finalFileItem = {
              ...fileItem,
              status: "completed",
              progress: 100,
              url: `https://example.com/files/${fileId}/${file.name}`,
              uploadedAt: new Date()
            };
            this.uploads.set(fileId, finalFileItem);
            resolve(finalFileItem);
          }, 200);
        } else {
          // Random delay to simulate network conditions
          const delay = Math.random() * 100 + 50; // 50-150ms
          setTimeout(simulateUpload, delay);
        }
      };

      // Start upload simulation
      setTimeout(simulateUpload, 100);
    });
  }

  async pauseUpload(fileId) {
    const fileItem = this.uploads.get(fileId);
    if (fileItem) {
      fileItem.status = "paused";
      this.uploads.set(fileId, fileItem);
    }
    return fileItem;
  }

  async resumeUpload(fileId) {
    const fileItem = this.uploads.get(fileId);
    if (fileItem) {
      fileItem.status = "uploading";
      this.uploads.set(fileId, fileItem);
    }
    return fileItem;
  }

  async cancelUpload(fileId) {
    const fileItem = this.uploads.get(fileId);
    if (fileItem) {
      fileItem.status = "cancelled";
      this.uploads.set(fileId, fileItem);
    }
    return fileItem;
  }

  async removeFile(fileId) {
    this.uploads.delete(fileId);
    return true;
  }

  async getUploadHistory() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return Array.from(this.uploads.values())
      .filter(file => file.status === "completed")
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  }

  async getActiveUploads() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return Array.from(this.uploads.values())
      .filter(file => ["uploading", "paused", "pending"].includes(file.status));
  }

  async getAllUploads() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return Array.from(this.uploads.values())
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  }

  getUploadById(fileId) {
    return this.uploads.get(fileId);
  }

  async copyFileUrl(fileId) {
    const fileItem = this.uploads.get(fileId);
    if (fileItem && fileItem.url) {
      await navigator.clipboard.writeText(fileItem.url);
      return true;
    }
    return false;
  }

  async shareFile(fileId) {
    const fileItem = this.uploads.get(fileId);
    if (fileItem && fileItem.url) {
      if (navigator.share) {
        await navigator.share({
          title: fileItem.name,
          text: `Check out this file: ${fileItem.name}`,
          url: fileItem.url
        });
      } else {
        // Fallback to clipboard
        await this.copyFileUrl(fileId);
      }
      return true;
    }
    return false;
  }
}

export default new UploadService();
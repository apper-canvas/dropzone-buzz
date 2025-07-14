export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFileType = (filename) => {
  const extension = filename.split(".").pop().toLowerCase();
  
  const imageTypes = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"];
  const documentTypes = ["pdf", "doc", "docx", "txt", "rtf", "odt", "xls", "xlsx", "ppt", "pptx"];
  const videoTypes = ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv", "m4v"];
  const audioTypes = ["mp3", "wav", "flac", "aac", "ogg", "wma", "m4a"];
  const archiveTypes = ["zip", "rar", "7z", "tar", "gz", "bz2", "xz"];
  
  if (imageTypes.includes(extension)) return "image";
  if (documentTypes.includes(extension)) return "document";
  if (videoTypes.includes(extension)) return "video";
  if (audioTypes.includes(extension)) return "audio";
  if (archiveTypes.includes(extension)) return "archive";
  
  return "other";
};

export const generateFileId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const validateFile = (file) => {
  const maxSize = 100 * 1024 * 1024; // 100MB
  const allowedTypes = [
    // Images
    "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml",
    // Documents
    "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain", "application/rtf", "application/vnd.oasis.opendocument.text",
    "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    // Videos
    "video/mp4", "video/avi", "video/quicktime", "video/x-ms-wmv", "video/x-flv", "video/webm", "video/x-matroska",
    // Audio
    "audio/mpeg", "audio/wav", "audio/flac", "audio/aac", "audio/ogg", "audio/x-ms-wma", "audio/mp4",
    // Archives
    "application/zip", "application/x-rar-compressed", "application/x-7z-compressed",
    "application/x-tar", "application/gzip", "application/x-bzip2"
  ];
  
  const errors = [];
  
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${formatFileSize(maxSize)}`);
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push("File type not supported");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const createFilePreview = (file) => {
  return new Promise((resolve) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    } else {
      resolve(null);
    }
  });
};

export const formatTimeRemaining = (seconds) => {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  } else if (seconds < 3600) {
    return `${Math.round(seconds / 60)}m`;
  } else {
    return `${Math.round(seconds / 3600)}h`;
  }
};

export const calculateUploadSpeed = (bytesUploaded, timeElapsed) => {
  const speed = bytesUploaded / timeElapsed; // bytes per second
  return formatFileSize(speed) + "/s";
};

export const getFileIcon = (fileType) => {
  const iconMap = {
    image: "Image",
    document: "FileText",
    video: "Video",
    audio: "Music",
    archive: "Archive",
    other: "File"
  };
  
  return iconMap[fileType] || "File";
};
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react"; // For the clear button icon
import { useTranslation } from "react-i18next";

// Define the props for the FileUpload component
interface FileUploadProps {
  onFilesUploaded: (files: File[]) => void; // Callback function to handle uploaded files
  accept?: Record<string, string[]>; // Optional: Define accepted file types
  maxSize?: number; // Optional: Define maximum file size in bytes
}

export function Upload({ onFilesUploaded, accept, maxSize }: FileUploadProps) {
  // State to store uploaded files
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Callback function when files are dropped or selected
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      onFilesUploaded(acceptedFiles);
    },
    [onFilesUploaded]
  );

  // Configure react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: accept || {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
    },
    maxSize: maxSize || 5 * 1024 * 1024, // Default to 5MB if not provided
  });

  // Function to remove a file from the uploaded files list
  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFilesUploaded(newFiles); // Update the parent component
  };

  const { t } = useTranslation();

  return (
    <div>
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <div className="flex flex-col flex-wrap items-center">
          <UploadCloud  className="w-11 h-11 text-gray-400 dark:text-white"/>
          <p className="w-full text-gray-400 dark:text-white">{t('dashboard.modals.choose')}</p>
          <p className="w-full text-sm text-gray-500">
          {t('dashboard.modals.format')}
          </p>
        </div>
      </div>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Uploaded Files:</h4>
          <ul className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <li
                key={`${file.name}-${file.lastModified}`} // Unique key combining name and lastModified
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  {/* File Icon or Preview */}
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded">
                      <span className="text-sm">PDF</span>
                    </div>
                  )}
                  {/* File Name and Size */}
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

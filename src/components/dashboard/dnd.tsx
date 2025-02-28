import React from "react";
import { useDropzone } from "react-dropzone";

export function FileUpload({ onFilesUploaded }) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      onFilesUploaded(acceptedFiles);
    },
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer">
      <input {...getInputProps()} />
      <p>Drag & drop files here, or click to select files</p>
      <p className="text-sm text-gray-500">Supported formats: PNG, JPG, GIF, PDF</p>
      {acceptedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold">Uploaded Files:</h4>
          <ul>
            {acceptedFiles.map((file) => (
              <li key={file.path} className="text-sm text-gray-700">
                {file.path} - {file.size} bytes
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
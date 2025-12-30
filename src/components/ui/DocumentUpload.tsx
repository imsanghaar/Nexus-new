import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';

interface DocumentUploadProps {
  onFileUpload: (file: File) => void;
  acceptedTypes?: string[];
  maxFileSize?: number;
  multiple?: boolean;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ 
  onFileUpload, 
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx'],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  multiple = false
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setUploadError(null);
    
    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0];
      setUploadError(error.message);
      return;
    }

    if (acceptedFiles.length > 0) {
      if (multiple) {
        setFiles(prev => [...prev, ...acceptedFiles]);
        acceptedFiles.forEach(file => onFileUpload(file));
      } else {
        setFiles(acceptedFiles);
        onFileUpload(acceptedFiles[0]);
      }
    }
  }, [onFileUpload, multiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes ? { [acceptedTypes.join(',')]: acceptedTypes } : undefined,
    maxSize: maxFileSize,
    multiple,
    onDragEnter: () => setUploadError(null),
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
          ${uploadError ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-gray-400 mb-3" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          <p className="text-gray-600 mb-1">
            {isDragActive 
              ? 'Drop the files here' 
              : `Drag 'n' drop files here, or click to select`}
          </p>
          <p className="text-sm text-gray-500">
            Accepted: {acceptedTypes.join(', ')} | Max size: {(maxFileSize / 1024 / 1024).toFixed(0)}MB
          </p>
          {uploadError && (
            <p className="text-sm text-red-500 mt-2">{uploadError}</p>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">Selected Files:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li 
                key={index} 
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border"
              >
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-gray-500 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
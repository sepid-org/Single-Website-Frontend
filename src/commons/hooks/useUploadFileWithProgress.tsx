import { useUploadFileMutation } from 'apps/website-display/redux/features/FileSlice';
import { useState } from 'react';

// Define a type for the file upload input (extend if necessary)
type CreateFileInputType = {
  file: File;
  // Include any other fields as needed
};

// Custom hook that wraps useUploadFileMutation and tracks progress locally
export const useUploadFileWithProgress = () => {
  const [progress, setProgress] = useState<number | null>(null);
  const [uploadFileMutation, result] = useUploadFileMutation();

  // The wrapped upload function that injects the progress callback
  const uploadFile = async (data: CreateFileInputType) => {
    // Call the mutation passing in the file and a progress callback
    return await uploadFileMutation({
      ...data,
      progressCallback: setProgress,
    }).unwrap();
  };

  return { uploadFile, result, progress };
};

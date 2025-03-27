import jsonToFormData from 'commons/utils/jsonToFromDate';
import { ContentManagementServiceApi } from './ManageContentServiceApiSlice';
import axios from 'axios';
import { CMS_URL } from 'commons/constants/Constants';

type CreateFileInputType = {
  file: File;
  progressCallback?: (progress: number | null) => void;
}

type CreateFileOutputType = {
  file: string;
}

export const FileSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    uploadFile: builder.mutation<CreateFileOutputType, CreateFileInputType>({
      queryFn: async (data, api) => {
        try {
          const result = await axios.post(
            `${CMS_URL}api/file-storage/file/`,
            jsonToFormData(data),
            {
              onUploadProgress: upload => {
                const uploadProgress = Math.round((100 * upload.loaded) / upload.total);
                if (data.progressCallback) {
                  data.progressCallback(uploadProgress);
                }
              },
            }
          );
          // Signal completion by sending null progress
          if (data.progressCallback) {
            data.progressCallback(null);
          }
          return { data: result.data };
        } catch (axiosError) {
          let err: any = axiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message,
            },
          };
        }
      }
    }),
  })
});

export const { useUploadFileMutation } = FileSlice;

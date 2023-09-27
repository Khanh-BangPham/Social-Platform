import { api } from "../constants/api";

export const fileService = {
  uploadSingle(file: File): UploadFile {
    let formData = new FormData();
    formData.append("file", file);
    return api.post<UploadFile>(
      "/file/single",
      formData
    ) as unknown as UploadFile;
  },
};

import { create } from "zustand";
import { UploadFile } from "@/types";

interface UploadState {
  uploadFiles: UploadFile[];
  fileCount: number;
  addUploadFile: (file: UploadFile) => void;
  updateProgress: (id: string, progress: number) => void;
  removeFile: (id: string) => void;
  addFileCount: (count: number) => void;
  subtractFileCount: () => void;
  changeState: (id: string, status: UploadFile["status"]) => void;
  getStateById: (id: string) => UploadFile["status"];
  startNextFile: () => void;
}

export const useUploadStore = create<UploadState>()((set, get) => ({
  uploadFiles: [],
  fileCount: 0,
  addUploadFile: (file) =>
    set((state) => ({
      uploadFiles: [...state.uploadFiles, file],
    })),
  updateProgress: (id, progress) =>
    set((state) => ({
      uploadFiles: state.uploadFiles.map((file) =>
        file.id === id ? { ...file, progress } : file
      ),
    })),
  removeFile: (id) =>
    set((state) => ({
      uploadFiles: state.uploadFiles.filter((file) => file.id !== id),
    })),
  addFileCount: (count) =>
    set((state) => ({
      fileCount: state.fileCount + count,
    })),
  subtractFileCount: () =>
    set((state) => ({
      fileCount: state.fileCount - 1,
    })),
  changeState: (id, status) =>
    set((state) => ({
      uploadFiles: state.uploadFiles.map(
        (file) => (file.id === id ? { ...file, status } : file) //解构file对象，修改其中的status属性
      ),
    })),
  getStateById: (id) => {
    const { uploadFiles } = get();
    const file = uploadFiles.find((file) => file.id === id);
    return file ? file.status : "error";
  },
  startNextFile: () => {
    const { uploadFiles, changeState } = get();
    const nextFile = uploadFiles.find((file) => file.status === "waiting"); //find方法返回的是第一个满足条件的元素
    if (nextFile) {
      changeState(nextFile.id, "uploading");
    }
  },
}));

export const useUploadFiles = () =>
  useUploadStore((state) => state.uploadFiles);
export const useFileCount = () => useUploadStore((state) => state.fileCount);
export const useAddUploadFile = () =>
  useUploadStore((state) => state.addUploadFile);
export const useUpdateProgress = () =>
  useUploadStore((state) => state.updateProgress);
export const useRemoveFile = () => useUploadStore((state) => state.removeFile);
export const useAddFileCount = () =>
  useUploadStore((state) => state.addFileCount);
export const useSubtractFileCount = () =>
  useUploadStore((state) => state.subtractFileCount);
export const useChangeState = () =>
  useUploadStore((state) => state.changeState);
export const useGetStateById = () =>
  useUploadStore((state) => state.getStateById);
export const useStartNextFile = () =>
  useUploadStore((state) => state.startNextFile);

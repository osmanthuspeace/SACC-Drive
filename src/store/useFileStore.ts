import {create} from "zustand";

interface FileStore {
  filePid: string,
  fileMd5: string,
  setFilePid: (filePid: string) => void
  setFileMd5: (fileMd5: string) => void
}

const useFileStore = create<FileStore>(
  set => ({
    filePid: '',
    fileMd5: '',
    fileCount: 0,
    setFilePid: (filePid: string) => set({filePid}),
    setFileMd5: (fileMd5: string) => set({fileMd5}),
  }))

export default useFileStore;

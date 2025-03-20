import { UploadState } from "@/types";
import { FileQueueItem } from "../ActionArea";
import verifyPromise from "@/util/verifyPromise";

export const uploadFile = async (
  fileItem: FileQueueItem,
  changeState: (id: string, status: UploadState) => void,
  removeFile: (id: string) => void,
  subtractFileCount: () => void,
  nextFileItem?: FileQueueItem
) => {
  try {
    await verifyPromise(fileItem.file, fileItem.id);

    console.log(`${fileItem.file.name} processed successfully`);

    //传输列表文件数-1
    subtractFileCount();

    removeFile(fileItem.file.name);

    changeState(fileItem.id, "completed");
    if (nextFileItem) {
      changeState(nextFileItem.id, "uploading");
    }
  } catch (e) {
    console.log(e);
  }
};

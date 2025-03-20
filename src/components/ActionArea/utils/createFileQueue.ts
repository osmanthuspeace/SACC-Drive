import { v4 as uuidv4 } from "uuid";
import { convertFileSize } from "./convertFileSize";
import { checkFileSizeLimit } from "./checkFileSizeLimit";
import { UploadState } from "@/types";
import { FileQueueItem } from "../ActionArea";
export const createFileQueue = (
  file: File,
  addUploadFile: (file: {
    id: string;
    fileName: string;
    fileSize: number;
    progress: number;
    status: UploadState;
  }) => void,
  addFileCount: (count: number) => void
):
  | FileQueueItem
  | {
      file: null;
      id: "";
    } => {
  const uuid = uuidv4();
  const fileSize = convertFileSize(file.size);
  if (checkFileSizeLimit(fileSize) === false) {
    return {
      file: null,
      id: "",
    };
  }
  addUploadFile({
    id: uuid,
    fileName: file.name,
    fileSize: fileSize,
    progress: 0,
    status: "waiting",
  });
  addFileCount(1);
  return { file, id: uuid };
};

export type FileSize = "B" | "KB" | "MB" | "GB";
export const convertFileSize = (fileBytes: number, resultType?: FileSize) => {
  let size = fileBytes;
  switch (resultType) {
    case "B":
      return size;
    case "KB":
      size = +(fileBytes / 1024).toFixed(2);
      break;
    case "MB":
      size = +(fileBytes / 1024 / 1024).toFixed(2);
      break;
    case "GB":
      size = +(fileBytes / 1024 / 1024 / 1024).toFixed(2);
      break;
    default:
      size = +(fileBytes / 1024 / 1024).toFixed(2);
  }
  return size === 0 ? 0.01 : size;
};

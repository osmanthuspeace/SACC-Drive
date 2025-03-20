export const checkFileSizeLimit = (fileSizeMB: number) => {
  if (fileSizeMB > 5120) {
    return false;
  }
  return true;
};

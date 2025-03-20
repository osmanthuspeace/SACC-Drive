import { startUpload } from "@/api/upload/startUpload.ts";
import { upload } from "@/api/upload/upload.ts";
import { useUploadStore } from "@/store/useUploadStore";
import axios from "axios";

async function uploadPromise(
  file: File,
  uuid: string
): Promise<string | Error | null> {
  const chunkSize = 10 * 1024 * 1024; // 切片大小，10MB一片
  const chunkCount = Math.ceil(file.size / chunkSize); // 切片数量

  const { changeState, updateProgress, getStateById } =
    useUploadStore.getState();
  changeState(uuid, "uploading");

  try {
    // 上传第一步：开始上传
    const startUploadRes = await startUpload({
      fileName: file.name,
      fileSize: file.size,
      chunkTotal: chunkCount,
      filePid: "",
    });
    // console.log('startUploadRes:', startUploadRes);
    const identifier: string = startUploadRes.data.data.code; // 用于区别用户一次上传的多个文件的唯一识别码
    if (startUploadRes.data.code !== 1) {
      throw new Error(startUploadRes.data.errorMsg); //要消除这个警告，只要将这个抛出封装成一个函数即可
    }
    // console.log('identifier:', identifier);

    // 递归函数处理每个分片
    const uploadChunk = async (currentChunk: number) => {
      const fileState = getStateById(uuid);
      // console.log('fileState:', fileState);

      //取消上传
      if (fileState === "canceled") {
        console.log("上传被取消");
        updateProgress(uuid, 0);
        return;
      }

      //暂停上传
      if (fileState === "paused") {
        console.log("上传暂停");
        await new Promise((resolve) => {
          const interval = setInterval(() => {
            const state = getStateById(uuid);
            if (state !== "paused") {
              clearInterval(interval);
              resolve(null);
            }
          }, 500); //每500ms检查一次状态，如果状态不是暂停，就清除定时器
        });
        await uploadChunk(currentChunk); //暂停后继续上传
        return; //一旦return，这个promise就兑现了
      }

      const start = currentChunk * chunkSize;
      const end = start + chunkSize > file.size ? file.size : start + chunkSize;
      const blob = file.slice(start, end);
      const formData = new FormData();
      formData.append("file", blob, file.name);
      formData.append("chunkNumber", currentChunk.toString());
      formData.append("chunkTotal", chunkCount.toString());
      formData.append("code", identifier);

      //上传第二步：依次上传分片
      const uploadRes = await upload(formData);

      if (uploadRes.data.code !== 1) {
        console.log("Chunk upload failed", currentChunk);
        throw new Error(uploadRes.data.errorMsg);
      }
      // 更新进度条
      updateProgress(uuid, Math.round((currentChunk / chunkCount) * 100));

      console.log(file.name + "文件分片上传成功", currentChunk);

      if (currentChunk < chunkCount - 1) {
        await uploadChunk(currentChunk + 1);
      } else {
        //上传第三步：检查文件完整性（单独提取出来，避免在这个函数中使用md5作参数）
        // console.log('----------test----------');
      }
    };
    // 开始上传第一个分片
    await uploadChunk(0);
    // 第二步结束之后，返回文件唯一标识符，用于第三步
    return identifier;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // error 是 AxiosError 类型
      console.error("Axios error:", error.message);
      throw new Error(error.message);
    } else if (error instanceof Error) {
      // error 是 Error 类型
      console.error("General error:", error.message);
      throw new Error(error.message);
    } else {
      // 处理未知类型的错误
      console.error("Unknown error", error);
      throw new Error(error as string);
    }
  }
}

export default uploadPromise;

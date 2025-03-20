import style from "./ActionArea.module.scss";
import { Button, ConfigProvider } from "antd";
import React, { useRef } from "react";
import { createFileQueue } from "./utils/createFileQueue";
import { uploadFile } from "./utils/uploadFile";
import { useUploadStore } from "@/store/useUploadStore";

export interface FileQueueItem {
  id: string;
  file: File;
}

const ActionArea = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    addUploadFile,
    addFileCount,
    subtractFileCount,
    removeFile,
    changeState,
  } = useUploadStore();

  const handleNewFolder = () => {
    //TODO:新建文件夹
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //TODO:多文件上传
    const files: FileList | null = e.target.files; //获取用户选择的所有文件，此处是引用传递，需要复制一份
    if (files !== null) {
      const fileArr = Array.from(files);
      console.log("fileArr: ", fileArr);

      e.target.value = ""; // 重置input，允许重新上传相同文件
      const uploadQueue: FileQueueItem[] = fileArr
        .map((file) => {
          const item = createFileQueue(file, addUploadFile, addFileCount);
          if (!item.file) {
            alert(`文件 [${file.name}] 类型或大小不符合要求`);
          }
          return item;
        })
        .filter((item) => item.file !== null);

      for (let i = 0; i < fileArr.length; i++) {
        await uploadFile(
          uploadQueue[i],
          changeState,
          removeFile,
          subtractFileCount,
          uploadQueue[i + 1]
        );
      }
    }
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            contentFontSizeSM: 12,
          },
        },
      }}
    >
      <div className={style.action}>
        <Button
          type="primary"
          shape="round"
          className={style.button}
          onClick={() => {
            inputRef.current!.click();
          }}
        >
          上传文件
          <input
            type="file"
            multiple
            style={{ display: "none" }}
            ref={inputRef}
            onChange={upload}
          />
        </Button>
        <Button
          type="default"
          shape="round"
          className={style.button}
          onClick={handleNewFolder}
        >
          新建文件夹
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default ActionArea;

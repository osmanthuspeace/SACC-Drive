import { useUploadFiles } from "@/store/useUploadStore";
import style from "./TransmissionList.module.scss";

import { TransmissionItem } from "./components/TransmissionItem";

const TransmissionList = () => {
  const uploadFiles = useUploadFiles();

  return (
    <div className={style.container}>
      <section className={style.left}>
        <div className={style.text}>上传列表</div>
        <div className={style.text}>下载列表</div>
      </section>
      <section className={style.middle}></section>

      <section className={style.right}>
        <div className={style.title}>正在上传</div>
        <section className={style.boundary}></section>
        <section>
          {uploadFiles.map((item, index) => {
            return (
              <TransmissionItem
                item={item}
                key={index}
                index={index}
                length={uploadFiles.length}
              ></TransmissionItem>
            );
          })}
        </section>
      </section>
    </div>
  );
};
export default TransmissionList;

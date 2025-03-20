import { UploadFile } from "@/types";
import style from "../TransmissionList.module.scss";
import { SwitchState } from "./switchState";
import { SwitchOperation } from "./SwitchOperation";
import { FileOutlined } from "@ant-design/icons";
import { Divider, Tag } from "antd";
import { getStatusColor } from "../utils/getStatusColor";

export interface Props {
  item: UploadFile;
  index: number;
  length: number;
}
export const TransmissionItem = ({ item, index, length }: Props) => {
  return (
    <div className={style.frame} key={index}>
      <div className={style.display}>
        <FileOutlined className={style.icon} />
        <div className={style.info}>
          <div className={style.name}>{item.fileName}</div>
          <div className={style.meta}>
            <Tag color={getStatusColor(item.status)} className={style.status}>
              {SwitchState(item.status, item.progress)}
            </Tag>
            <span className={style.size}>{item.fileSize}MB</span>
          </div>
        </div>
        <div className={style.operate}>
          {SwitchOperation(item.status, item.id)}
        </div>
      </div>
      {index === length - 1 ? null : <Divider className={style.divider} />}
    </div>
  );
};

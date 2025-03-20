import {
  useChangeState,
  useRemoveFile,
  useStartNextFile,
} from "@/store/useUploadStore";
import {
  ArrowUpOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  PauseOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

export const SwitchOperation = (status: string, id: string) => {
  const changeState = useChangeState();
  const startNextFile = useStartNextFile();
  const removeFile = useRemoveFile();

  const handleContinue = (id: string) => {
    console.log("继续/开始上传");
    changeState(id, "uploading");
  };
  //暂停，可以继续上传，也可以取消
  //不会自动的上传下一个文件，需要手动点击继续
  const handlePause = (id: string) => {
    console.log("暂停");
    changeState(id, "paused");
  };

  //取消，不能继续上传，只能重新上传，或者删除
  const handleCancel = (id: string) => {
    console.log("取消");
    changeState(id, "canceled");
    startNextFile();
  };
  //删除，删除传输列表中的条目，不可恢复
  const handleDel = (id: string) => {
    console.log("删除");
    removeFile(id);
  };
  switch (status) {
    case "uploading":
      return (
        <div>
          <Button
            shape="circle"
            icon={<PauseOutlined />}
            name="暂停"
            onClick={() => handlePause(id)}
          />
          <Button
            shape="circle"
            icon={<CloseOutlined />}
            name="取消"
            onClick={() => handleCancel(id)}
          />
        </div>
      );
    case "paused":
      return (
        <div>
          <Button
            shape="circle"
            icon={<ArrowUpOutlined />}
            name="继续"
            onClick={() => handleContinue(id)}
          />
          <Button
            shape="circle"
            icon={<CloseOutlined />}
            name="取消"
            onClick={() => handleCancel(id)}
          />
        </div>
      );
    case "waiting":
      return (
        <div>
          <Button
            shape="circle"
            icon={<ClockCircleOutlined />}
            name="等待中"
            onClick={() => handleContinue(id)}
          />
          <Button
            shape="circle"
            icon={<CloseOutlined />}
            name="取消"
            onClick={() => handleCancel(id)}
          />
        </div>
      );
    case "completed":
      return (
        <div>
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            name="删除条目"
            onClick={() => handleDel(id)}
          />
        </div>
      );
    case "error":
      return (
        <div>
          <Button shape="circle" icon={<UndoOutlined />} name="重新上传" />
          <Button
            shape="circle"
            icon={<CloseOutlined />}
            name="取消"
            onClick={() => handleCancel(id)}
          />
        </div>
      );
    case "canceled":
      return (
        <div>
          <Button shape="circle" icon={<DeleteOutlined />} name="删除条目" />
        </div>
      );
    default:
      return null;
  }
};

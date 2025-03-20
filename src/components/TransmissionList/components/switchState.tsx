import { Progress } from "antd";

export const SwitchState = (status: string, progress: number) => {
  switch (status) {
    case "uploading":
      return <Progress percent={progress} size="small" />;
    case "completed":
      return <div>已完成</div>;
    case "canceled":
      return <div>已取消</div>;
    case "paused":
      return <Progress percent={progress} size="small" />;
    case "waiting":
      return <div>等待中</div>;
  }
};

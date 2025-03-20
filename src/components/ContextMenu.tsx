import style from "./styles/ContextMenu.module.scss";
import React from "react";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  SwapOutlined,
} from "@ant-design/icons";

interface ContextMenuProps {
  x: number;
  y: number;
  show: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, show }) => {
  if (!show) return null;
  const handleremoveItem = () => {
    console.log("删除");
  };
  return (
    <div className={style.contextMenu} style={{ top: y, left: x }}>
      <ul>
        <li>
          <DownloadOutlined />
          <span>下载</span>
        </li>
        <li>
          <SwapOutlined />
          <span>移动</span>
        </li>
        <li>
          <EditOutlined />
          <span>重命名</span>
        </li>
        <li>
          <DeleteOutlined />
          <span onClick={handleremoveItem}>删除</span>
        </li>
      </ul>
    </div>
  );
};
export default ContextMenu;

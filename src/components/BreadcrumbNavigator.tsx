import {Breadcrumb, ConfigProvider} from "antd";
import style from "./styles/BreadcrumbNavigator.module.scss";
import {useNavigate} from "react-router-dom";
import useBreadcrumbStore from "@/store/usebreadcrumbStore";
import {useEffect} from "react";
import {FolderDataInBreadcrumb} from "@/types";

const BreadcrumbNavigator = () => {

  const {breadcrumb, removeBreadcrumb, clearBreadcrumb} = useBreadcrumbStore();
  const navigate = useNavigate();
  //不允许用户直接更改url，只能通过点击面包屑导航来更改
  // const location = useLocation();//访问当前的 URL 位置对象
  // const pathSnippets = location.pathname.split('/').filter(i => i);//使用filter去掉空串
  // console.log("pathSnippets", pathSnippets)
  //当面包屑导航改变时，重新设置路径
  useEffect(() => {
    const pathArr: string[] = [];
    breadcrumb.forEach((item: FolderDataInBreadcrumb) => {
      pathArr.push(item.folderName)
    })
    const query = pathArr.length === 0 ? '' : pathArr.join('/');
    navigate({
      pathname: '/home',
      search: `?path=${query}`,
    });
  }, [breadcrumb, navigate]);

  const toHome = () => {
    clearBreadcrumb();
    navigate('/home')
  }

  //点击面包屑导航时，重新设置路径，跳转到对应的文件夹
  const toFolder = (folder: FolderDataInBreadcrumb) => {
    const index = breadcrumb.findIndex((crumb) => crumb.id === folder.id)
    console.log("index", index)
    removeBreadcrumb(index+1)//+1是为了防止删除当前点击的文件夹
  }

  const breadItems =
    breadcrumb.map((fileData) => ({
      title: <a onClick={() => {
        toFolder(fileData)
      }}>{fileData.folderName}</a>,
    }));


  return (
    <div className={style.bread}>
      <ConfigProvider
        theme={{
          components: {
            Breadcrumb: {
              separatorMargin: 3
            },
          },
        }}
      >
        <Breadcrumb items={[
          {
            title: <a onClick={toHome}>Home</a>,
          },
          ...breadItems
        ]}/>
      </ConfigProvider>
    </div>

  );
}
export default BreadcrumbNavigator;

import BreadcrumbNavigator from '@/components/BreadcrumbNavigator.tsx';
import style from "./styles/HeaderBar.module.scss";
import ActionArea from "./ActionArea/ActionArea.tsx";

const HeaderBar = () => {
  return (
    <div className={style.head}>
      <ActionArea></ActionArea>
      <BreadcrumbNavigator/>
    </div>
  );
}
export default HeaderBar;

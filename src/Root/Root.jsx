import { Outlet } from "react-router-dom";
import { NavbarSimple } from "../component/Nav";
import { DrawerPop } from "../component/Drawer";

const Root = () => {
  return (
    <>
      <NavbarSimple />
      <div className="max-w-6xl mx-auto ">
       <DrawerPop/>
        <Outlet />
      </div>
    </>
  );
};

export default Root;

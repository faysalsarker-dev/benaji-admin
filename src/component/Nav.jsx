
import { Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,



} from "@material-tailwind/react";
import useAuth from "../Hook/useAuth";


export function ProfileMenu() {
  const { user } = useAuth();
  return (
    <Menu>
      <MenuHandler>
        <div className="border-2 border-green-500 rounded-full p-1">
          <Avatar
            variant="circular"
            alt="User"
            className="cursor-pointer h-8 w-8"
            src={user?.photoURL}
          />
        </div>
      </MenuHandler>
      <MenuList>
        <p>{user?.email}</p>
        
      
      </MenuList>
    </Menu>
  );
}

export function NavbarSimple() {
  const {open,setOpen}=useAuth()
  return (
    <Navbar className="mx-auto border-0 blur-0 sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-1 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            as="a"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 flex justify-center dark:text-white gap-4 items-center"
          >
            <span className="lg:text-3xl lg:font-extrabold text-2xl font-bold text-green-500">BENAJI</span>
          </Typography>
        </Link>
        <div className="flex items-center gap-3">
          <ProfileMenu />
      <button className="p-3 border rounded-lg" onClick={()=>setOpen(!open)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg>
</button>
        </div>
      </div>
    </Navbar>
  );
}





 

import { createBrowserRouter } from "react-router-dom";
import { Register } from "../page/Register";
import Login from "../page/Login";
import Root from "../Root/Root";
import { Allpost } from "../page/Allpost";
import Addpost from "../page/Addpost";
import { AllUsers } from "../page/Allusers";
import Order_1 from "../orderPage/Order_1";
import Order_2 from "../orderPage/Order_2";
import Order_3 from "../orderPage/Order_3";
import Details from "../page/Details";
import RouterProtector from "./RouterProtector";



const router = createBrowserRouter([

    {
        path:'/',
        element:<RouterProtector><Root/></RouterProtector>,
        children:[
         
            {
                path:'/',
                element:<Allpost/>
            },
            {
                path:'/all-users',
                element:<AllUsers/>
            },
            {
                path:'/add-post',
                element:<Addpost/>
            },
            {
                path:'/order-1',
                element:<Order_1/>
            },
            {
                path:'/order-2',
                element:<Order_2/>
            },
            {
                path:'/order-3',
                element:<Order_3/>
            },
            {
                path:'/Order-Details/:id',
                element:<Details/>
            },
        ]
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
 
  ]);
  
  export default router;
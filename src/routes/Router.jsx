import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import AddScholarship from "../pages/Dashboard/AddScholarship";

const router=createBrowserRouter([

    {
      path:'/',
      Component:MainLayout,
      children:[
        {
            path:'/',
            Component:Home,

        },
      
      ] 
    },

    {
        path:'/',
        Component:AuthLayout,
        children:[
            {
                path:'/Login',
                Component:Login
            },
              {
                path:'/Register',
                Component:Register,
            }
        ]
    },

{
   path:'/Dashboard',
   Component:DashboardLayout,
   children:[
    {
       path:'add-scholarship',
       Component:AddScholarship,
    }
   ]
}

])

export default router
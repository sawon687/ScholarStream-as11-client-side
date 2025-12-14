import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import AddScholarship from "../pages/Dashboard/AddScholarship";
import Allscholarship from "../pages/AllScholarship/Allscholarship";
import ScholarshipDetails from "../pages/AllScholarship/ScholarshipDetails";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageScholarships from "../pages/Dashboard/ManageScholarships";

import Paymentsuccess from "../pages/Payment/Paymentsuccess";

const router=createBrowserRouter([

    {
      path:'/',
      Component:MainLayout,
      children:[
        {
            path:'/',
            Component:Home,

        },
        {
          path:'/ScholarshipDetails/:id',
          Component:ScholarshipDetails,
        },
        {
           path:'/allScholarship',
           Component:Allscholarship,
        },
       
        {
          path:'payment-success',
          Component:Paymentsuccess
        }
      
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
    },
     {
       path:'ManageUsers',
       Component:ManageUsers,
    },
    {
      path:'ManageScholarships',
      Component:ManageScholarships,
    },
   ]
}

])

export default router
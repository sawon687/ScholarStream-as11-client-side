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
import PaymentFailed from "../pages/Payment/PaymentFailed";
import MyApplications from "../pages/Dashboard/MyApplications";
import ManageAppliedApplications from "../pages/Dashboard/ManageAppliedApplications";

import MyReviews from "../pages/Dashboard/MyReviews";
import AllReviews from "../pages/Dashboard/AllReviews";
import PrivateRoute from "../Context/PrivateRoute";
import Analytics from "../pages/Dashboard/Analytics";

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
          element:<PrivateRoute><ScholarshipDetails/></PrivateRoute>
        },
        {
           path:'/allScholarship',
           Component:Allscholarship,
        },
       
        {
          path:'payment-success',
          Component:Paymentsuccess
        },
           {
          path:'payment-failed',
          Component:PaymentFailed,
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
    },
     {
       path:'ManageUsers',
       Component:ManageUsers,
    },
    {
      path:'ManageScholarships',
      Component:ManageScholarships,
    },
    {
      path:'My-Applications',
      Component:MyApplications,
    },
     {
      path:'Manage-Applied-Applications',
      Component:ManageAppliedApplications,
    },
    {
       path:'My-Reviews',
       Component:MyReviews,
    },

    {
       path:'All-Reviews',
       Component:AllReviews,
    },
    {
         path:'Analytics',
         Component:Analytics
    },
   ]
}

])

export default router
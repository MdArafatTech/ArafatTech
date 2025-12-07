// src/routes/Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPass from "../component/ForgotPass";
import Account from "../component/Account";
import PDFGenerator from "../pages/StudentIdCard";
import Billing from "../component/Billing";
import Identity from "../component/Identity";
import ContactForm from "../component/ContactFrom";
import Contact from "../pages/Contact";
import IDCard from "../pages/IdCard";

import IDCardPage from "../pages/IdCardPage";
import CustomizeCard from "../component/CustomizeCard";
import SmartId from "../pages/SmartId";
import Employee from "../pages/Employee";
import LoginButton from "../component/LoginButton";
import Clock from "../component/Clock";
import LogoutButton from "../component/LogoutButton";

import ClockCountry from "../component/ClockContry";
import Tools from "../project/Tools";
import ImageStudio from "../project/ImageStudio";
import HealthAndCalculation from "../project/HealthAndCalculation";
import QrGenerator from "../project/QrGenarator";
import QrAndImage from "../project/QrAndImage";
import PersonalIDCard from "../pages/PersonalIdCard";
import StudentIdCard from "../pages/StudentIdCard";


const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <Root />
    
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgotpass",
        element: <ForgotPass></ForgotPass>,
      },
      {
        path: "account",
        element: <Account></Account>,
      },
      {
        path: "studentidcard",
        element: <StudentIdCard></StudentIdCard>,
      },
      {
        path: "idcard",
        element: <IDCard></IDCard>,
      },
      {
        path: "billing",
        element: <Billing></Billing>,
      },
      {
        path: "identity",
        element: <Identity></Identity>,
      },
      {
        path: "contactfrom",
        element: <ContactForm></ContactForm>,
      },
      {
        path: "Contact",
        element: <Contact></Contact>,
      },
      {
        path: "personalidcard",
        element: <PersonalIDCard></PersonalIDCard>,
      },
      {
        path: "employee",
        element:<Employee></Employee>
      },

    
      {
        path: "idcardpage",
        element: <IDCardPage></IDCardPage>,
      },

      {
        path: "customizecard", // correct spelling
        element: <CustomizeCard />,
      },
      {
        path: "smartid",
        element:<SmartId></SmartId>,
      },
      {
       path:"loginbutton",
       element:<LoginButton></LoginButton>,
      },
      {
       path:"logout",
       element:<LogoutButton></LogoutButton>,
      },
      {
       path:"clock",
       element:<Clock></Clock>,
      },
      {
       path:"healthandcalculation",
       element:<HealthAndCalculation></HealthAndCalculation>
      },
      {
       path:"clockcountry",
       element:<ClockCountry></ClockCountry>,
      },
      {
       path:"tools",
       element:<Tools></Tools>,
      },
      {
       path:"imagestudio",
       element:<ImageStudio></ImageStudio>,
      },
      {
       path:"qrgenarator",
       element:<QrGenerator></QrGenerator>,
      },
      {
       path:"qrandimage",
       element:<QrAndImage></QrAndImage>,
      },
    ],
  },
]);

export default Routes;

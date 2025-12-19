// src/routes/Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPass from "../component/ForgotPass";
import Account from "../component/Account";

import Billing from "../component/Billing";
import Identity from "../component/Identity";
import ContactForm from "../component/ContactFrom";
import Contact from "../pages/Contact";


import IDCardPage from "../pages/IdCardPage";
import CustomizeCard from "../component/CustomizeCard";
import SmartId from "../pages/SmartId";
import Employee from "../pages/Employee";
import LoginButton from "../component/LoginButton";
import Clock from "../component/Clock";
import LogoutButton from "../component/LogoutButton";


import Tools from "../project/Tools";

import HealthAndCalculation from "../project/HealthAndCalculation";
import QrGenerator from "../project/QrGenarator";
import QrAndImage from "../project/QrAndImage";
import PersonalIDCard from "../pages/PersonalIdCard";
import StudentIdCard from "../pages/StudentIdCard";
import CgpaCalculator from "../component/CgpaCalculator";
import GradingNoteSection from "../project/GradingNoteSection";
import Services from "../pages/Services";
import StudentPortal from "../pages/Studentportal";
import PremiumDownloadButton from "../component/PremiumDownloadButton";
import About from "../pages/About";


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
        path: "about",
        element: <About></About>,
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
        path: "studentportal",
        element: <StudentPortal></StudentPortal>,
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
       path:"cgpacalculator",
       element:<CgpaCalculator></CgpaCalculator>,
      },
      {
       path:"tools",
       element:<Tools></Tools>,
      },
    
     
      {
       path:"qrgenarator",
       element:<QrGenerator></QrGenerator>,
      },
      {
       path:"qrandimage",
       element:<QrAndImage></QrAndImage>,
      },
      {
       path:"gradingnotesection",
       element:<GradingNoteSection></GradingNoteSection>,
      },
      {
       path:"services",
       element:<Services></Services>
      },
    {
       path:"premiumdownloadbutton",
       element:<PremiumDownloadButton></PremiumDownloadButton>
      },
      
    ],
  },
]);

export default Routes;

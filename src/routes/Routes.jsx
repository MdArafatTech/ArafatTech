// src/routes/Routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import Root from '../layout/Root';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import Register from '../pages/Register';
import Login from '../pages/Login';
import { AuthProvider } from '../provider/AuthProvider';

import ForgotPass from '../component/ForgotPass';
import Account from '../component/Account';
import PDFGenerator from '../pages/Pdf';
import Billing from '../component/Billing';
import Identity from '../component/Identity';
import ContactForm from '../component/ContactFrom';
import Contact from '../pages/Contact';
import IDCard from '../pages/IdCard';

import Id from '../pages/Id';
import IDCardPage from '../pages/IdCardPage';
import CustomizeCard from '../component/CustomizeCard';



const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>  
        <Root />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "forgotpass",
        element: <ForgotPass></ForgotPass>
      },
      {
        path:"account",
        element:<Account></Account>
      },
      {
        path:"pdf",
        element:<PDFGenerator></PDFGenerator>
      },
      {
        path:"idcard",
        element:<IDCard></IDCard>
      },
      {
        path:"billing",
        element:<Billing></Billing>
      },
      {
        path:"identity",
        element:<Identity></Identity>
      },
      {
        path:"contactfrom",
        element:<ContactForm></ContactForm>
      },
      {
        path:"Contact",
        element:<Contact></Contact>
      },
      {
        path:"id",
        element:<Id></Id>
      },
      
      {
        path:"idcardpage",
        element:<IDCardPage></IDCardPage>
      },
      
   {
  path: "customizecard",   // correct spelling
  element: <CustomizeCard />
}

    ]
  }
]);

export default Routes;

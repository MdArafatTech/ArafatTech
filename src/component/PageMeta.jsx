import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "Home",

  "/contact": "Contact",
 
  "/pdf": "PDF Generator",
  "/billing": "Billing",
  "/identity": "Identity",
  "/register": "Register",
  "/login": "Login",
  "/account": "Account",
  "/forgotpass": "Forgot Password",
};

const PageMeta = () => {
  const location = useLocation();

  useEffect(() => {
    const title = pageTitles[location.pathname.toLowerCase()] || "Page";
    document.title = `${title} - ArafatTech`;
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default PageMeta;

import React from "react";
import LoginForm from "../components/LoginForm";
import HomeForm from "../components/HomeForm";
import NotFoundForm from "../components/NotFoundForm";
import NavBar from "../components/NavbarForm";
import AdminPanelForm from "../components/AdminPanelForm";


export const viewMap = {
    home:
       <div>
           <NavBar/>
           <HomeForm/>
       </div>,
    login: <LoginForm/>,
    admin: <AdminPanelForm/>,
    notFound: <NotFoundForm/>
}
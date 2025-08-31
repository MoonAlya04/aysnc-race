import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./common/components/header/Header";

function Layout() {
    return (
        <div>
            <Header/>
            <div className="App">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;

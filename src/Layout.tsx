import React from "react";

import { Outlet } from "react-router-dom";
import Header from "./common/components/Header/Header.jsx";
export const metadata = {
  title: "ASYNC RACE",
  description: "Async Race Task"
};

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <div id="modal-portal" />
    </div>
  );
}

import React from "react";
import Header from "./common/components/header/header";
import { Outlet } from "react-router-dom";

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

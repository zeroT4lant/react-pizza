import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../ComponentsJSX/Header";

const MainLayout = () => {
  return (
    <div class="wrapper">
      <Header />
      <div class="content"><Outlet/></div>
    </div>
  );
};

export default MainLayout;

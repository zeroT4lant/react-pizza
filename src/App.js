import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";



import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";

import { createContext, useState } from "react";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";


function App() {

  return (
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<Home />}></Route>
              <Route path="cart" element={<Cart />}></Route>
              <Route path="pizza/:id" element={<FullPizza />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Route>
          </Routes>
  );
}

export default App;

import React, { useEffect, useState } from 'react'
import "./scss/app.scss"
import Header from './ComponentsJSX/Header'
import Home  from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';



function App() {

  return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/cart' element={<Cart/>}></Route>
              <Route path="*" element={<NotFound/>}></Route>
            </Routes>
          </div>
          </div>
        </div>
  );
}

export default App;

import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'

const Layout = () => {
  return (
    <div>
        {/* <Header/> */}
        {/*
         Outlet render element by path in url 
        Emaple: /home => will be render The elment of Home components
        */}
        <Outlet/>
    </div>
  )
}

export default Layout
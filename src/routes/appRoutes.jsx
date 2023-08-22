import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/home';
import Layout from '../layout/layout';
import NotFound404 from '../layout/notFound404';

const AppRoutes = () => {
    return (
        // Components of Routers Application
        // 1 - Router
        <Router>
      {/* 2 - Routes */}
            <Routes>
            {/* 3 - routes for layouts  */}
            {/* Layout =>>>> Outlet */}
            
                <Route path='/' element={<Layout />}>
                    {/* Outlet one option can be */}
                    {/* Outlet =>>>>>> */}
                    {/* index == path = '/' */}
                    <Route index element={<Home />} />
                    {/* <<<<<<<<Outlet */}
                </Route>

                <Route path='*'  element={<NotFound404/>} />              
            </Routes>
        </Router>
    )
}

export default AppRoutes
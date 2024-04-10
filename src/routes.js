import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/home/home";
import SignUp from './pages/signup/signup';
import SignIn from './pages/signin/signin';
import Profile from './pages/profile/profile';
import Menu from './pages/menu/menu';
import ProductDetail from './pages/menu/product.detail';

function appRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/menu/detail/:id" element={<ProductDetail/>}/>
            </Routes>
        </Router>
    )
}

export default appRoutes
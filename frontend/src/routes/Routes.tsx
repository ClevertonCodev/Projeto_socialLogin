import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "../pages/users";
import Login from "../pages/login";
import PrivateRoute from "./roustesprivates/private";
import Produtos from "../pages/produtos";
import AdmUser from "../pages/users/adm";
import AdmProdutos from "../pages/produtos/adm";
import Resister from "../pages/resistro";
import Password from "../pages/users/senha";




export default function AppRouter(){
    
    return(
        <Router>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/cadastrar/usuario/ex' element={<Resister/>}/>   
                <Route element={<PrivateRoute/>}>
                     <Route path="/user" element={<Users/>} />
                     <Route path="/adm/user" element={<AdmUser/>} />
                     <Route path="/adm/user/:id"element={<Users/>} />
                     <Route path='/recuperar/senha/user/:id' element={<Password/>}/>
                     <Route path="/me"element={<Users/>} />
                     <Route path='/produtos' element={<Produtos/>}/>
                     <Route path='/adm/produtos' element={<AdmProdutos/>}/>
                     <Route path='/adm/produtos/:id' element={<Produtos/>}/>
                </Route>
                <Route path='/*' element={<Login/>}/>
            </Routes>
        </Router>
    );
}
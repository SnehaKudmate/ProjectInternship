import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import Checkout from './Pages/Checkout';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectedUser } from './features/auth/AuthSlice';
import NotFound from './Pages/404';
import UserProfilePage from './Pages/UserProfilePage';
import ForgotPasswordPage from './Pages/forgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './Pages/AdminHome';
import AdminProductFormPage from './Pages/AdminProductFormPage';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch  = useDispatch();
  const user = useSelector(selectedUser);
 
  useEffect(()=>{
    if(user){
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch,user])

  
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          {/* Public Routes */}
         
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/forgot_password' element={<ForgotPasswordPage/>} />
        
          
          
          {/* Protected Routes */}
          <Route element={<Protected />}>          
            {/* Child routes */}
            <Route path='/' element={<Home />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/productDetails/:id' element={<ProductDetailsPage />} />
            <Route path='/profile' element={<UserProfilePage/>} />           
          </Route>


           {/* Protected Admin Routes */}
          <Route element={<ProtectedAdmin />}>
          {/* Child routes */}
          <Route path='admin' element={<AdminHome />} />
          <Route path='admin/add/product' element={<AdminProductFormPage />} />   
          <Route path='admin/add/product/edit/:id' element={<AdminProductFormPage />} />   
        </Route>
          <Route path='*' element={<NotFound />} />   
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

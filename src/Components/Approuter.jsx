import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import AddAdminProduct from './AddAdminproduct';
import Contact from './Contact';
import ViewAdminProduct from './ViewAdminproduct';
import Editproduct from './EditAdminproduct';
import Adminlogin from './Adminlogin';
import Adminregister from './Adminregister';
import UserLogin from './Userlogin';
import UserRegister from './Userregister';
import UserNavbar from './UserNavbar';
import ViewProductOrder from './ViewProductorder';
import ViewUserproduct from './ViewUserproduct';
import EditUserproduct from './EditUserproduct';
import Cart from './Cart';
import AdminNavbar from './AdminNavbar';
import Header from './Header';
import ProductOrder from './Productorder';
import Footer from './Footer';
import About from './About';
import UserCart from './UserCart';
import CartItem from './CartItem';
import Payment from './Payment';
import CreateOrderTracking from './CreateOrderTracking';
import Editordertracking from './Editordertracking';
import Loader from './StatusBar';
import AdminApproval from './AdminApproval';
import Orderstatus from './Orderstatus';


function Approuter() {
  return (
    <Router>
        
        <Routes>
        <Route path="/" element={<Navbar/>} />

        {/* <Route path="/adminpage" element={<Navbar/>} /> */}

         <Route path="/add" element={<AddAdminProduct/>} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/viewproduct" element={<ViewAdminProduct/>}/>
        <Route path="/editadminproduct/:id" element={<Editproduct/>}/>
        <Route path="/login" element={<Adminlogin/>}/>
        <Route path="/register" element={<Adminregister/>}/>
        <Route path="/userlogin" element={<UserLogin/>}/>
        <Route path="/userregister" element={<UserRegister/>}/>
        <Route path="/usernavbar" element={<UserNavbar/>}/>
        <Route path="/order" element={<ViewProductOrder/>}/>
        <Route path="/vieworder" element={<ViewProductOrder/>}/>
        <Route path="/viewuserproduct" element={<ViewUserproduct/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/edituserproduct/:id" element={<EditUserproduct/>}/> 
        <Route path="/adminnavbar" element={<AdminNavbar/>}/>
        <Route path="/header" element={<Header/>}/>
        <Route path="/productorder" element={<ProductOrder/>}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route path="/about" element={<About/>}/>
        {/* <Route path="/usercart" element={<UserCart/>}/> */}
        <Route path="/cartitem" element={<CartItem/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/tracking" element={<CreateOrderTracking/>}/>
        <Route path="/usercart" element={<UserCart/>}/>
        <Route path="/edittracking" element={<Editordertracking/>}/>
        <Route path="/loader" element={<Loader/>}/>
        <Route path="/adminapproval" element={<AdminApproval/>}/>
        <Route path="/orderstatus" element={<Orderstatus/>}/>




        </Routes>
    </Router>
   
  )
}

export default Approuter

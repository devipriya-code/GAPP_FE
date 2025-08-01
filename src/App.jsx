import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Register from "./component/Register.jsx";
import GroceryHome from "./component/GroceryHome.jsx"; 
import Login from "./component/login.jsx";
import Show from "./component/Show.jsx";
import { useState } from "react";
import Sidebar from "./component/Sidebar.jsx";



function App() {
  const[cartItem,setCartItem]=useState([]);
  const[isCartOpen,setIsCartOpen]=useState(false);
 

  return (
    <BrowserRouter>
      <Navbar cartItem={cartItem} setIsCartOpen={setIsCartOpen}/>
      {isCartOpen && (<Sidebar setIsCartOpen={setIsCartOpen} 
      cartItem={cartItem}
      setCartItem={setCartItem}/>)}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={< GroceryHome cartItem={cartItem} setCartItem={setCartItem}/>}></Route>
        <Route path="/Show/:id" element={<Show />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

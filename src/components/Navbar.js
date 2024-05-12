import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
const Navbar = () => {
  const [cartView,setCartView]=useState(false)
  let data=useCart()
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            ZWIGATO
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto mb-2">
              {(localStorage.getItem("authToken")) &&
                <Link className="nav-link active d-flex fs-5 mt-2" aria-current="page" to="/myOrder">My Orders</Link>
              }
            </div>
            {(!localStorage.getItem("authToken")) ?
            <div className="ms-auto d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>
              <Link
                className="btn bg-white text-success mx-1"
                to="/createuser"
              >
                Signup
              </Link>
            </div>:
            <div>
            <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>My Cart {" "}
            <Badge pill bg="danger">{data.length}</Badge>
            </div>
          {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}  
            <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
              Logout
            </div></div>
}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

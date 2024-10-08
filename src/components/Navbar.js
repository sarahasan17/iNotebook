import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
    let location=useLocation();
    let navigate=useNavigate();
    useEffect(()=>{
        console.log(location)
    },[location])
    const handleLogout=()=>{
      localStorage.removeItem('token');
      navigate('/login')
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            iNotebook
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  aria-current="page"
                  to="/"
                  className={`nav-link ${location.pathname === "/"}?active:`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about"
                  }?active:`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token")?
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">
                SignUp
              </Link>
            </form>
            :<form className="d-flex">
              
              <button
                className="btn btn-primary mx-2"
                onClick={handleLogout}
                role="button"
              >
                Logout
              </button>
            </form>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar

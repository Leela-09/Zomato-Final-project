import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useState } from "react";
import {jwtDecode} from "jwt-decode"; // Corrected import
function Header(props) { 
  let getUserLoginData = () => {
    // Read data from local storage
    let token = localStorage.getItem("Zomato Final project");
    if (token == null) {
      return false;
    } else {
      // Decode a JWT token
      try {
        let result = jwtDecode(token);
        return result;
      } catch (error) {
        // Remove token from localStorage on error
        localStorage.removeItem("Zomato Final project");
        return false;
      }
    }
  };

  let [user, setUser] = useState(getUserLoginData());
  
  console.log(user);

  let onSuccess = (response) => {
    let token = response.credential; // JSON Web Token

    // Store token in localStorage
    localStorage.setItem("Zomato Final project", token);
    alert("Login in successfully");
    window.location.assign("/");
  };

  let onError = () => {
    console.log("Login Failed");
  };

  let logout = () => {
    let doLogout = window.confirm("Are you sure you want to logout?"); // Yes => true, Cancel => false
    if (doLogout) {
      localStorage.removeItem("Zomato Final project"); // Removed token from localStorage
      window.location.assign("/"); // Reload without explicitly setting state
    }
  };

  
  return (
    <>
      <GoogleOAuthProvider clientId="1013085025749-p9165k5t4ddgim5mi7cn5co2jrqmv6ea.apps.googleusercontent.com">
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <GoogleLogin
                  onSuccess={onSuccess}
                  onError={onError}
                />
              </div>
            </div>
          </div>
        </div>
    
        <div className={`row ${props.bg}  justify-content-center`}>
          <div className="col-10 d-flex justify-content-between align-items-center py-2">
           {props.bg ? <p className="m-0 brand">e!</p> : <p></p>}
          
            <div>
              {user === false ? (
                <button className="btn btn-outline-light " data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
              ) : (
                <>
                  <span className="fw-bold text-white">Welcome, {user.email}</span>
                  <button onClick={logout} className="btn btn-outline-light ms-3 btn-sm">Logout</button>
                </>
              )}
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default Header;


import {useLocation,Link} from  "react-router-dom";
import "./Navbar.css";


function Navbar({user,onLogout, isAuthenticated }){

    const location= useLocation();


    return (
        <nav className="navbar">
            <div className="navbar-brand">Task Manager</div>


            <div className="navbar-links">
                {isAuthenticated ?(
                    <>
                    <Link className={location.pathname === "/dashboard" ? "active" :""} to="/dashboard"> Dashboard</Link>
                    <Link  className={location.pathname === "/tasks" ? "active" :""} to="/tasks">My Tasks</Link>
                    </>
                ): ( 
                <>
                   <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
                   <Link  className={location.pathname ==="/login" ? "active" :""} to="/login">Login</Link>
                   <Link className={location.pathname ==="/register" ? "active" :""} to="/register">Register</Link>
                </>
            )}
            </div>

            {isAuthenticated && (
                <div className="navbar-right">
                    <div className="navbar-profile">
          {user && (
                <>
                 <span className="navbar-name">{user.name}</span>
                 <span className="navbar-email">{user.email}</span>
             </>
           )}
         </div>

            <button className="logout-btn"type="button" onClick={onLogout}>Logout</button>
                </div>
            )}
        </nav>
    )
}
export default Navbar;
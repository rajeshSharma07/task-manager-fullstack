import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login(){
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


  const handleSubmit = async(e)=>{
       e.preventDefault();
        
       setError("");
       setLoading(true);
     
       try{
        const response = await axios.post(
         `${import.meta.env.VITE_API_URL}/api/auth/login`,
       {
        email,
        password,

       },
       {
        withCredentials: true,
       }
     );

     console.log(response.data);

     navigate("/dashboard");

       }catch(error){
        setError(error.response?.data?.message || "Login failed");
       }finally{
        setLoading(false);
       }
  };


    return(
        <div className="login-page">
            <Navbar
               user={null}
              onLogout={null}
               isAuthenticated={false}
           />

            <div className="login-card">
            <h1 className="login-title">Login</h1>

            <form className="login-form" onSubmit={handleSubmit}>
                <input className="login-input" type="email" placeholder="Email" required  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input className="login-input" type="password" placeholder="Password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>

                {error && <p className="login-error">{error}</p>}

                <button  className="login-btn" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
            </form>
            </div>
            <Footer />
        </div>
    )
}

export default Login;
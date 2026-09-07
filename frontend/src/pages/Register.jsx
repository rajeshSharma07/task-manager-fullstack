import {useState} from "react";
import axios from "axios";
import "./Register.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("");


    const handleSubmit = async (e) =>{
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);
       
        try{
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    name ,
                    email,
                    password,
                }
            );

            console.log(response.data);
            setSuccess(response.data.message);

        }catch (error){
            setError(error.response?.data?.message || "Registration failed");  
        }finally {
            setLoading(false);
        }
    };

    return(
        <div className="register-page">
            <Navbar
                user={null}
                onLogout={null}
                isAuthenticated={false}
            />
            <div className="register-card">
            <h1 className="register-title">Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <input className="register-input" type ="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)}/>
                <input className="register-input" type ="email" placeholder="Email" required value ={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input className="register-input" type ="password" placeholder="password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
                {success && <p className="register-success">{success}</p>}
                {error && <p className="register-error">{error}</p>}
                <button className="register-btn" type= "submit" disabled={loading}>{loading ? "Registering..." :"Register"}</button>
            </form>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
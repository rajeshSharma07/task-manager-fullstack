import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";
function Home() {
    return (
    <div className="home-page">

     <Navbar
         user={null}
         onLogout={null}
         isAuthenticated={false}
        />

<main className="home-content">
        <h1>Task Manager</h1>
        <p>Organize your tasks and stay productive.</p>

    <div className="home-actions">
        <a href="/login" className="home-btn primary-btn">Login</a>
        <a href="/register" className="home-btn secondary-btn">Register</a>
    </div>

</main>

 <Footer />

</div>
    );
}

export default Home;
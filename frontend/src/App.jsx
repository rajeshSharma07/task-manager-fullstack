import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/protectedRoute";
import Home from "./pages/Home";

function App(){
  return(
     <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home/>} />

      <Route path ="/register" element ={<Register/>}/>
      <Route path ="/login" element={<Login/>}/>
      <Route path ="/dashboard" element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>
     <Route path="/tasks" element={
       <ProtectedRoute>
         <Dashboard/>
       </ProtectedRoute>
     }/>
    </Routes>
 </BrowserRouter>
  );
}

export default App;
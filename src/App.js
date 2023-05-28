import { useEffect } from "react";
import Login from "./Pages/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./Style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Jsondb from "./db.json";


function App() {
  let navigate = useNavigate();
  useEffect(() => {
    const logid = localStorage.getItem('logid');
    const logpass = localStorage.getItem('logpass');

    if(logid){
    if (logid != "undefined" && logpass != "undefined") {
      // Redirect to the authenticated route
      // Replace '/dashboard' with the desired authenticated route
      //window.location.href = '/dashboard';
      navigate("/dashboard");
    }else{
      navigate("/");

    }}
  }, []);
  return (
    <div className="App">

     <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/db" element={<Jsondb/>} />
    

     </Routes>
      
    </div>
  );
}

export default App;

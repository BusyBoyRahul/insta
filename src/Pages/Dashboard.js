import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HiSun , HiMoon } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  
  useEffect(() => {
    const logid = localStorage.getItem('logid');
    const logpass = localStorage.getItem('logpass');
    

    if(!logid){
    if (logid != "undefined" || logpass != "undefined") {
      
      navigate("/");
      console.log("logged");
    }else{
      navigate("/dashboard");
console.log("navigated");
    }
  console.log("tested")}
  }, []);

  const ITEMS_PER_PAGE = 10;
  const [dataz, setDataz] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    axios.get(`https://insta-beige.vercel.app/db.json`).then((postdata) => {
      console.log(postdata);
      const reversedData = postdata.data.posts.reverse();
        setDataz(reversedData);
        setTotalPages(Math.ceil(reversedData.length / ITEMS_PER_PAGE));
      })
      .catch((err) => console.log(err.message));
  },[]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return dataz.slice(startIndex, endIndex);
  };


  const [postimg, setPostimg] = useState();
  const [posttext, setPosttext] = useState('');
  //const [postpath, setPostpath] = useState('');


  const handleSubmit = async(e) => {
    e.preventDefault();
    

    if (postimg || posttext.length > "0") {
      //console.log(postimg.name);
      if(postimg){
      const reader = new FileReader();
      reader.onload = () => {
        const postpath = reader.result;
        console.log(postpath);

        axios.post("https://insta-beige.vercel.app/posts", {
          img: postpath,
          text: posttext,
        })
          .then((response) => {
            window.location.reload();
            //navigate('/dashboard');
            console.log(response);
          })
          .catch((err) => console.log(err.message));
      };
      const postlink = reader.readAsDataURL(postimg);
      //setPostpath(reader.readAsDataURL(postimg));
      //console.log(postpath);
      console.log(postlink);

      
    }
      
    }else{
      toast.info("No Content to post!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }

  };


  // const upload = async(e) => {
  //   if(postpath){
  //  await axios
  //   .post("http://localhost:8000/posts", {
  //     img: postpath,
  //     text: posttext,
  //   })
  //   .then((response) => {
  //     window.location.reload();
  //     navigate('/dashboard');
  //     console.log(response);
  //   })
  //   .catch((err) => console.log(err.message));
  //   }
  // }

  return (
    <div className={mode}>

      <div className="container full">

      <ToastContainer className="container p-2"
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>



        <div className="d-flex text-center">
          <label className='switch rounded-circle m-2 ms-auto' onClick={logout}><BiLogOut className='mb-1' /></label>
          <label onClick={modechange} class="rounded-circle switch m-2 me-4">
            {modeicon}
          </label>
        </div>


        <form action="" onSubmit={handleSubmit} className=' mx-auto d-flex flex-column' style={{width:"max-content"}}>

          <input className='m-1' type="file" onChange={(e)=>setPostimg(e.target.files[0])} accept="image/*" id="file-input" name="" />
          <input type="text" value={posttext} onChange={(e)=>setPosttext(e.target.value)} className='m-1 text-input' />
          <button className='btn btn-primary m-1 ms-auto' style={{width:"max-content"}} type="submit">Post</button>
        </form>



        
        <div className="container">
          {getPageItems().map((item) => {
            return(
              <div className="cardz mx-auto">
                <div className='d-flex mb-2'><div><div class="avatar me-2"></div></div>
                <p className='title text-wrap'>{item.text}</p></div>
                <img className='image-preview' src={item.img} alt="" />
              </div>
            );
          })}
        </div>



        <nav aria-label='Page navigation'>
          <ul className='pagination justify-content-center'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                className={`page-item ${page === currentPage ? 'active' : ''}`}
                key={page}
                onClick={() => handlePageChange(page)}
              >
                <span className='page-link'>{page}</span>
              </li>
            ))}
          </ul>
          </nav>

      </div>
      
    </div>
  )
}

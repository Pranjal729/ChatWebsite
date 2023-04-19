import React, { useState } from 'react'
import Logo from "../../asset/download.jpeg"
 import {Link} from "react-router-dom"

 let user
 const senduser=()=>{
  user=document.getElementById("joininput").value
  document.getElementById("joininput").value=""
}


const Join = () => { 
  const [name, setname] = useState("")
  function handleChange(event) {
    setname(event.target.value);
  }

  return (
    <div className='joinpage'>
      <div className='joincointainer'>
        <img src={Logo} alt="Logo" />
        <h1>ChatMe</h1>
        <input type="text" onChange={handleChange} placeholder='Enter Your Name' id='joininput' /><br/>
        <Link onClick={(e)=>!name?e.preventDefault():null} to="/chat"><button onClick={senduser} className='joinbtn'>Login </button></Link>
        
      </div>
    </div>
  )
}

export default Join
export {user}

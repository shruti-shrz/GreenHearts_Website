import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import M from 'materialize-css'

function LoginPage(props)
{
  const [info, setInfo]=useState({name:'', password:'', email:''})
  const [isSignUp, setIsSignUp]= useState(false);

  function handleChange(event)
  {
    const newval= event.target.value;
    const inpname= event.target.name;

    setInfo( prevVal => {
      if(inpname==='name')
      {
        return ({name: newval, password:prevVal.password, email:prevVal.email}) ;
      }
      if(inpname==='password')
      {
        return ({name: prevVal.name, password:newval, email:prevVal.email}) ;
      }
      else{
        return ({name: prevVal.name, password:prevVal.password, email:newval}) ;
      }
    });
  }



  function loginButton()
  {
    if(isSignUp)
    {
      console.log(info);
      fetch("/signup",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(info)
      }).then(res=>res.json())
      .then(data=>{
        if(data.error)
        {
        M.toast({html: data.error})
        }
        else
        {
          setIsSignUp(false);
        }
      });
    }
    else{
      fetch("/signin",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          name:info.name,
          password:info.password
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error)
        {
        M.toast({html: data.error})
        }
        else
        {
          console.log(data)
          setIsSignUp(false);
        }
      });
    }
  }
  return(
    <div>
      <p>the login page</p>
      <input className='loginInput' name='name' onChange={handleChange} placeholder='Username' value={info.name} />
        {isSignUp && <input name='email' onChange={handleChange} placeholder='Email' value={info.email} /> }
        <input name='password' onChange={handleChange} placeholder='Password' value={info.password} />
        <button onClick={loginButton}>{isSignUp? 'Sign Up now' : 'Login'}</button>
        {!isSignUp && <button onClick={()=>setIsSignUp(true)}>Sign up</button>}
    </div>
  );
}

export default LoginPage;

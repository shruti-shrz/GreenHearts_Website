import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import M from 'materialize-css'
import Loader from 'react-loader-spinner';

function LoginPage(props)
{
  const [info, setInfo]=useState({name:'', password:'', email:''})
  const [isSignUp, setIsSignUp]= useState(false);
  const [spin, setSpin]= useState(false);

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
    setSpin(true);
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
        setSpin(false);
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
          localStorage.setItem("jwt",data.token);
          localStorage.setItem("user",JSON.stringify(data.user));
          setIsSignUp(false);
          props.LoginSetter(true);
          props.Setter("HomePage")
        }
        setSpin(false);
      });
    }

  }
  return(
    <div className="loginDiv">
      <input className='loginInput' name='name' onChange={handleChange} placeholder='Username' value={info.name} />
        {isSignUp && <input className='loginInput' name='email' onChange={handleChange} placeholder='Email' value={info.email} /> }
        <input className='loginInput' name='password' type='password' onChange={handleChange} placeholder='Password' value={info.password} />
        <button className="greenButton" onClick={loginButton}>{isSignUp? 'Sign Up now' : 'Login'}</button>
        {!isSignUp && <button className="greenButton" onClick={()=>setIsSignUp(true)}>Sign up</button>}
        {spin && <Loader
         type="ThreeDots"
         color="#24B61A"
         height={100}
         width={100}
         />}
    </div>
  );
}

export default LoginPage;

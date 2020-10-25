import React, {useState} from 'react';

function LoginPage(props)
{
  const [info, setInfo]=useState({username:'', password:'', email:''})
  const [isSignUp, setIsSignUp]= useState(false);

  function handleChange(event)
  {
    const newval= event.target.value;
    const inpname= event.target.name;

    setInfo( prevVal => {
      if(inpname==='username')
      {
        return ({username: newval, password:prevVal.password, email:prevVal.email}) ;
      }
      if(inpname==='password')
      {
        return ({username: prevVal.username, password:newval, email:prevVal.email}) ;
      }
      else{
        return ({username: prevVal.username, password:prevVal.password, email:newval}) ;
      }
    });
  }

  function signUpButton()
  {
    setIsSignUp(true);
  }

  function loginButton()
  {
    props.LoginSetter(true);
  }
  return(
    <div>
      <p>the login page</p>
      <form>
        <input className='loginInput' name='username' onChange={handleChange} placeholder='Username' value={info.username} />
        <input name='password' onChange={handleChange} placeholder='Password' value={info.password} />
        {isSignUp && <input name='email' onChange={handleChange} placeholder='Email' value={info.email} /> }
        <button>{isSignUp? 'Sign Up' : 'Login'}</button>
        {!isSignUp && <button onClick={signUpButton}>Sign up</button>}
      </form>
    </div>
  );
}

export default LoginPage;

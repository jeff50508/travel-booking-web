import React, {useContext, useState} from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  const [message, setMessage] = useState(false);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };


  async function handleLogin(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('/login', {email,password});
      setUser(data);
      alert('登入成功');
      setRedirect(true);
    } catch (e) {
      alert('登入失敗');
      setMessage(true)
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='container'>
      <form className='login'>
        <div className='align-center w-80'>
          {message && 
          <div className='alert alert-danger flex'>
            <h4>請輸入正確的帳號密碼</h4>
          </div>}
          <div className='pb-20'>
            <input type="text" name="email" value={email} placeholder="請輸入帳號" onChange={handleEmail}/>
          </div>
          <div className='pb-20'>
            <input type="password" name="password" value={password} placeholder="請輸入密碼"onChange={handlePassword}/>
          </div>
            <button className='btn' onClick={handleLogin}>登入
          </button>
          <div className='align-center'>
            還沒有帳號了？從這裡<Link className="big" to={'/register'}>註冊</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login;
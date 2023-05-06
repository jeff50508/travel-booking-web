import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  let [name, setName] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  
  async function handleRegister(e)  {
    e.preventDefault();
    try {
      await axios.post('/register', {
        name,email,password
      });
      alert('註冊成功，將導向登入頁面');
      navigate("/login");
    } catch (e) {
      alert('註冊失敗，請稍後在試')
    }
  };

  return (
    <div className='container'>
      <form className='login '>
        <div className='align-center w-80'>
          <div className='pb-20'>
            <input type="text" name="username" value={name} placeholder="請輸入姓名" onChange={handleName}/>
          </div>
          <div className='pb-20'>
            <input type="text" name="email" value={email} placeholder="請輸入帳號" onChange={handleEmail}/>
          </div>
          <div className='pb-20'>
            <input type="password" name="password" value={password} placeholder="請輸入密碼"onChange={handlePassword}/>
          </div>
            <button className='btn' onClick={handleRegister}>註冊
          </button>
          <div className='align-center'>
            已經有帳號了？從這裡<Link className="big"to='/login'>登入</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register;
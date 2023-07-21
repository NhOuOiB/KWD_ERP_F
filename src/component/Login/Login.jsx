import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/config';
import { toast } from 'react-toastify';

const Login = () => {
  const [login, setLogin] = useState({
    account: 'mike',
    password: '1234',
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }
  async function handleLogin(e) {
    try {
      let res = await axios.post(`${API_URL}/login`, login, {
        withCredentials: true,
      });
      navigate('HR'); //首頁
    } catch (err) {
      toast.error(err.response.data.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    }
  }
  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <div className=" w-44 flex flex-col">
        <label htmlFor="account" className="text-left">
          Account
        </label>
        <input type="text" id="account" name="account" onChange={handleChange} />
        <label htmlFor="password" className="text-left">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.keyCode == 13) {
              handleLogin(e);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/config';
import { toast } from 'react-toastify';
import UserContext from '../../store/userContext';

const Login = () => {
  const [login, setLogin] = useState({
    account: '',
    password: '',
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { history } = user;

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }
  async function handleLogin() {
    try {
      let res = await axios.post(`${API_URL}/login`, login, {
        withCredentials: true,
      });
      let { id, name, permission } = res.data;
      setUser({ id: id, name: name, permission: permission, history: history });
      if (history != '') {
        
        navigate(history);
      } else {
        navigate('HR'); //首頁
      }
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
    // handleLogin();
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
              handleLogin();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Login;

import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/config';
import { toast } from 'react-toastify';
import UserContext from '../store/userContext';

const userPermission = (history) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { id, name, permission } = user;

  useEffect(() => {
    (async () => {
      try {
        let result = await axios.get(`${API_URL}/auth`, {
          withCredentials: true,
        });
        const { id, name, permission } = result.data;
        setUser({ id: id, name: name, permission: permission, history: history });
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
        setUser({ id: id, name: name, permission: permission, history: history });
        if (err.response.status == 401) navigate('/');
      }
    })();
  }, [history]);
};

export default userPermission;

import React, { useState, useEffect } from 'react';
import {useUser} from '../UserContext/UserContext'
import jwt_decode from 'jwt-decode';
import { useNavigate ,Link } from 'react-router-dom';
import styles from './styles.module.css'
import axios from 'axios';


function Login() {
    const navigate = useNavigate();
    const {userData, setUserData} = useUser();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    useEffect(() => {
        //console.log('Updated userData:', userData);
      }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await sendLoginRequest(formData);
          if (response.status === 200) {
            const decodedToken = jwt_decode(response.data.token);
            const userId = decodedToken.userId;
            const { firstname, lastname } = decodedToken;
            console.log('decoded token:', decodedToken);
      
            
            // setUserData({
            //   userId,
            // });
            // console.log(userData);
      
            console.log(`User ${userId} ${firstname} ${lastname} logged in successfully`);
      
            if (userId) {
                setUserData({ user: { userId } });
              console.log('User ID stored in state:', userId);
            } else {
              console.log('User ID is not defined in the user data');
            }
            console.log(userData);
      
            localStorage.setItem('token', response.data.token);
            //setIsLoggedIn(true);
            const userEmail = formData.email;
            navigate(`/dashboard?userEmail=${userEmail}`);
          } else {
            alert('Could not find the credentials', response.data.message);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      };
      
      
  

    const sendLoginRequest = async (data) => {
        try {
            const response = await axios.post('http://localhost:8001/auth/login', data);
            return response;
        } catch (error) {
            throw error;
            
        }
    };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h3 className={styles.logintext}>Welcome back to the magic</h3>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              className={styles.input}
            />
            
            <button type="submit" className={styles.green_btn}>
              Sing In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h6 className={styles.new}>New Here ?</h6>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

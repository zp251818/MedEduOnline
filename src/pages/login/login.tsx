
import { saveAdminInfoToLocalStorage } from '@/utils/adminInfoStorage';
import './login.css'
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLanguage } from '@/utils/language';
import { loginByAccountAdmin } from '@/apis/queryfn/admin';
import { message } from 'antd';
import { ERROR } from '@/static/const';

interface CircleProps {
    '--x': number;
  }

  const Login: React.FC = () => {
    const [Login_Title, setLoginTitle] = useState(getLanguage() == "CN" ? "登录后台系统" : "Login for HealthE-Train");
    const [Account_Name, setAccountName] = useState(getLanguage() == "CN" ? "账号" : "Account");
    const [Password_Name, setPasswordName] = useState(getLanguage() == "CN" ? "密码" : "Password");
    const [Login_Confirm, setLoginConfirm] = useState(getLanguage() == "CN" ? "登录" : "Login");

    const updateLanguage = () => {
        setLoginTitle(getLanguage() == "CN" ? "登录后台系统" : "Login for HealthE-Train");
        setAccountName(getLanguage() == "CN" ? "账号" : "Account");
        setPasswordName(getLanguage() == "CN" ? "密码" : "Password");
        setLoginConfirm(getLanguage() == "CN" ? "登录" : "Login");
    };

    useEffect(()=>{
        console.log(getLanguage())
        updateLanguage()
      },[])

    const [account, setAccount] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate()
  
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('account:', account);
        console.log('password:', password);
        const loginAdmin:Admin = {
          adminId:"",
          account:account,
          password:password
        }
        const res = await loginByAccountAdmin(loginAdmin);
        console.log(res)
        if(res.code!=200)
        {
          message.error(ERROR)
        }
        else{
          saveAdminInfoToLocalStorage(res.data.token);
          navigate('/main');
        }
      };
  
    const circles: CircleProps[] = [
      { '--x': 0 },
      { '--x': 1 },
      { '--x': 2 },
      { '--x': 3 },
      { '--x': 4 }
    ];
  
    return (
      <section>
        {/* 背景颜色 */}
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          {/* 背景圆 */}
          {circles.map((circle, index) => (
            <div className="circle" key={index}></div>
          ))}
          {/* 登录框 */}
          <div className="container">
            <div className="form">
              <h2>{Login_Title}</h2>
              <form onSubmit={handleLogin}>
                <div className="inputBox">
                  <input
                    type="text"
                    placeholder={Account_Name}
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    placeholder={Password_Name}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <input type="submit" value={Login_Confirm} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Login;
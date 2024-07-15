import React, { useEffect ,useState} from 'react';
import { Layout, Menu} from 'antd';
import {
    UserOutlined,
    MessageOutlined
  } from '@ant-design/icons'
import { Outlet , useNavigate} from 'react-router-dom'
const { Header, Footer } = Layout;
import './main.scss'
import {  loadAdminInfoFromLocalStorage, removeAdminInfoFromLocalStorage } from '@/utils/adminInfoStorage';
import { message } from 'antd';
import { getLanguage, switchLanguage } from '@/utils/language';



const Main: React.FC = () => {

  const [Label_For_Title,setTitle] = useState(getLanguage()=="CN"?"基层卫生人员网络培训平台后台系统":"HealthE-Train Backend operation platform") 
  const [Label_For_Language, setLanguage] = useState(getLanguage()=="CN"?"切换语言":"Change Language");
  const [Label_For_Out,setOut] = useState(getLanguage()=="CN"?"退出登录":"Log Out");

  const menuItems = [
  { key: 'out', label: Label_For_Out ,icon:<UserOutlined/> },
  { key: 'language', label: Label_For_Language ,icon:<MessageOutlined /> }
  ];

  const handleChangeLanguage = () =>{
    setLanguage(getLanguage()=="CN"?"切换语言":"Change Language");
    setOut(getLanguage()=="CN"?"退出登录":"Log Out")
    setTitle(getLanguage()=="CN"?"基层卫生人员网络培训平台后台系统":"HealthE-Train Backend operation platform")
    window.location.reload();
  }

  const navigate = useNavigate();
  useEffect(()=>{
    const adminInformation = loadAdminInfoFromLocalStorage();
    if (!adminInformation) {
      message.error("未登录或登录失效！");
      setTimeout(() => {
        navigate("/login");
      }, 3000); // 3秒后跳转到登录页面
    }
  },[])

  const onMenuClick=(route:any)=>{
    if(route.key === "out")
    {
    removeAdminInfoFromLocalStorage();
    message.success("退出成功！即将跳转");
    setTimeout(() => {
      navigate("/login");
    }, 3000);    
    }
    else if(route.key === "language")
    {
      switchLanguage()
      console.log(getLanguage())
      handleChangeLanguage()
    }
  }

  return (
    <Layout className='layout'>
      <Header style={{ display: 'flex', alignItems: 'center' }} className='header'>
        <div className="demo-logo" />{/*样式里面修改url即可*/}
        <div className='demo-title'>{Label_For_Title}</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items= {menuItems}
          onClick={onMenuClick}
        >
        </Menu>
      </Header>
      <div className='content' style={{ width: '100%',overflowY: 'auto' }}>
        <Outlet></Outlet>{/*外部页面接入*/}
      </div>
      <Footer style={{ textAlign: 'center'}}>
        ©{new Date().getFullYear()} Created by 卷积互补配队
      </Footer>
    </Layout>
  );
};

export default Main;
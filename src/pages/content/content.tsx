import React, { useEffect } from 'react';
import { useState } from 'react';
import { Menu } from 'antd';
import {

  BookOutlined,
  DatabaseOutlined,
  ReadOutlined,
  ProfileOutlined,
  FacebookOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  EditOutlined,
  FileUnknownOutlined,
  OrderedListOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate} from "react-router-dom";
import './content.scss'
import { Analysis_Label, Running_Information_Label, Process_Monitoring_Label, Achievement_Monitoring_Label, PlatForm_Label, User_Information_Label, Course_Manage_Label, Course_Category_Label, Course_Student_Label, Question_Resources_Label, Question_Statistic_Label, Question_Manage_Label } from '@/static/const';

const { SubMenu } = Menu;

const Content: React.FC = () => {

    const navigate = useNavigate();

    const [type, setType] = useState(['information'])
    const [openKeys,setOpenKeys] = useState(['sub1'])

    const handleClick = (e:any) => {
        setType([e.key])
        setOpenKeys([e.keyPath[1]])
        navigate(`/main/content/${e.key}`);
    };

    return (
        <div style={{ display: 'flex' ,height:'90vh'}} >
            <Menu
                onClick={handleClick}
                style={{ width: '18%' }} 
                defaultSelectedKeys={type||['running_information']}
                defaultOpenKeys={openKeys||['sub1']}
                mode="inline"
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <BookOutlined />
                        <span>{Analysis_Label}</span>
                        </span>
                    }
                >
                    <Menu.Item key="running_information"><span><PieChartOutlined /> </span>{Running_Information_Label}</Menu.Item>
                    <Menu.Item key="process_monitoring"><span><AreaChartOutlined /></span>{Process_Monitoring_Label}</Menu.Item>
                    <Menu.Item key="achievement_monitoring"><span><BarChartOutlined /></span>{Achievement_Monitoring_Label}</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                       <DesktopOutlined />
                        <span>{PlatForm_Label}</span>
                        </span>
                    }
                >
                    <Menu.Item key="user_information"><span><ReadOutlined /></span>{User_Information_Label}</Menu.Item>
                    {/* <Menu.Item key="user_permission"><span><ProfileOutlined /></span>{User_Permission_Label}</Menu.Item> */}
                </SubMenu>
                <SubMenu
                    key="sub3"
                    title={
                        <span>
                        <DatabaseOutlined />
                        <span>{Course_Manage_Label}</span>
                        </span>
                    }
                >
                    <Menu.Item key="course_category"><span><FacebookOutlined /></span>{Course_Category_Label}</Menu.Item>
                    <Menu.Item key="course_student"><span><TeamOutlined /></span>{Course_Student_Label}</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                        <span>
                        <EditOutlined />
                        <span>{Question_Resources_Label}</span>
                        </span>
                    }
                >
                    <Menu.Item key="question_statistics"><span><OrderedListOutlined /></span>{Question_Statistic_Label}</Menu.Item>
                    {/* <Menu.Item key="question_manage"><span><FileUnknownOutlined /></span>{Question_Manage_Label}</Menu.Item> */}
                </SubMenu>
            </Menu>
            <div style={{ width: '100%'}}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Content;
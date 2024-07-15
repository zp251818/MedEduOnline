import { getLanguage } from '@/utils/language';
import './process_monitoring.scss'
import LineComponent from '../statisticComponents/line/line';
import { useState , useEffect} from 'react';
import type { SearchProps } from 'antd/es/input/Search';
import { Input ,List, Avatar } from 'antd';
import { getAllLessonSimpleInfo, getChaptersByLessonId } from '@/apis/queryfn/study';

const ProcessMonitoring: React.FC = () =>{
    const Process_Monitoring_Label = getLanguage()=="CN"?"学员学习过程监控":"Process Monitoring"

    const [xAxisData,setXAxisData] = useState<string[]>()
    const [seriesData,setSeriesData] = useState<number[]>()
    const [chartTitle,setChartTitle] = useState<string>()

    const { Search } = Input;

    const [list_data,setListData] = useState<lesson_base_information[]>()

    const switchCourse = async function (key: string,lesson_name:string) {
        console.log(key+lesson_name)
        setChartTitle(lesson_name)
        // 数据请求
        const res = await getChaptersByLessonId(key)
        console.log(res.data)
        setXAxisData(res.data.map(stat => stat.chapter.chapterTitle))
        setSeriesData(res.data.map(stat => stat.count))
    }
     
    // 需要时重新请求数据
    const getAllListData = async function () {
        const res = await getAllLessonSimpleInfo();
        console.log(res.data);
        setListData(res.data)
    }

    // 按关键词搜索
    const onSearch :SearchProps['onSearch'] = function(value:string) {
        console.log(value);
        const filteredData = list_data?.filter(item => item.lesson_name.includes(value));
        setListData(filteredData)
    };

    useEffect(()=>{
        getAllListData();
    },[])

    return(
        <div className='container'>
            <div className='container-left'>
                <div className='searchInput'>
                   <Search placeholder="input search text" onSearch={onSearch} enterButton className='search'/>
                </div>
                <div className='course-list'>
                <List
                itemLayout="horizontal"
                pagination={{
                    onChange: page => {
                       console.log(page)
                    },
                    pageSize:15,
                    className: 'pagination-center' 
                }}
                dataSource={list_data}
                renderItem={item => (
                   <List.Item>
                   <List.Item.Meta
                    avatar={<Avatar src= {item.lesson_cover} />}
                    title={<a  onClick={() => switchCourse(item.key,item.lesson_name)}>{item.lesson_name}</a>}
                   />
                   </List.Item>
                )}
                />
                </div>
            </div>
            <div className='container-right'>
                <div className='title'>{Process_Monitoring_Label}</div>
                <div className='line'>
                    <LineComponent xAxisData={xAxisData?xAxisData:[]} seriesData={seriesData?seriesData:[]} title={chartTitle?chartTitle:''} ></LineComponent>
                </div>    
            </div>
        </div>
        
    )
}

export default ProcessMonitoring
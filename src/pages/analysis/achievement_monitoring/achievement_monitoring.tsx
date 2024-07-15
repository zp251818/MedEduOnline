
import { ACCOUNT, COVER, COVER_DEMO, PROCESS_LINE, PROCESS_ROUND, USERNAME } from '@/static/const'
import './achievement_monitoring.scss'
import { Progress ,Table } from 'antd';
import React, { useState ,useEffect} from 'react';
import { SortOrder } from 'antd/es/table/interface';
import { getAllUserCompulsoryLessonProcess } from '@/apis/queryfn/study';

const collator = new Intl.Collator('en', { sensitivity: 'base' });



const AchievementMonitoring: React.FC = () => {
    const columns = [
        {
            title: COVER,
            dataIndex: 'cover',
            width:"5%",
            render: (coverUrl: string) => <img src={coverUrl?coverUrl:COVER_DEMO} alt="封面" style={{ width: '65px', height: 'auto' }} />,
          },
        {
            title: ACCOUNT,
            dataIndex: 'account',
            sorter: (a: AllProcess, b: AllProcess) => collator.compare(a.account, b.account),
            sortDirections: ['descend' as SortOrder], // 将类型显式声明为 SortOrder
            className: 'large-text', 
            width:"10%"
          },
          {
            title: USERNAME,
            dataIndex: 'username',
            sorter: (a: AllProcess, b: AllProcess) => collator.compare(a.username, b.username),
            sortDirections: ['descend' as SortOrder], // 将类型显式声明为 SortOrder
            className: 'large-text', 
            width:"10%"
          },
          {
            title: PROCESS_LINE,
            dataIndex: 'processLine',
            sorter: (a: AllProcess, b: AllProcess) => a.processLine - b.processLine,
            sortDirections: ['ascend' as SortOrder, 'descend' as SortOrder], // 同样显式声明为 SortOrder
            render: (processLine:number) =>  <Progress percent={processLine} />,
            width:"40%"
          },
          {
            title: PROCESS_ROUND,
            dataIndex: 'processRound',
            sorter: (a: AllProcess, b: AllProcess) => a.processRound - b.processRound,
            sortDirections: ['ascend' as SortOrder, 'descend' as SortOrder], // 同样显式声明为 SortOrder
            render: (processRound: number) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Progress
                        type="circle"
                        size= "small"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        percent={processRound}
                    />
                </div>
            ),
            align: 'center' as const,
            width:"20%"
          },
      ];

    const [listData,setListData] = useState<AllProcess[]>()

    const getListData = async function () {
        const res = await getAllUserCompulsoryLessonProcess();
        console.log(res);
        setListData(res.data)
    }

    useEffect (()=>{
        getListData()
    },[])

    function onChange(pagination: any, filters: any, sorter: any, extra: any) {
        console.log('params', pagination, filters, sorter, extra);
    }

    useEffect(()=>{

    },[])

    return(
    <div className='table-achievement'>
    <Table
        columns={columns}
        dataSource={listData}
        onChange={onChange}
        pagination={{
          pageSize: 5,
          total:listData?.length,
          className:"pagination-center"
        }}
      />
    </div>
    )
}

export default AchievementMonitoring
import './course_category.scss'
import { Table, Input,Button, Select , message ,Tag} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {SearchOutlined} from '@ant-design/icons'
import { COLOR_TAG, COMPULSORY, ELECTIVE, END_TIME, ERROR, LESSON_CATEGORY, LESSON_COVER, LESSON_NAME, LESSON_TYPE, MEDICAL_SPECIALTIES, START_TIME, SUCCESS } from '@/static/const';
import { getLessonCategoryInfo, updateLessonTypeByLessonId } from '@/apis/queryfn/study';

const { Option } = Select;

const CourseCategory: React.FC = () =>{

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInputRef = useRef<Input>(null);

    const [courseListData,setCourseListData] = useState<lesson_information[]>();

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInputRef}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 180, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters,confirm)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        onFilter: (value: any, record: any) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: boolean) => {
            if (visible && searchInputRef.current) {
                setTimeout(() => searchInputRef.current?.select());
              }
        }
      });

      const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      const handleReset = (clearFilters: any,confirm:any) => {
        clearFilters();
        confirm()
        setSearchText('');
      };

      const columns = [
        {
          title: LESSON_COVER,
          dataIndex: 'lessonCover',
          key: 'lessonCover',
          width:"7%",
          render: (coverUrl: string) => <img src={coverUrl} alt="封面" style={{ width: '65px', height: 'auto' }} />,
        },
        {
          title: LESSON_NAME,
          dataIndex: 'lessonName',
          key: 'lessonName',
          ...getColumnSearchProps('lessonName'),
          width:"20%",
        },
        {
          title: START_TIME,
          dataIndex: 'startTime',
          key: 'startTime',
          ...getColumnSearchProps('startTime'),
          render: (startTime: any) => (
            <span>{new Date(startTime).toISOString().slice(0, 10)}</span>
          ),
          width:"10%",
        },
        {
            title: END_TIME,
            dataIndex: 'endTime',
            key: 'endTime',
            ...getColumnSearchProps('endTime'),
            render: (endTime: any) => (
              <span>{new Date(endTime).toISOString().slice(0, 10)}</span>
            ),
            width:"10%",
        },
        {
            title: LESSON_CATEGORY,
            dataIndex: 'categoryList',
            key: 'categoryList',
            width:"15%",
            render:(categoryList:string[])=>(
               categoryList.map(item => <Tag color={COLOR_TAG.find(it => it.name=item)?.color}>{MEDICAL_SPECIALTIES.find(spec => spec.id === item)?.name}</Tag>)
            ),
            ...getColumnSearchProps('categoryList'),
        },
        {
            title: LESSON_TYPE,
            dataIndex: 'lessonType',
            key: 'lessonType' ,
            render: (lessonType: string, record: lesson_information) => (
                <Select defaultValue={lessonType == "0" ? ELECTIVE : COMPULSORY} onChange={(value) => handleSelectChange(value, record)}>
                  <Option value="0">{ELECTIVE}</Option>
                  <Option value="1">{COMPULSORY}</Option>
                </Select>
            ),
            ...getColumnSearchProps('lessonType'),
            width:"15%"
        },
    ]

        // 更改选修必修
     const handleSelectChange = async (value: string, record: lesson_information) => {
        console.log(value,record.key); // 打印选择的值
        const res = updateLessonTypeByLessonId(record.key,value);
        if((await res).code==200)
        {
          message.success(SUCCESS)
        }
        else
        {
          message.error(ERROR)
        }
     };

     const getLessonCategoryInfoFunction = async () =>{
      const res = await getLessonCategoryInfo();
      console.log(res.data)
      setCourseListData(res.data)
     }

     useEffect(()=>{
      getLessonCategoryInfoFunction();
     },[])

    return(
        <div className='course-category-container'>
            <div className='course-category-table'>
                <Table columns={columns} dataSource={courseListData?courseListData:[]} pagination={{pageSize: 5}} />
            </div>
        </div>
    )
}

export default CourseCategory

import './course_student.scss'
import { useState , useEffect} from 'react';
import type { SearchProps } from 'antd/es/input/Search';
import { Input ,List, Avatar,Table, Popconfirm, Button, message, Steps } from 'antd';
import { ACCOUNT, CONFIRM_DELETE_STUDENT, COURSE_PROCESS, COURSE_STUDENT_MANAGE, COVER,  COVER_DEMO,  DELETE, ERROR, SUCCESS, USERNAME } from '@/static/const';
import { SortOrder } from 'antd/es/table/interface';
import { findStatus, findStatusType } from '@/utils/someTips';
import { deleteLessonStudents, getAllLessonSimpleInfo, getLessonStudentSituations } from '@/apis/queryfn/study';

const CourseStudent: React.FC = () =>{
    const { Search } = Input;
    const { Step } = Steps;

    const columns = [
        {
            title: COVER,
            dataIndex: 'cover',
            width:"10%",
            render: (coverUrl: string) => <img src={coverUrl?coverUrl:COVER_DEMO} alt="封面" style={{ width: '65px', height: 'auto' }} />,
          },
          {
            title: ACCOUNT,
            dataIndex: 'account',
            sorter: (a: user_base_information, b: user_base_information) => a.account.localeCompare(b.account),
            key: 'account',
            width:"15%",
          },
          {
            title: USERNAME,
            dataIndex: 'username',
            sorter: (a: user_base_information, b: user_base_information) => a.username.localeCompare(b.username),
            sortDirections: ['descend' as SortOrder], // 将类型显式声明为 SortOrder
            className: 'large-text', 
            width:"15%"
          },
          {
            title: COURSE_PROCESS,
            dataIndex: 'chapter_status',
            render: (status:chapter_status[]) => (
                <Steps size="small">
                {chapter_list_data?.map((chapter) => (
                    <Step key={chapter.chapterId} title={chapter.chapterTitle} status={findStatusType(findStatus(chapter.chapterId,status))} />
                ))}
                </Steps>
            ),
            align: 'center' as const,
            width:"60%"
          }
      ];
    
    const [selectedRowKeys,setSelectedRowKeys] = useState<string[]>() 

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows:user_base_information[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        setSelectedRowKeys(selectedRows.map(row => row.key))
     }
    };

    const [course_list_data,setListData] = useState<lesson_base_information[]>()
    const [student_list_data,setStudentListData] = useState<user_base_information[]>()
    const [chapter_list_data,setChapterListData] = useState<chapter[]> ()
    const [course_title,setCourseTitle] = useState("");
    const [course_id,setCourseId] = useState("")

    // 切换课程
    const switchCourse = async function (key:string,lesson_name:string) {
        console.log(key+lesson_name)
        setCourseTitle(lesson_name)
        setCourseId(key);
        const res = await getLessonStudentSituations(key);
        console.log(res.data)
        setChapterListData(res.data.chaptersList.sort((a, b) => a.chapterOrder - b.chapterOrder));
        setStudentListData(res.data.studentProcessDTOList);
    }

    // 需要时重新请求数据
    const getAllListData = async function () {
        const res = await getAllLessonSimpleInfo();
        console.log(res.data);
        setListData(res.data)
    }

    // 关键字搜索课程
    const onSearch :SearchProps['onSearch'] = function(value:string) {
        const filteredData = course_list_data?.filter(item => item.lesson_name.includes(value));
        setListData(filteredData)
    };

    // 删除学生
    const handleDeleteStudent = async function () {
        if(selectedRowKeys)
        {
            const res = await deleteLessonStudents(course_id,selectedRowKeys)
            if(res.code==200){
                const filteredData = student_list_data?.filter(item1 =>
                    !selectedRowKeys?.some(item2 => item2 === item1.key));
                setStudentListData(filteredData);
                message.success(SUCCESS)
            }
            else
            {
                message.error(ERROR);
            }
        }
    }

    useEffect(()=>{
        getAllListData();
        setCourseTitle("");
        setChapterListData([]);
        setStudentListData([]);
    },[])

    return(
        <div className='container-course-student'>
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
                    // total:15,
                    className: 'pagination-center' 
                }}
                dataSource={course_list_data}
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
                <div className='container-header'>
                     <div className='container-right-title'>{course_title+COURSE_STUDENT_MANAGE}</div>
                     <div className='header-button'> 
                     <Popconfirm
                    title={DELETE}
                    description={CONFIRM_DELETE_STUDENT}
                    onConfirm={() => handleDeleteStudent()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button 
                      type="primary" 
                      style={{ backgroundColor: 'red' }}
                    >
                        {DELETE}
                    </Button>
                  </Popconfirm>
                     </div>
                </div>
                <div className='container-course-student-table'>
                   <Table rowSelection={rowSelection} columns={columns} dataSource={student_list_data} pagination={{pageSize: 5}} />
                </div>
            </div>
        </div>
    )
}

export default CourseStudent
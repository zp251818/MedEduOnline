
import './question_statistics.scss'
import { useState , useEffect, useRef} from 'react';
import type { SearchProps } from 'antd/es/input/Search';
import { Input ,List ,Table, Popconfirm, Button, message, Tag ,InputRef} from 'antd';
import { COLOR_TAG, CONFIRM_DELETE_QUESTION, DELETE, EXAM_QUESTION_ID, EXAM_QUESTION_TYPE, QUESTION_BANK, QUESTION_CONTENT_PART, QUESTION_TYPES, SUCCESS } from '@/static/const';

import {SearchOutlined} from '@ant-design/icons'
import { formatDate } from '@/utils/someTips';
import { getAllQuestionBanks} from '@/apis/queryfn/questionBank';
import { deleteBatchExamQuestions, getExamQuestionsByQuestionBankId } from '@/apis/queryfn/examQuestion';

const QuestionStatistics: React.FC = () =>{
    const { Search } = Input;
    
      const [, setSearchText] = useState('');
      const [, setSearchedColumn] = useState('');
      const searchInputRef = useRef<InputRef>(null);
  
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
                title: EXAM_QUESTION_ID,
                dataIndex: 'key',
                key:'key',
                windth:"20%",
                ...getColumnSearchProps('key')
              },
              {
                title: QUESTION_CONTENT_PART,
                dataIndex: 'node_content',
                key: 'node_content',
                width:"60%",
                ...getColumnSearchProps('node_content'),
                className: 'question-content-part', 
              },
              {
                title: EXAM_QUESTION_TYPE,
                dataIndex: 'eq_type_id',
                key:'eq_type_id',
                width:"20%",
                render:(eq_type_id:string)=>(
                  <Tag color={COLOR_TAG.find(tag => tag.name === eq_type_id)?.color}>{QUESTION_TYPES.find(types => types.id === eq_type_id)?.name}</Tag>
                ),
                ...getColumnSearchProps('eq_type_id')
              }
          ];
    
    // 题库
    const [questionBankList,setQuestionBankList] = useState<question_bank[]>() 
    const [questionBankTitle,setQuestionBankTitle] = useState("");
    const [questionBankId,setQustionBankId] = useState("");
    // 试题
    const [questions,setQuestions] = useState<exam_question[]>()
    
    // 选中值
    const [selectedRowKeys,setSelectedRowKeys] = useState<string[]>() 

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows:exam_question[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        setSelectedRowKeys(selectedRows.map(row => row.key))
     }
    };

    // 关键字搜索题库
    const onSearch :SearchProps['onSearch'] = function(value:string) {
        console.log(value);
        const filteredData = questionBankList?.filter(item => item.qbTitle.includes(value));
        setQuestionBankList(filteredData)
        message.success(SUCCESS)
    };

    // 切换课程
    const switchQuestionBank = async function (qb_id:string,qb_title:string) {
        console.log(qb_id+qb_title)
        setQuestionBankTitle(qb_title)
        setQustionBankId(qb_id);
        // 进行试题查询
        getExamQuestions(qb_id);
    }
    // 删除问题
    const handleDeleteQuestion = async function () {
      const res = await deleteBatchExamQuestions(questionBankId,selectedRowKeys?selectedRowKeys:[]);
      console.log(res);
      const filteredData = questions?.filter(item1 =>
      !selectedRowKeys?.some(item2 => item2 === item1.key));
      setQuestions(filteredData);
      message.success(SUCCESS)
    }
    // 获得题库列表
    const getQuestionBanks = async () =>{
      const res = await getAllQuestionBanks();
      console.log(res)
      setQuestionBankList(res);
    }
    // 试题查询
    const getExamQuestions = async(qbId:string) =>{
      const res = await getExamQuestionsByQuestionBankId(qbId);
      console.log(res.data);
      setQuestions(res.data);
    }
    useEffect (()=>{
      getQuestionBanks();
    },[])

    return(
        <div className='container-question-bank'>
            <div className='left-container'>
            <div className='searchInput'>
                   <Search placeholder="input search text" onSearch={onSearch} enterButton className='search'/>
            </div>
            <div className='question-bank-list'>
            <div className='course-list'>
                <List
                itemLayout="horizontal"
                pagination={{
                    onChange: page => {
                       console.log(page)
                    },
                    pageSize:7,
                    className: 'pagination-center' 
                }}
                dataSource={questionBankList}
                renderItem={item => (
                   <List.Item>
                   <List.Item.Meta
                    title={<a  onClick={() => switchQuestionBank(item.qbId,item.qbTitle)}>{item.qbTitle}</a>}
                    description={<div style={{ textAlign: 'right' }}>{formatDate(item.createTime)}</div>}
                   />
                   </List.Item>
                )}
                />
                </div>
            </div>
             
            </div>
            <div className='right-container'>
            <div className='container-header'>
                     <div className='container-right-title'>{questionBankTitle+"--"+QUESTION_BANK}</div>
                     <div className='header-button'> 
                     <Popconfirm
                    title={DELETE}
                    description={CONFIRM_DELETE_QUESTION}
                    onConfirm={() => handleDeleteQuestion()}
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
                <div className='container-question-table'>
                   <Table rowSelection={rowSelection} columns={columns} dataSource={questions} pagination={{pageSize: 50}}  scroll={{ y: 500 }}/>
                </div>
            </div>
        </div>
    )
}

export default QuestionStatistics
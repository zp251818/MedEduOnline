import './user_information.scss'
import { Table, Input,Space, Button, Popconfirm ,Select , Form ,Modal, message ,Upload, Tag} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {SearchOutlined, UploadOutlined} from '@ant-design/icons'
import { ACCOUNT, AUTHORITY, BATCH_IMPORT, CANCEL, CLINICAL_MEDICINE, COLOR_TAG, CONFIRM_DELETE, COVER, DELETE, DIAGNOSTIC_IMAGING, ECG, EMAIL, ENTER_ACCOUNT, ENTER_AUTHORITY, ENTER_EMAIL, ENTER_MAJOR, ENTER_PHONE, ENTER_TYPE, ENTER_USER_INFORMATION, ENTER_USERNAME, ERROR, ERROR_EMAIL, ERROR_PHONE, EXAMINER, FILL_ALL, IMPORT_USER, MAJOR, MEDICAL_SPECIALTIES, MEDICAL_TECH, NO_AUTHORITY, NURSING, OPERATE, PHONE, PUBLIC_HEALTH, RESET, STUDENT, SUBMIT, SUCCESS, TEACHER, TYPE, ULTRASOUND, USERNAME, XLS_FILE_ERROR } from '@/static/const';
import { beforeUpload, parseExcelFile } from '@/utils/myXls';
import { UploadProps } from 'antd/es/upload';
import { batchRegisterUserFromBackground, getUserDetailsStatistic } from '@/apis/queryfn/user';
import { deleteUserAuthority, putUserAuthority } from '@/apis/queryfn/userLinkCategory';

const { Option } = Select;
const UserInformation: React.FC = () =>{

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInputRef = useRef<Input>(null);

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
          title: COVER,
          dataIndex: 'cover',
          key: 'cover',
          width:"7%",
          render: (coverUrl: string) => <img src={coverUrl} alt="封面" style={{ width: '65px', height: 'auto' }} />,
        },
        {
          title: ACCOUNT,
          dataIndex: 'account',
          key: 'account',
          ...getColumnSearchProps('account'),
          width:"10%",
        },
        {
          title: USERNAME,
          dataIndex: 'username',
          key: 'username',
          ...getColumnSearchProps('username'),
          width:"10%",
        },
        {
            title: EMAIL,
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
            width:"18%",
        },
        {
            title: PHONE,
            dataIndex: 'phone',
            key: 'phone',
            ...getColumnSearchProps('phone'),
            width:"18%",
        },
        {
            title: TYPE,
            dataIndex: 'is_teacher',
            key: 'is_teacher',
            render: (type:string) => (<span>{type=="0"?STUDENT:TEACHER}</span>),
            width:"10%"
        },
        {
          title:MAJOR,
          dataIndex:'category_id',
          key:'category_id',
          render:(category_id:string,record:User) => (record.is_teacher=="0"?<Tag color={parseInt(category_id) >= 1 && parseInt(category_id) <= 10 ? COLOR_TAG[parseInt(category_id) - 1].color : 'geekblue'}>
          {parseInt(category_id) >= 1 && parseInt(category_id) <= 10 ? MEDICAL_SPECIALTIES[parseInt(category_id)].name :`Tag ${category_id}` } 
        </Tag>:""),
          wdith:"10%"
        },
        {
            title: AUTHORITY,
            dataIndex: 'authority',
            key: 'authority' ,
            render: (authority: string, record: User) => (
                <Select defaultValue={authority == "0" ? NO_AUTHORITY : EXAMINER} onChange={(value) => handleSelectChange(value, record)}>
                  <Option value="0">{NO_AUTHORITY}</Option>
                  <Option value="1">{EXAMINER}</Option>
                </Select>
            ),
            width:"12%"
        },
        {
            title: OPERATE,
            width:"10%",
            render: (record: User) => (
              <Space size="middle">
                  <Popconfirm
                    title={DELETE}
                    description={CONFIRM_DELETE}
                    onConfirm={() => handleDelete(record)}
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
              </Space>
            )
        }
      ];

    /// 用于添加新用户的表单界面数据需要
    const [modelVisible,setModelVisible] = useState(false);
    const [confirmLoading,setConfirmLoading] = useState(false);
  
    const showModal = () => {
      setModelVisible(true);
    };
  
    const handleCancel = () => {
      setModelVisible(false);
    };
  
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        // 检查是否有任意一项为空
        const { account, username, email, phone,type,authority,major} = values;
        if (!account || !username || !email || !phone ||!type ||!authority) {
          message.error(FILL_ALL);
          return;
        }
        setConfirmLoading(true);
        // 提交表单任务
        const user: User = {
          key: '',
          cover: '',
          account: account,
          username: username,
          email: email,
          phone: phone,
          category_id: major||"0", 
          is_teacher: type, 
          authority: authority,
        };
        console.log(user)
        const userList = [user];
        const res = await batchRegisterUserFromBackground(userList);
        console.log(res);
        if(res.code==200)
        {
          message.success(SUCCESS)
        }
        else
        {
          message.error(ERROR)
        }
        setConfirmLoading(false)
        setModelVisible(false);
        form.resetFields();
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error(ERROR)
      };

      const validateEmail = (_: any, value: string, callback: (error?: string) => void) => {
        // 使用正则表达式验证邮箱格式
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!regex.test(value)) {
            callback(ERROR_EMAIL);
        } else {
            callback();
        }
    };

    const validatePhone = (_: any, value: string, callback: (error?: string) => void) => {
        // 使用正则表达式验证电话号码格式
        const regex = /^[0-9]{8,}$/; // 这里假设是简单的8位以上数字
        if (!regex.test(value)) {
            callback(ERROR_PHONE);
        } else {
            callback();
        }
    };

      // 单独输入
      const handleImportUser = () => {
        console.log("单独输入")
        showModal()
      };

    const [listData,setListData] = useState<User[]>([]);
    const [fileList, setFileList] = useState<any[]>([]);

    //删除用户
    const handleDelete = async (record:User) => {
        console.log(record.key)    
        // 发送请求
        const filteredData = listData.filter(item => item.key!=record.key);
        setListData(filteredData)
        message.success(SUCCESS)
    };
    
    // 更改权限
    const handleSelectChange = async (value: string, record: User) => {
      console.log(value,record.key); // 打印选择的值
      let res;
      if(value=="0")
      {
        res = await deleteUserAuthority(record.key);
      }
      else
      {
        res = await putUserAuthority(record.key);
      }
      if(res.code==200)
      {
        message.success(SUCCESS)
      }
    };

    // 批量导入
    const handleUpload = async (info: any) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1); // 只保留最新上传的文件
        setFileList(fileList);
        try {
            const data: any[] = await parseExcelFile(info.file.originFileObj); // 假设 parseExcelFile 返回的是 any[] 类型
            const formattedData: User[] = data.map((item) => ({
              account: item[0].toString(), // 假设第一列是 account
              username: item[1].toString(), // 假设第二列是 username
              email: item[2].toString(),    // 假设第三列是 email
              phone: item[3].toString(),    // 假设第四列是 phone
              category_id:item[4].toString(), // 假设第五列式category_id
              is_teacher: item[5].toString(), // 假设第六列是 is_teacher
              authority: item[6].toString(), // 假设第七列是 authority
              cover:"",
              key:""
            }));
            // 把新增数据上传然后加入原数据，头像为默认
            console.log(formattedData)
            const res = await batchRegisterUserFromBackground(formattedData);
            if(res.code==200){
              message.success(SUCCESS)
            }
            else
            {
              message.error(ERROR)
            }
        } catch (error) {
          console.error(XLS_FILE_ERROR, error);
        }
      };

      // 这个方法不用，纯粹为了覆盖UI默认的上传逻辑
      function myUploadFunction(options: UploadProps): void {
        // 实现上传逻辑，例如：
        console.log('Upload options:', options);
        
    }

    // 用于决定是否需要显现用户专业的下拉框
    const [type, setType] = useState(null);

    const handleTypeChange = (value:React.SetStateAction<null>) => {
      setType(value);
      // 重置 dependent select 的值
      form.setFieldsValue({ major: undefined });
    };

    const getAllUser = async() =>{
      const res = await getUserDetailsStatistic();
      console.log(res.data);
      setListData(res.data)
    }

    useEffect (()=>{
      getAllUser();
    },[])

    return(
        <div style={{width:"97%"}} className='container-userInformation'>

            <div className='model'>
                <Modal
          title={ENTER_USER_INFORMATION}
          visible={modelVisible}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              {CANCEL}
            </Button>
          ]}
        >
        <div className='formData'>
  <Form
        form={form}
        name="uploadUserInfo"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label={ACCOUNT}
          name="account"
          rules={[{ required: true, message: ENTER_ACCOUNT }]}
        >
          <Input placeholder={ENTER_ACCOUNT}/>
        </Form.Item>

        <Form.Item
          label={USERNAME}
          name="username"
          rules={[{ required: true, message: ENTER_USERNAME }]}
        >
          <Input placeholder={ENTER_USERNAME} />
        </Form.Item>

        <Form.Item
          label={EMAIL}
          name="email"
          rules={[{ required: true, message: ENTER_EMAIL },{ validator: validateEmail }]}
        >
          <Input placeholder={ENTER_EMAIL}/>
        </Form.Item>

        <Form.Item
          label={PHONE}
          name= "phone"
          rules={[{ required: true, message: ENTER_PHONE },{ validator: validatePhone }]}
        >
         <Input placeholder={ENTER_PHONE}/>
        </Form.Item>

      <Form.Item
        label={TYPE}
        name="type"
        rules={[{ required: true, message: ENTER_TYPE }]}
      >
        <Select placeholder={ENTER_TYPE}  onChange={handleTypeChange}>
          <Option value="0">{STUDENT}</Option>
          <Option value="1">{TEACHER}</Option>
        </Select>
      </Form.Item>
      
      {type === '0' && (
        <Form.Item
          label={ENTER_MAJOR}
          name="major"
          rules={[{ required: true, message: ENTER_MAJOR }]}
        >
          <Select placeholder={ENTER_MAJOR}>
            <Option value="1">{CLINICAL_MEDICINE}</Option>
            <Option value="2">{PUBLIC_HEALTH}</Option>
            <Option value="3">{NURSING}</Option>
            <Option value="4">{MEDICAL_TECH}</Option>
            <Option value="5">{ULTRASOUND}</Option>
            <Option value="6">{ECG}</Option>
            <Option value="7">{DIAGNOSTIC_IMAGING}</Option>
          </Select>
        </Form.Item>
      )}

      <Form.Item
        label={AUTHORITY}
        name="authority"
        rules={[{ required: true, message: ENTER_AUTHORITY }]}
      >
        <Select placeholder={ENTER_AUTHORITY}>
          <Option value="0">{NO_AUTHORITY}</Option>
          <Option value="1">{EXAMINER}</Option>
        </Select>
      </Form.Item>

        <Form.Item>
          <Button className='modal-button' style={{ backgroundColor: 'bisque' }} htmlType="button" onClick={() => form.resetFields()}>
            {RESET}
          </Button>
          <Button  className='modal-button' type="primary" htmlType="submit" loading={confirmLoading}>
            {SUBMIT}
          </Button>
        </Form.Item>
      </Form>
        </div>
      
                </Modal>
            </div>
            <div className='operate'>
                <Button type = "primary" className="operate-button" onClick={handleImportUser}>{IMPORT_USER}</Button>
                <Upload
                  accept=".xls,.xlsx"
                  beforeUpload={beforeUpload}
                  fileList={fileList}
                  onChange={handleUpload}
                  customRequest = {myUploadFunction}
                >
                <Button  type = "primary" className="operate-button" icon={<UploadOutlined />}>{BATCH_IMPORT}</Button>
                </Upload>
            </div>
            <div className='user-table'>
                <Table columns={columns} dataSource={listData} pagination={{pageSize: 5}} />
            </div>
        </div>
    )
}

export default UserInformation
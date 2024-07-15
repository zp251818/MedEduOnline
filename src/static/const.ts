import { getLanguage } from "@/utils/language";

export const Analysis_Label = getLanguage() == "CN" ? "统计分析" : "Statistic Analysis";
export const Running_Information_Label = getLanguage() == "CN" ? "平台运行情况" : "Operation Status";
export const Process_Monitoring_Label = getLanguage() == "CN" ? "学员学习过程监控" : "Process Monitoring";
export const Achievement_Monitoring_Label = getLanguage() == "CN" ? "学员学习成果监控" : "Achievement Monitoring";
export const Course_Manage_Label = getLanguage() == "CN" ? "课程管理" : "Course Manage";
export const Course_Category_Label = getLanguage() == "CN" ? "课程类别管理" : "Course Category";
export const Course_Student_Label = getLanguage() == "CN" ? "课程学生管理" : "Course Student";
export const PlatForm_Label = getLanguage() == "CN" ? "平台管理" : "PlaForm Manage";
export const User_Information_Label = getLanguage() == "CN" ? "用户信息管理" : "User Information";
export const User_Permission_Label = getLanguage() == "CN" ? "用户权限管理" : "User Permission";
export const Question_Resources_Label = getLanguage() == "CN" ? "题库资源管理" : "Question Resources";
export const Question_Manage_Label = getLanguage() == "CN" ? "题库精细管理" : "Question Manage";
export const Question_Statistic_Label = getLanguage() == "CN" ? "题库统计管理" : "Question Statistic";

export const SINGLE = getLanguage() === "CN" ? "单选题" : "Single Choice";
export const MULTIPLE = getLanguage() === "CN" ? "多选题" : "Multiple Choice";
export const JUDGE = getLanguage() === "CN" ? "判断题" : "Judge";
export const FILL = getLanguage() === "CN" ? "填空题" : "Fill-In";
export const ESSAY = getLanguage() === "CN" ? "问答题" : "Essay";

export const QUESTION_TYPES = [
  { id: "1", name: SINGLE },
  { id: "2", name: MULTIPLE },
  { id: "3", name: JUDGE },
  { id: "4", name: FILL },
  { id: "5", name: ESSAY }
];

export const CLINICAL_MEDICINE = getLanguage() === "CN" ? "临床医学" : "Clinical Medicine";
export const PUBLIC_HEALTH = getLanguage() === "CN" ? "公共卫生" : "Public Health";
export const NURSING = getLanguage() === "CN" ? "护理" : "Nursing";
export const MEDICAL_TECH = getLanguage() === "CN" ? "医技" : "Medical Technology";
export const ULTRASOUND = getLanguage() === "CN" ? "B超" : "Ultrasound";
export const ECG = getLanguage() === "CN" ? "心电" : "ECG";
export const DIAGNOSTIC_IMAGING = getLanguage() === "CN" ? "影像" : "Diagnostic Imaging";

export const MEDICAL_SPECIALTIES = [
    { id: "1", name: CLINICAL_MEDICINE },
    { id: "2", name: PUBLIC_HEALTH },
    { id: "3", name: NURSING },
    { id: "4", name: MEDICAL_TECH },
    { id: "5", name: ULTRASOUND },
    { id: "6", name: ECG },
    { id: "7", name: DIAGNOSTIC_IMAGING }
  ];

export const BACHELOR = getLanguage() === "CN" ? "学士" : "Bachelor";
export const MASTER = getLanguage() === "CN" ? "硕士" : "Master";
export const DOCTOR = getLanguage() === "CN" ? "博士" : "Doctor";
export const PROFESSIONAL = getLanguage() === "CN" ? "专业硕士" : "Professional";

export const QUALIFICATION = [
  { id: "1", name: PROFESSIONAL },
  { id: "2", name: BACHELOR },
  { id: "3", name: MASTER},
  { id: "4", name: DOCTOR },
]

export const COMPULSORY = getLanguage() === "CN" ? "必修课" : "Compulsory";
export const ELECTIVE = getLanguage() === "CN" ? "选修课" : "Elective";

export const COURSE_TYPES = [
    { id: "0", name: COMPULSORY},
    { id: "1", name: ELECTIVE }
  ];

export const STUDENT = getLanguage() === "CN" ? "学生" : "Student";
export const TEACHER = getLanguage() === "CN" ? "教师" : "Teacher";

export const USERNAME = getLanguage() === "CN" ? "用户名" : "Username";
export const ENTER_USERNAME =getLanguage() === "CN" ? "请输入用户名" : "Please Enter Uername";
export const ACCOUNT = getLanguage() === "CN" ? "账号" : "Account";
export const ENTER_ACCOUNT =getLanguage() === "CN" ? "请输入账号" : "Please Enter Account";
export const PROCESS_LINE = getLanguage() === "CN" ? "必修学业进度条" : "Study ProcessLine";
export const PROCESS_ROUND = getLanguage() === "CN" ? "必修学业进度圆" : "Study ProcessRound";
export const COURSE_PROCESS = getLanguage() === "CN" ? "课程学业进度" : "Study Process";

export const COVER = getLanguage() === "CN" ? "头像" : "Cover";
export const EMAIL = getLanguage() === "CN" ? "邮箱" : "Email";
export const ENTER_EMAIL =getLanguage() === "CN" ? "请输入邮箱" : "Please Enter Email";
export const ERROR_EMAIL = getLanguage() === "CN" ? "请输入正确格式的邮箱" : "Please Enter Valid Email";
export const PHONE = getLanguage() === "CN" ? "手机号" : "Phone";
export const ENTER_PHONE = getLanguage() === "CN" ? "请输入手机号" : "Please Enter Phone";
export const ERROR_PHONE = getLanguage() === "CN" ? "请输入正确格式的手机号" : "Please Enter Valid Phone";
export const OPERATE = getLanguage() === "CN" ? "操作" : "Operate" ;
export const TYPE = getLanguage() === "CN" ? "类别" : "Type" ;
export const ENTER_TYPE = getLanguage() === "CN" ? "请选择类别" : "Please Enter Type";
export const ENTER_MAJOR =getLanguage() === "CN" ? "请选择专业" : "Please Enter Major";

export const AUTHORITY =  getLanguage() === "CN" ? "权限" : "Authority" ;
export const ENTER_AUTHORITY =getLanguage() === "CN" ? "请选择权限" : "Please Enter Authority";
export const IMPORT_USER = getLanguage() === "CN" ? "导入用户" : "Import User" ;
export const BATCH_IMPORT = getLanguage() === "CN" ? "批量导入" : "Batch Import" ;

export const DELETE = getLanguage() === "CN" ? "删除" : "Delete" ;
export const CONFIRM_DELETE = getLanguage() === "CN" ? "确认删除" : "Comfirm Delete" ;

export const ENTER_USER_INFORMATION = getLanguage() === "CN" ? "请输入用户信息" : "Enter USER Information" ;
export const CANCEL = getLanguage() === "CN" ? "取消" : "Cancel" ;
export const RESET = getLanguage() === "CN" ? "重置" : "Reset" ;
export const SUBMIT = getLanguage() === "CN" ? "提交" : "Submit" ;

export const BACK = getLanguage() === "CN" ? "返回" : "Back" ;
export const NO_AUTHORITY = getLanguage() === "CN" ? "无权限" : "NO Authority" ;
export const EXAMINER = getLanguage() === "CN" ? "出卷人" : "Examiner" ;
export const ERROR = getLanguage() === "CN" ? "出错了！" : "Error" ;
export const FILL_ALL = getLanguage() === "CN" ? "请填写所有内容" : "Please fill in all the contents" ;

export const XLS_FILE_ERROR = getLanguage() === "CN" ? "文件类型错误！" : "XML_FILE_ERROR!" ;

export const LESSON_COVER = getLanguage() === "CN" ? "课程封面" : "Lesson Cover" ;
export const LESSON_NAME =getLanguage() === "CN" ? "课程名" : "Lesson Name" ;
export const LESSON_TYPE = getLanguage() === "CN" ? "课程类型" : "Lesson Type" ;
export const LESSON_CATEGORY = getLanguage() === "CN" ? "课程种别" : "Lesson Category" ;
export const START_TIME = getLanguage() === "CN" ? "开课时间" : "Start Time" ;
export const END_TIME = getLanguage() === "CN" ? "结课时间" : "End Time" ;

export const COLOR_TAG = [
  { color: "red", name: "1" },
  { color: "volcano", name: "2" },
  { color: "orange", name: "3" },
  { color: "gold", name: "4" },
  { color: "green", name: "5" },
  { color: "cyan", name: "6" },
  { color: "lime", name: "7" },
  { color: "blue", name: "8" },
  { color: "geeblue", name: "9" },
  { color: "purple", name: "10" }
];

export const COURSE_STUDENT_MANAGE = getLanguage() === "CN" ? ": 课程学生学习情况与管理表" : ": Student Learning Situation and Management" ;
export const CONFIRM_DELETE_STUDENT = getLanguage() === "CN" ? "确认删除这些学生吗？" : "Comfirm Delete these student？" ;
export const SUCCESS =  getLanguage() === "CN" ? "成功！" : "SUCCESS!" ;

export const QUESTION_BANK = getLanguage() === "CN" ? "试题题库" : "Question Bank" ;
export const CONFIRM_DELETE_QUESTION = getLanguage() === "CN" ? "确认删除这些试题吗？" : "Comfirm Delete these question？"
export const EXAM_QUESTION_ID = getLanguage() === "CN" ? "试题序号" : "Exam Question ID" ;
export const QUESTION_CONTENT_PART = getLanguage() === "CN" ? "试题部分内容" : "Question Content Part" ;
export const EXAM_QUESTION_TYPE = getLanguage() === "CN" ? "试题类型" : "Exam Question Type" ;
export const MAJOR = getLanguage() === "CN" ? "专业" : "Major" ;

export const COVER_DEMO = "https://img1.baidu.com/it/u=534429813,2995452219&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800";
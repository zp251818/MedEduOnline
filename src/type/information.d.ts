declare type Admin = {
    adminId:string,
    account:string,
    password:string,
};
// 本文件内所有的key都对应的是数据库的主键

// 平台管理里面的用户管理专用
declare type User = {
    key:string,
    cover:string,
    account:string,
    username:string,
    email:string,
    phone:string,
    category_id:string,
    is_teacher:string,
    authority:string
}

// 资源管理里面的左侧list专用
declare type lesson_base_information = {
    key:string,
    lesson_name:string,
    lesson_cover:string
}

// 基本的用户信息，课程内查学生信息专用
declare type user_base_information = {
    key:string,
    cover:string,
    account:string,
    username:string,
    status:chapter_status[]
}

type chapter_status = {
    chapter_id:string,
    status:number
}

// 课程章节信息
declare type chapter = {
    chapterId:string
    chapterOrder:number,
    chapterTitle:string,
    lessonId:string
}

// 题库专用
declare type question_bank = {
    qbId:string,
    qbTitle:string,
    createTime:Date,
    lessonId:string
}

declare type exam_question = {
    key:string,
    eq_type_id:string,
    node_content:string
}

interface UserStatistic {
    studentNumber: number;
    teacherNumber: number;
    studentType: { [key: string]: number }; // 表示键为字符串，值为数字的对象
    teacherType: { [key: string]: number }; // 同上
}

interface LessonStatistic{
    compulsory:number;
    elective:number,
    compulsoryType:{ [key: string]: number };
    electiveType:{ [key: string]: number };
}

declare type chapterStatistic = {
    chapter:chapter,
    count:number
}

declare interface AllProcess {
    key:string;
    cover:string;
    account:string;
    username:string;
    processLine:number;
    processRound:number;
}

declare interface lesson_information {
    key: string;
    lessonCover: string;
    lessonName: string;
    lessonType: number; 
    startTime: Date;
    endTime: Date;
    categoryList: string[];
}

declare interface lessonSituation {
    studentProcessDTOList:user_base_information[],
    chaptersList:chapter[]
}
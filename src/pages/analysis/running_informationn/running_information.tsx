
import { bar_DrilldownData, bar_SeriesData, doughnut_type } from '@/type/statistic';
import PieChartComponent from '../statisticComponents/doughnut/doughnut';
import './running_information.scss'
import { getLanguage } from '@/utils/language';
import BarChartComponent from '../statisticComponents/bar/Bar';
import { useEffect, useState } from 'react';
import SimpleBarComponent from '../statisticComponents/simpleBar/simpleBar';
import { COMPULSORY, ELECTIVE, ESSAY, FILL, JUDGE, MEDICAL_SPECIALTIES, MULTIPLE, QUALIFICATION, QUESTION_TYPES, SINGLE, STUDENT, TEACHER } from '@/static/const';
import { getUserStatistic } from '@/apis/queryfn/user';
import { getLessonStatistic } from '@/apis/queryfn/study';
import { getExamQuestionsStatistic } from '@/apis/queryfn/examQuestion';

const RunningInformation = () =>{

    const User_Label = getLanguage()=="CN"?"用户成员统计":"User Member Statistics";
    const Course_Label = getLanguage()=="CN"?"课程信息统计":"Course Information Statistics";
    const Question_Label = getLanguage()=="CN"?"题库信息统计":"Question Bank Statistics";

    // 饼图的值和对应的名称，需要建立state

    const [UserPieChartData,setUserPieChartData] = useState<doughnut_type[]>()

    const [CoursePieChartData,setCoursePieChartData] = useState<doughnut_type[]>()

    const [QuestionPieChartData,setQuestionPieChartData] = useState<doughnut_type[]>()

    // 柱状图的第一个横坐标
    const User_xAxisData = [STUDENT,TEACHER];

    const Course_xAxisData = [COMPULSORY,ELECTIVE];

    // 对应横坐标的总值大小，需要建立state
    const [UserSeriesData,setUserSeriesData] = useState<bar_SeriesData[]>()

    const [CourseSeriesData,setCourseSeriesData] = useState<bar_SeriesData[]>()
  
    // 细分每一个横坐标为具体细节
    const [UserDrilldownData,setUserDrilldownData] = useState<bar_DrilldownData[]>()

    const [CourseDrilldownData,setCourseDrilldownData] = useState<bar_DrilldownData[]> ()

   // 最后一个柱状图只需要分题型，因为不对应科目，并且tag数量过大不方便展示
   const simpleXAxisData = [ SINGLE,MULTIPLE,JUDGE,FILL,ESSAY];
   const [simpleSeriesData,setSimpleSeriesData] = useState<number[]>()

   // 重载第一列数据
   const getUserStatisticFunction = async () =>{
    const res = await getUserStatistic();
    setUserPieChartData([
        { value: res.data.studentNumber, name: STUDENT },
        { value: res.data.teacherNumber, name: TEACHER }
    ]);
    setUserSeriesData([
        { value: res.data.studentNumber, groupId: STUDENT },
        { value: res.data.teacherNumber, groupId: TEACHER}
    ])
    setUserDrilldownData([
        {
            dataGroupId: STUDENT, 
            data: MEDICAL_SPECIALTIES.map(spec => [spec.name, res.data.studentType[spec.id] || 0])
        },
        {
            dataGroupId: TEACHER, 
            data: QUALIFICATION.map(qual => [qual.name, res.data.teacherType[qual.id] || 0])
        }
    ])
   }
   // 重载第二列数据
   const getLessonStatisticFunction = async () =>{
      const res = await getLessonStatistic();
      setCoursePieChartData([
        {value:res.data.compulsory,name:COMPULSORY},
        {value:res.data.elective,name:ELECTIVE}
      ])
      setCourseSeriesData([
        { value: res.data.compulsory, groupId: COMPULSORY },
        { value: res.data.elective, groupId: ELECTIVE}
      ])
      setCourseDrilldownData([
        {
            dataGroupId: COMPULSORY,
            data:MEDICAL_SPECIALTIES.map(spec => [spec.name, res.data.compulsoryType[spec.id] || 0])
          },
          {
            dataGroupId: ELECTIVE,
            data:MEDICAL_SPECIALTIES.map(spec => [spec.name, res.data.electiveType[spec.id] || 0])
          }
      ])
   }

   // 重载第三列数据
   const getExamQuestionsStatisticFunction = async ()=>{
    const res =  await getExamQuestionsStatistic();
    setQuestionPieChartData(QUESTION_TYPES.map(type => ({
        name: type.name,
        value: res.data[type.id] || 0 
    })))
    setSimpleSeriesData(QUESTION_TYPES.map(type => {
        const value = res.data[type.id] || 0; 
        return value;
    }))
   }

   // 刷新时更新数据
   useEffect (()=>{
    getUserStatisticFunction();
    getLessonStatisticFunction();
    getExamQuestionsStatisticFunction();
   },[])

    return(
        <div className='container'>
            <div className='column'>
                <div className='samll-title' style={{textAlign:"center" , marginTop:"5px" , marginBottom:"5px", fontSize:"20px"}}>{User_Label}</div>
                <div className='sub-container' id='userDoughnut' >
                    <PieChartComponent name={User_Label} data={UserPieChartData?UserPieChartData:[]}></PieChartComponent>
                </div>
                <div className='sub-container' id='userBar' >
                <BarChartComponent xAxisData={User_xAxisData} seriesData={UserSeriesData?UserSeriesData:[]} drilldownData={UserDrilldownData?UserDrilldownData:[]} />
                </div>
            </div>
            <div className='column'>
                <div className='samll-title' style={{textAlign:"center" , marginTop:"5px" , marginBottom:"5px", fontSize:"20px"}}>{Course_Label}</div>
                <div className='sub-container' id='courseDoughnut' >
                    <PieChartComponent name={Course_Label} data={CoursePieChartData?CoursePieChartData:[]}></PieChartComponent>
                </div>
                <div className='sub-container' id='courseBar'>
                <BarChartComponent xAxisData={Course_xAxisData} seriesData={CourseSeriesData?CourseSeriesData:[]} drilldownData={CourseDrilldownData?CourseDrilldownData:[]} />
                </div>
            </div>
            <div className='column'>
                <div className='samll-title' style={{textAlign:"center" , marginTop:"5px" , marginBottom:"5px", fontSize:"20px"}} >{Question_Label}</div>
                <div className='sub-container' id='questionDoughnut' >
                    <PieChartComponent name={Question_Label} data={QuestionPieChartData?QuestionPieChartData:[]}></PieChartComponent>
                </div>
                <div className='sub-container' id='questionBar' >
                   <SimpleBarComponent xAxisData={simpleXAxisData} seriesData={simpleSeriesData?simpleSeriesData:[]} />
                </div>
            </div>
        </div>
    )
}

export default RunningInformation
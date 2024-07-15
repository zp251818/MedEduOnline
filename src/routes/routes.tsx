import { createBrowserRouter } from "react-router-dom";
import Main from "@/pages/main/main";
import Content from "@/pages/content/content";
import ProcessMonitoring from "@/pages/analysis/process_monitoring/process_monitoring";
import RunningInformation from "@/pages/analysis/running_informationn/running_information";
import AchievementMonitoring from "@/pages/analysis/achievement_monitoring/achievement_monitoring";
import CourseCategory from "@/pages/course_manage/course_category/course_category";
import CourseStudent from "@/pages/course_manage/course_student/course_student";
import UserInformation from "@/pages/platform/user_information/user_information";
import QuestionStatistics from "@/pages/question/question_statistics/question_statistic";
import Login from "@/pages/login/login";
const router = createBrowserRouter([
  {
    path:"/",
    element:<Login></Login>
  },
  {
    path:"/login",
    element:<Login></Login>
  },
  {
    path: "/main",
    element: <Main />,
    children:[
      {
        path:"",
        element:<Content></Content>
      },
      {
        path:'content',
        element:<Content></Content>,
        children:[
          {
            path:"",
            element:<RunningInformation></RunningInformation>
          },
          {
            index: true,
            path:"running_information",
            element:<RunningInformation></RunningInformation>
          },
          {
            path:"process_monitoring",
            element:<ProcessMonitoring></ProcessMonitoring>
          },
          {
            path:"achievement_monitoring",
            element:<AchievementMonitoring></AchievementMonitoring>
          },
          {
            path:"course_category",
            element:<CourseCategory></CourseCategory>
          },
          {
            path:"course_student",
            element:<CourseStudent></CourseStudent>
          },
          {
            path:"user_information",
            element:<UserInformation></UserInformation>
          },
          {
            path:"question_statistics",
            element:<QuestionStatistics></QuestionStatistics>
          }
        ]
      }
    ]
  }
]);
export default router;

import { API_URLS } from "@/apis/url/apiUrl";
import { http } from '@/utils'

export function getLessonStatistic():Promise<Result<LessonStatistic>>{
    return http.request({
        url: `${API_URLS.study}/lesson/statistic`,
        method:"GET"
    })
}

export function getAllLessonSimpleInfo():Promise<Result<lesson_base_information[]>>{
    return http.request({
        url: `${API_URLS.study}/lesson/simpleInfo`,
        method:"GET"
    })
}

export function getChaptersByLessonId(id:string):Promise<Result<chapterStatistic[]>>{
    return http.request({
        url: `${API_URLS.study}/lesson/${id}/chapterStatistic`,
        method:"GET"
    })
}

export function getAllUserCompulsoryLessonProcess():Promise<Result<AllProcess[]>>{
    return http.request({
        url: `${API_URLS.study}/users/lesson/CompulsoryProcess`,
        method:"GET"
    })
}

export function getLessonCategoryInfo():Promise<Result<lesson_information[]>>{
    return http.request({
        url: `${API_URLS.study}/lesson/statistic/details`,
        method:"GET"
    })
}

export function updateLessonTypeByLessonId(id:string,lessonType:string):Promise<Result<String>>{
    return http.request({
        url: `${API_URLS.study}/lesson/${id}/${lessonType}`,
        method:"PUT"
    })
}

export function getLessonStudentSituations(id:string):Promise<Result<lessonSituation>>{
    return http.request({
        url: `${API_URLS.study}/lesson/${id}/processes`,
        method:"GET"
    })
}

export function deleteLessonStudents(id:string,userIds:string[]):Promise<Result<String>>{
    return http.request({
        url: `${API_URLS.study}/lesson/${id}/students`,
        method:"DELETE",
        data:userIds
    })
}



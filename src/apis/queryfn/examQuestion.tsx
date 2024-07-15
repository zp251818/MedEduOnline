import { API_URLS } from "@/apis/url/apiUrl";
import { http } from '@/utils'


export function getExamQuestionsByQuestionBankId(qbId:string):Promise<Result<exam_question[]>>{
    return http.request({
        url: `${API_URLS.examQuestion}/questionBank/${qbId}/simpleInfo`,
        method:"GET"
    })
}

export function deleteBatchExamQuestions(qbId:string,eqIds:string[]){
    return http.request({
        url: `${API_URLS.examQuestion}/questionBank/${qbId}`,
        method:"DELETE",
        data:eqIds
    })
}

export function getExamQuestionsStatistic():Promise<Result<{ [key: string]: number }>>{
    return http.request({
        url: `${API_URLS.examQuestion}/statistic`,
        method:"GET"
    })
}
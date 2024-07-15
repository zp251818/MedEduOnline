import { API_URLS } from "@/apis/url/apiUrl";
import { http } from '@/utils'

export function getAllQuestionBanks():Promise<question_bank[]>{
    return http.request({
        url: `${API_URLS.questionBank}/all`,
        method:"GET"
    })
}


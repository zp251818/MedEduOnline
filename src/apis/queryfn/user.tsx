import { API_URLS } from "@/apis/url/apiUrl";
import { http } from '@/utils'

export function getUserDetailsStatistic():Promise<Result<User[]>>{
    return http.request({
        url: `${API_URLS.users}/statistic/details`,
        method:"GET"
    })
}

export function batchRegisterUserFromBackground(data:User[]):Promise<Result<String>>{
    return http.request({
        url: `${API_URLS.users}/batchRegister`,
        method:"PUT",
        data:data
    })
}

export function getUserStatistic():Promise<Result<UserStatistic>>{
    return http.request({
        url: `${API_URLS.users}/statistic`,
        method:"GET"
    })
}
import { API_URLS } from "@/apis/url/apiUrl";
import { http } from '@/utils'

interface LoginResponse {
    token: string;
}

export function  loginByAccountAdmin(data:Admin):Promise<Result<LoginResponse>>{
    return http.request({
        url: `${API_URLS.admin}/login/account`,
        method:"POST",
        data:data
    })
}

export function registerByAdmin(data:Admin):Promise<Result<string>>{
    return http.request({
        url: `${API_URLS.admin}/register`,
        method:"POST",
        data:data
    })
}
import { http } from "@/utils";
import { API_URLS } from "../url/apiUrl";

export function deleteUserAuthority(userId:string):Promise<Result<String>>{
    return http.request({
        url: `${API_URLS.userLinkCategory}/${userId}/authority`,
        method:"DELETE"
    })
}

export function putUserAuthority(userId:string):Promise<Result<String>>{
    return http.request({
        url: `${API_URLS.userLinkCategory}/${userId}/authority`,
        method:"PUT"
    })
}
export function loadAdminInfoFromLocalStorage(){
    const storedAdminInfo = localStorage.getItem("token");
    return storedAdminInfo ? JSON.parse(storedAdminInfo) : "";
  };
  
export function saveAdminInfoToLocalStorage (adminInfo:any){
    localStorage.setItem("token", JSON.stringify(adminInfo));
};

export function removeAdminInfoFromLocalStorage() {
    localStorage.removeItem("token");
}
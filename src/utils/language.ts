// 获取语言值的方法，从 localStorage 中读取，如果没有则默认为 "EN"
export function getLanguage(): string {
    return localStorage.getItem('language') || "CN";
}

// 切换语言的方法，根据当前存储的语言值进行切换，并更新 localStorage 中的值
export function switchLanguage(): void {
    const currentLanguage = localStorage.getItem('language') || "EN";
    const newLanguage = currentLanguage === "EN" ? "CN" : "EN";
    localStorage.setItem('language', newLanguage);
}
import Cookies from 'js-cookie'

const TokenKey = 'token'
const UserIdKey = 'userId'
const restParamsKey = 'restParams'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}


export function getUserId() {
    return Cookies.get(UserIdKey)
}

export function setUserId(userId) {
    return Cookies.set(UserIdKey, userId)
}


// 将其他所有参数一起存入一个对象
export function restParams(params={}) {
    return Cookies.set(restParamsKey,JSON.stringify(params))
}

// 取出所有参数中某一个对象：根据键名取出参数值：console.log(keyCookieVal('键名'))
export function keyCookieVal(key) {
    let params=Cookies.get(restParamsKey)||"{}";
    if(!key) return '';
    params=JSON.parse(params);
    return params[key]||''
}
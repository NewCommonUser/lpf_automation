/**
 * 包含应用中所有『接口请求函数』的模块（由于包含许多函数，所以本模块定义为一个对象）
 */
import ajax from './ajax';

// export function reqLogin(username,password){
//     return ajax("login",{username,password},'POST');
// }

const BASE = '';
export const reqLogin = (username, password) => ajax(BASE + "user/login", {username, password}, 'POST');


/**
 * 获取一级/二级类型的列表
 */
export const reqGetTaskTypeList=(parentId)=>{
    ajax(BASE + "/OmnifocusHandle/getTaskTypeListByParentId", {parentId}, 'GET');
}

/**
 * 添加类型
 */
export const reqAddTaskTypes=(typeName,parentId)=>{
    ajax(BASE + "/OmnifocusHandle/taskType/add", {typeName,parentId}, 'POST');
}
/**
 * 更新类型
 */
export const reqUpdateTaskTypes=(typeName,parentId)=>{
    ajax(BASE + "/OmnifocusHandle/taskType/update", {typeName,parentId}, 'POST');
}
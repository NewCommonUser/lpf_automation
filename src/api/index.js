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
 * 获取任务的一级/二级类型的列表
 */
export const reqGetTaskTypeList=(parentId)=>{
    return ajax(BASE + "/OmnifocusHandle/getTaskTypeListByParentId", {parentId}, 'GET');
}

/**
 * 添加任务类型
 */
export const reqAddTaskTypes=(typeName,parentId)=>{
    ajax(BASE + "/OmnifocusHandle/taskType/add", {typeName,parentId}, 'POST');
}
/**
 * 更新任务类型
 */
export const reqUpdateTaskTypes=(typeName,parentId)=>{
    ajax(BASE + "/OmnifocusHandle/taskType/update", {typeName,parentId}, 'POST');
}


Date.prototype.Format = function(fmt) {
    var o = {
        "M+" : this.getMonth() + 1, // 月份
        "d+" : this.getDate(), // 日
        "h+" : this.getHours(), // 小时
        "m+" : this.getMinutes(), // 分
        "s+" : this.getSeconds(), // 秒
        "q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
        "S" : this.getMilliseconds()
// 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for ( var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

};

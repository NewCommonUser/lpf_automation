import ajax from './ajax';

const BASE = '';

/**
 * 获取每种类型的时间
 */
export const findTimeGroupByType=()=>{
    return ajax(BASE + "/OmnifocusHandle/findTimeGroupByType", {}, 'GET');
}


/**
 * 获取每种类型的时间
 */
export const findTotalTime=()=>{
    return ajax(BASE + "/OmnifocusHandle/findTotalTime", {}, 'GET');
}




/**
 * 获取每个项目的时间
 * @returns {*}
 */
export const findTimeGroupByProject=()=>{
    return ajax(BASE + "/OmnifocusHandle/findTimeGroupByProject", {}, 'GET');
}





export const findTaskTimeEveryDay=()=>{
    return ajax(BASE + "/OmnifocusHandle/findTaskTimeEveryDay", {}, 'GET');
}


export const findTaskTimeEveryMonth=()=>{
    return ajax(BASE + "/OmnifocusHandle/findTaskTimeEveryMonth", {}, 'GET');
}






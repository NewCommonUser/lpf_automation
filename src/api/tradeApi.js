import ajax from './ajax';

const BASE = '';


export const findAllSelfStock=()=>{
    return ajax(BASE + "/tradingsystem/findAllSelfStock", {}, 'GET');
}

export const positionBuilding=(stockId,stockName,strategyType,price)=>{
    return ajax(BASE + "/tradingsystem/positionBuilding/"+stockId+"/"+stockName+"/"+strategyType+"/"+price, {}, 'GET');
}


/**
 * 建仓检查历史数据准备
 * @param stockId
 * @returns {*}
 */
export const positionBuildCheck_historyDataPrepare=(stockId)=>{
    return ajax(BASE + "/tradingsystem/positionBuildCheck_historyDataPrepare/"+stockId, {}, 'GET');
}

/**
 * 获取所有的持有证券
 * @returns {*}
 */
export const getAllHoldStock=()=>{
    return ajax(BASE + "/tradingsystem/getAllHoldStock", {}, 'GET');
}

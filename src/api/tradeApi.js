import ajax from './ajax';

const BASE = '';


export const findAllSelfStock=()=>{
    return ajax(BASE + "/tradingsystem/findAllSelfStock", {}, 'GET');
}


/**
 * 持仓股检查分析
 * @returns {*}
 */
export const holdingStockCheck=()=>{
    return ajax(BASE + "/tradingsystem/holdingStock/check", {}, 'GET');
}
export const etf5Day=()=>{
    return ajax(BASE + "/tradingsystem/etf5Day/check", {}, 'GET');
}

/**
 * 找到某只股票的所有交易日志
 * @param stockId
 * @returns {*}
 */
export const findTradeLogByStockId=(stockId)=>{
    return ajax(BASE + "/tradingsystem/findTradeLogByStockId/"+stockId, {}, 'GET');
}


/**
 * 建仓
 * @param stockId
 * @param stockName
 * @param strategyType
 * @param price
 * @returns {*}
 */
export const positionBuilding=(stockId,stockName,strategyType,price)=>{
    return ajax(BASE + "/tradingsystem/positionBuilding/"+stockId+"/"+stockName+"/"+strategyType+"/"+price, {}, 'GET');
}
/**
 * 加仓
 * @param stockId
 * @param stockName
 * @param strategyType
 * @param price
 * @returns {*}
 */
export const addPosition=(stockId,stockName,strategyType,price)=>{
    return ajax(BASE + "/tradingsystem/addPosition/"+stockId+"/"+stockName+"/"+strategyType+"/"+price, {}, 'GET');
}

/**
 * 证券做T
 * @param stockId
 * @param stockName
 * @param addSubtractType
 * @param tradeNum
 * @param price
 * @returns {*}
 */
export const tStock=(stockId,stockName,addSubtractType,tradeNum,price)=>{
    return ajax(BASE + "/tradingsystem/tStock/"+stockId+"/"+stockName+"/"+addSubtractType+"/"+tradeNum+"/"+price, {}, 'GET');
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

import ajax from './ajax';

const BASE = '';


/**
 * 获取所有的文章
 * @returns {*}
 */
export const findAllArticle=()=>{
    return ajax(BASE + "/article/findAllArticle", {}, 'GET');
}

/**
 * 保存文章
 * @returns {*}
 */
export const saveArticle=(articleObj)=>{
    return ajax(BASE + "/article/saveArticle", articleObj, 'POST');
}

/**
 * 获取每种类型的时间
 */
export const priceMonitor=()=>{
    return ajax(BASE + "/eastmoneyMonitorPrice/priceMonitor", {}, 'GET');
}

/**
 * 获取所有的自选股
 * @returns {*}
 */
export const findAllSelfStock=()=>{
    return ajax(BASE + "/tradingsystem/findAllSelfStock", {}, 'GET');
}

/**
 * 站上五月均线的自选股
 * @returns {*}
 */
export const selfStock5MonthCheck=()=>{
    return ajax(BASE + "/quotationAnalysis/selfStock5MonthCheck", {}, 'GET');
}

/**
 * 站上五周均线的自选股
 * @returns {*}
 */
export const selfStock5WeekCheck=()=>{
    return ajax(BASE + "/quotationAnalysis/selfStock5WeekCheck", {}, 'GET');
}


/**
 * 找到某只股票的200天k线
 * @param stockId
 * @returns {*}
 */
export const getKlineByStockId_200day=(stockId)=>{
    return ajax(BASE + "/quotationAnalysis/getKlineByStockId_200day/"+stockId, {}, 'GET');
}


/**
 * 获取宽基指数，最近200天的日线数据
 * @returns {*}
 */
export const getWideBaseIndex_200day=()=>{
    return ajax(BASE + "/quotationAnalysis/getWideBaseIndex_200day", {}, 'GET');
}


/**
 * 获取行业分析（消费），最近200天的日线数据
 * @returns {*}
 */
export const getIndustry_consumption=()=>{
    return ajax(BASE + "/quotationAnalysis/getIndustry_consumption", {}, 'GET');
}

/**
 * 获取行业分析（医药医疗），最近200天的日线数据
 * @returns {*}
 */
export const getIndustry_yiyaoyiliao=()=>{
    return ajax(BASE + "/quotationAnalysis/getIndustry_yiyaoyiliao", {}, 'GET');
}


/**
 * 获取行业分析（文化消费），最近200天的日线数据
 * @returns {*}
 */
export const getIndustry_wenhua_consumption=()=>{
    return ajax(BASE + "/quotationAnalysis/getIndustry_wenhua_consumption", {}, 'GET');
}

/**
 * 获取行业分析（周期），最近200天的日线数据
 * @returns {*}
 */
export const getIndustry_cycle=()=>{
    return ajax(BASE + "/quotationAnalysis/getIndustry_cycle", {}, 'GET');
}


/**
 * 获取行业分析（金融地产），最近200天的日线数据
 * @returns {*}
 */
export const getIndustry_jinrongdichan=()=>{
    return ajax(BASE + "/quotationAnalysis/getIndustry_jinrongdichan", {}, 'GET');
}

/**
 * 获取行业分析（资源），最近200天的日线数据
 * @returns {*}
 */
export const getIndustry_ziyuan=()=>{
    return ajax(BASE + "/quotationAnalysis/getIndustry_ziyuan", {}, 'GET');
}



/**
 * 获取宽基指数，最近200周的日线数据
 * @returns {*}
 */
export const getWideBaseIndex_200week=()=>{
    return ajax(BASE + "/quotationAnalysis/getWideBaseIndex_200week", {}, 'GET');
}

/**
 * 获取窄基指数，最近200天的日线数据
 * @returns {*}
 */
export const getNarrowBaseIndex_200day=()=>{
    return ajax(BASE + "/quotationAnalysis/getNarrowBaseIndex_200day", {}, 'GET');
}


/**
 * 清空接口selfStock5MonthCheck缓存
 * @returns {*}
 */
export const del_api_selfStock5MonthCheck_cache=()=>{
    return ajax(BASE + "/quotationAnalysis/del/api_selfStock5MonthCheck_cache", {}, 'GET');
}
/**
 * 清空接口selfStock5MonthCheck缓存
 * @returns {*}
 */
export const del_api_selfStock5WeekCheck_cache=()=>{
    return ajax(BASE + "/quotationAnalysis/del/api_selfStock5WeekCheck_cache", {}, 'GET');
}

export const etf5Day=()=>{
    return ajax(BASE + "/quotationAnalysis/etf5Day/check", {}, 'GET');
}

/**
 * 持仓股检查分析
 * @returns {*}
 */
export const holdingStockCheck=()=>{
    return ajax(BASE + "/tradingsystem/holdingStock/check", {}, 'GET');
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
 * 标记机会
 * @param stockId
 * @returns {*}
 */
export const signStock=(stockId)=>{
    return ajax(BASE + "/tradingsystem/signStock/"+stockId, {}, 'GET');
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
    return ajax(BASE + "/historyData/positionBuildCheck_historyDataPrepare/"+stockId, {}, 'GET');
}

/**
 * 指定某只股票——进行历史数据持久化
 * @param stockId
 * @returns {*}
 */
export const appointStock_k_line_dataPersist=(stockId,monthNum,dayNum)=>{
    return ajax(BASE + "/historyData/appointStock_k_line_dataPersist/"+stockId+"/"+monthNum+"/"+dayNum, {}, 'GET');
}

/**
 * 获取所有的持有证券
 * @returns {*}
 */
export const getAllHoldStock=()=>{
    return ajax(BASE + "/tradingsystem/getAllHoldStock", {}, 'GET');
}

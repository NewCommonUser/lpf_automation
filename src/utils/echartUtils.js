/**
 * 视频教程：https://www.bilibili.com/video/BV1Mb411s7Gc?p=4
 * 代码来源：https://github.com/blackboy1987/react-echarts
 * @param title
 * @param dataSource 原始数据（数据源）
 * @param legendDataKeyOfDataSource 原始数据（数据源）——的解释数据的key（legendData：解释数据）
 * @param seriesDataKeyOfDataSource 原始数据（数据源）——的连续数据的key（seriesData：连续数据）
 * @param xAxisKeyOfSeriesData 连续数据（seriesData：连续数据）的x轴的key
 * @param yValueKeyOfSeriesData 连续数据（seriesData：连续数据）的y轴的key
 * @param chartsType
 * @returns {{yAxis: {type: string}, xAxis: {data, type: string}, legend: {data}, series, tooltip: {trigger: string}, toolbox: {feature: {saveAsImage: {show: boolean}, restore: {show: boolean}, magicType: {show: boolean, type: string[]}, dataView: {show: boolean, readOnly: boolean}}, show: boolean}, title: {text}}}
 */

export function generateChartConfig(title,dataSource,legendDataKeyOfDataSource
                                    ,seriesDataKeyOfDataSource,xAxisKeyOfSeriesData
                                    ,yValueKeyOfSeriesData,chartsType) {
    //1.根据用户输入——转换成echart需要的『配置对象configObj』的结构
    const legendData = dataSource.map(item=>item[legendDataKeyOfDataSource]);
    const xAxisData = dataSource[0][seriesDataKeyOfDataSource].map(item=>item[xAxisKeyOfSeriesData])
    const seriesData = dataSource.map(item=>{
        return {
            name:item[legendDataKeyOfDataSource],
            type:chartsType,
            data:item[seriesDataKeyOfDataSource].map(item1=>item1[yValueKeyOfSeriesData])
        }
    });

    let xAxis ={
        type: 'category',
        data: xAxisData
    };

    if(chartsType==='line'){
        xAxis ={
            type: 'category',
            boundaryGap: false,
            data: xAxisData
        }
    }
    //2.生成『配置对象configObj』
    const configObj= {
        title: {
            text:title
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:legendData
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        xAxis: xAxis,
        yAxis: {
            type: 'value'
        },
        series: seriesData
    };
    //3.返回『配置对象configObj』
    return configObj;
}

export function renderPieCharts(title,dataSource,seriesName,seriesDataName,seriesDataValue,isDisplayLegendData) {
    //从『数据源』中解析出解释数据
    let legendData=[];
    if(isDisplayLegendData){
        legendData = dataSource.map((item)=>{
            return item[seriesDataName];
        });
    }

    //从『数据源』中解析出连续数据
    const seriesData = dataSource.map(item=>({
        value:item[seriesDataValue],
        name:item[seriesDataName],
    }));

    //解析结果
    // [
    //     {value: 1048, name: '搜索引擎'},
    //     {value: 735, name: '直接访问'},
    //     {value: 580, name: '邮件营销'},
    //     {value: 484, name: '联盟广告'},
    //     {value: 300, name: '视频广告'}
    // ],

    //2.使用解析得到的数据，生成配置对象
    return {
        title : {
            text: title,
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: legendData
        },
        series : [
            {
                name: seriesName,
                type: 'pie',
                radius : '75%',//默认：55%
                center: ['50%', '60%'],//'50%', '60%'
                data:seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
}

import React, {Component} from 'react';
import {Card, Modal, Table} from "antd";
import {getScoreAnalysis_by_kline} from "../../api/taskApi";
import {generateChartConfig} from "../../utils/echartUtils";
import ReactEcharts from "echarts-for-react";

class Tasktoday extends Component {
    state={changshiList:[ {
            title: '蒸发量',
            data: [
                {
                    name: '01',
                    value: '1',
                },
                {
                    name: '02',
                    value: '2',
                },
            ],
        },],
        yanyuList:[ {
            title: '蒸发量',
            data: [
                {
                    name: '01',
                    value: '1',
                },
                {
                    name: '02',
                    value: '2',
                },
            ],
        },],
        shuliangList:[ {
            title: '蒸发量',
            data: [
                {
                    name: '01',
                    value: '1',
                },
                {
                    name: '02',
                    value: '2',
                },
            ],
        },],
        luojiList:[ {
            title: '蒸发量',
            data: [
                {
                    name: '01',
                    value: '1',
                },
                {
                    name: '02',
                    value: '2',
                },
            ],
        },],

        ziliaoList:[ {
            title: '蒸发量',
            data: [
                {
                    name: '01',
                    value: '1',
                },
                {
                    name: '02',
                    value: '2',
                },
            ],
        },],
        scoreList:[ {
            title: '蒸发量',
            data: [
                {
                    name: '01',
                    value: '1',
                },
                {
                    name: '02',
                    value: '2',
                },
            ],
        },]

    }








    componentDidMount() {
        getScoreAnalysis_by_kline().then((response) => {
            if (response.data.success === true) {
                console.log('aaaaaaaaaaaa');
                //去除类型列表（可能是一级、可能时子级）
                const changshi_arr = response.data.result.changshi_arr;
                const yanyu_arr = response.data.result.yanyu_arr;
                const shuliang_arr = response.data.result.shuliang_arr;
                const luoji_arr = response.data.result.luoji_arr;
                const ziliao_arr = response.data.result.ziliao_arr;
                const score_arr = response.data.result.score_arr;



                //更新状态
                this.setState({changshiList: [{title: '常识正确率走势', 'data': changshi_arr}]});
                this.setState({yanyuList: [{title: '言语正确率走势', 'data': yanyu_arr}]});
                this.setState({shuliangList: [{title: '数量正确率走势', 'data': shuliang_arr}]});
                this.setState({luojiList: [{title: '常识正确率走势', 'data': luoji_arr}]});
                this.setState({ziliaoList: [{title: '常识正确率走势', 'data': ziliao_arr}]});
                this.setState({scoreList: [{title: '成绩走势', 'data': score_arr}]});


            }
        }).catch();
    }

    /**
     * 返回折线图的(day)配置对象
     * @returns {JSX.Element}
     */
    getOption_changshiChart_line = () => {
        //折线图类型为"line"
        const chartsType = "line";
        const {changshiList} = this.state;
        //1.获取数据源对象
        const dataSource = changshiList;
        if(dataSource.length==0){
            return;
        }
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        const legendDataKeyOfDataSource = 'title';//dataSource对象中的——解释数据的标识符（解释数据通过dataSource对象的title属性来指定）
        const seriesDataKeyOfDataSource = 'data';//dataSource对象中的——连续数据的标识符（连续数据通过dataSource对象的data属性来指定）
        const xAxisKeyOfSeriesData = 'name';//seriesData连续数据对象中的——x轴的标识符——通过name属性来指定
        const yValueKeyOfSeriesData = 'value';//seriesData连续数据对象中的——y轴的标识符——通过value属性来指定
        return generateChartConfig('常识正确率', dataSource, legendDataKeyOfDataSource, seriesDataKeyOfDataSource, xAxisKeyOfSeriesData, yValueKeyOfSeriesData, chartsType,false);
    }

    getOption_yanyuChart_line = () => {
        //折线图类型为"line"
        const chartsType = "line";
        const {yanyuList} = this.state;
        //1.获取数据源对象
        const dataSource = yanyuList;
        if(dataSource.length==0){
            return;
        }
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        const legendDataKeyOfDataSource = 'title';//dataSource对象中的——解释数据的标识符（解释数据通过dataSource对象的title属性来指定）
        const seriesDataKeyOfDataSource = 'data';//dataSource对象中的——连续数据的标识符（连续数据通过dataSource对象的data属性来指定）
        const xAxisKeyOfSeriesData = 'name';//seriesData连续数据对象中的——x轴的标识符——通过name属性来指定
        const yValueKeyOfSeriesData = 'value';//seriesData连续数据对象中的——y轴的标识符——通过value属性来指定
        return generateChartConfig('言语正确率', dataSource, legendDataKeyOfDataSource, seriesDataKeyOfDataSource, xAxisKeyOfSeriesData, yValueKeyOfSeriesData, chartsType,false);
    }

    getOption_shuliangChart_line = () => {
        //折线图类型为"line"
        const chartsType = "line";
        const {shuliangList} = this.state;
        //1.获取数据源对象
        const dataSource = shuliangList;
        if(dataSource.length==0){
            return;
        }
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        const legendDataKeyOfDataSource = 'title';//dataSource对象中的——解释数据的标识符（解释数据通过dataSource对象的title属性来指定）
        const seriesDataKeyOfDataSource = 'data';//dataSource对象中的——连续数据的标识符（连续数据通过dataSource对象的data属性来指定）
        const xAxisKeyOfSeriesData = 'name';//seriesData连续数据对象中的——x轴的标识符——通过name属性来指定
        const yValueKeyOfSeriesData = 'value';//seriesData连续数据对象中的——y轴的标识符——通过value属性来指定
        return generateChartConfig('数量正确率', dataSource, legendDataKeyOfDataSource, seriesDataKeyOfDataSource, xAxisKeyOfSeriesData, yValueKeyOfSeriesData, chartsType,false);
    }

    getOption_luojiChart_line = () => {
        //折线图类型为"line"
        const chartsType = "line";
        const {luojiList} = this.state;
        //1.获取数据源对象
        const dataSource = luojiList;
        if(dataSource.length==0){
            return;
        }
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        const legendDataKeyOfDataSource = 'title';//dataSource对象中的——解释数据的标识符（解释数据通过dataSource对象的title属性来指定）
        const seriesDataKeyOfDataSource = 'data';//dataSource对象中的——连续数据的标识符（连续数据通过dataSource对象的data属性来指定）
        const xAxisKeyOfSeriesData = 'name';//seriesData连续数据对象中的——x轴的标识符——通过name属性来指定
        const yValueKeyOfSeriesData = 'value';//seriesData连续数据对象中的——y轴的标识符——通过value属性来指定
        return generateChartConfig('逻辑正确率', dataSource, legendDataKeyOfDataSource, seriesDataKeyOfDataSource, xAxisKeyOfSeriesData, yValueKeyOfSeriesData, chartsType,false);
    }

    getOption_ziliaoChart_line = () => {
        //折线图类型为"line"
        const chartsType = "line";
        const {ziliaoList} = this.state;
        //1.获取数据源对象
        const dataSource = ziliaoList;
        if(dataSource.length==0){
            return;
        }
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        const legendDataKeyOfDataSource = 'title';//dataSource对象中的——解释数据的标识符（解释数据通过dataSource对象的title属性来指定）
        const seriesDataKeyOfDataSource = 'data';//dataSource对象中的——连续数据的标识符（连续数据通过dataSource对象的data属性来指定）
        const xAxisKeyOfSeriesData = 'name';//seriesData连续数据对象中的——x轴的标识符——通过name属性来指定
        const yValueKeyOfSeriesData = 'value';//seriesData连续数据对象中的——y轴的标识符——通过value属性来指定
        return generateChartConfig('资料正确率', dataSource, legendDataKeyOfDataSource, seriesDataKeyOfDataSource, xAxisKeyOfSeriesData, yValueKeyOfSeriesData, chartsType,false);
    }

    getOption_scoreChart_line = () => {
        //折线图类型为"line"
        const chartsType = "line";
        const {scoreList} = this.state;
        //1.获取数据源对象
        const dataSource = scoreList;
        if(dataSource.length==0){
            return;
        }
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        const legendDataKeyOfDataSource = 'title';//dataSource对象中的——解释数据的标识符（解释数据通过dataSource对象的title属性来指定）
        const seriesDataKeyOfDataSource = 'data';//dataSource对象中的——连续数据的标识符（连续数据通过dataSource对象的data属性来指定）
        const xAxisKeyOfSeriesData = 'name';//seriesData连续数据对象中的——x轴的标识符——通过name属性来指定
        const yValueKeyOfSeriesData = 'value';//seriesData连续数据对象中的——y轴的标识符——通过value属性来指定
        return generateChartConfig('资料正确率', dataSource, legendDataKeyOfDataSource, seriesDataKeyOfDataSource, xAxisKeyOfSeriesData, yValueKeyOfSeriesData, chartsType,false);
    }



    render() {
        return (
            <div>
            <div style={{display: 'flex'}}>


                <Card style={{height: '60%', width: '33%'}}>
                    <ReactEcharts option={this.getOption_yanyuChart_line()}></ReactEcharts>
                </Card>

                <Card style={{height: '60%', width: '33%'}}>
                    <ReactEcharts option={this.getOption_luojiChart_line()}></ReactEcharts>
                </Card>

                <Card style={{height: '60%', width: '33%'}}>
                    <ReactEcharts option={this.getOption_ziliaoChart_line()}></ReactEcharts>
                </Card>
            </div>

        <div style={{display: 'flex'}}>
            <Card style={{height: '60%', width: '33%'}}>
                <ReactEcharts option={this.getOption_changshiChart_line()}></ReactEcharts>
            </Card>

            <Card style={{height: '60%', width: '33%'}}>
                <ReactEcharts option={this.getOption_shuliangChart_line()}></ReactEcharts>
            </Card>
            <Card style={{height: '60%', width: '33%'}}>
                <ReactEcharts option={this.getOption_scoreChart_line()}></ReactEcharts>
            </Card>


        </div>

            </div>
        );
    }
}

export default Tasktoday;
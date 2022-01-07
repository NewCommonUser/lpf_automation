import React, {Component} from 'react';
import {getKlineByStockId_200day, getWideBaseIndex_200day} from "../../api/tradeApi";
import {renderKLineCharts} from "../../utils/echartUtils";
import {Card} from "antd";
import ReactEcharts from "echarts-for-react";

class Kline extends Component {
    //1.数据
    state={
        kline_arr_day:[],//日线
        kline_arr_week:[],//周线
        kline_arr_month:[],//月线
    }

    componentDidMount() {
        const {stockId} = this.props;
        getKlineByStockId_200day(stockId).then((response) => {
            if (response.data.success === true) {
                const mapData = response.data.result;
                //设置日k线
                this.setState({kline_arr_day:mapData.day_arr});
                this.setState({kline_arr_week:mapData.week_arr});
                this.setState({kline_arr_month:mapData.month_arr});
            }
        }).catch();
    }

    /**
     * 返回k线配置对象：上证50的k线数据——option
     */
    getOption_kline_day=()=>{
        const {name} = this.props;
        //1.获取数据源对象
        const {kline_arr_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts(name+'日K', kline_arr_day);
    }

    getOption_kline_week=()=>{
        const {name} = this.props;
        //1.获取数据源对象
        const {kline_arr_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts(name+'周K', kline_arr_week);
    }
    getOption_kline_month=()=>{
        const {name} = this.props;
        //1.获取数据源对象
        const {kline_arr_month} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts(name+'月K', kline_arr_month);
    }


    //2.渲染数据
    render() {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '50%'}}>
                        <ReactEcharts option={this.getOption_kline_day()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '50%'}}>
                        <ReactEcharts option={this.getOption_kline_week()}></ReactEcharts>
                    </Card>
                </div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '50%'}}>
                        <ReactEcharts option={this.getOption_kline_month()}></ReactEcharts>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Kline;
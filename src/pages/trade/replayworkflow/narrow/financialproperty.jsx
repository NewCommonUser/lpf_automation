import React, {Component} from 'react';
import {Button, Card, Image} from "antd";
import {getIndustry_jinrongdichan} from "../../../../api/tradeApi";
import ReactEcharts from "echarts-for-react";
import {renderKLineCharts} from "../../../../utils/echartUtils";

class Financialproperty extends Component {
    state={
        yinhang_day:[],//银行日线
        dichan_day:[],//地产日线
        zhengquan_day:[],//证券日线

        yinhang_week:[],//银行月线
        dichan_week:[],//地产月线
        zhengquan_week:[],//证券月线
    }

    componentDidMount() {
        getIndustry_jinrongdichan().then((response) => {
            if (response.data.success === true) {
                const mapData = response.data.result;
                //设置日k线
                this.setState({yinhang_day:mapData.yinhang_day});
                this.setState({dichan_day: mapData.dichan_day});
                this.setState({zhengquan_day: mapData.zhengquan_day});
                //设置周k线
                this.setState({yinhang_week: mapData.yinhang_week});
                this.setState({dichan_week: mapData.dichan_week});
                this.setState({zhengquan_week: mapData.zhengquan_week});
            }
        }).catch();
    }


    /**
     * 返回k线配置对象：银行日k线数据——option
     */
    getOption_kline_day_yinhang=()=>{
        //1.获取数据源对象
        const {yinhang_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('银行日K', yinhang_day);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_day_dichan=()=>{
        //1.获取数据源对象
        const {dichan_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('地产日K', dichan_day);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_day_zhengquan=()=>{
        //1.获取数据源对象
        const {zhengquan_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('证券日K', zhengquan_day);
    }


    /**
     * 返回k线配置对象：银行周k线数据——option
     */
    getOption_kline_week_yinhang=()=>{
        //1.获取数据源对象
        const {yinhang_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('银行周K', yinhang_week);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_week_dichan=()=>{
        //1.获取数据源对象
        const {dichan_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('地产周K', dichan_week);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_week_zhengquan=()=>{
        //1.获取数据源对象
        const {zhengquan_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('证券周K', zhengquan_week);
    }


    render() {
        return (
            <div>

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_yinhang()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_dichan()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_zhengquan()}></ReactEcharts>
                    </Card>
                </div>

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_yinhang()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_dichan()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_zhengquan()}></ReactEcharts>
                    </Card>
                </div>
            </div>
        );
    }
}
export default Financialproperty;
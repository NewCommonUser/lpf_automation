import React, {Component} from 'react';
import {Button, Card, Image} from "antd";
import {getIndustry_consumption} from "../../../../api/tradeApi";
import ReactEcharts from "echarts-for-react";
import {renderKLineCharts} from "../../../../utils/echartUtils";

class Consumption extends Component {
    state={
        jiu_day:[],//银行日线
        shipin_day:[],//地产日线
        jiadian_day:[],//证券日线

        jiu_week:[],//银行月线
        shipin_week:[],//地产月线
        jiadian_week:[],//证券月线
    }

    componentDidMount() {
        getIndustry_consumption().then((response) => {
            if (response.data.success === true) {
                const mapData = response.data.result;
                //设置日k线
                this.setState({jiu_day:mapData.jiu_day});
                this.setState({shipin_day: mapData.shipin_day});
                this.setState({jiadian_day: mapData.jiadian_day});
                //设置周k线
                this.setState({jiu_week: mapData.jiu_week});
                this.setState({shipin_week: mapData.shipin_week});
                this.setState({jiadian_week: mapData.jiadian_week});
            }
        }).catch();
    }


    /**
     * 返回k线配置对象：银行日k线数据——option
     */
    getOption_kline_day_jiu=()=>{
        //1.获取数据源对象
        const {jiu_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('酒日K', jiu_day);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_day_shipin=()=>{
        //1.获取数据源对象
        const {shipin_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('食品日K', shipin_day);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_day_jiadian=()=>{
        //1.获取数据源对象
        const {jiadian_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('家电日K', jiadian_day);
    }


    /**
     * 返回k线配置对象：银行周k线数据——option
     */
    getOption_kline_week_jiu=()=>{
        //1.获取数据源对象
        const {jiu_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('酒周K', jiu_week);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_week_shipin=()=>{
        //1.获取数据源对象
        const {shipin_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('食品周K', shipin_week);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_week_jiadian=()=>{
        //1.获取数据源对象
        const {jiadian_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('家电周K', jiadian_week);
    }


    render() {
        return (
            <div>

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_jiu()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_shipin()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_jiadian()}></ReactEcharts>
                    </Card>
                </div>

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_jiu()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_shipin()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_jiadian()}></ReactEcharts>
                    </Card>
                </div>
            </div>
        );
    }
}
export default Consumption;
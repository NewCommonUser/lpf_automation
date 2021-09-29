import React, {Component} from 'react';
import {getIndustry_jinrongdichan, getIndustry_ziyuan} from "../../../../api/tradeApi";
import {renderKLineCharts} from "../../../../utils/echartUtils";
import {Card} from "antd";
import ReactEcharts from "echarts-for-react";

class Ziyuan extends Component {
    state={
        meitan_day:[],//银行日线
        nengyuan_day:[],//地产日线
        xitu_day:[],//证券日线

        meitan_week:[],//银行月线
        nengyuan_week:[],//地产月线
        xitu_week:[],//证券月线
    }

    componentDidMount() {
        getIndustry_ziyuan().then((response) => {
            if (response.data.success === true) {
                const mapData = response.data.result;
                //设置日k线
                this.setState({meitan_day:mapData.meitan_day});
                this.setState({nengyuan_day: mapData.nengyuan_day});
                this.setState({xitu_day: mapData.xitu_day});
                //设置周k线
                this.setState({meitan_week: mapData.meitan_week});
                this.setState({nengyuan_week: mapData.nengyuan_week});
                this.setState({xitu_week: mapData.xitu_week});
            }
        }).catch();
    }


    /**
     * 返回k线配置对象：银行日k线数据——option
     */
    getOption_kline_day_meitan=()=>{
        //1.获取数据源对象
        const {meitan_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('煤炭日K', meitan_day);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_day_nengyuan=()=>{
        //1.获取数据源对象
        const {nengyuan_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('能源日K', nengyuan_day);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_day_xitu=()=>{
        //1.获取数据源对象
        const {xitu_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('稀土日K', xitu_day);
    }


    /**
     * 返回k线配置对象：银行周k线数据——option
     */
    getOption_kline_week_meitan=()=>{
        //1.获取数据源对象
        const {meitan_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('煤炭周K', meitan_week);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_week_nengyuan=()=>{
        //1.获取数据源对象
        const {nengyuan_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('能源周K', nengyuan_week);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_week_xitu=()=>{
        //1.获取数据源对象
        const {xitu_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('稀土周K', xitu_week);
    }


    render() {
        return (
            <div>

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_meitan()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_nengyuan()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_xitu()}></ReactEcharts>
                    </Card>
                </div>

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_meitan()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_nengyuan()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_xitu()}></ReactEcharts>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Ziyuan;
import React, {Component} from 'react';
import {getIndustry_wenhua_consumption} from "../../../../api/tradeApi";
import {renderKLineCharts} from "../../../../utils/echartUtils";
import {Card} from "antd";
import ReactEcharts from "echarts-for-react";

class Wenhuaconsumption extends Component {

    state={
        lvyou_day:[],//酒日线
        yingshi_day:[],//食品日线
        youxi_day:[],//家电日线

        lvyou_week:[],//酒周线
        yingshi_week:[],//食品周线
        youxi_week:[],//家电周线
    }

    componentDidMount() {
        getIndustry_wenhua_consumption().then((response) => {
            if (response.data.success === true) {
                const mapData = response.data.result;
                //设置日k线
                this.setState({lvyou_day:mapData.lvyou_day});
                this.setState({yingshi_day: mapData.yingshi_day});
                this.setState({youxi_day: mapData.youxi_day});
                //设置周k线
                this.setState({lvyou_week: mapData.lvyou_week});
                this.setState({yingshi_week: mapData.yingshi_week});
                this.setState({youxi_week: mapData.youxi_week});
            }
        }).catch();
    }


    /**
     * 返回k线配置对象：银行日k线数据——option
     */
    getOption_kline_day_lvyou=()=>{
        //1.获取数据源对象
        const {lvyou_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('旅游日K', lvyou_day);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_day_yingshi=()=>{
        //1.获取数据源对象
        const {yingshi_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('影视日K', yingshi_day);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_day_youxi=()=>{
        //1.获取数据源对象
        const {youxi_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('游戏日K', youxi_day);
    }


    /**
     * 返回k线配置对象：银行周k线数据——option
     */
    getOption_kline_week_lvyou=()=>{
        //1.获取数据源对象
        const {lvyou_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('旅游周K', lvyou_week);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_week_yingshi=()=>{
        //1.获取数据源对象
        const {yingshi_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('影视周K', yingshi_week);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_week_youxi=()=>{
        //1.获取数据源对象
        const {youxi_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('游戏周K', youxi_week);
    }


    render() {
        return (
            <div>

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_lvyou()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_yingshi()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_youxi()}></ReactEcharts>
                    </Card>
                </div>

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_lvyou()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_yingshi()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_youxi()}></ReactEcharts>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Wenhuaconsumption;
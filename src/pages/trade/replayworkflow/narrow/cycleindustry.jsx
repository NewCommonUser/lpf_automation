import React, {Component} from 'react';
import {getIndustry_consumption, getIndustry_cycle} from "../../../../api/tradeApi";
import {renderKLineCharts} from "../../../../utils/echartUtils";
import {Card} from "antd";
import ReactEcharts from "echarts-for-react";

class Cycleindustry extends Component {
    state={
        huagong_day:[],//酒日线
        gangtie_day:[],//食品日线
        jijian_day:[],//家电日线

        huagong_week:[],//酒周线
        gangtie_week:[],//食品周线
        jijian_week:[],//家电周线
    }

    componentDidMount() {
        getIndustry_cycle().then((response) => {
            if (response.data.success === true) {
                const mapData = response.data.result;
                //设置日k线
                this.setState({huagong_day:mapData.huagong_day});
                this.setState({gangtie_day: mapData.gangtie_day});
                this.setState({jijian_day: mapData.jijian_day});
                //设置周k线
                this.setState({huagong_week: mapData.huagong_week});
                this.setState({gangtie_week: mapData.gangtie_week});
                this.setState({jijian_week: mapData.jijian_week});
            }
        }).catch();
    }


    /**
     * 返回k线配置对象：银行日k线数据——option
     */
    getOption_kline_day_huagong=()=>{
        //1.获取数据源对象
        const {huagong_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('化工日K', huagong_day);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_day_gangtie=()=>{
        //1.获取数据源对象
        const {gangtie_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('钢铁日K', gangtie_day);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_day_jiadian=()=>{
        //1.获取数据源对象
        const {jijian_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('基建日K', jijian_day);
    }


    /**
     * 返回k线配置对象：银行周k线数据——option
     */
    getOption_kline_week_huagong=()=>{
        //1.获取数据源对象
        const {huagong_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('化工周K', huagong_week);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_week_gangtie=()=>{
        //1.获取数据源对象
        const {gangtie_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('钢铁周K', gangtie_week);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_week_jijian=()=>{
        //1.获取数据源对象
        const {jijian_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('基建周K', jijian_week);
    }


    render() {
        return (
            <div>

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_huagong()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_gangtie()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_jiadian()}></ReactEcharts>
                    </Card>
                </div>

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_huagong()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_gangtie()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_jijian()}></ReactEcharts>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Cycleindustry;
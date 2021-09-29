import React, {Component} from 'react';
import {getIndustry_yiyaoyiliao} from "../../../../api/tradeApi";
import {renderKLineCharts} from "../../../../utils/echartUtils";
import {Card} from "antd";
import ReactEcharts from "echarts-for-react";

class Yiliaoyiyao extends Component {
    state={
        yiyao_day:[],//酒日线
        yiliao_day:[],//食品日线

        yiyao_week:[],//酒周线
        yiliao_week:[],//食品周线
    }

    componentDidMount() {
        getIndustry_yiyaoyiliao().then((response) => {
            if (response.data.success === true) {
                const mapData = response.data.result;
                //设置日k线
                this.setState({yiyao_day:mapData.yiyao_day});
                this.setState({yiliao_day: mapData.yiliao_day});
                //设置周k线
                this.setState({yiyao_week: mapData.yiyao_week});
                this.setState({yiliao_week: mapData.yiliao_week});
            }
        }).catch();
    }


    /**
     * 返回k线配置对象：银行日k线数据——option
     */
    getOption_kline_day_yiyao=()=>{
        //1.获取数据源对象
        const {yiyao_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('医药日K', yiyao_day);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_day_yiliao=()=>{
        //1.获取数据源对象
        const {yiliao_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('医疗日K', yiliao_day);
    }




    /**
     * 返回k线配置对象：银行周k线数据——option
     */
    getOption_kline_week_yiyao=()=>{
        //1.获取数据源对象
        const {yiyao_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('医药周K', yiyao_week);
    }

    /**
     * 返回k线配置对象：地产日k线数据——option
     */
    getOption_kline_week_yiliao=()=>{
        //1.获取数据源对象
        const {yiliao_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('医疗周K', yiliao_week);
    }




    render() {
        return (
            <div>

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_yiyao()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_day_yiliao()}></ReactEcharts>
                    </Card>
                   
                </div>

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_yiyao()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '33%'}}>
                        <ReactEcharts option={this.getOption_kline_week_yiliao()}></ReactEcharts>
                    </Card>
                   
                </div>
            </div>
        );
    }
}

export default Yiliaoyiyao;
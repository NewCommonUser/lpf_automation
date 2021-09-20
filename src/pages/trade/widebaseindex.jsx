import React, {Component} from 'react';
import {Card} from "antd";
import ReactEcharts from "echarts-for-react";
import {renderKLineCharts, renderPieCharts} from "../../utils/echartUtils";
import {getWideBaseIndex_120day, selfStock5MonthCheck} from "../../api/tradeApi";

/**
 * https://echarts.apache.org/examples/zh/editor.html?c=candlestick-sh-2015
 */
class Widebaseindex extends Component {
    //1.数据
    state={
        kline_arr_sh_50_day:[],//上证50
        kline_arr_hs_300_day:[],//沪深300
        kline_arr_zz_500_day:[],//中证500
        kline_arr_zz_1000_day:[],//中证1000

        kline_arr_sh_50_week:[],//上证50
        kline_arr_hs_300_week:[],//沪深300
        kline_arr_zz_500_week:[],//中证500
        kline_arr_zz_1000_week:[],//中证1000
    }

    componentDidMount() {
        getWideBaseIndex_120day().then((response) => {
            if (response.data.success === true) {
                const mapData = response.data.result;
                //设置日k线
                this.setState({kline_arr_sh_50_day:mapData.sh50_day});
                this.setState({kline_arr_hs_300_day: mapData.hs300_day});
                this.setState({kline_arr_zz_500_day: mapData.zz500_day});
                this.setState({kline_arr_zz_1000_day: mapData.zz1000_day});
                //设置周k线
                this.setState({kline_arr_sh_50_week:mapData.sh50_week});
                this.setState({kline_arr_hs_300_week: mapData.hs300_week});
                this.setState({kline_arr_zz_500_week: mapData.zz500_week});
                this.setState({kline_arr_zz_1000_week: mapData.zz1000_week});
            }
        }).catch();
    }

    /**
     * 返回k线配置对象：上证50的k线数据——option
     */
    getOption_kline_day_sh_50=()=>{
        //1.获取数据源对象
        const {kline_arr_sh_50_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('上证50', kline_arr_sh_50_day);
    }
    /**
     * 返回k线配置对象：中证1000的k线数据——option
     */
    getOption_kline_day_zz_1000=()=>{
        //1.获取数据源对象
        const {kline_arr_zz_1000_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('中证1000', kline_arr_zz_1000_day);
    }
    /**
     * 返回k线配置对象：中证500的k线数据——option
     */
    getOption_kline_day_zz_500=()=>{
        //1.获取数据源对象
        const {kline_arr_zz_500_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('中证500', kline_arr_zz_500_day);
    }
    /**
     * 返回k线配置对象：中证500的k线数据——option
     */
    getOption_kline_day_hs_300=()=>{
        //1.获取数据源对象
        const {kline_arr_hs_300_day} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('沪深300', kline_arr_hs_300_day);
    }

    /**
     * 返回k线配置对象：上证50的k线数据——option
     */
    getOption_kline_week_sh_50=()=>{
        //1.获取数据源对象
        const {kline_arr_sh_50_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('上证50', kline_arr_sh_50_week);
    }
    /**
     * 返回k线配置对象：中证1000的k线数据——option
     */
    getOption_kline_week_zz_1000=()=>{
        //1.获取数据源对象
        const {kline_arr_zz_1000_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('中证1000', kline_arr_zz_1000_week);
    }
    /**
     * 返回k线配置对象：中证500的k线数据——option
     */
    getOption_kline_week_zz_500=()=>{
        //1.获取数据源对象
        const {kline_arr_zz_500_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('中证500', kline_arr_zz_500_week);
    }
    /**
     * 返回k线配置对象：中证500的k线数据——option
     */
    getOption_kline_week_hs_300=()=>{
        //1.获取数据源对象
        const {kline_arr_hs_300_week} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        return renderKLineCharts('沪深300', kline_arr_hs_300_week);
    }

    //2.渲染数据
    render() {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline_day_sh_50()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline_day_zz_1000()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline_day_zz_500()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline_day_hs_300()}></ReactEcharts>
                    </Card>
                </div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline_week_sh_50()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline_week_zz_1000()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline_week_zz_500()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline_week_hs_300()}></ReactEcharts>
                    </Card>
                </div>
            </div>
        );
    }
}
export default Widebaseindex;
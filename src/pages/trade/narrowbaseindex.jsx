import React, {Component} from 'react';
import {getNarrowBaseIndex_200day} from "../../api/tradeApi";
import {Card} from "antd";
import ReactEcharts from "echarts-for-react";
import {renderKLineCharts} from "../../utils/echartUtils";

class Narrowbaseindex extends Component {
    //1.数据
    state={
        data:{}
    }

    /**
     * 返回k线配置对象：中证1000的k线数据——option
     */
    getOption_kline=(stockId)=>{
        //1.获取数据源对象
        const {data} = this.state;
        if(JSON.stringify(data) != "{}"){
            let stockName = data[stockId][0]["stockName"];
            let list = data[stockId];
            //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
            return renderKLineCharts(stockName, list);
        }else{
            return {};
        }

    }

    componentDidMount() {
        getNarrowBaseIndex_200day().then((response) => {
            if (response.data.success === true) {
                const mapData = response.data.result;
                //设置日k线
                this.setState({data:mapData});
            }
        }).catch();
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex'}}>

                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("515050")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("513050")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("512980")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("159857")}></ReactEcharts>
                    </Card>
                </div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("159865")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("512660")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("159870")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("159828")}></ReactEcharts>
                    </Card>
                </div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("159929")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("512480")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("516970")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("159996")}></ReactEcharts>
                    </Card>
                </div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("159855")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("512200")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("516160")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("515030")}></ReactEcharts>
                    </Card>
                </div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("159766")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("159869")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("516910")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("159755")}></ReactEcharts>
                    </Card>
                </div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("159930")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("159995")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("512880")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("512690")}></ReactEcharts>
                    </Card>
                </div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("515210")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("512800")}></ReactEcharts>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_kline("515710")}></ReactEcharts>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Narrowbaseindex;
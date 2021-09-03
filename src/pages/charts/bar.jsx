import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {Card, Table} from "antd";
import {generateChartConfig} from '../../utils/echartUtils';
import {findTaskTimeEveryDay, findTaskTimeEveryMonth} from '../../api/taskApi';

class Bar extends Component {

    /**
     * 1.echart组件的配置由两个部分组成
     * ①不变的配置：（所有bar组件共有的配置）
     * 比如toolbox（图表右上角的工具栏）
     * ②改变的配置：
     * 两个不同的条形图，其展示的数据目标和数据值肯定都是不一样的
     * 2.如何封装echart的配置
     * ①第一步：获取原始数据（通常从后台获取）
     * ②第二步：从原始数据，解析出——『改变的配置』
     * ③第三步：将『改变的配置』和『不变的配置』结合——得到『echart配置对象』
     * 3.如何使用echart？
     * 根据配置对象，渲染echart
     */
    state = {
        barData_month: [
            {
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
            },
        ],
        barData_day: [
            {
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
            },
            // {
            //     title:'降水量1',
            //     data:[
            //         {
            //             name:'01',
            //             value:'11',
            //         },
            //         {
            //             name:'02',
            //             value:'12',
            //         }
            //     ],
            // }
        ],
    }

    componentDidMount() {
        findTaskTimeEveryDay().then((response) => {
            if (response.data.success === true) {
                //去除类型列表（可能是一级、可能时子级）
                const seriesData = response.data.result.reverse();
                //更新状态
                this.setState({barData_day: [{title: '每日任务时间', 'data': seriesData}]});
            }
        }).catch();

        findTaskTimeEveryMonth().then((response) => {
            if (response.data.success === true) {
                //去除类型列表（可能是一级、可能时子级）
                const seriesData = response.data.result.reverse();
                //更新状态
                this.setState({barData_month: [{title: '每月任务时间', 'data': seriesData}]});
            }

        }).catch();
    }


    /**
     * 返回柱状图的(day)配置对象
     * @returns {JSX.Element}
     */
    getOption_dayChart_bar = () => {
        //条形图类型为"bar"
        const chartsType = "bar";
        const {barData_day} = this.state;
        //1.获取数据源对象
        const dataSource = barData_day;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        const legendDataKeyOfDataSource = 'title';//dataSource对象中的——解释数据的标识符（解释数据通过dataSource对象的title属性来指定）
        const seriesDataKeyOfDataSource = 'data';//dataSource对象中的——连续数据的标识符（连续数据通过dataSource对象的data属性来指定）
        const xAxisKeyOfSeriesData = 'name';//seriesData连续数据对象中的——x轴的标识符——通过name属性来指定
        const yValueKeyOfSeriesData = 'value';//seriesData连续数据对象中的——y轴的标识符——通过value属性来指定
        return generateChartConfig('每日任务时间', dataSource, legendDataKeyOfDataSource, seriesDataKeyOfDataSource, xAxisKeyOfSeriesData, yValueKeyOfSeriesData, chartsType,false);
    }

    /**
     * 返回折线图的(day)配置对象
     * @returns {JSX.Element}
     */
    getOption_dayChart_line = () => {
        //折线图类型为"line"
        const chartsType = "line";
        const {barData_day} = this.state;
        //1.获取数据源对象
        const dataSource = barData_day;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        const legendDataKeyOfDataSource = 'title';//dataSource对象中的——解释数据的标识符（解释数据通过dataSource对象的title属性来指定）
        const seriesDataKeyOfDataSource = 'data';//dataSource对象中的——连续数据的标识符（连续数据通过dataSource对象的data属性来指定）
        const xAxisKeyOfSeriesData = 'name';//seriesData连续数据对象中的——x轴的标识符——通过name属性来指定
        const yValueKeyOfSeriesData = 'value';//seriesData连续数据对象中的——y轴的标识符——通过value属性来指定
        return generateChartConfig('每日任务时间', dataSource, legendDataKeyOfDataSource, seriesDataKeyOfDataSource, xAxisKeyOfSeriesData, yValueKeyOfSeriesData, chartsType,false);
    }

    /**
     * 返回柱状图的(month)配置对象
     * @returns {JSX.Element}
     */
    getOption_monthChart_bar = () => {
        //条形图类型为"bar"
        const chartsType = "bar";
        const {barData_month} = this.state;
        //1.获取数据源对象
        const dataSource = barData_month;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        const legendDataKeyOfDataSource = 'title';//dataSource对象中的——解释数据的标识符（解释数据通过dataSource对象的title属性来指定）
        const seriesDataKeyOfDataSource = 'data';//dataSource对象中的——连续数据的标识符（连续数据通过dataSource对象的data属性来指定）
        const xAxisKeyOfSeriesData = 'name';//seriesData连续数据对象中的——x轴的标识符——通过name属性来指定
        const yValueKeyOfSeriesData = 'value';//seriesData连续数据对象中的——y轴的标识符——通过value属性来指定
        return generateChartConfig('每月任务时间', dataSource, legendDataKeyOfDataSource, seriesDataKeyOfDataSource, xAxisKeyOfSeriesData, yValueKeyOfSeriesData, chartsType);
    }
    /**
     * 返回柱状图的(month)配置对象
     * @returns {JSX.Element}
     */
    getOption_monthChart_line = () => {
        //折线图类型为"line"
        const chartsType = "line";
        const {barData_month} = this.state;
        //1.获取数据源对象
        const dataSource = barData_month;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        const legendDataKeyOfDataSource = 'title';//dataSource对象中的——解释数据的标识符（解释数据通过dataSource对象的title属性来指定）
        const seriesDataKeyOfDataSource = 'data';//dataSource对象中的——连续数据的标识符（连续数据通过dataSource对象的data属性来指定）
        const xAxisKeyOfSeriesData = 'name';//seriesData连续数据对象中的——x轴的标识符——通过name属性来指定
        const yValueKeyOfSeriesData = 'value';//seriesData连续数据对象中的——y轴的标识符——通过value属性来指定
        return generateChartConfig('每月任务时间', dataSource, legendDataKeyOfDataSource, seriesDataKeyOfDataSource, xAxisKeyOfSeriesData, yValueKeyOfSeriesData, chartsType);
    }

    render() {
        const columns_day = [
            {
                title: '日期',
                dataIndex: 'name',//指定显示数据对应的属性名
                key: 'name',
            },
            {
                title: '时长',
                dataIndex: 'value',
                key: 'value',
            },
        ];
        const columns_month = [
            {
                title: '月份',
                dataIndex: 'name',//指定显示数据对应的属性名
                key: 'name',
            },
            {
                title: '时长',
                dataIndex: 'value',
                key: 'value',
            },
        ];
        const {barData_day}=this.state;
        const {barData_month}=this.state;
        //升序排列(通过concat方法，实现数组的浅拷贝，避免操作到state中的数据)
        let barData_day_orderDesc=barData_day[0].data.concat();
        let barData_month_orderDesc=barData_month[0].data.concat();
        //降序排列
        let barData_day_orderAsc=barData_day_orderDesc.reverse();
        let barData_month_orderAsc=barData_month_orderDesc.reverse();


        return (
            <div>
                <div style={{display: 'flex'}}>
                    {/*<Card type='primary' onClick='this.update'>更新</Card>*/}
                    <Card style={{height: '60%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_dayChart_bar()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '60%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_dayChart_line()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '60%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_monthChart_bar()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '60%', width: '25%'}}>
                        <ReactEcharts option={this.getOption_monthChart_line()}></ReactEcharts>
                    </Card>
                </div>

                {/*<div style={{display: 'flex'}}>*/}
                {/*    <Card style={{height: '100%', width: '50%'}}>*/}
                {/*        <Table bordered*/}
                {/*            // loading={this.loading}*/}
                {/*               rowkey={"id"}*/}
                {/*               dataSource={barData_day_orderDesc}*/}
                {/*               columns={columns_day}*/}
                {/*               pagination={{defaultPageSize: 5, showQuickJumper: true}}*/}
                {/*        />*/}
                {/*    </Card>*/}
                {/*    <Card style={{height: '100%', width: '50%'}}>*/}
                {/*        <Table bordered*/}
                {/*            // loading={this.loading}*/}
                {/*               rowkey={"id"}*/}
                {/*               dataSource={barData_month_orderDesc}*/}
                {/*               columns={columns_month}*/}
                {/*               pagination={{defaultPageSize: 5, showQuickJumper: true}}*/}
                {/*        />*/}
                {/*    </Card>*/}
                {/*</div>*/}

                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '50%'}}>
                        <Table bordered
                            // loading={this.loading}
                               rowkey={"id"}
                               dataSource={barData_day_orderDesc}
                               columns={columns_day}
                               pagination={{defaultPageSize: 3, showQuickJumper: true}}
                        />
                    </Card>
                    <Card style={{height: '100%', width: '50%'}}>
                        <Table bordered
                            // loading={this.loading}
                               rowkey={"id"}
                               dataSource={barData_month_orderDesc}
                               columns={columns_month}
                               pagination={{defaultPageSize: 3, showQuickJumper: true}}
                        />
                    </Card>
                </div>
            </div>
        );
    }
}

export default Bar;
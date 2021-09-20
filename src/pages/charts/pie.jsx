import React, {Component} from 'react';
import {Card, Table} from "antd";
import ReactEcharts from "echarts-for-react";
import {generateChartConfig, renderPieCharts} from "../../utils/echartUtils";
import {findTimeGroupByProject, findTimeGroupByType} from "../../api/taskApi";
import './pie.less';

/**
 * https://echarts.apache.org/examples/zh/index.html#chart-type-pie
 */

class Pie extends Component {
    state = {
        //根据类型划分的饼图『数据源』
        dataSource_pieDataDivideByType: [
            {
                name: '直接访问',
                value: 335
            },
            {
                name: '邮件营销',
                value: 310
            },
        ],
        //根据项目划分的饼图『数据源』
        dataSource_pieDataDivideByProject: [
            {
                name: '直接访问',
                value: 335
            },
            {
                name: '邮件营销',
                value: 310
            },
        ]
    }

    componentDidMount() {
        //获取按类型划分的饼图
        findTimeGroupByType().then((response) => {
            if (response.data.success === true) {
                //去除类型列表（可能是一级、可能时子级）
                const seriesData = response.data.result;
                //更新状态
                this.setState({dataSource_pieDataDivideByType: seriesData});
            }
        }).catch();
        //获取按项目划分的饼图
        findTimeGroupByProject().then((response) => {
            if (response.data.success === true) {
                //去除类型列表（可能是一级、可能时子级）
                const seriesData = response.data.result;
                //更新状态
                this.setState({dataSource_pieDataDivideByProject: seriesData});
            }

        }).catch();
    }

    /**
     * 返回饼图的配置对象
     * @returns {JSX.Element}
     */
    getOption_pieDataDivideByType = () => {
        //1.获取数据源对象
        const {dataSource_pieDataDivideByType} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        const nameOfSeriesData = 'name';//seriesData连续数据对象中的——某个区域名字的标识符——通过name属性来指定
        const valueOfSeriesData = 'value';//seriesData连续数据对象中的——某个区域值的大小——通过value属性来指定
        return renderPieCharts('类型流向', dataSource_pieDataDivideByType, '', nameOfSeriesData, valueOfSeriesData);
    }

    /**
     * 返回柱状图的(month)配置对象
     * @returns {JSX.Element}
     */
    getOption_pieDataDivideByProject = () => {
        //1.获取数据源对象
        const {dataSource_pieDataDivideByProject} = this.state;
        //2.根据后台返回的『数据源对象』——映射成『echart』配置对象
        const nameOfSeriesData = 'name';//seriesData连续数据对象中的——某个区域名字的标识符——通过name属性来指定
        const valueOfSeriesData = 'value';//seriesData连续数据对象中的——某个区域值的大小——通过value属性来指定
        return renderPieCharts('项目流向', dataSource_pieDataDivideByProject, '', nameOfSeriesData, valueOfSeriesData, false);
    }

    render() {
        const columns = [
            {
                title: '项目名',
                dataIndex: 'name',//指定显示数据对应的属性名
                key: 'name',
            },
            {
                title: '时长',
                dataIndex: 'value',
                key: 'value',
            },
        ];
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '50%', width: '35%'}}>
                        <ReactEcharts option={this.getOption_pieDataDivideByType()}></ReactEcharts>
                    </Card>
                    <Card style={{height: '50%', width: '65%'}}>
                        <Table bordered
                            // loading={this.loading}
                               rowkey={"id"}
                               dataSource={this.state.dataSource_pieDataDivideByProject}
                               columns={columns}
                               pagination={{defaultPageSize: 8, showQuickJumper: true}}
                        />
                    </Card>
                </div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '50%', width: '100%'}}>
                        <ReactEcharts option={this.getOption_pieDataDivideByProject()}></ReactEcharts>
                    </Card>
                </div>
            </div>

        );
    }
}

export default Pie;
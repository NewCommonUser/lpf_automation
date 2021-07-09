import React, {Component} from 'react';
import {Card, Modal, Table} from "antd";

class Tasktoday extends Component {
    state={todayTaskList:[]}


    render() {
        const {todayTaskList} = this.state;
        const columns_define = [
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
        return (
            <Card style={{height: '100%', width: '100%'}}>
                <Table bordered
                    // loading={this.loading}
                       rowkey={"id"}
                       dataSource={todayTaskList}
                       columns={columns_define}
                       pagination={{defaultPageSize: 5, showQuickJumper: true}}
                />
            </Card>
        );
    }
}

export default Tasktoday;
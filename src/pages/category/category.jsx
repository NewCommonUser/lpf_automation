import React, {Component} from 'react';
import {Card,Table,Button,Icon} from 'antd';
import LinkButton from "../../components/link-button/link-button";

class Category extends Component {
    render() {
        //card的左侧
        const title='一级分类';
        const extra=(
            <Button type='primary'>
                <Icon type="plus"/>
                添加
            </Button>
        );
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];

        const columns = [
            {
                title: '类型名称',
                dataIndex: 'name',//指定显示数据对应的属性名
            },
            {
                title: '操作',
                width:300,
                render: ()=>{
                    //返回需要显示的界面标签
                    return(
                        <span>
                            <LinkButton>修改类型</LinkButton>
                            <LinkButton>查看子类型</LinkButton>
                        </span>
                    );
                }
            }
        ];
        return (
            <Card title={title} extra={extra} >
                <Table bordered
                       // rowkey={id}
                       dataSource={dataSource}
                       columns={columns} />
            </Card>
        );
    }
}
export default Category;
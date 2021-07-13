import React, {Component} from 'react';
import {Table} from "antd";
import {etf5Day, findTradeLogByStockId, holdingStockCheck} from "../../api/tradeApi";

class Message extends Component {
    state = {
        stockArr: [],
        loading:true
    }

    componentDidMount() {
        if(this.props.datasource==='holdingStockCheck'){
            holdingStockCheck().then((response)=>{
                const seriesData = response.data.result;
                this.setState({loading:false});
                this.setState({stockArr:seriesData});
                console.log(seriesData);
            }).catch();
        }
        if(this.props.datasource==='etf5Day'){
            etf5Day().then((response)=>{
                const seriesData = response.data.result;
                this.setState({loading:false});
                this.setState({stockArr:seriesData});
                console.log(seriesData);
            }).catch();
        }

    }


    render() {
        const columns_config = [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                width: '20%',
            },
            {
                title: '内容',
                dataIndex: 'content',
                key: 'content',
                width: '80%',
            },
        ];


        return (
            <div>
                <Table bordered
                    loading={this.state.loading}
                       rowkey={"id"}
                       dataSource={this.state.stockArr}
                       columns={columns_config}
                       pagination={{defaultPageSize: 10, showQuickJumper: true}}
                />
            </div>
        );
    }
}

export default Message;
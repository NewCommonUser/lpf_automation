import React, {Component} from 'react';
import {Table} from "antd";
import LinkButton from "../../components/link-button/link-button";
import {findAllSelfStock, findTradeLogByStockId} from "../../api/tradeApi";
import PubSub from "pubsub-js";

class Tradelog extends Component {
    state = {
        stockArr: [],
    }

    componentDidMount() {
        const {stockId} = this.props;
        findTradeLogByStockId(stockId).then((response) => {
            if (response.data.success === true) {
                const seriesData = response.data.result.reverse();
                seriesData.map((value, index) => {
                    value.tradeTime = new Date(value.tradeTime).Format("yyyy-MM-dd hh:mm:ss");
                    return value;
                });
                //更新状态
                this.setState({stockArr: seriesData});
                console.log(seriesData);
            }
        }).catch((err) => {
            console.log(err);
        });

    }

    render() {


        const columns_config = [
            {
                title: '证券名称',
                dataIndex: 'stockName',
                key: 'stockName',
                width: '10%',
            },
            {
                title: '交易价格',
                dataIndex: 'price',
                key: 'price',
                width: '10%',
            },
            {
                title: '交易数量',
                dataIndex: 'tradeNum',
                key: 'tradeNum',
                width: '10%',
            },
            {
                title: '是否做T',
                width: '10%',
                render: (stockObj) => {
                    //返回需要显示的界面标签
                    return (
                        <span>
                            {stockObj.ttype === 0 ? '否' : '是'}
                        </span>
                    );
                }
            },
            {
                title: '交易类型',
                width: '20%',
                render: (stockObj) => {
                    //返回需要显示的界面标签
                    return (
                        <span>
                            {stockObj.tradeType === -1 ? '买入' : '卖出'}
                        </span>
                    );
                }
            },

            {
                title: '交易时间',
                dataIndex: 'tradeTime',
                key: 'tradeTime',
                width: '20%',
            },
            // {
            //     title: '操作',
            //     width:300,
            //     render: (stockObj)=>{
            //         //返回需要显示的界面标签
            //         return(
            //             <span>
            //                 <LinkButton onClick={()=>{this.openPositionBuildingPage(stockObj);}}>建仓</LinkButton>
            //             </span>
            //         );
            //     }
            // }
        ];


        return (
            <div>
                <Table bordered
                    // loading={this.loading}
                       rowkey={"id"}
                       dataSource={this.state.stockArr}
                       columns={columns_config}
                       pagination={{defaultPageSize: 10, showQuickJumper: true}}
                />
            </div>
        );
    }
}

export default Tradelog;
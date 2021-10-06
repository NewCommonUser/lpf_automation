import React, {Component} from 'react';
import {Card, Table, Input, Button, Space, Modal,Form} from "antd";
import LinkButton from "../../components/link-button/link-button";
import {addPosition, findAllSelfStock, getAllHoldStock} from "../../api/tradeApi";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Positionchange from "./positionchange";
import Sell from "./sell";
import Addposition from "./addposition";
import Tradelog from "./tradelog";
import ReactWebsocket from "./../../components/websocket/index";
import{Alert}from'antd';
import * as ReactDOM from "react-dom";
import Kline from "./kline";
class Holdingstock extends Component {
    state={
        stockArr:[],
        showStatus:0,
        // 0：默认不现实模态框，1：显示模态框
        currentSelectStockObj:{},
        //当前『表格中』选中的证券对象
    }



    /**
     * 打开仓位更改页面
     * @param stockObj
     */
    openPositionChangePage=(stockObj)=>{
        this.setState({currentSelectStockObj:stockObj});
        this.setState({showStatus:1});
    }
    /**
     * 加仓
     * @param stockObj
     */
    openAddPositionPage=(stockObj)=>{
        this.setState({currentSelectStockObj:stockObj});
        this.setState({showStatus:3});
        // addPosition(stockObj.stockId,stockObj.stockName,1,1).then().catch();
    }

    /**
     * 打开交易日志页面
     * @param stockObj
     */
    openTradeLogPage=(stockObj)=>{
        this.setState({currentSelectStockObj:stockObj});
        this.setState({showStatus:4});
    }

    /**
     * 打开k线页面
     * @param stockObj
     */
    openKlinePage=(stockObj)=>{
        this.setState({currentSelectStockObj:stockObj});
        this.setState({showStatus:5});
    }


    /**
     * 打开买卖页面
     * @param stockObj
     */
    openSellPage=(stockObj)=>{
        console.log(stockObj);
        this.setState({currentSelectStockObj:stockObj});
        this.setState({showStatus:2});
    }

    handleCancel=()=>{
        this.setState({showStatus:0});
    }
    /**
     * 交易日志页面，取消按钮
     */
    tradeLogPageCancel=(a)=>{
        console.log(a);
        Modal.destroyAll();

    }

    componentDidMount() {
        getAllHoldStock().then((response) => {
            if (response.data.success === true) {
                const seriesData = response.data.result.reverse();
                //计算盈亏率（根据后台返回的字段，得到新的字段）
                seriesData.map((value,index)=>{
                    let profitAndLoss=(value.shoupanPrice-value.averageCost)/value.averageCost;
                    profitAndLoss=profitAndLoss.toFixed(3);
                    value.profitAndLoss=profitAndLoss;
                    return value;
                });
                //更新状态
                this.setState({stockArr: seriesData});
            }
        }).catch();
    }

    render() {

        const Item=Form.Item;
        const {showStatus} = this.state;


        const columns_config = [
            {
                title: '证券名称',
                dataIndex: 'stockName',
                key: 'stockName',
                width: '10%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '证券代号',
                dataIndex: 'stockId',
                key: 'stockId',
                width: '10%',
                ...this.getColumnSearchProps('id'),
            },
            {
                title: '5日均价',
                dataIndex: 'day_5_junjia',
                key: 'day_5_junjia',
                width: '6%',
            },
            {
                title: '收盘价',
                dataIndex: 'shoupanPrice',
                key: 'shoupanPrice',
                width: '5%',
            },
            {
                title: '平均成本',
                dataIndex: 'averageCost',
                key: 'averageCost',
                width: '5%',
            },
            {
                title: '盈亏率',
                dataIndex: 'profitAndLoss',
                key: 'profitAndLoss',
                width: '5%',
            },
            {
                title: '持有数量',
                dataIndex: 'tradeNum',
                key: 'tradeNum',
                width: '10%',
            },
            {
                title: '做T卖出数量',
                dataIndex: 'tnum',
                key: 'tnum',
                width: '11%',
            },
            {
                title: '操作',
                width:300,
                render: (stockObj)=>{
                    //返回需要显示的界面标签
                    return(
                        <span>
                            <LinkButton onClick={()=>{this.openAddPositionPage(stockObj);}}>加仓</LinkButton>
                            <LinkButton onClick={()=>{this.openPositionChangePage(stockObj);}}>做T</LinkButton>
                            <LinkButton onClick={()=>{this.openSellPage(stockObj);}}>卖出</LinkButton>
                            <LinkButton onClick={()=>{this.openTradeLogPage(stockObj);}}>交易记录</LinkButton>
                            <LinkButton onClick={()=>{this.openKlinePage(stockObj);}}>k线</LinkButton>
                        </span>
                    );
                }
            }
        ];

        return (
            <div>
                <Card style={{height: '100%', width: '100%'}}>
                    <Table bordered
                        // loading={this.loading}
                           rowkey={"id"}
                           dataSource={this.state.stockArr}
                           columns={columns_config}
                           pagination={{defaultPageSize: 10, showQuickJumper: true}}
                           rowClassName={(record, index) => {
                               // let className;
                               console.log("五日均价为："+record.day_5_junjia);
                               localStorage.getItem(record.stockId);

                               // if (record === rowSelectedIndex) className = 'light';
                               // return className;
                           }}
                    />
                </Card>
                <Modal  title="卖出" visible={showStatus===2}
                       okButtonProps={{htmlType: 'submit', form: 'editForm'}}
                       onCancel={this.handleCancel}>
                    <p>
                        <Sell tnum={this.state.currentSelectStockObj.tnum} holdingNum={this.state.currentSelectStockObj.tradeNum} name={this.state.currentSelectStockObj.stockName} stockId={this.state.currentSelectStockObj.stockId}/>
                    </p>
                </Modal>
                <Modal title="做T" visible={showStatus===1}
                       okButtonProps={{htmlType: 'submit', form: 'editForm'}}
                       onCancel={this.handleCancel}>
                    <p>
                        <Positionchange tnum={this.state.currentSelectStockObj.tnum} holdingNum={this.state.currentSelectStockObj.tradeNum} name={this.state.currentSelectStockObj.stockName} stockId={this.state.currentSelectStockObj.stockId}/>
                    </p>
                </Modal>
                <Modal title="加仓" visible={showStatus===3}
                       okButtonProps={{htmlType: 'submit', form: 'editForm'}}
                       onCancel={this.handleCancel}>
                    <p>
                        <Addposition tnum={this.state.currentSelectStockObj.tnum} holdingNum={this.state.currentSelectStockObj.tradeNum} name={this.state.currentSelectStockObj.stockName} stockId={this.state.currentSelectStockObj.stockId}/>
                    </p>
                </Modal>
                <Modal  title="交易日志"
                        visible={showStatus===4}
                        destroyOnClose //设置关闭时销毁
                        width={1000}
                       // okButtonProps={{htmlType: 'submit', form: 'editForm'}}
                       onCancel={this.handleCancel}>
                    <p>
                        {/*<Tradelog {...this.state.currentSelectStockObj} tnum={this.state.currentSelectStockObj.tnum} holdingNum={this.state.currentSelectStockObj.tradeNum} name={this.state.currentSelectStockObj.stockName} stockId={this.state.currentSelectStockObj.stockId}/>*/}
                        <Tradelog {...this.state.currentSelectStockObj}/>

                    </p>
                </Modal>

                <Modal  title="历史行情" visible={showStatus===5}
                        okButtonProps={{htmlType: 'submit', form: 'editForm'}}
                        width={1000}
                        destroyOnClose //设置关闭时销毁
                        onCancel={this.handleCancel}>
                    <p>
                        <Kline name={this.state.currentSelectStockObj.stockName} stockId={this.state.currentSelectStockObj.stockId}/>
                    </p>
                </Modal>

            </div>
        );
    }


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
}

export default Holdingstock;
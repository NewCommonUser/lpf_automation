import React, {Component} from 'react';
import {Card, Table, Input, Button, Space, Modal,Form} from "antd";
import LinkButton from "../../components/link-button/link-button";
import {findAllSelfStock, getAllHoldStock} from "../../api/tradeApi";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Positionchange from "./positionchange";

class Holdingstock extends Component {
    state={
        stockArr:[],
        showStatus:0,
        // 0：默认不现实模态框，1：显示模态框
        currentSelectStockObj:{},
        //当前『表格中』选中的证券对象

    }
    openPositionChangePage=(stockObj)=>{
        console.log(stockObj);
        this.setState({currentSelectStockObj:stockObj});
        this.setState({showStatus:1});
    }
    handleCancel=()=>{
        this.setState({showStatus:0});
    }

    componentDidMount() {
        getAllHoldStock().then((response) => {
            if (response.data.success === true) {
                const seriesData = response.data.result.reverse();
                //计算盈亏率（根据后台返回的字段，得到新的字段）
                seriesData.map((value,index)=>{
                    value.profitAndLoss=(value.shoupanPrice-value.averageCost)/value.averageCost;
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
                width: '15%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '证券代号',
                dataIndex: 'stockId',
                key: 'stockId',
                width: '15%',
                ...this.getColumnSearchProps('id'),
            },
            {
                title: '收盘价',
                dataIndex: 'shoupanPrice',
                key: 'shoupanPrice',
                width: '10%',
            },
            {
                title: '平均成本',
                dataIndex: 'averageCost',
                key: 'averageCost',
                width: '10%',
            },
            {
                title: '盈亏率',
                dataIndex: 'profitAndLoss',
                key: 'profitAndLoss',
                width: '10%',
            },
            {
                title: '持有数量',
                dataIndex: 'tradeNum',
                key: 'tradeNum',
                width: '10%',
            },
            {
                title: '操作',
                width:300,
                render: (stockObj)=>{
                    //返回需要显示的界面标签
                    return(
                        <span>
                            <LinkButton onClick={()=>{this.openPositionChangePage(stockObj);}}>加减仓</LinkButton>
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
                    />
                </Card>
                <Modal title="仓位加减" visible={showStatus===1}
                       okButtonProps={{htmlType: 'submit', form: 'editForm'}}
                       onCancel={this.handleCancel}>
                    <p>
                        <Positionchange name={this.state.currentSelectStockObj.stockName} stockId={this.state.currentSelectStockObj.id}/>
                        {/*<Item>*/}
                        {/*    <Button type="primary" htmlType="submit" className="login-form-button">*/}
                        {/*        买入*/}
                        {/*    </Button>*/}
                        {/*</Item>*/}
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
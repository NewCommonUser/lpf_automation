import React, {Component} from 'react';
import {Card, Table, Input, Button, Space, Modal,Form} from "antd";
import {buyStock, findAllSelfStock, selfStock5MonthCheck, signStock} from "../../api/tradeApi";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import LinkButton from "../../components/link-button/link-button";
import PubSub from 'pubsub-js' //引入
import AddForm from "../category/add-form";
import Positionbuild from "./positionbuild";
import WrappedPositionbuild from "./positionbuild";
import Sell from "./sell";
import Klinedatapersist from "./klinedatapersist";


/**
 * 自选标的组件
 */
class Selfstock extends Component {

    state={
        stockArr:[],
        showStatus:0,
        // 标识添加/更新的确认框是否显示,0:都不显示，1：显示添加，2：显示更新
        currentSelectStockObj:{},
        //当前『表格中』选中的证券对象
        loading:true,
    }


    buy = ()=>{
    }
    componentDidMount() {
        if(this.props.datasource==='selfStock5MonthCheck'){
            selfStock5MonthCheck().then((response) => {
                if (response.data.success === true) {
                    const seriesData = response.data.result.reverse();
                    console.log(seriesData);
                    //更新状态
                    this.setState({loading:false});
                    this.setState({stockArr: seriesData});
                }
            }).catch();
        }else{
            findAllSelfStock().then((response) => {
                if (response.data.success === true) {
                    const seriesData = response.data.result.reverse();
                    console.log(seriesData);
                    //更新状态
                    this.setState({loading:false});
                    this.setState({stockArr: seriesData});
                }
            }).catch();
        }

        /**
         * 订阅『关闭建仓页面』
         */
        let pubsub = PubSub.subscribe("closePositionBuildingPage", (msg, data) => {
            this.setState({showStatus:0,})
        })
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

    openPositionBuildingPage=(stockObj)=>{
        this.setState({currentSelectStockObj:stockObj});
        this.setState({showStatus:1});
    }

    k_line_dataPersist=(stockObj)=>{
        this.setState({currentSelectStockObj:stockObj});
        this.setState({showStatus:3});
    }

    sign=(stockObj)=>{
        signStock(stockObj.id).then((response) => {
            if (response.data.success === true) {
                //更新状态
                alert(response.data.result);
            }
        }).catch();
    }
    handleCancel=()=>{
        this.setState({showStatus:0});
    }


    submitForm=(values)=>{
        const {code,name}=values;

    }

    render() {
        const Item=Form.Item;
        const {showStatus} = this.state;




        const columns_config = [
            {
                title: '证券名称',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '证券代号',
                dataIndex: 'id',
                key: 'id',
                width: '20%',
                ...this.getColumnSearchProps('id'),
            },
            {
                title: '市值类型',
                dataIndex: 'marketValueType',
                key: 'marketValueType',
                width: '20%',
                ...this.getColumnSearchProps('marketValueType'),
                sorter: (a,b) => {return a.marketValueType>=b.marketValueType},
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: '操作',
                width:300,
                render: (stockObj)=>{
                    //返回需要显示的界面标签
                    return(
                        <span>
                            <LinkButton onClick={()=>{this.openPositionBuildingPage(stockObj);}}>建仓</LinkButton>
                            <LinkButton onClick={()=>{this.sign(stockObj);}}>机会标记</LinkButton>
                            <LinkButton onClick={()=>{this.k_line_dataPersist(stockObj);}}>k线数据持久化</LinkButton>
                        </span>
                    );
                }
            }
        ];

        return (

            <div>
                <Card style={{height: '100%', width: '100%'}}>
                    <Table bordered
                           loading={this.state.loading}
                           rowkey={"id"}
                           dataSource={this.state.stockArr}
                           columns={columns_config}
                           pagination={{defaultPageSize: 10, showQuickJumper: true}}
                    />
                    <Modal title="建仓页面" visible={showStatus===1}
                           okButtonProps={{htmlType: 'submit', form: 'editForm'}}
                           onCancel={this.handleCancel}>
                        <p>
                            <Positionbuild name={this.state.currentSelectStockObj.name} stockId={this.state.currentSelectStockObj.id}/>
                        </p>
                    </Modal>
                    <Modal  title="k线数据持久化" visible={showStatus===3}
                            okButtonProps={{htmlType: 'submit', form: 'editForm'}}
                            onCancel={this.handleCancel}>
                        <p>
                            <Klinedatapersist name={this.state.currentSelectStockObj.name} stockId={this.state.currentSelectStockObj.id}/>
                        </p>
                    </Modal>
                </Card>
            </div>
        );
    }
}

export default Selfstock;
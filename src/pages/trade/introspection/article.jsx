import React, {Component} from 'react';
import {Card, Form, Modal, Table} from "antd";
import {findAllArticle} from "../../../api/tradeApi";
import LinkButton from "../../../components/link-button/link-button";
// import Sell from "../sell";
// import Positionchange from "../positionchange";
import Tradereason from "./tradereason";
import PubSub from "pubsub-js";


class Article extends Component {
    state = {
        articleList:[],
        showStatus:0,
        // 0：默认不现实模态框，1：显示模态框
        currentSelectArticleObj:{},
    }


    componentDidMount=()=>{
        findAllArticle().then((response) => {
            if (response.data.success === true) {
                //去除类型列表（可能是一级、可能时子级）
                const list = response.data.result;
                console.log(list);
                list.map((value, index) => {
                    value.addTime = new Date(value.addTime).Format("yyyy-MM-dd hh:mm:ss");
                    return value;
                });
                console.log(list);
                //更新状态
                this.setState({articleList:list});
            }
        }).catch();

        /**
         * 订阅『交易教训页面』
         */
        let pubsub = PubSub.subscribe("close_tradeReason_Page", (msg, data) => {
            //关闭modal页面
            this.setState({showStatus:0,});
            //重新请求数据，并渲染
            findAllArticle().then((response) => {
                if (response.data.success === true) {
                    //去除类型列表（可能是一级、可能时子级）
                    const list = response.data.result;
                    console.log(list);
                    list.map((value, index) => {
                        value.addTime = new Date(value.addTime).Format("yyyy-MM-dd hh:mm:ss");
                        return value;
                    });
                    console.log(list);
                    //更新状态
                    this.setState({articleList:list});
                }
            }).catch();
        })
    }

    /**
     * 查看文章
     * @param stockObj
     */
    viewArticleObj=(articleObj)=>{
        this.setState({currentSelectArticleObj:articleObj});
        this.setState({showStatus:1});
    }

    /**
     * 编辑文章
     * @param stockObj
     */
    editArticleObj=(articleObj)=>{
        this.setState({currentSelectArticleObj:articleObj});
        this.setState({showStatus:2});
    }

    handleCancel=()=>{
        this.setState({showStatus:0});
    }



    render() {
        const {articleList}=this.state;
        const columns_month = [
            {
                title: '作者',
                dataIndex: 'author',//指定显示数据对应的属性名
                key: 'author',
                width: '10%',

            },
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                width: '20%',
            },
            {
                title: '时间',
                dataIndex: 'addTime',
                key: 'addTime',
                width: '20%',

            },
            {
                title: '操作',
                width:300,
                render: (articleObj)=>{
                    //返回需要显示的界面标签
                    return(
                        <span>
                            <LinkButton onClick={()=>{this.viewArticleObj(articleObj);}}>查看</LinkButton>
                            <LinkButton onClick={()=>{this.editArticleObj(articleObj);}}>编辑</LinkButton>
                        </span>
                    );
                }
            }
        ];
        const Item=Form.Item;
        const {showStatus} = this.state;
        let {currentSelectArticleObj} = this.state;

        return (
                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '100%'}}>
                        <Table bordered
                            // loading={this.loading}
                               rowkey={"id"}
                               dataSource={articleList}
                               columns={columns_month}
                               pagination={{defaultPageSize: 10, showQuickJumper: true}}
                        />
                    </Card>

                    <Modal  title="查看" visible={showStatus===1}
                            okButtonProps={{htmlType: 'submit', form: 'editForm'}}
                            onCancel={this.handleCancel}
                            width={"2000px"}
                            destroyOnClose //设置关闭时销毁

                    >
                        <p>
                            {/*<Tradereason title={this.state.currentSelectArticleObj.title} content={this.state.currentSelectArticleObj.content}/>*/}
                            <Tradereason {...currentSelectArticleObj} />

                        </p>
                    </Modal>
                    {/*<Modal title="编辑" visible={showStatus===2}*/}
                    {/*       okButtonProps={{htmlType: 'submit', form: 'editForm'}}*/}
                    {/*       onCancel={this.handleCancel}>*/}
                    {/*    <p>*/}
                    {/*        <Positionchange tnum={this.state.currentSelectStockObj.tnum} holdingNum={this.state.currentSelectStockObj.tradeNum} name={this.state.currentSelectStockObj.stockName} stockId={this.state.currentSelectStockObj.stockId}/>*/}
                    {/*    </p>*/}
                    {/*</Modal>*/}
                </div>
        );
    }
}

export default Article;
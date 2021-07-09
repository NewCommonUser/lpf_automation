import React, {Component} from 'react';
import {Form, Select, Input, Button, message, Radio,Spin} from 'antd';
import {buyStock, findAllSelfStock, positionBuildCheck_historyDataPrepare, positionBuilding} from "../../api/tradeApi";

import PubSub from 'pubsub-js' //引入
const Item = Form.Item;
const Option = Select.Option;


class Positionbuild extends Component {
    state = {
        strategyType: 1, // 默认『抄底』
        historyDataPrepare:false,
        isLoading:0
    }

    onFinish = () => {

        //拿到input
        const {stockIdInput, stockNameInput, priceInput,highestPriceInput} = this;
        //拿到input的值
        const stockName = stockNameInput.state.value;
        const stockId = stockIdInput.state.value;
        const highestPrice = highestPriceInput.state.value;
        const price = priceInput.state.value;

        const strategyType = this.state.strategyType;
        console.log('strategyType的值为',strategyType);

        if(strategyType===1&&(price>highestPrice*0.65)){
            message.warn("当前较前高跌幅不到35%，不允许抄底");
            return;
        }

        //判断历史数据是否准备完毕
        this.setState({isLoading:1});
        positionBuildCheck_historyDataPrepare(stockId).then((response)=>{
            if (response.data.success === true) {
                this.setState({historyDataPrepare:true})
                if(this.state.historyDataPrepare===false){
                    message.warn("历史数据正在准备中");
                }else{
                    //调用买入api
                    positionBuilding(stockId,stockName,strategyType,price).then((response) => {
                        if (response.data.success === true) {
                            //去除类型列表（可能是一级、可能时子级）
                            const result = response.data.result;
                            //更新状态
                            alert(result);
                            this.setState({isLoading:0});
                            //关闭表单所在的modal框
                            PubSub.publish('closePositionBuildingPage', "") //发布消息『关闭建仓页面』
                        }
                    }).catch();
                }
            }
        }).catch();
    }

    render() {
        const {name, stockId} = this.props;
        return (
            <div>
                {this.state.isLoading===0?
                    <Form //提交表单且数据验证成功后回调事件
                        onFinish={this.onFinish}
                    >
                        <Item initialValue="">
                            证券名称：<Input ref={(a) => {
                            this.stockNameInput = a;
                        }} placeholder='证券名称' name={'name'} value={name}/>
                        </Item>
                        <Item initialValue="">
                            证券代码：<Input ref={(a) => {
                            this.stockIdInput = a;
                        }} placeholder='证券代码' name={'id'} value={stockId}/>
                        </Item>

                        <Radio.Group defaultValue="0" onChange={(event)=>{this.setState({
                            strategyType:event.target.value},()=>{console.log(this.state.strategyType)});

                        }} size="small" style={{marginTop: 16}}>
                            <Radio.Button value="1">抄底</Radio.Button>
                            <Radio.Button value="0">追涨</Radio.Button>
                        </Radio.Group>


                        <Item initialValue="">
                            交易价格：<Input ref={(a) => {
                            this.priceInput = a;
                        }} placeholder='交易价格' name={'price'}/>
                        </Item>

                        <Item initialValue="">
                            抄底前高：<Input ref={(a) => {
                            this.highestPriceInput = a;
                        }} placeholder='抄底预期的之前高点' name={'highestPrice'}/>
                        </Item>

                        {/*<Item initialValue="">*/}
                        {/*    追涨止损价：<Input ref={(a) => {*/}
                        {/*    this.priceInput = a;*/}
                        {/*}} placeholder='追涨止损价' name={'stoplossPrice'}/>*/}
                        {/*</Item>*/}
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                建仓
                            </Button>
                        </Item>
                    </Form>
                    :
                    <div className="example">
                        <Spin />
                    </div>

                }

            </div>
        );
    }
}

export default Positionbuild;
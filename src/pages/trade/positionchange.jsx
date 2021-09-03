import React, {Component} from 'react';
import {Button, Form, Input, Radio} from "antd";
import {tStock} from "../../api/tradeApi";
import PubSub from "pubsub-js";

const Item = Form.Item;

class Positionchange extends Component {

    state = {
        tType: 0, // 默认『不做T』
        isLoading: 0,
        addSubtractType: 1,//默认加仓操作
    }
    onFinish = () => {
        const {holdingNum, tnum} = this.props;

        //拿到input
        const {stockIdInput, stockNameInput, priceInput, tradeNumInput} = this;
        //拿到input的值
        const stockName = stockNameInput.state.value;
        const stockId = stockIdInput.state.value;
        const price = priceInput.state.value;
        const tradeNum = tradeNumInput.state.value;

        //拿到radio的值
        const tType = this.state.tType;
        const addSubtractType = this.state.addSubtractType;

        //参数校验
        // if(addSubtractType==-1&&tradeNum>tnum){
        //     alert("买入做T的数量不能大于当前卖出做T的数量");
        //     return;
        // }
        if(addSubtractType==1&&tradeNum>=holdingNum){
            alert("卖出做T的数量不能大于等于当前持有的数量");
            return;
        }


        tStock(stockId, stockName, addSubtractType, tradeNum, price).then((response) => {
            if (response.data.success === true) {
                //去除类型列表（可能是一级、可能时子级）
                const result = response.data.result;
                //更新状态
                alert(result);
                //关闭表单所在的modal框
                // PubSub.publish('closePositionBuildingPage', "") //发布消息『关闭建仓页面』
            }
        }).catch();
    }

    render() {
        const {name, stockId, holdingNum, tnum} = this.props;
        return (
            <div>
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

                    {/*<div>*/}
                    {/*    <Radio.Group defaultValue="0" onChange={(event)=>{this.setState({*/}
                    {/*        tType:event.target.value},()=>{console.log(this.state.tType)});*/}

                    {/*    }} size="small" style={{marginTop: 16}}>*/}
                    {/*        <Radio.Button value="0">不做T</Radio.Button>*/}
                    {/*        <Radio.Button value="1">要做T</Radio.Button>*/}
                    {/*    </Radio.Group>*/}
                    {/*</div>*/}

                    <Radio.Group defaultValue="1" onChange={(event) => {
                        this.setState({
                            addSubtractType: event.target.value
                        }, () => {
                            console.log(this.state.addSubtractType)
                        });

                    }} size="small" style={{marginTop: 16}}>
                        <Radio.Button value="1">减仓（卖出）</Radio.Button>
                        <Radio.Button value="-1">加仓（买入）</Radio.Button>
                    </Radio.Group>


                    <Item initialValue="">
                        交易数量：({'当前持有数量'}{holdingNum}{',当前做T卖出数量'}{tnum})<Input ref={(a) => {
                        this.tradeNumInput = a;
                    }} placeholder='交易手数' autocomplete={'off'} name={'tradeNum'}/>
                    </Item>


                    <Item initialValue="">
                        交易价格：<Input ref={(a) => {
                        this.priceInput = a;
                    }} placeholder='交易价格' autocomplete={'off'} name={'price'}/>
                    </Item>

                    {/*<Item initialValue="">*/}
                    {/*    抄底前高：<Input ref={(a) => {*/}
                    {/*    this.highestPriceInput = a;*/}
                    {/*}} placeholder='抄底预期的之前高点' name={'highestPrice'}/>*/}
                    {/*</Item>*/}

                    {/*<Item initialValue="">*/}
                    {/*    追涨止损价：<Input ref={(a) => {*/}
                    {/*    this.priceInput = a;*/}
                    {/*}} placeholder='追涨止损价' name={'stoplossPrice'}/>*/}
                    {/*</Item>*/}
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            执行
                        </Button>
                    </Item>
                </Form>
            </div>
        );
    }
}

export default Positionchange;
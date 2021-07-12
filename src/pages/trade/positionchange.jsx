import React, {Component} from 'react';
import {Button, Form, Input, Radio} from "antd";
const Item = Form.Item;
class Positionchange extends Component {

    state = {
        tType: 0, // 默认『不做T』
        isLoading:0,
        addSubtractType:1,//默认加仓操作
    }
    onFinish=()=>{
        //拿到input
        const {stockIdInput, stockNameInput, priceInput} = this;
        //拿到input的值
        const stockName = stockNameInput.state.value;
        const stockId = stockIdInput.state.value;
        const price = priceInput.state.value;
        //拿到radio的值
        const tType = this.state.tType;
        const addSubtractType = this.state.addSubtractType;

        console.log('做T类型',tType);
        console.log('加减仓位',addSubtractType);


    }

    render() {
        const {name, stockId} = this.props;
        console.log(this.props);
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

                    <div>
                        <Radio.Group defaultValue="0" onChange={(event)=>{this.setState({
                            tType:event.target.value},()=>{console.log(this.state.tType)});

                        }} size="small" style={{marginTop: 16}}>
                            <Radio.Button value="0">不做T</Radio.Button>
                            <Radio.Button value="1">要做T</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div>
                        <Radio.Group defaultValue="0" onChange={(event)=>{this.setState({
                            addSubtractType:event.target.value},()=>{console.log(this.state.addSubtractType)});

                        }} size="small" style={{marginTop: 16}}>
                            <Radio.Button value="1">加仓</Radio.Button>
                            <Radio.Button value="0">减仓</Radio.Button>
                        </Radio.Group>
                    </div>

                    <Item initialValue="">
                        交易价格：<Input ref={(a) => {
                        this.priceInput = a;
                    }} placeholder='交易价格' name={'price'}/>
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
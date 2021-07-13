import React, {Component} from 'react';
import {Button, Form, Input, Radio} from "antd";
const Item = Form.Item;

class Sell extends Component {
    onFinish=()=>{
        const {holdingNum, tnum} = this.props;
        //拿到input
        const {stockIdInput, stockNameInput, priceInput, tradeNumInput} = this;
        //拿到input的值
        const stockName = stockNameInput.state.value;
        const stockId = stockIdInput.state.value;
        const price = priceInput.state.value;
        const tradeNum = tradeNumInput.state.value;
        //参数校验
        if(tradeNum>holdingNum){
            alert("卖出数量不能大于当前持有的数量");
            return;
        }
        // sell;
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

                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            卖出
                        </Button>
                    </Item>
                </Form>
            </div>
        );
    }
}

export default Sell;
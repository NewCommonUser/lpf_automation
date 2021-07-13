import React, {Component} from 'react';
import {Button, Form, Input, Radio} from "antd";
import {addPosition} from "../../api/tradeApi";
import PubSub from "pubsub-js";
const Item = Form.Item;

class Addposition extends Component {

    state = {
        strategyType: 1, // 默认『抄底』
    }

    onFinish=()=>{
        //拿到input
        const {stockIdInput, stockNameInput, priceInput,highestPriceInput} = this;
        //拿到input的值
        const stockName = stockNameInput.state.value;
        const stockId = stockIdInput.state.value;
        const price = priceInput.state.value;
        //拿到radio的值
        const strategyType = this.state.strategyType;

        addPosition(stockId,stockName,strategyType,price).then((response)=>{
            if (response.data.success === true) {
                //去除类型列表（可能是一级、可能时子级）
                const result = response.data.result;
                //更新状态
                alert(result);
                this.setState({isLoading:0});
                //关闭表单所在的modal框
                // PubSub.publish('closePositionBuildingPage', "") //发布消息『关闭建仓页面』
            }
        }).catch();

    }
    render() {
        const {name, stockId} = this.props;

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

                    <Radio.Group defaultValue="1" onChange={(event)=>{this.setState({
                        strategyType:event.target.value},()=>{console.log(this.state.strategyType)});

                    }} size="small" style={{marginTop: 16}}>
                        <Radio.Button value="1">抄底</Radio.Button>
                        <Radio.Button value="0">追涨</Radio.Button>
                    </Radio.Group>


                    <Item initialValue="">
                        交易价格：<Input ref={(a) => {
                        this.priceInput = a;
                    }} placeholder='交易价格' autocomplete={'off'} name={'price'}/>
                    </Item>


                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            加仓
                        </Button>
                    </Item>
                </Form>
            </div>
        );
    }
}

export default Addposition;
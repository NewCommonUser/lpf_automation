//k线数据持久化页面
import React, {Component} from 'react';
import {Button, Form, Input, message} from "antd";
import {
    appointStock_k_line_dataPersist,
    positionBuildCheck_historyDataPrepare,
    positionBuilding
} from "../../api/tradeApi";
import PubSub from "pubsub-js";

class Klinedatapersist extends Component {

    onFinish = () => {
        console.log(111);
        //拿到input
        const {stockIdInput, stockNameInput, monthNumInput,dayNumInput} = this;
        //拿到input的值
        // const stockName = stockNameInput.state.value;
        const stockId = stockIdInput.state.value;
        const monthNum = monthNumInput.state.value;
        const dayNum = dayNumInput.state.value;
        //调用『k线数据』持久化api
        appointStock_k_line_dataPersist(stockId,monthNum,dayNum).then((response) => {
            if (response.data.success === true) {
                //去除类型列表（可能是一级、可能时子级）
                const result = response.data.result;
                //更新状态
                alert(result);
                // this.setState({isLoading:0});
                // //关闭表单所在的modal框
                // PubSub.publish('closePositionBuildingPage', "") //发布消息『关闭建仓页面』
            }
        }).catch();
    }

    render() {
        const Item=Form.Item;
        //拿到input的值
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

                    <Item initialValue="">
                        持久化月份数：<Input ref={(a) => {
                        this.monthNumInput = a;
                    }} placeholder='持久化月份数' name={'monthNum'} />
                    </Item>

                    <Item initialValue="">
                        持久化日期数：<Input ref={(a) => {
                        this.dayNumInput = a;
                    }} placeholder='持久化日期数' name={'dayNum'}/>
                    </Item>

                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            执行持久化
                        </Button>
                    </Item>

                </Form>
            </div>
        );
    }
}

export default Klinedatapersist;
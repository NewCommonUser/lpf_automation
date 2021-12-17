import React from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Button, Form, Input, Radio,Select} from "antd";
import {findTradeLogByStockId, getAllHoldStock, saveArticle, tStock} from "../../../api/tradeApi";
import PubSub from "pubsub-js";
const Item = Form.Item;

/**
 * tinymce:图片插件的使用
 * http://tinymce.ax-z.cn/general/upload-images.php
 */
/**
 * antd动态生成下拉框
 * https://blog.csdn.net/qq_42345237/article/details/106663238
 * https://blog.csdn.net/qq_37674858/article/details/103815986
 */

class Tradereason extends React.Component {
    state={
        title:this.props.title,
        content:this.props.content,
        stockId:this.props.stockId,
        tradeId: this.props.tradeId,
        type:this.props.type,
        author:this.props.author,
        add_time:this.props.add_time,
        id:this.props.id,
        holdStockList:[],
        tradeLogList:[]
    }



    componentDidMount=()=>{
        //初始化『证券下拉列表』
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
                this.setState({holdStockList: seriesData});
            }
        }).catch();
        //初始化『交易日志下拉列表』
        const {stockId} = this.state;
        if(stockId){
            this.updateTradeLogList(stockId);
        }

    }

    updateTradeLogList=(stockId)=>{
        findTradeLogByStockId(stockId).then((response) => {
            if (response.data.success === true) {
                const seriesData = response.data.result.reverse();
                seriesData.map((value, index) => {
                    value.tradeTime = new Date(value.tradeTime).Format("yyyy-MM-dd hh:mm:ss");
                    return value;
                });
                //更新状态
                this.setState({tradeLogList: seriesData});
                console.log(seriesData);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    handleEditorChange = (content, editor) => {
        this.setState({content:content});
        console.log('Content was updated:', content);
    }

    onFinish = () => {
        //拿到input
        const {titleInput} = this;
        const {id,type,author,tradeId,stockId,add_time,content} = this.state;

        //拿到input的值
        const title = titleInput.state.value;
        let articleObj={
            id:id,
            type:type,
            author:author,
            tradeId:tradeId,
            stockId:stockId,
            addTime:add_time,
            title:title,
            content:content
        };


        saveArticle(articleObj).then((response) => {
            if (response.data.success === true) {
                //去除类型列表（可能是一级、可能时子级）
                const result = response.data.result;
                //更新状态
                alert(result);
                //关闭表单所在的modal框
                PubSub.publish('close_tradeReason_Page', "") //发布消息『交易教训页面』
            }
        }).catch();
    }

    render() {
        const {content} = this.props;
        const { Option } = Select;
        const { holdStockList,tradeLogList } = this.state;
        return (
            <div >
                <Form onFinish={this.onFinish}  initialValues={this.props}>
                    <Item  name={'title'} >
                        <Input ref={(a) => {
                        this.titleInput = a;
                    }} placeholder='标题'   />
                    </Item>
                    <Item label="所属证券" name="stockId" style={{ display: 'inline-flex', width: '33%'}}>
                        <Select
                            // mode="multiple"
                            showSearch
                            placeholder="所属证券"
                            // style={{ width: '30%' }}
                            onChange={(value, option)=>{let selectStockId=value;this.setState({stockId:value});this.updateTradeLogList(selectStockId);}}
                            filterOption={(input, option) =>{
                                return option && option.props && option.props.children && option.props.children.indexOf(input) >= 0
                            }}
                        >
                            <Option value={""}>{""}</Option>
                            {

                                holdStockList.map((item, index) => (
                                    <Option key={index} value={item.stockId}>{item.stockName}</Option>
                                ))
                            }

                        </Select>
                    </Item>

                    <Item label="所属交易日志" name="tradeId" style={{ display: 'inline-flex',width: '33%',marginLeft: '30px'}} >
                        <Select
                            // mode="multiple"
                            showSearch
                            placeholder="所属交易日志"
                            onChange={(value, option)=>{this.setState({tradeId:value})}}
                            // style={{ width: '30%' }}
                            filterOption={(input, option) =>
                                // 异步动态加载 option 的时候一定要加
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value={""}>{""}</Option>
                            {
                                tradeLogList.map((item, index) => (
                                    <Option key={index} value={item.id}>{item.tradeTime}</Option>
                                ))
                            }

                        </Select>
                    </Item>

                <Editor
                    initialValue={content}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'image advlist template autolink lists link image charmap print  anchor searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'image |template | insertdatetime  | fullscreen  | undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                    }}
                    onEditorChange={this.handleEditorChange}
                />
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

export default Tradereason;



import React from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Button, Form, Input, Radio} from "antd";
import {saveArticle, tStock} from "../../../api/tradeApi";
import PubSub from "pubsub-js";
const Item = Form.Item;

/**
 * tinymce:图片插件的使用
 * http://tinymce.ax-z.cn/general/upload-images.php
 */

class Tradereason extends React.Component {
    state={
        title:this.props.title,
        content:this.props.content,
    }


    handleEditorChange = (content, editor) => {
        this.setState({content:content});
        console.log('Content was updated:', content);
    }

    onFinish = () => {
        const {id,type,author,trade_id,stock_id,add_time} = this.props;
        //拿到input
        const {titleInput} = this;
        const {content} = this.state;

        //拿到input的值
        const title = titleInput.state.value;
        let articleObj={
            id:id,
            type:type,
            author:author,
            tradeId:trade_id,
            stockId:stock_id,
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

        return (
            <div >
                <Form onFinish={this.onFinish}  initialValues={this.props} >
                    <Item  name={'title'}>
                        <Input ref={(a) => {
                        this.titleInput = a;
                    }} placeholder='标题'   />

                    </Item>
                <Editor
                    initialValue={content}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'image advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'image | undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
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



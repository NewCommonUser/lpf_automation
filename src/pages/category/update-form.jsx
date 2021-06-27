import React, {Component} from 'react';
import {Form,Input} from 'antd';
const Item=Form.Item;
/**
 * 添加『任务类型』的form组件（form组件：包含form标签的组件）
 */
class UpdateForm extends Component {
    render() {
        return (
            <Form //提交表单且数据验证成功后回调事件

                onFinish={this.onFinish}
            >
                <Item initialValue="">
                    <Input placeholder='请输入待添加的任务类型名称' />
                </Item>
            </Form>
        );
    }
}
export default UpdateForm;
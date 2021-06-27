import React, {Component} from 'react';
import {Form,Select,Input} from 'antd';
const Item=Form.Item;
const Option=Select.Option;
/**
 * 添加『任务类型』的form组件（form组件：包含form标签的组件）
 */
class AddForm extends Component {
    render() {
        return (
            <Form //提交表单且数据验证成功后回调事件

                onFinish={this.onFinish}
            >
                <Item initialValue='0' >
                    <Select name="parentId"  >
                        <Option value='0'>一级分类</Option>
                        <Option value='1'>读书</Option>
                        <Option value='2'>电脑</Option>
                    </Select>
                </Item>

                <Item initialValue="">
                    <Input placeholder='请输入待添加的任务类型名称' />
                </Item>


            </Form>
        );
    }
}
export default AddForm;
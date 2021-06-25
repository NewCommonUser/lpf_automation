import React, {Component} from 'react';
import {
    Form,
    Input,
    Icon,
    Button,
    // Checkbox,
    message
} from 'antd'
import logo from '../../assets/images/logo_haizei2.jpeg';
import './login.less';
import {reqLogin} from '../../api/index';
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {Redirect} from "react-router-dom";
import { Modal, Space } from 'antd';
// const Item = Form.Item;//不能写在import之前

/**
 * 登录的路由组件
 */
class Login extends Component {
    onFinish = (values) => {
        //这里的『解构赋值username,password』要和input的name相同
        const {username,password}=values;

        //使用箭头函数作为回调，可以将this指向组件本身
        reqLogin(username,password).then((response)=>{
            if(response.data.success===true){
                //使用antd的message组件显示信息
                message.success(response.data.msg);
                const user=response.data.result;
                //跳转前保存登录user到内存
                memoryUtils.user=user;
                storageUtils.saveUser(user);
                this.props.history.replace('/');
            }
        },).catch( (err)=>{

            console.log(err.message);
            alert(err);
        });




    };
    render() {
        //如果用户已经登录，自动跳转到管理界面
        const user=memoryUtils.user;
        //如果用户没有值或者用户名没有值
        if(user&&user.name){
            return <Redirect to='/'/>
        }
        //渲染登录页面
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo"/> <h1>自动化管理系统</h1>
                </header>
                <section className='login-content'>
                    <h3>用户登陆</h3>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        //提交表单且数据验证成功后回调事件
                        onFinish={this.onFinish}
                    >
                        {/*
                        声明式验证：直接使用别人定义好的验证规则进行验证
                        */}
                        <Form.Item
                            name="username"
                            initialValue="admin"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },{
                                    min: 4,
                                    message: '用户名至少4位',
                                },{
                                    max:12,
                                    message: '用户最多12位',
                                },
                                // ,{
                                //     pattern:/^[a-zA-Z0-9_]+$/,
                                //     message: '必须由英文、数字或下划线组成',
                                // }
                            ]}
                        >
                            <Input prefix={<Icon className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}
                        >
                            <Input
                                prefix={<Icon className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>

                </section>
            </div>
        );
    }
}
export default Login;
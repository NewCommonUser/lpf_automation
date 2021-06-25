import React, {Component} from 'react';
import memoryUtils from "../../utils/memoryUtils";
import {Redirect,Route,Switch} from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";
import Home from '../home/home';
import Category from '../category/category';
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        //如果内存中没有存储user，说明当前没有登录，就要跳转到登录界面
        if(!user||!user.name){
            return <Redirect to='/login'/>
        }
        return (
                <Layout style={{height:'100%'}}>
                    <Sider><LeftNav/></Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style={{margin:20,backgroundColor:'white'}}>
                            <Switch>
                                <Route path="/home" component={Home}/>
                                <Route path="/pie" component={Pie}/>
                                <Route path="/line" component={Line}/>
                                <Route path="/bar" component={Bar}/>
                                <Route path="/task_category" component={Category}/>
                                <Redirect to='/home'/>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign:'center',color:'#cccccc'}}>推荐使用谷歌浏览器</Footer>
                    </Layout>
                </Layout>
        );
    }
}

export default Admin;

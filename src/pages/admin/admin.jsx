import React, {Component} from 'react';
import memoryUtils from "../../utils/memoryUtils";
import {Redirect,Route,Switch} from 'react-router-dom';
import {Alert, Layout} from 'antd';
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";
import Home from '../home/home';
import Category from '../category/category';
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Serviceswitch from "../script/serviceswitch";
import Systemexplain from "../trade/systemexplain";
import Tasktoday from "../task/tasktoday";
import Selfstock from "../trade/selfstock";
import Holdingstock from "../trade/holdingstock";
import DoubleTrackAnalysis from "../trade/replayworkflow/doubleTrackAnalysis";
import ReactWebsocket from "../../components/websocket";
import Tradereason from "../trade/introspection/tradereason";
import * as ReactDOM from "react-dom";
import Narrowbaseindex from "../trade/replayworkflow/narrowbaseindex";
import Industryanalysis from "../trade/replayworkflow/industryanalysis";
import Widebaseindexdaykline from "../trade/replayworkflow/widebaseindexdaykline";
import Widebaseindexweekkline from "../trade/replayworkflow/widebaseindexweekkline";
import Article from "../trade/introspection/article";

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
    onMessage=(msg)=>{
        console.log(msg);
        var divDom = document.createElement("div");
        document.getElementById("container").appendChild(divDom);
        ReactDOM.render(<Alert message={msg} type="success"/>, document.getElementById("container").lastChild);
    }
    onOpen=()=>{
        console.log("开启连接");
    }
    onClose=()=>{
        console.log("关闭连接");
    }

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
                        <div id="container"></div>
                        <ReactWebsocket
                            url='ws://127.0.0.1:8080/websocket/user/lpf'
                            onMessage={this.onMessage} //接受信息的回调
                            onOpen={this.onOpen} //websocket打开
                            onClose={this.onClose} //websocket关闭
                            reconnect={true}
                            debug={true}
                            ref={Websocket => {
                                this.refWebSocket = Websocket;
                            }}
                        />
                        <Header>Header</Header>
                        <Content style={{margin:20,backgroundColor:'white'}}>
                            <Switch>
                                <Route path="/home" component={Home}/>
                                {/*关于复盘的路由组件*/}
                                <Route path="/widebase_index_analysis" component={Industryanalysis}/>
                                {/*关于交易的路由组件*/}
                                <Route path="/trade_system_explain" component={Systemexplain}/>
                                <Route path="/trade_Selfstock" component={Selfstock}/>
                                <Route path="/trade_Holdingstock" component={Holdingstock}/>
                                <Route path="/trade_double_track_analysis" component={DoubleTrackAnalysis}/>
                                <Route path="/trade_wide_base_index_day" component={Widebaseindexdaykline}/>
                                <Route path="/trade_wide_base_index_week" component={Widebaseindexweekkline}/>
                                <Route path="/trade_narrow_base_index" component={Narrowbaseindex}/>

                                {/*关于任务的路由组件*/}
                                <Route path="/task_category" component={Category}/>
                                <Route path="/task_today" component={Tasktoday}/>
                                <Route path="/pie" component={Pie}/>
                                <Route path="/line" component={Line}/>
                                <Route path="/bar" component={Bar}/>
                                {/*关于自省系统的路由组件*/}
                                <Route path="/trade_reason" component={Article}/>
                                {/*关于脚本的路由组件*/}
                                <Route path="/script_service_switch" component={Serviceswitch}/>
                                {/*默认显示的路由组件*/}
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

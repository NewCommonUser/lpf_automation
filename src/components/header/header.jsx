import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Modal } from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import LinkButton from "../link-button/link-button";


import './header.less';
import {findTotalTime} from "../../api/taskApi";
import {priceMonitor} from "../../api/tradeApi";


class Header extends Component {
        state = {
            totaltime:0
        }
        componentDidMount() {
            //获取记录的总时间
            findTotalTime().then((response) => {
                if (response.data.success === true) {
                    //去除类型列表（可能是一级、可能时子级）
                    const data = response.data.result;
                    //更新状态
                    this.setState({totaltime: data});
                }
            }).catch();
        }

        getTitle(){
        const path=this.props.location.pathname;
        // console.log("path的值为"+path);
        let title;
        let array = [{'path':'/bar','name':'哪月哪日'}
            ,{'path':'/home','name':'首页'}
            ,{'path':'/pie','name':'时间流向'}
            ,{'path':'/task_category','name':'任务类型'}
            ,{'path':'/task_today','name':'当日任务'}
            //交易类**********************************
            ,{'path':'/trade_double_track_analysis','name':'双轨分析'}
            ,{'path':'/trade_switch_config','name':'开关配置'}
            ,{'path':'/trade_system_explain','name':'系统说明'}
            ,{'path':'/trade_Selfstock','name':'自选建仓'}
            ,{'path':'/trade_Holdingstock','name':'持有标的'}
            // ,{'path':'/trade_wide_base_index','name':'宽基指数'}
            ,{'path':'/trade_wide_base_index_day','name':'宽基日线'}
            ,{'path':'/trade_wide_base_index_week','name':'宽基周线'}
            ,{'path':'/widebase_index_analysis','name':'板块分析'}
            ,{'path':'/trade_narrow_base_index','name':'窄基指数'}





            //脚本类************************************
            ,{'path':'/script_service_switch','name':'服务开关'}
            // ,{'path':'/trade_switch_config','name':'开关配置'}

        ];
        array.forEach(item=>{
            if(item.path===path){
                title=item.name;
            }
        });
        return title;
    }
    priceMonitor=()=>{
        //执行市价监控脚本
        priceMonitor().then((response) => {
            if (response.data.success === true) {
                //去除类型列表（可能是一级、可能时子级）
                const data = response.data.result;
                alert(data);
                // //更新状态
                // this.setState({totaltime: data});
            }
        }).catch( (err)=>{
            console.log(err.message);
            alert(err);
        })

    }

    logout=()=>{
        Modal.confirm({
            // title: '确定退出吗?',
            content: '确定退出吗?',
            onOk:()=>{
                //删除保存的user
                storageUtils.removeUser();
                memoryUtils.user={};
                //跳转到
                this.props.history.replace('/login');
            },
            // onCancel() {
            //     console.log('取消');
            // },
        });
    }

    render() {
        const title=this.getTitle();
        // console.log("重新渲染时，拿到的title的值为"+title);
        return (
        <div className='header'>
            <div className='header-top'>
                    <span>欢迎，allen</span>
                    {/*<a onClick={this.logout}>退出</a>*/}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        总时间：
                        {this.state.totaltime}
                        <span></span>
                        <LinkButton onClick={this.priceMonitor}>市价监控</LinkButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
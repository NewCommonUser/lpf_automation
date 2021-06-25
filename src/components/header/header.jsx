import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Modal } from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import LinkButton from "../link-button/link-button";


import './header.less';


class Header extends Component {
    getTitle(){
        const path=this.props.location.pathname;
        // console.log("path的值为"+path);
        let title;
        let array = [{'path':'/bar','name':'条形图'}
            ,{'path':'/home','name':'首页'}
            ,{'path':'/pie','name':'饼图'}
            ,{'path':'/task_category','name':'任务类型'}];
        array.forEach(item=>{
            if(item.path===path){
                title=item.name;
            }
        });
        return title;
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
                    <span>欢迎，admin</span>
                    {/*<a onClick={this.logout}>退出</a>*/}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>2021-09-01 10:00:00</span>
                        <img alt='天气'/>
                        <span></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
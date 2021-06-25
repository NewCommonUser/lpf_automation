import React, {Component} from 'react';
import logo_haizei2 from '../../assets/images/logo_haizei2.jpeg';
import {Link,withRouter} from 'react-router-dom';
import { Menu
    // , Button
} from 'antd';
import {
    // AppstoreOutlined,
    // MenuUnfoldOutlined,
    // MenuFoldOutlined,
    PieChartOutlined,
    // DesktopOutlined,
    // ContainerOutlined,
    UnorderedListOutlined,
    MailOutlined,
} from '@ant-design/icons';

import './left-nav.less';
import Category from "../../pages/category/category";

const { SubMenu } = Menu;




/**
 * 左侧导航组件
 */
class LeftNav extends Component {
    render() {
        //得到当前请求的路由路径
        const path=this.props.location.pathname;
        //得到当前请求的路由路径
        // console.log("当前选中的路径"+path);
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo_haizei2} alt='图片'/>
                    <h1>自动化后台</h1>
                </Link>
                <Menu
                    //默认选中的菜单
                    defaultSelectedKeys={[path]}
                    mode="inline"
                    theme="dark"
                    openKeys={['task']}
                >
                    <Menu.Item key="home" icon={<PieChartOutlined />}>
                        <Link to='/home'>
                            首页
                        </Link>
                    </Menu.Item>
                    <SubMenu key="task" icon={<MailOutlined />} title="任务模块">
                        <Menu.Item key="task_category" icon={<UnorderedListOutlined />}>
                            <Link to='/task_category'>
                                任务类型
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="task_pie" icon={<PieChartOutlined />}>
                            <Link to='/pie'>
                                饼图
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="task_bar" icon={<PieChartOutlined />}>
                            <Link to='/bar'>
                                条形图
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>

        );
    }
}

/**
 * withRouter高阶组件：
 * 包装非路由组件，返回一个新的组件，新的组件向非路由组件传递三个属性
 * history/location/match
 */
export default withRouter(LeftNav);
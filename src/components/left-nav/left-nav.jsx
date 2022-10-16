import React, {Component} from 'react';
import hat from '../../assets/images/hat.png';
import {Link,withRouter} from 'react-router-dom';
import { Menu
    // , Button
} from 'antd';
import {
    // AppstoreOutlined,
    // MenuUnfoldOutlined,
    // MenuFoldOutlined,
    StockOutlined,
    SlidersOutlined,
    PieChartOutlined,
    LockOutlined,
    // DesktopOutlined,
    // ContainerOutlined,
    CalendarOutlined,
    UnorderedListOutlined,
    HomeOutlined,
    MailOutlined,
    CodeOutlined,
    PoweroffOutlined,

} from '@ant-design/icons';

import './left-nav.less';
import Category from "../../pages/category/category";
import Holdingstock from "../../pages/trade/holdingstock";
import Industryanalysis from "../../pages/trade/replayworkflow/industryanalysis";

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
                    <img src={hat} alt='图片'/>
                    <h1>自动化后台</h1>
                </Link>
                <Menu
                    //默认选中的菜单
                    defaultSelectedKeys={[path]}
                    mode="inline"
                    theme="dark"
                    defaultOpenKeys={['replay','trade','task','script']}

                >
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to='/home'>
                            首页
                        </Link>
                    </Menu.Item>
                    <SubMenu key="replay"  icon={<StockOutlined />} title="复盘workflow">
                        {/*icon={<SlidersOutlined />}*/}
                        <Menu.Item key="trade_wide_base_index_day" icon={<LockOutlined />}>
                            <Link to='/trade_wide_base_index_day'>
                                宽基日线
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="trade_wide_base_index_week" icon={<LockOutlined />}>
                            <Link to='/trade_wide_base_index_week'>
                                宽基周线
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="widebase_index_analysis" icon={<PoweroffOutlined />}>
                            <Link to='/widebase_index_analysis'>
                                板块分析
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="trade_narrow_base_index" icon={<LockOutlined />}>
                            <Link to='/trade_narrow_base_index'>
                                窄基指数
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="trade"  icon={<StockOutlined />} title="交易系统">
                        {/*icon={<SlidersOutlined />}*/}
                        <Menu.Item key="trade_double_track_analysis" icon={<UnorderedListOutlined />}>
                            <Link to='/trade_double_track_analysis'>
                                双轨分析
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="trade_system_explain" icon={<LockOutlined />}>
                            <Link to='/trade_system_explain'>
                                系统说明
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="trade_Selfstock" icon={<LockOutlined />}>
                            <Link to='/trade_Selfstock'>
                                自选建仓
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="trade_Holdingstock" icon={<LockOutlined />}>
                            <Link to='/trade_Holdingstock'>
                                持有标的
                            </Link>
                        </Menu.Item>

                    </SubMenu>

                    <SubMenu key="task" icon={<MailOutlined />} title="时间回溯">
                        <Menu.Item key="task_category" icon={<UnorderedListOutlined />}>
                            <Link to='/task_category'>
                                任务类型
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="task_pie" icon={<PieChartOutlined />}>
                            <Link to='/pie'>
                                时间流向
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="task_bar" icon={<CalendarOutlined />}>
                            <Link to='/bar'>
                                哪月哪日
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="task_today" icon={<PieChartOutlined />}>
                            <Link to='/task_today'>
                                成绩走势
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="introspection"  icon={<StockOutlined />} title="自省系统">
                        {/*icon={<SlidersOutlined />}*/}
                        <Menu.Item key="trade_reason" icon={<PoweroffOutlined />}>
                            <Link to='/trade_reason'>
                                操作原因
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="trade_lesson" icon={<CodeOutlined />}>
                            <Link to='/trade_lesson'>
                                经验教训
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="script"  icon={<StockOutlined />} title="元数据">
                        {/*icon={<SlidersOutlined />}*/}
                        <Menu.Item key="script_service_switch" icon={<PoweroffOutlined />}>
                            <Link to='/script_service_switch'>
                                思维导图
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="script_2" icon={<CodeOutlined />}>
                            <Link to='/script_2'>
                                任务脚本
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
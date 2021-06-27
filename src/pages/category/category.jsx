import React, {Component} from 'react';
import {Card, Table, Button, Modal,message} from 'antd';
import {ArrowRightOutlined,PlusOutlined} from '@ant-design/icons';
import LinkButton from "../../components/link-button/link-button";
import {reqGetTaskTypeList} from '../../api';
import AddForm from "./add-form";
import UpdateForm from "./update-form";

class Category extends Component {
    /**
     * ①设计状态：
     * A、将任务类型的一级分类，存储到状态里面，如此，更新状态，就可以重新渲染
     * B、loading:是否正在加载数据
     * ②当发起请求后，更新状态
     * @type {{}}
     */
    state={
        loading:false,//是否正在加载数据
        taskTypes:[],//一级任务类型列表
        subTaskTypes:[],//子任务类型列表
        parentId:'0',//当前需要显的分类列表的parentId：默认请求根节点的子节点
        parentName:'',//当前需要显的分类列表的——父分类名称:根节点没有名称，所以初始化为空
        showStatus:0,//一共有三种情况，所以不能用布尔值
        // 标识添加/更新的确认框是否显示,0:都不显示，1：显示添加，2：显示更新
    }
    /**
     * 显示指定一级『任务类型』的『子级类型类』列表
     */
    showSubTaskTypes=(taskType)=>{
        //先更新状态
        this.setState({parentId:taskType.id,parentName:taskType.name},()=>{
            // console.log(this.state.parentId);
            //获取新『父节点』下的子节点『任务类型』
            this.getTaskTypeList();
        });
    }
    /**
     * 显示指定一级『任务类型』列表
     */
    showTaskTypes=()=>{
        this.setState({parentId:'0',parentName:'',subTaskTypes:[]});
    }

    /**
     * 响应点击去下按钮：隐藏modal框
     */
    handleCancel=()=>{
        this.setState({showStatus:0});
    }
    /**
     * 添加任务类型
     */
    addTaskType=()=>{
        console.log("添加任务类型");
    }

    /**
     * 更新任务类型
     */
    updateTaskType=()=>{
        console.log("更新任务类型");
    }
    /**
     * 显示添加的确认框
     */
    showAdd=()=>{
        this.setState({showStatus:1});
    }
    showUpdate=()=>{
        this.setState({showStatus:2});
    }
    /**
     * 为第一次render准备数据，初始化Table所有列的数组
     */
    initColumns=()=>{
        this.columns = [
            {
                title: '类型名称',
                dataIndex: 'name',//指定显示数据对应的属性名
            },
            {
                title: '操作',
                width:300,
                render: (taskType)=>{
                    //返回需要显示的界面标签
                    return(
                        <span>
                            <LinkButton onClick={this.showUpdate}>修改类型</LinkButton>
                            {/*如何向事件回调函数传递参数：先定义一个匿名函数，在函数中调用处理的函数，并传入数据*/}
                            {this.state.parentId==='0'?<LinkButton onClick={()=>this.showSubTaskTypes(taskType)}>查看子类型</LinkButton>:null}
                        {/*    目前只有一级类型，才显示查看子类型，这里的flag可以从后台去取——是否有子类型*/}
                        </span>
                    );
                }
            }
        ];
    }

    /**
     * 异步获取一级或子级任务类型列表
     */
    getTaskTypeList=()=>{
        //请求发送前，显示loading
        this.setState({loading:true});
        const {parentId}=this.state;
        reqGetTaskTypeList(parentId).then((response)=>{

                if(response.data.success===true){
                    //使用antd的message组件显示信息
                    // message.success(response.data.msg);
                    //去除类型列表（可能是一级、可能时子级）
                    const newTypeList=response.data.result;
                    //更新状态
                    if(parentId==='0'){//更新一级类型
                        this.setState({taskTypes:newTypeList});
                    }else{
                        this.setState({subTaskTypes:newTypeList});
                    }
                }
            },).catch( (err)=>{
            alert(err);
        });
        //请求之后，无论成功失败，都没有在加载数据
        this.setState({loading:false});
    }

    /**
     * 执行异步任务：组件挂载后，异步请求表格数据
     */
    componentDidMount() {
        //获取一级任务类型（因为parentId的初始值为0）
        this.getTaskTypeList();
    }

    componentWillMount() {
        // 这个数组定义一次就行
        // 如果把下面的逻辑放到render里面，那么每一次更行数据，都会重新创建columns数组
        this.initColumns();
    }

    render() {
        const {parentId,taskTypes,subTaskTypes,parentName,showStatus} = this.state;
        //card的左侧
        const title=parentId==='0'?'一级分类':(
            <span>
                <LinkButton onClick={this.showTaskTypes}>一级分类列表</LinkButton>

                <ArrowRightOutlined style={{margin:5}}/>

                <span>{parentName}</span>
            </span>
        );
        const extra=(
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined />
                添加
            </Button>
        );



        return (
            <Card title={title} extra={extra} >
                <Table bordered
                       loading={this.loading}
                       rowkey={"id"}
                       dataSource={parentId==='0'?taskTypes:subTaskTypes}
                       columns={this.columns}

                       pagination={{defaultPageSize:10,showQuickJumper:true}}
                />
                {/*定义分页设置：每页10行，可以跳到指定页*/}
                <Modal title="添加类型" visible={showStatus===1} onOk={this.addTaskType} onCancel={this.handleCancel}>
                    <p><AddForm/></p>
                </Modal>

                <Modal title="更新类型" visible={showStatus===2} onOk={this.updateTaskType} onCancel={this.handleCancel}>
                    <p><UpdateForm/></p>
                </Modal>
            </Card>


        );
    }
}
export default Category;
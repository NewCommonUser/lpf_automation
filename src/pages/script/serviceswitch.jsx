import React, {Component} from 'react';
import {Button, Card, Image, Switch} from "antd";
import rabbitmq from '../../assets/images/rabbitmq.png';
import jinrong_dichan from "../../assets/images/jinrong_dichan.png";
import alfred from "../../assets/images/alfred.jpeg";

import Modal from "antd/es/modal/Modal";
import TreeMap from "../../components/tree/treemap";
import tradeMindMap_data from "../../assets/mindmap/tradeMindMap_data";
import data from "../../assets/data";

class Serviceswitch extends Component {

    state={
        showStatus:0,
        info:{
            data: tradeMindMap_data,
            width: 800,
            height: 600,
        },
        alfredInfo:{
            data: data,
            width: 800,
            height: 600,
        }
    }

    handleSwitch=(checked)=>{
        console.log(`switch to ${checked}`);
    }


    openMindMap_trade=()=>{
        this.setState({showStatus:1});
    }
    openMindMap_alfred=()=>{
        this.setState({showStatus:2});
    }


    handleCancel=()=>{
        this.setState({showStatus:0});
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '50%', width: '20%'}}>
                        <div>
                            <Image
                                width={250}
                                height={250}
                                src={rabbitmq}
                            />
                        </div>
                        <div>
                            <Switch defaultChecked onChange={this.handleSwitch} />
                        </div>
                    </Card>

                    <Card style={{height: '50%', width: '20%'}}>
                        <div>
                            <Image
                                width={250}
                                height={250}
                                src={jinrong_dichan}
                            />
                        </div>
                        <div>
                            <Button type="primary" block onClick={this.openMindMap_trade}>
                                交易工程四大子系统
                            </Button>
                        </div>
                    </Card>

                    <Card style={{height: '50%', width: '20%'}}>
                        <div>
                            <Image
                                width={250}
                                height={250}
                                src={alfred}
                            />
                        </div>
                        <div>
                            <Button type="primary" block onClick={this.openMindMap_alfred}>
                                alfred工作流分类
                            </Button>
                        </div>
                    </Card>
                </div>

                <Modal  title="交易工程子系统组成"
                        visible={this.state.showStatus===1}
                        destroyOnClose //设置关闭时销毁
                        width={"1000px"}
                        onCancel={this.handleCancel}>
                    <p>
                        <TreeMap {...this.state.info} />
                    </p>
                </Modal>
                <Modal  title="alfred工作流分类"
                        visible={this.state.showStatus===2}
                        destroyOnClose //设置关闭时销毁
                        width={"1000px"}
                        onCancel={this.handleCancel}>
                    <p>
                        <TreeMap {...this.state.alfredInfo} />
                    </p>
                </Modal>

            </div>
        );
    }
}

export default Serviceswitch;
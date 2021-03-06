import React, {Component} from 'react';
import {Button, Card, Image} from "antd";
import jinrong_dichan from "../../../assets/images/jinrong_dichan.png";
import xiaofei from "../../../assets/images/xiaofei.png";
import zhouqi from "../../../assets/images/zhouqi.png";
import yiliaoyiyao1 from "../../../assets/images/yiliaoyiyao1.jpeg";
import wenhuaxiaofei from "../../../assets/images/wenhuaxiaofei.png";
import ziyuan from "../../../assets/images/ziyuan.png";
import dazongshangpin from "../../../assets/images/dazongshangpin.png";






import Modal from "antd/es/modal/Modal";
import Financialproperty from "./narrow/financialproperty";
import Consumption from "./narrow/consumption";
import Cycleindustry from "./narrow/cycleindustry";
import Wenhuaconsumption from "./narrow/wenhuaconsumption";
import Yiliaoyiyao from "./narrow/yiliaoyiyao";
import Ziyuan from "./narrow/ziyuan";

class Industryanalysis extends Component {

    state={
        showStatus:0,
    }

    componentDidMount() {
        this.setState({showStatus:0});
    }

    openFinancialproperty=()=>{
        this.setState({showStatus:1});
    }
    openConsumption=()=>{
        this.setState({showStatus:2});
    }

    openCycle=()=>{
        this.setState({showStatus:3});
    }

    openyiliaoyiyao=()=>{
        this.setState({showStatus:4});
    }
    openWenhuaConsumption=()=>{
        this.setState({showStatus:5});
    }

    openZiyuan=()=>{
        this.setState({showStatus:6});
    }







    handleCancel=()=>{
        this.setState({showStatus:0});
    }

    render() {
        const {showStatus}=this.state;

        return (
            <div >
                <div style={{display: 'flex'}}>
                    <Card style={{height: '50%', width: '25%'}}>
                        <div>
                            <Image
                                width={250}
                                height={220}
                                src={jinrong_dichan}
                            />
                        </div>
                        <div>
                            <Button type="primary" block onClick={this.openFinancialproperty}>
                                ????????????
                            </Button>
                        </div>
                    </Card>

                    <Card style={{height: '50%', width: '25%'}}>
                        <div>
                            <Image
                                width={250}
                                height={220}
                                src={xiaofei}
                            />
                        </div>
                        <div>
                            <Button type="primary" block onClick={this.openConsumption}>
                                ????????????
                            </Button>
                        </div>
                    </Card>

                    <Card style={{height: '50%', width: '25%'}}>
                        <div>
                            <Image
                                width={250}
                                height={220}
                                src={zhouqi}
                            />
                        </div>
                        <div>
                            <Button type="primary" block onClick={this.openCycle}>
                                ????????????
                            </Button>
                        </div>
                    </Card>

                    <Card style={{height: '50%', width: '25%'}}>
                        <div>
                            <Image
                                width={250}
                                height={220}
                                src={yiliaoyiyao1}
                            />
                        </div>
                        <div>
                            <Button type="primary" block onClick={this.openyiliaoyiyao}>
                                ????????????
                            </Button>
                        </div>
                    </Card>
                </div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '50%', width: '25%'}}>
                        <div>
                            <Image
                                width={250}
                                height={220}
                                src={wenhuaxiaofei}
                            />
                        </div>
                        <div>
                            <Button type="primary" block onClick={this.openWenhuaConsumption}>
                                ????????????
                            </Button>
                        </div>
                    </Card>

                    <Card style={{height: '50%', width: '25%'}}>
                        <div>
                            <Image
                                width={250}
                                height={220}
                                src={ziyuan}
                            />
                        </div>
                        <div>
                            <Button type="primary" block onClick={this.openZiyuan}>
                                ????????????
                            </Button>
                        </div>
                    </Card>

                    <Card style={{height: '50%', width: '25%'}}>
                        <div>
                            <Image
                                width={250}
                                height={220}
                                src={dazongshangpin}
                            />
                        </div>
                        <div>
                            <Button type="primary" block onClick={this.openDazongshangpin}>
                                ????????????
                            </Button>
                        </div>
                    </Card>

                </div>



                <Modal  title="????????????"
                        visible={showStatus===1}
                        destroyOnClose //?????????????????????
                        width={"2000px"}
                        onCancel={this.handleCancel}>
                    <p>
                        <Financialproperty />
                    </p>
                </Modal>

                <Modal  title="????????????"
                        visible={showStatus===2}
                        destroyOnClose //?????????????????????
                        width={"2000px"}
                        onCancel={this.handleCancel}>
                    <p>
                        <Consumption/>
                    </p>
                </Modal>

                <Modal  title="????????????"
                        visible={showStatus===3}
                        destroyOnClose //?????????????????????
                        width={"2000px"}
                        onCancel={this.handleCancel}>
                    <p>
                        <Cycleindustry/>
                    </p>
                </Modal>

                <Modal  title="????????????"
                        visible={showStatus===4}
                        destroyOnClose //?????????????????????
                        width={"2000px"}
                        onCancel={this.handleCancel}>
                    <p>
                        <Yiliaoyiyao/>
                    </p>
                </Modal>

                <Modal  title="????????????"
                        visible={showStatus===5}
                        destroyOnClose //?????????????????????
                        width={"2000px"}
                        onCancel={this.handleCancel}>
                    <p>
                        <Wenhuaconsumption/>
                    </p>
                </Modal>

                <Modal  title="????????????"
                        visible={showStatus===6}
                        destroyOnClose //?????????????????????
                        width={"2000px"}
                        onCancel={this.handleCancel}>
                    <p>
                        <Ziyuan/>
                    </p>
                </Modal>
            </div>
        );
    }
}

export default Industryanalysis;
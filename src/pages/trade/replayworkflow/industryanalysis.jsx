import React, {Component} from 'react';
import {Button, Card, Image} from "antd";
import jinrong_dichan from "../../../assets/images/jinrong_dichan.png";
import xiaofei from "../../../assets/images/xiaofei.png";
import zhouqi from "../../../assets/images/zhouqi.png";
import yiliaoyiyao1 from "../../../assets/images/yiliaoyiyao1.jpeg";



import Modal from "antd/es/modal/Modal";
import Widebaseindexdaykline from "./widebaseindexdaykline";
import Widebaseindexweekkline from "./widebaseindexweekkline";
import Financialproperty from "./narrow/financialproperty";
import Consumption from "./narrow/consumption";

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
    openWeekKLine=()=>{
        this.setState({showStatus:3});
    }
    handleCancel=()=>{
        this.setState({showStatus:0});
    }

    render() {
        const {showStatus}=this.state;

        return (
            <div style={{display: 'flex'}}>
                <Card style={{height: '100%', width: '25%'}}>
                    <div>
                        <Image
                            width={250}
                            height={220}
                            src={jinrong_dichan}
                        />
                    </div>
                    <div>
                        <Button type="primary" block onClick={this.openFinancialproperty}>
                            金融地产
                        </Button>
                    </div>
                </Card>

                <Card style={{height: '100%', width: '25%'}}>
                    <div>
                        <Image
                            width={250}
                            height={220}
                            src={xiaofei}
                        />
                    </div>
                    <div>
                        <Button type="primary" block onClick={this.openWeekKLine}>
                            消费行业
                        </Button>
                    </div>
                </Card>

                <Card style={{height: '100%', width: '25%'}}>
                    <div>
                        <Image
                            width={250}
                            height={220}
                            src={zhouqi}
                        />
                    </div>
                    <div>
                        <Button type="primary" block onClick={this.openWeekKLine}>
                            周期行业
                        </Button>
                    </div>
                </Card>

                <Card style={{height: '100%', width: '25%'}}>
                    <div>
                        <Image
                            width={250}
                            height={220}
                            src={yiliaoyiyao1}
                        />
                    </div>
                    <div>
                        <Button type="primary" block onClick={this.openWeekKLine}>
                            医疗医药
                        </Button>
                    </div>
                </Card>


                <Modal  title="金融地产"
                        visible={showStatus===1}
                        destroyOnClose //设置关闭时销毁
                        width={"2000px"}
                        onCancel={this.handleCancel}>
                    <p>
                        <Financialproperty />
                    </p>
                </Modal>

                <Modal  title="消费行业"
                        visible={showStatus===3}
                        destroyOnClose //设置关闭时销毁
                        width={"2000px"}
                        onCancel={this.handleCancel}>
                    <p>
                        <Consumption/>
                    </p>
                </Modal>
            </div>
        );
    }
}

export default Industryanalysis;
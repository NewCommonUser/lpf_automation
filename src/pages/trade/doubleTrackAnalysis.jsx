import React, {Component} from 'react';
import {Card, Image, Switch, Button, Modal} from "antd";
import rationalThinking from '../../assets/images/rationalThinking.png';
import etf from '../../assets/images/etf.png';

import Message from "../common/message";

class DoubleTrackAnalysis extends Component {
    state={
        showStatus:0,
    }
    openRationalAnalysisMessage=()=>{
        this.setState({showStatus:1});
    }
    openEtf5DayMessage=()=>{
        this.setState({showStatus:2});
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
                                src={rationalThinking}
                            />
                        </div>
                        <div>
                            <Button type="primary" block onClick={this.openRationalAnalysisMessage}>
                                持仓理性分析（当日）
                            </Button>
                        </div>
                    </Card>
                    <Card style={{height: '100%', width: '25%'}}>
                        <div>
                            <Image
                                width={250}
                                height={220}
                                src={etf}
                            />
                        </div>
                        <div>
                            <Button type="primary" block onClick={this.openEtf5DayMessage}>
                                etf突破跌破（5日）
                            </Button>
                        </div>
                    </Card>


                    <Modal  title="持仓理性建议"
                            visible={showStatus===1}
                            destroyOnClose //设置关闭时销毁
                            width={1000}
                        // okButtonProps={{htmlType: 'submit', form: 'editForm'}}
                            onCancel={this.handleCancel}>
                        <p>
                            <Message datasource={"holdingStockCheck"}/>

                        </p>
                    </Modal>

                    <Modal  title="etf五日均线突破跌破信息"
                            visible={showStatus===2}
                            destroyOnClose //设置关闭时销毁
                            width={1000}
                            onCancel={this.handleCancel}>
                        <p>
                            <Message datasource={"etf5Day"}/>
                        </p>
                    </Modal>
                </div>
        );
    }
}

export default DoubleTrackAnalysis;
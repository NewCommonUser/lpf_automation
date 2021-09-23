import React, {Component} from 'react';
import {Button, Card, Image} from "antd";
import etf from "../../../assets/images/etf.png";

class Narrowbasekline extends Component {
    state={
        showStatus:0,
    }


    /**
     * 打开大消费页面
     */
    openConsumerIndustry=()=>{
        this.setState({showStatus:1});
    }

    /**
     * 打开大消费页面
     */
    openPeriodicIndustry=()=>{
        this.setState({showStatus:2});
    }



    render() {
        return (
            <div>
                <Card style={{height: '100%', width: '25%'}}>
                    <div>
                        <Image
                            width={250}
                            height={220}
                            src={etf}
                        />
                    </div>
                    <div>
                        <Button type="primary" block onClick={this.openConsumerIndustry}>
                            消费板块
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
                        <Button type="primary" block onClick={this.openPeriodicIndustry}>
                            周期板块
                        </Button>
                    </div>
                </Card>


            </div>
        );
    }
}

export default Narrowbasekline;
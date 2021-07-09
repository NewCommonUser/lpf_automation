import React, {Component} from 'react';
import {Card,Image,Switch} from "antd";
import rabbitmq from '../../assets/images/rabbitmq.png';

class Serviceswitch extends Component {
    handleSwitch=(checked)=>{
        console.log(`switch to ${checked}`);

    }
    render() {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <Card style={{height: '100%', width: '25%'}}>
                        <div>
                            <Image
                                width={250}
                                src={rabbitmq}
                            />
                        </div>
                        <div>
                            <Switch defaultChecked onChange={this.handleSwitch} />
                        </div>
                    </Card>
                </div>

            </div>
        );
    }
}

export default Serviceswitch;
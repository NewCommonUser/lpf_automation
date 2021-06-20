/**
 * 应用的根组件：如果有状态，就用类定义
 */

import React, {Component} from 'react';
import { Button,message } from 'antd';


class App extends Component {
    handleOnClick = (event)=>{
        message.success(event.target.text);
        message.warn(event.target.text);
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.handleOnClick}>Text Button</Button>
                <Button type="danger">Link Button</Button>
            </div>
        );
    }
}

export default App;

import React, {Component} from 'react';
import './home.less';
import Test from "./test";
import Arrtest from "./arrtest";

/**
 * 在react中使用d3
 * http://react-d3-library.github.io/
 */
class Home extends Component {
    render() {
        return (<div className="home">
            {/*<div><BarChart data={[5, 10, 1, 3]} size={[500, 500]}/></div>*/}
            {/*<div><Test/>1111</div>*/}
            <div><Arrtest/></div>
        </div>)
    }
}

export default Home;
import React, {Component} from 'react';
import * as d3 from "d3";

class Arrtest extends Component {

    componentDidMount() {
        this.createArrChart();
    }
    componentDidUpdate() {
        this.createArrChart();
    }

    createArrChart=()=> {
        const data = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8];
        const wrapper = this.node;
        const level1=d3.select(wrapper);
        console.log(level1);
        const level2=level1.selectAll("div.h-bar");
        console.log(level2);
        const level3=level2.data(data);
        console.log(level3);
        const level4=level3.enter();
        console.log(level4);
    }

    render() {
        return <div ref={node => this.node = node} ></div>
    }
}

export default Arrtest;
import React, {Component} from 'react';
import * as d3 from 'd3';
import {getIndustry_consumption} from "../../api/tradeApi";


/**
 * d3的api文档，你可以直到你需要引入什么模块
 * https://www.wenjiangs.com/docs/d3js-guide
 */
class Test extends Component {

    componentDidMount() {
        this.createBarChart();
    }
    componentDidUpdate() {
        this.createBarChart();
    }

    createBarChart=()=> {
        const node = this.node;
        const selection=d3.select(node);
        console.log(selection);
        const width = 600, height = 500;
        const svg=selection.append("svg");
        svg.attr("height", height).attr ('width',width);

        svg.append("circle" )  // <-B
           .attr("cx",  200).attr("cy", 150).attr("r", 50);

        svg.append("rect" ).attr("x", 300)
            .attr("y", 100) .attr("width" , 100).attr("height", 100).attr("rx", 5); // <-E
    }

    render() {
        return <div ref={node => this.node = node} ></div>
    }
}

export default Test;
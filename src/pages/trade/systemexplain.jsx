import React, {Component} from 'react';
import GGEditor, { Flow,Mind } from 'gg-editor';
import G6 from "@antv/g6";
 import { isObject } from '@antv/util';
 import TreeMap from "../../components/tree/treemap";
 import data from "../../assets/data";

/**
 * g6官网
 * 在react中使用g6
 * https://www.yuque.com/antv/g6/zmfur7
 */
class Systemexplain extends Component {

    info = {
        data: data,
        width: 1000,
        height: 800,
    }

    render() {
        return (
            <TreeMap {...this.info} />
        );
    }

    // render() {
    //
    //     const data = {
    //         label: 'Central Topic',
    //         children: [
    //             {
    //                 label: 'Main Topic 1',
    //             },
    //             {
    //                 label: 'Main Topic 2',
    //             },
    //             {
    //                 label: 'Main Topic 3',
    //             },
    //         ],
    //     };
    //     return (
    //     <GGEditor>
    //         <Mind style={{ width: 800, height: 800 }} data={data} />
    //     </GGEditor>
    //     );
    // }
}

export default Systemexplain;








//
// <a href={"brain://api.thebrain.com/bUflm3LL4kWN8ahyCYNU-g/YlnCKhj5KES9GFlN_0IJpw/原理成本情绪耐心管理系统"}>1.交易系统『原理说明』</a>
// <br></br>
// <br></br>
// <a href={"brain://api.thebrain.com/bUflm3LL4kWN8ahyCYNU-g/t5Dya5Y1H0Gw5J2lZ15Ujg/使用经验教训成本情绪耐心管理系统"}>2.交易系统『使用教训』</a>
// <br></br>
// <br></br>
// <a href={"brain://api.thebrain.com/bUflm3LL4kWN8ahyCYNU-g/j6r9mP5GaUCsplL1wkaZbQ/实现成本情绪耐心管理系统"}>2.交易系统『代码实现』</a>
// <br></br>
// {"高增长就可以给高估值。递增长就只能给低估值"}
// {"3年10倍"}
// {"每年如果增长100%，那么3年可以将200倍pe降到20倍（那么我们可以按每年50%的收益去买入，可以倒推出现在的股价）"}
// {"每年如果增长10%，那么3年可以将20倍pe降到15倍/"}
// <br></br>
// 待办事项：
//                 1.自省系统(1.操作日志记录：操作理由、经验教训)
// ①编写自行板块、页面（添加关系：从理由、教训关联——操作）
// ②查看关系：在操作日志中，显示查看理由、教训列表页面（如果该操作日志有教训记录）
//                 2.反身性于均线分析(因为认识函数y=f(x),参与函数x=F(y)，所以y=f(F(y)),x=F(f(x)))
// (①WHY：为什么均线强度，年线>季线>周线？=>人和，识别短期均线的人，也会识别长期均线，也即是向下兼容。
//                     但是做长线的，是不会将短期均线视做信号，也就不会进行认识函数的执行。结论：当更长期的均线突破时，
//                     会有更多的人执行认识函数，更多的人执行参与函数。（兄弟【短期、中期、长期的兄弟】齐心）这里就是人和了)
// ②x为情景，y位认知。情景x通过认识函数f刷新了人们的认知y，认知y又通过参与函数F改变了情景x
// A、(价格)经过认识函数=>得出对趋势的认识——也就是对趋势的偏向 B、（实际的趋势和偏向）经过参与函数=>产生了新的价格
//                 ③为什么收盘价远比每天的其它报价重要？
//                 因为收盘价才是博弈的结果，才能被视为信号（当然如果你能结合具体情况，根据当天的大势，分析出当天的博弈结果，
//                 那么对于当天的振幅也能有所精细化的操作和收入），只有信号才会被作为认识函数的的参数，影响到随后的历史进程
//
// 3.我的优势？
// ①方向：读书多，从众多的解决方案中选择
//                     ①可能性：读书多，可以从各个维度自省、提高？
// ②韧性：不屈不饶，不达目的，誓不罢休
//                     ③坚持：坚持不懈
//                     ④盲点：跨流派、跨学科、跨观点（左右互搏，化学反应）——消除盲点
// 2.宽基作为买卖标的时，任何时候都不应该记入风险标的？
//                 2.返回需要进行持久化的证券标的（可能是新加入自选表的，没有60周均线的持久化，只有runner持久化的数据）：
//                 {"select stock_id,stock_name,count(*) as logNum from t_history_day_price group by stock_name,stock_id having logNum<30"}
// 3.机会标记
// 2.是否显示均线压力信息
// //3.任务三：日内——检查均线压力？
// //if(false){
// //List<Message> messages_minuteByMinute=minuteByMinuteChartCheck();
// //messages_holdingCheck.addAll(messages_minuteByMinute);
//
//
//
// }
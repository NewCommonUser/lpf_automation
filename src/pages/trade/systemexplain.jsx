import React, {Component} from 'react';

class Systemexplain extends Component {
    render() {
        return (
            <div>
                <a href={"brain://api.thebrain.com/bUflm3LL4kWN8ahyCYNU-g/YlnCKhj5KES9GFlN_0IJpw/原理成本情绪耐心管理系统"}>1.交易系统『原理说明』</a>
                <br></br>
                <br></br>
                <a href={"brain://api.thebrain.com/bUflm3LL4kWN8ahyCYNU-g/t5Dya5Y1H0Gw5J2lZ15Ujg/使用经验教训成本情绪耐心管理系统"}>2.交易系统『使用教训』</a>

                <br></br>
                <br></br>
                <a href={"brain://api.thebrain.com/bUflm3LL4kWN8ahyCYNU-g/j6r9mP5GaUCsplL1wkaZbQ/实现成本情绪耐心管理系统"}>2.交易系统『代码实现』</a>
                <br></br>
                {"高增长就可以给高估值。递增长就只能给低估值"}
                {"3年10倍"}
                {"每年如果增长100%，那么3年可以将200倍pe降到20倍（那么我们可以按每年50%的收益去买入，可以倒推出现在的股价）"}
                {"每年如果增长10%，那么3年可以将20倍pe降到15倍/"}
                <br></br>
                待办事项：
                1.上证50、沪深300、中证500、中证1000的k线，react展现
                2.板块强弱
                3.
                1.返回需要进行持久化的证券标的（可能是新加入自选表的，没有60周均线的持久化，只有runner持久化的数据）：
                {"select stock_id,stock_name,count(*) as logNum from t_history_day_price group by stock_name,stock_id having logNum<30"}
                3.机会标记
                2.是否显示均线压力信息
                5.建仓检查历史数据准备:positionBuildCheck_historyDataPrepare——持久化每周数据
                6.建仓检查历史数据准备：的方法的意义
                //3.任务三：日内——检查均线压力？
                //if(false){
                //List<Message> messages_minuteByMinute=minuteByMinuteChartCheck();
                //messages_holdingCheck.addAll(messages_minuteByMinute);



            }

            </div>
        );
    }
}

export default Systemexplain;
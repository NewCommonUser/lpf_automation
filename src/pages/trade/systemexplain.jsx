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
                <br></br>
                待办事项：
                1.五周均线引入
                //    select min(highest_price),WEEK(date_shoupan) from (select * from t_history_day_price where date_shoupan like '2021%')t group by stock_name,WEEK(date_shoupan) having stock_name='三一重工' order by WEEK(date_shoupan) desc
                2.是否显示均线压力信息
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
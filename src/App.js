/**
 * 应用的根组件：如果有状态，就用类定义
 */

import React, {Component} from 'react';
import {
    // HashRouter,
    BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {/* Switch:匹配第一个 */}
                    {/*<Route component={Login} path='/login'></Route>*/}
                    <Route component={Admin} path='/'></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;

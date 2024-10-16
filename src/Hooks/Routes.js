import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import { useApp } from "../Data/AppContext";
import {
    MainPage,
    Workpalces,
    Staking,
    Market,
    Swap,
} from "../Containers";

const history = createBrowserHistory();

export const useRoutes = () => {
    const { isAuthenticated } = useApp();

    if (isAuthenticated) {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/workplace" component={Workpalces} />
                    <Route path="/workplace/:id" component={Workpalces} />
                    <Route exact path="/inventory" component={Staking} />
                    <Route exact path="/free-mint" component={Market} />
                    <Route exact path="/craft" component={Swap} />
                    {/* <Route exact path="/research" component={Research} /> */}
                    <Redirect to="/workplace" />
                </Switch>
            </Router>
        );
    }

    return (
        <Switch>
            <Route exact path="/" component={MainPage} />
            {/* <Redirect to="/" /> */}
        </Switch>
    );
};

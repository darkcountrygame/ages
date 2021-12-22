import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useApp } from "../Data/AppContext";
import {
    MainPage,
    Workpalces,
    Inventory,
    Market,
    Research,
} from "../Containers";

export const useRoutes = () => {
    // const { isAuthenticated} = useApp();


    return (
        <Switch>
            <Route exact path="/">
                <MainPage />
            </Route>

            <Route exact path="/workpalces">
                <Workpalces />
            </Route>

            <Route exact path="/inventory">
                <Inventory />
            </Route>

            <Route exact path="/market">
                <Market />
            </Route>

            <Route exact path="/research">
                <Research />
            </Route>

            <Redirect to="/workpalces" />
        </Switch>
    );
};
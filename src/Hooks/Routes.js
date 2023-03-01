import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

 import { useApp } from "../Data/AppContext";
import {
    MainPage,
    Workpalces,
    Staking,
    Swap,
    Market,
    Research,
} from "../Containers";

export const useRoutes = () => {
     const {isAuthenticated} = useApp();

     if (isAuthenticated){
         return (
             <Switch>
                 <Route exact path="/workpalces">
                     <Workpalces />
                 </Route>

                 <Route exact path="/inventory">
                     <Staking />
                 </Route>

                 <Route exact path="/upgrade">
                     <Market />
                 </Route>

                 <Route exact path="/swap">
                     <Swap />
                 </Route>

                 <Route exact path="/research">
                     <Research />
                 </Route>

                 <Redirect to="/workpalces" />
             </Switch>
         )
     }


    return (
        <Switch>
            <Route exact path="/">
                <MainPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};
import React from "react";
import { Router ,Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

 import { useApp } from "../Data/AppContext";
import {
    MainPage,
    Workpalces,
    Staking,
    Swap,
    Market,
    Research,
} from "../Containers";

const history = createBrowserHistory();

export const useRoutes = () => {
     const {isAuthenticated} = useApp();


     if (isAuthenticated){
         return (
             <Router history={history}>
                 <Switch>
                     <Route exact path="/workplaces">
                         <Workpalces />
                     </Route>

                     <Route exact path="/workplaces/:id">
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

                     <Redirect exact to="/workplaces" />
                 </Switch>
             </Router>

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
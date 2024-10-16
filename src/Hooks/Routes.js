import React from "react";
import { Router ,Route, Switch, Redirect } from "react-router-dom";
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
     const {isAuthenticated} = useApp();

     if (isAuthenticated){
         return (
             <Router history={history}>
                 <Switch>
                     <Route exact path="/workplace">
                         <Workpalces />
                     </Route>

                     <Route exact path="/workplace/:id">
                         <Workpalces />
                     </Route>

                     <Route exact path="/inventory">
                         <Staking />
                     </Route>

                     <Route exact path="/free-mint">
                         <Market />
                     </Route>

                    <Route exact path="/craft">
                         <Swap />
                     </Route>

                       {/* <Route exact path="/research">
                         <Research />
                     </Route> */}

                     <Redirect exact to="/workplace" />
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
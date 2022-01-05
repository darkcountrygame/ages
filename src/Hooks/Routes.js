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
     const { isAuthenticated} = useApp();

     if (isAuthenticated){
         return (
             <Switch>
                 <Route exact path="/workpalces">
                     <Workpalces />
                 </Route>

                 <Route exact path="/inventory">
                     <Market />
                 </Route>

                 <Route exact path="/market">
                     <Inventory />
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
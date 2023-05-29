import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.css'
import {initRouter} from "./router/initRouter";
import {RouterContext, RouterView} from "mobx-state-router";
import {viewMap} from "./router/viewMap";

const App = () => {
    const{store} = useContext(Context);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            store.checkAuth();
        }
    },[])
    const routerStore = initRouter();

    if(store.isLoading) {
        return (
            <div>
            </div>
        )
    }
    return(
        <RouterContext.Provider value={routerStore}>
            <RouterView viewMap={viewMap}/>
        </RouterContext.Provider>
    )
}

export default observer(App);

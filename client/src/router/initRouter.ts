import {
    browserHistory,
    createRouterState,
    HistoryAdapter,
    RouterStore
} from "mobx-state-router";

const notFound = createRouterState('notFound');

export const routes = [
    {
        name: 'home',
        pattern: '/'
    },
    {
        name: 'login',
        pattern: '/login'
    },
    {
        name: 'notFound',
        pattern: '/not-found',
    },
    {
        name: 'admin',
        pattern: '/admin'
    }
];

export function initRouter() {
    const routerStore = new RouterStore(routes, notFound);

    const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
    historyAdapter.observeRouterStateChanges();

    return routerStore;
}
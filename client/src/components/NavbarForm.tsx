import React, {FC, useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import 'bootstrap/dist/css/bootstrap.css'
import {useRouterStore} from "mobx-state-router";


const NavBar: FC = () => {
    const routerStore = useRouterStore();
    const {store} = useContext(Context);
    const AuthCheck = () => {
        return store.isAuth;
    }
    const AdminCheck = () => {
        return store.user.role == 2;
    }
    const ActivationCheck = () => {
        return store.user.isActivated;
    }

    return (
        <header>
            <nav className="navbar navbar-light">
                <div className="container">
                    <a className="navbar-brand text-light">Music service</a>
                    <span className='navbar-text text-light'>{store.isAuth? `Добро пожаловать, ${store.user.email}!` : 'Авторизуйтесь'}</span>
                    <span className='navbar-text text-light'>{(!ActivationCheck() && AuthCheck())?'Активируйте почту':''}</span>
                    <div className="d-flex">
                        <button className={AdminCheck()?'btn btn-primary':'d-none'}
                                onClick={() => routerStore.goTo('admin')}
                        >
                            Панель администратора
                        </button>
                        {/*<button className={AuthCheck()?'btn btn-outline-secondary':'d-none'}>
                            Личный кабинет
                        </button>*/}
                        <button className= {AuthCheck()?'d-none':"btn btn-outline-success"}
                                onClick={
                            () => routerStore.goTo('login')
                        }>
                            Войти
                        </button>
                        <button className= {!AuthCheck()?'d-none':"btn btn-outline-light"}
                                onClick={() => store.logout()}>
                            Выйти
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default observer(NavBar);
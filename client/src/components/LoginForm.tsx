import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import '../styles/styles.css';
import {useRouterStore} from "mobx-state-router";
import NavBar from "./NavbarForm";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);
    const routerStore = useRouterStore();

    const handleLogin = () => {
        store.login(email, password)
            .then(value => {
                if (value != undefined)
                    routerStore.goTo('home');
            })
    }

    const handleRegistration = () => {
        store.registration(email, password)
            .then(value => {
                if (value != undefined)
                    routerStore.goTo('home');
            })
    }

    if (store.isAuth) routerStore.goTo('home');


    return (
        <div>
            <NavBar/>
            <div id='login-form' className='w-25 container text-center bg-opacity-50 bg-dark'>
                <div className='mb-3'>
                    <label className='form-label'>Почта:</label>
                    <input className='form-control'
                           onChange={e => setEmail(e.target.value)}
                           value={email}
                           type="text"
                           placeholder='Email'
                    />
                </div>
                <div className="mb-3">
                    <label className='form-label'>Пароль:</label>
                    <input className='form-control'
                           onChange={e => setPassword(e.target.value)}
                           value={password}
                           type="password"
                           placeholder='Пароль'
                    />
                </div>
                <div className="mb-3">
                    <button className='btn btn-primary' onClick={() => handleLogin()}>
                        Логин
                    </button>
                    <button className='btn btn-primary' onClick={() => handleRegistration()}>
                        Регистрация
                    </button>
                </div>
                <p id='inputs'></p>
            </div>
        </div>
    );
};

export default observer(LoginForm);
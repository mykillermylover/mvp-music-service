import {observer} from "mobx-react-lite";
import React, {FC, useContext, useEffect, useState} from "react";
import {IUser} from "../models/IUser";
import UserService from "../services/UserService";
import {useRouterStore} from "mobx-state-router";
import LogService from "../services/LogService";
import {LogResponse} from "../models/response/LogResponse";
import {Context} from "../index";
import '../styles/home-form-style.css'

const AdminPanelForm: FC = () => {
    const {store} = useContext(Context);
    const routerStore = useRouterStore();
    const [users, setUsers] = useState<IUser[]>([]);
    const [logs, setLogs] = useState<LogResponse[]>([]);

    async function setUserRole(email: string, role: number) {
        try {
            const response = await UserService.setUserRole(email, role);
            alert(`Роль пользователя ${email} изменена!`);
        } catch (e) {
            alert(e);
        }
    }

    function getDate(date: Date) {
        const dat = date.toString().split('Z');
        const dt = dat[0].split('T');
        return dt[0] + ' at ' + dt[1];
    }

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await UserService.fetchUsers();
                console.log(response);
                setUsers(response.data);
            } catch (e: any) {
                console.log(e);
                // @ts-ignore
                document.getElementById('status').innerHTML = e.response?.data?.message;
            }
        }

        getUsers();

        async function getLogs() {
            try {
                const response = await LogService.fetchLogs();
                setLogs(response.data);
                console.log(response.data);

            } catch (e: any) {
                // @ts-ignore
                document.getElementById('status').innerHTML = e.response?.data?.message;
            }
        }

        getLogs();
    }, []);

    return (
        <div>
            <span className='text-center mt-5' id='status'></span>
            <div className={store.isAuth?(store.user.role == 2? 'd-block':'d-none'):'d-none'}>
                <header>
                    <nav className="navbar navbar-light ">
                        <div className="container">
                            <a className="navbar-brand text-light">Music service</a>
                            <span
                                className='navbar-text text-light'>{store.isAuth ? `Добро пожаловать в панель администратора, ${store.user.email}!` : 'Авторизуйтесь'}</span>
                            <form className="d-flex">
                                <button className={"btn btn-outline-light"}
                                        onClick={
                                            () => routerStore.goTo('home')
                                        }>
                                    Домашняя страница
                                </button>
                            </form>
                        </div>
                    </nav>
                </header>
                <h3 className='text-center text-light mt-3 h3adm'>Пользователи:</h3>
                <table className='table text-light border container'>
                    <thead>
                    <tr>
                        <th scope='col'>Имя</th>
                        <th scope='col'>Активирован?</th>
                        <th scope='col'>Роль</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) =>
                        <tr key={user.email}>
                            <th scope='row'>{user.email}</th>
                            <th>{user.isActivated ? 'Да' : 'Нет'}</th>
                            <th>
                                <input type='radio'
                                       className='btn-check'
                                       name={`${user.email}options`}
                                       id={`opt1${user.email}`}
                                       autoComplete='off'
                                       defaultChecked={user.role == 0}
                                       onChange={() => {
                                           setUserRole(user.email, 0)
                                       }}
                                />
                                <label className='btn btn-outline-secondary me-1' htmlFor={`opt1${user.email}`}>
                                    Пользователь
                                </label>

                                <input type='radio'
                                       className='btn-check'
                                       name={`${user.email}options`}
                                       id={`opt2${user.email}`}
                                       autoComplete='off'
                                       defaultChecked={user.role == 1}
                                       onChange={() => {
                                           setUserRole(user.email, 1)
                                       }}
                                />
                                <label className='btn btn-outline-primary me-1' htmlFor={`opt2${user.email}`}>
                                    Модератор
                                </label>

                                <input type='radio'
                                       className='btn-check'
                                       name={`${user.email}options`}
                                       id={`opt3${user.email}`}
                                       autoComplete='off'
                                       defaultChecked={user.role == 2}
                                       onChange={() => {
                                           setUserRole(user.email, 2)
                                       }}
                                />
                                <label className='btn btn-outline-danger' htmlFor={`opt3${user.email}`}>
                                    Администратор
                                </label>
                            </th>
                        </tr>
                    )}
                    </tbody>
                </table>

                <h3 className='text-center h3adm text-light mt-3'>Логи:</h3>
                <table className='table text-light border container'>
                    <thead>
                    <tr>
                        <th scope='col'>Время</th>
                        <th scope='col'>Сообщение</th>
                        <th scope='col'>Пользователь</th>
                        <th scope='col'>Код</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs.map((log) =>
                        <tr key={log._id}>
                            <th scope='row'>{getDate(log.timestamp)}</th>
                            <th>{log.message}</th>
                            <th>{log.meta?.res?.body?.user?.email}</th>
                            <th>{log.meta.res.statusCode}</th>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default observer(AdminPanelForm);
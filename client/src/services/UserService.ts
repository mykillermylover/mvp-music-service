import $api from "../http";
import {AxiosResponse} from 'axios';
import {IUser} from "../models/IUser";

export default class UserService {
    static fetchUsers():Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }
    static setUserRole(email: string, role:number):Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>('/set-user-role', {email, role});
    }
}

import {AxiosResponse} from "axios";
import $api from "../http";
import {LogResponse} from "../models/response/LogResponse";


export default class LogService {
    static fetchLogs():Promise<AxiosResponse<LogResponse[]>> {
        return $api.get<LogResponse[]>('/logs');
    }
}
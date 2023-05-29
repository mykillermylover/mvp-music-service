import {IUser} from "../IUser";

export interface LogResponse {
    _id: string,
    timestamp: Date,
    message: string,
    meta: {
        res: {
            body :{
                user: {
                    email: string
                }
            },
            statusCode: number
        }
    }
}
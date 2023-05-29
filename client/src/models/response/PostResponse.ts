import {IUser} from "../IUser";

export interface PostResponse {
    post: {
        _id: string;
        user: IUser;
        date: Date;
        name: string;
        description: string;

    };
    postToTracks : {
       track: {
           _id: string,
           name: string
       }
    }[]
    postToComments: {
        comment: {
            _id: string,
            user: string,
            timestamp: Date,
            text: string
        }
    }[]
}
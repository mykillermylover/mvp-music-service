import $api from "../http";


export default class CommentService {
    static async deleteComment(comment: { _id: string; user: string; timestamp: Date; text: string; }):Promise<void> {
        return $api.post('/delete-comment', {comment});
    }
}
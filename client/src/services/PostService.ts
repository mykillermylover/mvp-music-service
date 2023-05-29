import $api, {API_URL} from "../http";
import axios, {AxiosResponse} from "axios";
import {PostResponse} from "../models/response/PostResponse";
import {SPost} from "../models/SPost";

export default class PostService {
    static async createPost(email: string, name: string, description: string, files: File[]): Promise<AxiosResponse<PostResponse>> {
        return  axios.post(`${API_URL}/create-post`,{email, name, description, ...files},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-type':'multipart/form-data',
            }
        });
    }

    static async deletePost(post: PostResponse): Promise<void> {
        return $api.post(`/delete-post/${post.post._id}`, {});
    }

    static async fetchPosts(): Promise<AxiosResponse<PostResponse[]>> {
        return $api.get<PostResponse[]>('/posts');
    }

    static async updatePost(post:SPost): Promise<AxiosResponse> {
        // @ts-ignore
        return $api.put(`/update-post`, {post});
    }

    static async createComment(post: SPost, text:string) {
        return $api.post('/create-comment', {post, text});
    }
}
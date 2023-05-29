import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import PostService from "../services/PostService";
import {PostResponse} from "../models/response/PostResponse";
import {SPost} from "../models/SPost";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    post = {} as SPost;

    constructor() {
        makeAutoObservable(this);
    }
    setPost(post: PostResponse) {
        this.post.name = post.post.name;
        this.post.description = post.post.description;
        this.post.tracks = [];
        for(const track of post.postToTracks) {
            this.post.tracks.push({_id: track.track._id, name: track.track.name});
            console.log(track.track._id);
        }
        this.post._id = post.post._id;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user:IUser) {
        this.user = user;
    }

    async login(email:string,password:string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token',response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            const inputs = document.getElementById('inputs');
            // @ts-ignore
            inputs.innerHTML = e.response?.data?.message;
        }
    }

    async registration(email:string,password:string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response);
            localStorage.setItem('token',response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            const inputs = document.getElementById('inputs');
            // @ts-ignore
            inputs.innerHTML = e.response?.data?.message;
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            console.log(response);
            localStorage.setItem('token',response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async createPost(email: string, name: string, description: string, files: any) {
        try {
            if(files) {
                const formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                    console.log(files[i].name);
                    formData.append('tracks', files[i]);
                }
                files = formData.getAll('tracks');
            }
            console.log(files);
            const response = await PostService.createPost(email, name, description, files);
            console.log(response);
            return response;
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async deletePost(post: PostResponse) {
        try {
            const response = await PostService.deletePost(post);
            console.log(response);
            return response;
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async updatePost(post: SPost) {
        try {
            const response = await PostService.updatePost(post);
            return response;
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    removeTrack(OtherTrack: {_id: string, name: string }) {
        let i = 0;
        for(const track of this.post.tracks) {
            if(track.name == OtherTrack.name) {
                this.post.tracks.splice(i,1);
                break;
            }
            i++;
        }
        console.log(this.post.tracks);
    }

}
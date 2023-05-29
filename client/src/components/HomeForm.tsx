import {observer} from "mobx-react-lite";
import React, {FC, useContext, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import {Context} from "../index";
import PostService from "../services/PostService";
import {PostResponse} from "../models/response/PostResponse";
import ChangePostForm from "./ChangePostForm";
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.css';
import CommentService from "../services/CommentService";
import '../styles/home-form-style.css'

const HomeForm: FC = () => {
    const {store} = useContext(Context);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [files, setFiles] = useState();
    const [comment, setComment] = useState<string>('');

    function getDate(date: Date) {

        const dat = Date.parse(date.toString());
        return (new Date(dat)).toString();
    }

    const AdminCheck = () => {
        return store.user.role == 2;
    }
    const ModerCheck = () => {
        return store.user.role == 1;
    }

    async function deleteComment(comment: { _id: string; user: string; timestamp: Date; text: string; }) {
        try {
            const response = await CommentService.deleteComment(comment);
            getPosts();
        } catch (e) {
            alert(e);
        }
    }

    async function createPost() {
        try {
            const response = await store.createPost(store.user.email, name, description, files);
            alert('Пост создан!');
            getPosts();
        } catch (e) {
            alert(e);
        }
    }

    async function deletePost(post: PostResponse) {
        try {
            const response = await store.deletePost(post);
            getPosts();
        } catch (e) {
            alert(e);
        }
    }

    async function sendComment(post: PostResponse) {
        try {
            store.setPost(post);
            const response = await PostService.createComment(store.post, comment);
            getPosts();
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    async function getPosts() {
        try {
            const response = await PostService.fetchPosts();
            setPosts(response.data);
        } catch (e: any) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div>
            <ChangePostForm/>
            <div className={store.isAuth?'container mt-3 mb-3':'d-none'}>
                <button className='btn btn-primary'
                        type='button' data-bs-toggle='collapse'
                        data-bs-target='#createPost'
                        aria-expanded='false'
                        aria-controls='createPost'
                        id='home-form'>Создать пост
                </button>
                <div className="collapse" id='createPost'>
                    <div className='card card-body w-50 mt-3 mb-3'>
                        <div className='mb-3'>
                            <label htmlFor="nameControl" className='form-label'>Название поста:</label>
                            <input id='nameControl'
                                   className='form-control'
                                   onChange={e => setName(e.target.value)}
                                   value={name}
                                   type="text"
                                   placeholder='Крутой пост!'
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descriptionControl" className='form-label'>Описание:</label>
                            <textarea id='descriptionControl'
                                      className='form-control' rows={3}
                                      onChange={e => setDescription(e.target.value)}
                                      value={description}
                                      placeholder='Ну что тут сказать, ну очень крутой'
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="send" className='form-label'>Прикрепите музыку</label>
                            <input id='send' className='form-control'
                                   onChange={
                                       // @ts-ignore
                                       event => setFiles(event.target.files)
                                   } type="file" multiple/>
                        </div>
                        <div className='col-auto'>
                            <button type='submit' className='m-1 btn btn-primary mb-3'
                                    onClick={() => {
                                        createPost();
                                    }}>
                                Создать
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div>
                    {posts.map((post) =>
                        <div className='container bgCustom border mb-5' key={post.post._id}>
                            <div className=''>

                                <div className="row blue p-3">
                                    <div className="row mb-3">
                                        <h3 className='col-6 ps-4 pt-3'>{post.post.name}</h3>
                                        <span className='col-3 mt-1 align-self-center'>{post.post.user.email}</span>
                                        <span className='col-3 mt-1 align-self-center'>{getDate(post.post.date)}</span>
                                    </div>

                                    <div className='col-4'>
                                        <h5>Описание:</h5>
                                        <p>{post.post.description.toString()}</p>
                                    </div>
                                    <div className="col-8 text-end">

                                        <button
                                            type="button" className={
                                            store.isAuth ? (store.user.email == post.post.user.email ? "btn btn-primary" :
                                                (store.user.role < 1 ? 'd-none' : "btn btn-primary")) : 'd-none'}
                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            onClick={() => {
                                                store.setPost(post)
                                            }}
                                        >
                                            Редактировать
                                        </button>
                                        <button className={
                                            store.isAuth ? (store.user.email == post.post.user.email ? "btn btn-dark" :
                                                (store.user.role < 1 ? 'd-none' : "btn btn-dark")) : 'd-none'}
                                                onClick={() => {
                                                    deletePost(post);
                                                }}>
                                            Удалить
                                        </button>

                                    </div>


                                </div>

                                <div className='tracks'>
                                    {post.postToTracks.map((track) =>
                                        <div key={track.track._id} className='mt-3 track'>
                                            <div className='ABOBA'>

                                            </div>
                                            <div>
                                                <audio className='' src={`http://localhost:5000/${track.track._id}.mp3`}
                                                       controls></audio>
                                                <p className=''>{track.track.name}</p>
                                            </div>

                                            <br/>
                                        </div>
                                    )}
                                </div>
                                <hr/>


                                <div className="row pb-3">
                                    <div className='col-3 align-self-center mt-3'>
                                        <input className={store.isAuth?'form-control':'d-none'} type="text"
                                               onChange={e => setComment(e.target.value)}/>
                                    </div>
                                    <div className="col-2 align-self-center mt-3">
                                        <button className={store.isAuth? 'btn btn-secondary':'d-none'} onClick={() => {
                                            sendComment(post)
                                        }
                                        }>Комментировать
                                        </button>
                                    </div>
                                    <div className='col-3 align-self-center mt-3'>
                                        <button
                                            className='btn btn-outline-light' type='button' data-bs-toggle='collapse'
                                            data-bs-target={`#a${post.post._id}`}
                                            aria-expanded='false'
                                            aria-controls={`a${post.post._id}`}
                                        >
                                            Посмотреть комментарии ({post.postToComments.length}):
                                        </button>
                                    </div>
                                </div>

                                <div className='collapse container' id={`a${post.post._id}`}>
                                    <div className='card card-body border-0'>
                                        {post.postToComments.map((comment) =>
                                            <div key={comment.comment._id}>
                                                <div className='row w-75'>
                                                    <p className='col-7'>{comment.comment.text}</p>
                                                    <div className='col-5 text-end'>
                                                            <span
                                                                className=''>{comment.comment.user}</span>
                                                        <br/>
                                                        <span
                                                            className=''>{getDate(comment.comment.timestamp)}</span>
                                                    </div>

                                                </div>
                                                <button className={
                                                    (comment.comment.text === "Комментарий удалён.") ? 'd-none' :
                                                        store.user.email == comment.comment.user?'btn btn-dark':
                                                        (ModerCheck() || AdminCheck()) ? 'btn btn-dark' :
                                                             'btn btn-dark'}
                                                        onClick={() => deleteComment(comment.comment)}>Удалить
                                                </button>
                                                <hr/>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <br/>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default observer(HomeForm);
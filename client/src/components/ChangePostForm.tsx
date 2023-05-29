import React, {FC, useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useRouterStore} from "mobx-state-router";
import {Context} from "../index";
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/home-form-style.css'
import {SPost} from "../models/SPost";

const ChangePostForm: FC = () => {
    const routerStore = useRouterStore();
    const {store} = useContext(Context);
    const [name,setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    async function updatePost() {
        const response = await store.updatePost(store.post);
        store.post = {} as SPost;
        console.log(response);
    }
    useEffect(() => {
        setName(store.post.name);
        setDescription(store.post.description);
    })

    return (
        <div>


            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Редактирование поста</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                        </div>
                        <div className="modal-body">

                            <div className='mb-3'>
                                <label htmlFor="nameControl" className='form-label'>Название поста:</label>
                                <input id='nameControl'
                                       className='form-control'
                                       type="text"
                                       placeholder='Крутой пост!'
                                       value={store.post.name}
                                       onChange={e=>{store.post.name = e.target.value}}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descriptionControl" className='form-label'>Описание:</label>
                                <textarea id='descriptionControl'
                                          className='form-control' rows={3}
                                          placeholder='Ну что тут сказать, ну очень крутой'
                                          value={store.post.description}
                                          onChange={(e)=>{store.post.description = e.target.value}}
                                />
                            </div>

                            {store.post?.tracks?.map((track) =>
                                   <div id={track._id} key={track._id}>
                                       {track.name}
                                       <button className='btn btn-danger' onClick={() => {
                                           store.removeTrack({_id: track._id, name: track.name});
                                           // @ts-ignore
                                           document.querySelector(`#${track._id}`).setAttribute('display','none');
                                       }}
                                       >Х</button>
                                   </div>
                            )}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            <button onClick={updatePost} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                                Сохранить изменения
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(ChangePostForm);
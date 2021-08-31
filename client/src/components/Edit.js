import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useParams,useHistory } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { fetchPost, updateAction } from '../store/asyncMethods/PostMethods';
import toast, { Toaster } from 'react-hot-toast';
import { POST_RESET, RESET_UPDATE_ERRORS } from '../store/types/PostTypes';
import Loader from './Loader';

function Edit() {
    const { id } = useParams();
    const { loading,redirect } = useSelector((state) => state.PostReducer);
    const history=useHistory();

    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const [state, setState] = useState({
        title: "",
        description: "",
    })
    const { post, postStatus } = useSelector((state) => state.FetchPost);
    const {editErrors}=useSelector((state)=>state.UpdatePost);
    useEffect(() => {
        if (postStatus) {
            setState({
                title: post.title,
                description: post.description,
            })
            setValue(post.body);
            dispatch({ type: POST_RESET });
        }
        else {
            dispatch(fetchPost(id));
        }
    }, [post]);

    const updatePost = (e) => {
        e.preventDefault();
        dispatch(updateAction({
            title: state.title,
            body: value,
            description: state.description,
            id:post._id,
        }));
    }

    useEffect(()=>{
		if (editErrors?.length !== 0) {
			editErrors.map((err) => toast.error(err.msg));
            dispatch({type:RESET_UPDATE_ERRORS});
		}
        
    },[editErrors,dispatch]);
    useEffect(()=>{
        if(redirect){
             history.push("/dashboard");
        }
    },[redirect,history])
    return !loading ?
    <div className="mt-100">
            <Helmet>
                <title>Edit Post</title>
                <meta name='description' content='Update post' />
            </Helmet>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{

                style: {
                    fontSize: "14px",
                },
            }} />
            <div className="container">

                <div className="row">
                    <div className="col-6">
                        <div className="updateCard">
                            <h3 className="card__h3">Update Post</h3>
                            <form onSubmit={updatePost}>
                                <div className="group">
                                    <label htmlFor="title"></label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="group__control"
                                        placeholder="Post Title" 
                                        value={state.title}
                                        onChange={(e) => setState({ ...state,title: e.target.value })}
/>
                                </div>
                                <div className="group">
                                    <label htmlFor="body">Post Body</label>
                                    <ReactQuill
                                        theme='snow'
                                        id='body'
                                        placeholder='Post body...'
                                        value={value}
                                        onChange={setValue}
                                    />
                                </div>
                                <div className='group'>
                                    <label htmlFor='description'>Meta Description</label>
                                    <textarea
                                        name='description'
                                        id='description'
                                        cols='30'
                                        rows='10'
                                        defaultValue={state.description}
                                        onChange={(e) => setState({ ...state, description: e.target.value })}
                                        onKeyUp={(e) => setState({ ...state, description: e.target.value })}
                                        
                                        className='group__control'
                                        placeholder='meta description...'
                                        maxLength='300'></textarea>
                                    <p className='length'>
                                        {state.description ? state.description.length : 0}
                                    </p>
                                </div>
                                <div className='group'>
                                    <input
                                        type='submit'
                                        value='Edit Post'
                                        className='btn btn-initial btn-block'
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <Loader/>
}

export default Edit;

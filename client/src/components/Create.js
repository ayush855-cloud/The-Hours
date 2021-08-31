import React, { useState,useEffect } from 'react';
import Helmet from 'react-helmet';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import { createAction } from '../store/asyncMethods/PostMethods';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader';

function Create(props) {
    const history=useHistory();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.AuthReducer);

    const { _id, name } = user;
    const [currentImage, setCurrentImage] = useState('Choose Image');
    const [value, setValue] = useState('');
    const [state, setState] = useState({
        title: "",
        description: "",
        image: "",
    })
    const { createErrors,redirect,loading } = useSelector(
		(state) => state.PostReducer
	);
    const [imagePreview, setImagePreview] = useState('');
    const fileHandle = (e) => {
        if (e.target.files.length !== 0) {
            setCurrentImage(e.target.files[0].name);
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }

    }
    const handleDescription = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    const [slug, setSlug] = useState('');
    const [slugButton, setSlugButton] = useState(false);
    const slugHandle = (e) => {
        setSlugButton(true);
        setSlug(e.target.value);
    };
    const handleURL = (e) => {
        e.preventDefault();
        setSlug(slug.trim().split(' ').join('-'));
    };
    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
        const createSlug = e.target.value.trim().split(' ').join('-');
        setSlug(createSlug);
    };
    const createPost = (e) => {
        e.preventDefault();
        const { title, description, image } = state;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', value);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('slug', slug);
        formData.append('name', name);
        formData.append('id', _id);
        dispatch(createAction(formData));
        //    console.log(state);
    }

    useEffect(()=>{
        if(redirect){
            history.push("/dashboard");
        }
		if (createErrors?.length !== 0) {
			createErrors.map((err) => toast.error(err.msg));
		}

    },[createErrors,redirect,history]);
    return (
        <>
            <div className="create mt-100">
                <Helmet>
                    <title>Create new post</title>
                    <meta name='description' content='Create a new post' />
                </Helmet>
                <Toaster position="top-center" reverseOrder={false} toastOptions={{

                    style: {
                        fontSize: "14px",
                    },
                }} />
               {!loading?                 <div className="container">
                    <form onSubmit={createPost}>
                        <div className="row">
                            <div className="col-6 pt-15 ml-minus-15">
                                <div className="card">
                                    <h3 className="card__h3">Create Post</h3>

                                    <div className="group">
                                        <label htmlFor="title">Post Title</label>
                                        <input type="text" name="title" id="title" value={state.title} onChange={handleInput} className="group__control" placeholder="Post Title..." />
                                    </div>
                                    <div className='group'>
                                        <label htmlFor='image' className='image__label'>
                                            {currentImage}
                                        </label>
                                        <input
                                            type='file'
                                            name='image'
                                            id='image'
                                            onChange={fileHandle}
                                        />
                                    </div>
                                    <div className='group'>
                                        <label htmlFor='body'>Post body</label>
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
                                            onChange={handleDescription}
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
                                            value='Create post'
                                            className='btn btn-initial btn-block'
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="col-6 pt-15 mobile mr-minus-15">
                                <div className="card">
                                    <div className='group'>
                                        <label htmlFor='slug'>Post URL</label>
                                        <input
                                            type='text'
                                            name='slug'
                                            id='slug'
                                            value={slug}
                                            onChange={slugHandle}
                                            className='group__control'
                                            placeholder='Post URL...'
                                        />
                                    </div>
                                    <div className='group'>
                                        {slugButton ? (
                                            <button class='btn btn-initial btn-block' onClick={handleURL}>
                                                Update Slug
                                            </button>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                    <div className='group'>
                                        <div className='imagePreview'>
                                            {imagePreview ? <img src={imagePreview} className="previewImage" alt="imagePreview" /> : ''}
                                        </div>
                                    </div>


                                    <div className='group'>
                                        <input
                                            type='submit'
                                            value='Create post'
                                            className='btn btn-initial btn-block'
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>:<Loader/>}

            </div>
        </>
    )
}

export default Create

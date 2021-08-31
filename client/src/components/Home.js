import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { homePost } from '../store/asyncMethods/PostMethods';
import { Link, useParams } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment';
import Pagination from './Pagination';
// import {htmlToText} from 'html-to-text';
// const { convert } = require('html-to-text');

function Home() {
    let { page } = useParams();
    if (page === undefined) {
        page = 1;
    }
    const dispatch = useDispatch();
    const { homePosts, count, perPage } = useSelector((state) => state.FetchPosts);
    const { loading } = useSelector((state) => state.AuthReducer);
    useEffect(() => {
        dispatch(homePost(page));
    }, [page,dispatch]);
    return (
        <>
            <Helmet>
                <title>Web articles</title>
                <meta name="description" content="HTML,CSS ,Javascript" />
            </Helmet>
            {/* <div className="home">
           
           
        </div>
           <video className="reading" autoPlay muted loop>
            <source src="/images/children.mp4" type="video/mp4"/>
           </video>

        </div> */}
            <div className="box">
            <div className="home">
                <h1>TheHours</h1>
                <div className="home__name">
                    <h3>News &</h3>
                    <h3>Opinion</h3>
                    <h3>Blog</h3>
                </div>  
            </div>      
                    <div className="row" style={{ marginBottom: '50px' }}>
                        <div className="col-10 home_page">
                            {!loading ? homePosts.length > 0 ? homePosts.map(post => (
                                <div className="rows post_style" key={post._id}>
                                    <div className="col-8">
                                        <div className="post">
                                            <div className="post__header">
                                                <div className="post__header__avatar">
                                                    {post.userName[0].toUpperCase()}
                                                </div>
                                                <div className="post__header__user">
                                                    <span>{post.userName}</span>
                                                    <span>{moment(post.updatedAt).format('MMM Do YY')}</span>
                                                </div>
                                            </div>
                                            <div className="post__body">
                                                <h2 className="post__body__title">
                                                <Link className="post__body__title__link" to={`/details/${post.slug}`}>
                                                    {post.title}
                                                    </Link>
                                                </h2>
                                                <div className="post__body__detail">
                                                    {post.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="post__image">
                                            <img src={`/images/${post.image}`} alt={post.image} />
                                        </div>
                                    </div>

                                </div>
                            )) : <h2 className="msg__if__no__posts">No Posts</h2> : <Loader />}

                        </div>

                    </div>
                    <div className='row' style={{ width: '100%', position: 'relative', left: '10rem', top: '-2rem' }}>
                        <div className='col-9'>
                            <Pagination
                                path='home'
                                page={page}
                                perPage={perPage}
                                count={count}
                            />
                        </div>
                    </div>
                </div>
        </>
            )
}

            export default Home

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postComment, postDetails } from '../store/asyncMethods/PostMethods';
import Loader from './Loader';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Comments from './Comments';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Details() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.AuthReducer);
    const { loading, details, comments } = useSelector((state) => state.PostReducer);
    const [comment, setComment] = useState('');
    const addComment = (e) => {
        e.preventDefault();
        dispatch(postComment({ id: details._id, comment, userName: user.name }));
        setComment('');
        dispatch(postDetails(id));
    }
    useEffect(() => {
        dispatch(postDetails(id));
    }, [id, dispatch])
    return (
        <div className="post__card mt-100">
            <div className="row home_page">
                <div className="col-8">
                    {!loading ?
                        <div className='post__details'>
                            <Helmet>
                                <title>{details.title}</title>
                                <meta name='description' content='Post Details' />
                            </Helmet>
                            <div className='post__header'>
                                <div className='post__header__avatar'>
                                    {details.userName ? details.userName[0].toUpperCase() : ''}
                                </div>
                                <div className='post__header__user'>
                                    <span>{details.userName}</span>
                                    <span>{moment(details.updatedAt).format('MMM Do YY')}</span>
                                </div>
                            </div>
                            <div className='post__body'>
                                <h1 className='post__body__title'>{details.title}</h1>
                                <div className='post__body__description'>
                                    {details.description}
                                </div>
                                <div className='post__body__image'>
                                    <img src={`/images/${details.image}`} alt={details.image} />
                                </div>
                            </div>
                            {user ? (
                                <>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            style={{color:'black',fontFamily:'Poppins',border:'2px solid #efefef'}}
                                        >
                                           <h4>View Comments</h4>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Comments comments={comments} /> 
                                        </AccordionDetails>
                                    </Accordion>

                                    <div className='post__comment'>
                                        <form onSubmit={addComment}>
                                            <div className='group'>
                                                <input
                                                    type='text'
                                                    className='group__detail'
                                                    placeholder='Write a comment...'
                                                    onChange={(e) => setComment(e.target.value)}
                                                    value={comment}
                                                />
                                            </div>
                                            <div className='group'>
                                                <input
                                                    type='submit'
                                                    value='Post comment'
                                                    className='btn btn-detail'
                                                />
                                            </div>
                                        </form>
                                    </div>

                                </>
                            ) : (
                                ''
                            )}
                        </div> : <Loader />}


                </div>

            </div>

        </div>

    )
}

export default Details

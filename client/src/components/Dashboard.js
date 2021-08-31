import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link,useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { CLOSE_LOADER, REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER, SET_MESSAGE } from '../store/types/PostTypes';
import { fetchPosts } from '../store/asyncMethods/PostMethods';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import axios from 'axios';
import moment from 'moment';
import Loader from './Loader';
import Sidebar from './Sidebar';
import Pagination from './Pagination';
const Dashboard = () => {
    const dispatch = useDispatch();
    const { redirect, message, loading } = useSelector((state) => state.PostReducer);
   
    const { user: { _id } ,token} = useSelector((state) => state.AuthReducer);
    const { posts,count,perPage } = useSelector((state) => state.FetchPosts);
    let {page}=useParams();
    if(page===undefined){
        page=1;
    }
    const deletePost=async(id)=>{
        const confirm=window.confirm("Are you sure you want to delete this post");
        if(confirm){
            dispatch({type:SET_LOADER});
            try {
                const config={
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                }
                const response=await axios.get(`/delete/${_id}`,config);
                dispatch(fetchPosts(_id,page));
                dispatch({type:SET_MESSAGE,payload:response.data.msg});
                
            } catch (error) {
                dispatch({type:CLOSE_LOADER});
            }
        }
    }
    useEffect(() => {
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: REMOVE_MESSAGE });
        }
        

    }, [message,redirect,dispatch]);
    useEffect(()=>{
        dispatch(fetchPosts(_id,page));
    },[page,dispatch,_id]);
    return (
        <>
            <Helmet>
                <title>User Dashboard</title>
                <meta name='description' content='User Dashboard' />
            </Helmet>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{

                style: {
                    fontSize: "14px",
                },
            }} />
            <div className="container mt-100">
                <div className="row ml-minus-15 mr-minus-15">
                    <div className="col-3 pt-15">
                   <Sidebar/>
                    </div>
                    <div className="col-9 pt-15">
                        {!loading ?
                            posts?.length > 0 ? posts.map((post) => (
                                <div className="dashboard__posts" key={post._id}>
                                <div className="col-6">
                                    <div className="dashboard__posts__title">
                                      <Link to="/">{post.title}</Link>
                                      <span>Published {moment(post.updatedAt).fromNow()}</span>
                                    </div>
                                    <div className="dashboard__posts__links">
                                    <Link to={`/updateImage/${post._id}`}><AddPhotoAlternateIcon className="edit"/></Link>
                                   <Link to={`/edit/${post._id}`}><EditIcon className="edit"/></Link>
                                   <ArchiveIcon onClick={()=>deletePost(post._id)} className="archive"/>
                                   </div>
                                   </div>
                                   <div className="col-6 dashboard__posts__image">
                                    <img src={`/images/${post.image}`} alt={`${post.image}`}/>
                                   </div>
                                </div>

                            ))

                                : "You dont have any post" :
                            <Loader/>}
                            <Pagination path="dashboard" page={page} perPage={perPage} count={count}/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard;
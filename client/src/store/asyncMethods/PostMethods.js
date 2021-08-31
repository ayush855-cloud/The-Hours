import axios from 'axios';
// import Post from '../../../../models/Post';

import {
	CREATE_ERRORS,
	REMOVE_ERRORS,
	SET_LOADER,
	CLOSE_LOADER,
	REDIRECT_TRUE,

	SET_MESSAGE,
	// REMOVE_MESSAGE,
	SET_POSTS,
	SET_POST,
	POST_REQUEST,
	// EDIT_ERRORS,
	
	UPDATE_IMAGE_ERROR,
	HOME_POSTS,
	SET_DETAILS,
	COMMENTS,
	// SET_DETAILS,
	// COMMENTS,
} from '../types/PostTypes';

export const createAction=(postData)=>{
       return async(dispatch,getState)=>{
		//    if u do 
		// const data=getState();
		// console.log("Your state",data);
		// u will get AuthReducer and PostReducer state and u will get token from AuthReducer
		   const {AuthReducer:{token}}=getState();
		   dispatch({type:SET_LOADER});
           try{
             const config={
                 headers:{
                     "Authorization":`Bearer ${token}`
                 }
             }
             const response=await axios.post("/create_post",postData,config);
			 dispatch({type:CLOSE_LOADER});
			 dispatch({type:REDIRECT_TRUE});
			 dispatch({type:REMOVE_ERRORS});
			 dispatch({type:SET_MESSAGE,payload:response.data.msg});
            console.log(response);
           }
           catch(error){
            console.log(error.message);
			dispatch({type:CLOSE_LOADER});
			dispatch({type:CREATE_ERRORS,payload:error.response.data.errors});
			console.log(error.response.data);
           }
       }
}

export const fetchPosts=(id,page)=>{
   return async(dispatch,getState)=>{
	   const {AuthReducer:{token}}=getState();
	   dispatch({type:SET_LOADER});
	   try{
		 const config={
			 headers:{
				 "Authorization":`Bearer ${token}`
			 }
		 }
		 const {data:{response,count,perPage}}=await axios.get(`/posts/${id}/${page}`,config);
		//  console.log(response.data.response);
		// console.log(response);
		// console.log(data);
		 dispatch({type:CLOSE_LOADER});
		 dispatch({type:SET_POSTS,payload:{response,count,perPage}});
		}
		catch(error){
			dispatch({type:CLOSE_LOADER});
		}

   }
}

export const fetchPost=(id)=>{
    return async(dispatch,getState)=>{
		const {AuthReducer:{token}}=getState();
		dispatch({type:SET_LOADER});
		try{
		  const config={
			  headers:{
				  "Authorization":`Bearer ${token}`
			  }
		  }
		  const {data:{post}}=await axios.get(`/post/${id}`,config);
		  dispatch({type:CLOSE_LOADER});
		  dispatch({type:SET_POST,payload:post});
		  dispatch({type:POST_REQUEST});
		}
		catch(error){
			dispatch({type:CLOSE_LOADER});
			console.log(error.message);
		}
	}
}

export const updateAction=(editPost)=>{
    return async(dispatch,getState)=>{
		const {AuthReducer:{token}}=getState();
		dispatch({type:SET_LOADER});
		try{
		  const config={
			  headers:{
				  "Authorization":`Bearer ${token}`
			  }
		  }
		  const {data}=await axios.post("/update",editPost,config);
		  dispatch({type:CLOSE_LOADER});
          dispatch({type:REDIRECT_TRUE});
		  dispatch({type:SET_MESSAGE,payload:data.msg});
		}
		catch(error){
			dispatch({type:CLOSE_LOADER});
			dispatch({type:UPDATE_IMAGE_ERROR,payload:error.response.data.errors});
			console.log(error.response);
			console.log(error.response.data.errors);
		}
	}
}

export const updateImageAction=(updatedData)=>{
	return async(dispatch,getState)=>{
		const {AuthReducer:{token}}=getState();
		dispatch({type:SET_LOADER});
		try {
			const config={
				headers:{
					"Authorization":`Bearer ${token}`
				}
			}
			const response=await axios.post("/updateImage",updatedData,config);
			dispatch({type:CLOSE_LOADER});
			dispatch({type:REDIRECT_TRUE});
			dispatch({type:SET_MESSAGE,payload:response.data.msg});
			console.log(response.data.msg);
			
		} catch (error) {
			dispatch({type:CLOSE_LOADER});
			dispatch({type:UPDATE_IMAGE_ERROR,payload:error.response.data.errors});
			console.log(error.response.data.errors);
		}
	};
};

export const homePost=(page)=>{
     return async(dispatch)=>{
		dispatch({type:SET_LOADER});
		 try {
			dispatch({type:CLOSE_LOADER});
			const {data:{response,count,perPage}}=await axios.get(`/home/${page}`);
			dispatch({type:HOME_POSTS,payload:{response,count,perPage}});
		 } catch (error) {
			 dispatch({type:CLOSE_LOADER});
		 }
	 }
}

export const postDetails=(id)=>{
	return async(dispatch)=>{
		dispatch({type:SET_LOADER});
		try {
			const {data:{post,comments}}=await axios.get(`/explore/${id}`);
			dispatch({type:SET_DETAILS,payload:post});
			dispatch({type:COMMENTS,payload:comments});
			dispatch({type:CLOSE_LOADER});
		} catch (error) {
			dispatch({type:CLOSE_LOADER});
		}
	}
}

export const postComment=(commentData)=>{
	return async(dispatch,getState)=>{
		const {AuthReducer:{token}}=getState();
		const config={
			headers:{
				Authorization:`Bearer ${token}`,
			}
		}
		dispatch({type:SET_LOADER});
		try {
			const {data}=await axios.post("/comment",commentData,config);
			console.log(data);
			dispatch({type:CLOSE_LOADER});
		} catch (error) {
			dispatch({type:CLOSE_LOADER});
		}
	}
}
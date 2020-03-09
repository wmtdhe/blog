import axios from "axios";
import {put,takeLatest,call,takeEvery} from "redux-saga/effects";
import {putNewBlog,insertBlog,UPDATE_LOGIN_STATUS} from "./reducer";

export const GET_SQUARE_BLOG_ASYNC ='GET_SQUARE_BLOG_ASYNC';
export const CREATE_BLOG_ASYNC = 'CREATE_BLOG_ASYNC';



function *getSquareBlog({pageIndex,createdOffset}) {
    let result = yield axios.get(`http://localhost:3000/api/square/loadMore/${pageIndex}/${createdOffset}`);
    yield put(putNewBlog(result.data.data))
}
function *createBlog({blogInfo}) {
    let result = yield axios.post(`http://localhost:3000/api/blog/create`,{
        content:blogInfo.content,
        image:blogInfo.image
    },{
        withCredentials:true,
    });
    let errno = result.data.errno;
    if(errno===0){
        yield put(insertBlog(result.data.data))
    }else{
        //login check
        yield put({type:UPDATE_LOGIN_STATUS,status:false})
    }

}


export function requestSquareBlog(pageIndex,createdOffset) {
    return{
        type:GET_SQUARE_BLOG_ASYNC,
        pageIndex,
        createdOffset
    }
}
export function requestCreateBlog(blogInfo) {
    return {
        type:CREATE_BLOG_ASYNC,
        blogInfo
    }
}

export function *Saga() {
    yield takeLatest(GET_SQUARE_BLOG_ASYNC,getSquareBlog);
    yield takeLatest(CREATE_BLOG_ASYNC,createBlog);

}


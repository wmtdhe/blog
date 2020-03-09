import {call,put, takeEvery,takeLatest,all} from 'redux-saga/effects';
import {putUserInfo,putHomepageBlog,insertBlog} from "./action";
import axios from 'axios';


//actions
export const GET_BLOG_ASYNC = 'GET_BLOG_ASYNC';
export const GET_USER_INFO_ASYNC = 'GET_USER_INFO_ASYNC';
export const GET_HOME_INFO_ASYNC = 'GET_USER_INFO_ASYNC';
export const CREATE_BLOG_ASYNC = 'CREATE_BLOG_ASYNC';
//put --- dispatch an action to store
//call --- execute the passed in function with arguments


function *getHomeInfo() {
    const result = yield axios.get('http://localhost:3000/api/user/homeInfo',{withCredentials:true});
    let {fans,following,blog,user} = result.data.data;
    blog.pageIndex = 0;
    blog.pageSize = 5;
    yield put(putUserInfo({fans,following,user,blogCount:blog.count})); // user, fan, following
    yield put(putHomepageBlog(blog)); //blog
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

function *getHomeBlog({pageIndex,createdOffset}) {
    let result = yield axios.get(`http://localhost:3000/api/blog/loadMore/${pageIndex}/${createdOffset}`,{withCredentials:true});
    yield put(putHomepageBlog(result.data.data))
}
export function requestHomeInfos() {
    return {
        type:GET_HOME_INFO_ASYNC,
    }
}
export function requestCreateBlog(blogInfo) {
    return {
        type:CREATE_BLOG_ASYNC,
        blogInfo
    }
}
export function requestMoreBlog(pageIndex,createdOffset) {
    return {
        type:GET_BLOG_ASYNC,
        pageIndex,
        createdOffset
    }
}

export function *Saga() {
    yield takeLatest(GET_HOME_INFO_ASYNC,getHomeInfo); //user, fan#, following#, blog - following & self
    yield takeEvery(CREATE_BLOG_ASYNC,createBlog);
    yield takeLatest(GET_BLOG_ASYNC,getHomeBlog);
}




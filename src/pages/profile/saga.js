import {put, call, takeLatest, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {putProfileInfo,putMoreBlog,putFollowFeedback} from "./action";

export const GET_PROFILE_ASYNC = 'GET_PROFILE_ASYNC';
export const GET_MORE_BLOG_ASYNC = 'GET_MORE_BLOG_ASYNC';
export const SEND_FOLLOW_REQUEST = 'SEND_FOLLOW_REQUEST';
export const SEND_UNFOLLOW_REQUEST = 'SEND_UNFOLLOW_REQUEST';

function *getProfile({userName}) {
    let result = yield axios.get(`http://localhost:3000/api/profile/getProfileInfo/${userName}`);
    console.log(result.data);
    yield put(putProfileInfo(result.data));
}

function *getMoreBlog({userName,pageIndex}) {
    let result = yield axios.get(`http://localhost:3000/api/profile/loadMore/${userName}/${pageIndex}`);
    yield put(putMoreBlog(result.data.data))
}

function *followUser({userId}) {
    let result = yield axios.post('http://localhost:3000/api/profile/follow',{userId},{withCredentials:true});
    console.log(result.data);
    yield put(putFollowFeedback(result.data));

}

function *unfollowUser({userId}) {
    let result = yield axios.post('http://localhost:3000/api/profile/unfollow',{userId},{withCredentials:true})
    console.log(result.data);
    yield put(putFollowFeedback(result.data));
}

//action
export function requestProfile(userName) {
    return {
        type:GET_PROFILE_ASYNC,
        userName
    }
}

export function requestLoadMore({pageIndex,userName}) {
    return {
        type:GET_MORE_BLOG_ASYNC,
        pageIndex,
        userName
    }
}

export function requestFollow(userId) {
    return {
        type:SEND_FOLLOW_REQUEST,
        userId,
    }
}

export function requestUnfollow(userId) {
    return{
        type:SEND_UNFOLLOW_REQUEST,
        userId,
    }
}

export function *Saga() {
    yield takeLatest(GET_PROFILE_ASYNC,getProfile);
    yield takeLatest(GET_MORE_BLOG_ASYNC,getMoreBlog);
    yield takeLatest(SEND_FOLLOW_REQUEST,followUser);
    yield takeLatest(SEND_UNFOLLOW_REQUEST,unfollowUser);
    console.log('profile saga')
}
import {put, takeLatest} from 'redux-saga/effects';
import {putSettingInfo,failUpdatePass,failUpdateInfo,successUpdatePass,successUpdateInfo,putLogoutFeedback} from "./action";
import axios from 'axios';

const REQUEST_SETTING_INFO_ASYNC = 'REQUEST_SETTING_INFO_ASYNC';
const REQUEST_UPDATE_PASSWORD = 'REQUEST_UPDATE_PASSWORD';
const REQUEST_UPDATE_INFO = 'REQUEST_UPDATE_INFO';
const REQUEST_LOG_OUT = 'REQUEST_LOG_OUT';


export function requestSettingInfo(userName) {
    return {
        type:REQUEST_SETTING_INFO_ASYNC,
        userName
    }
}
export function requestUpdatePassword(password,newPassword) {
    return{
        type:REQUEST_UPDATE_PASSWORD,
        password,
        newPassword
    }
}
export function requestUpdateInfo(nickname,picture) {
    return{
        type:REQUEST_UPDATE_INFO,
        nickname,
        picture
    }
}
export function requestLogout() {
    return {
        type:REQUEST_LOG_OUT
    }
}

function *getSettingInfo({userName}) {
    let result = yield axios.post('http://localhost:3000/api/user/isExist',{
        userName
    },{withCredentials:true});
    yield put(putSettingInfo(result.data.data));
}

function *updatePassword({password,newPassword}) {
    let result = yield axios.patch('http://localhost:3000/api/user/changePassword',{password,newPassword},{withCredentials:true});
    console.log(result.data);
    if(result.data.errno!==0){
        yield put(failUpdatePass(result.data));
    }else{
        yield put(successUpdatePass(result.data));
    }
}

function *updateInfo({nickname,picture}) {
    let result = yield axios.patch('http://localhost:3000/api/user/changeInfo',{nickname,picture},{withCredentials:true});
    if(result.data.errno!==0){
        yield put(failUpdateInfo(result.data));
    }else{
        yield put(successUpdateInfo(result.data));
    }
}

function *logout() {
    let result = yield axios.post('http://localhost:3000/api/user/logout',{},{withCredentials:true});
    yield put(putLogoutFeedback(result.data));
}

export function *Saga() {
    yield takeLatest(REQUEST_SETTING_INFO_ASYNC,getSettingInfo);
    yield takeLatest(REQUEST_UPDATE_INFO,updateInfo);
    yield takeLatest(REQUEST_UPDATE_PASSWORD,updatePassword);
    yield takeLatest(REQUEST_LOG_OUT,logout);
    console.log('setting saga');
}
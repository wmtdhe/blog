import {combineReducers} from "redux";
import {FAILED_UPDATE_PASSWORD,FAILED_UPDATE_INFO,SUCCEEDED_UPDATE_PASSWORD,SUCCEEDED_UPDATE_INFO,PUT_SETTING_INFO,PUT_LOG_OUT_FEEDBACK} from "./action";

function infoChangeFeedback(state=null,action) {
    switch (action.type) {
        case(FAILED_UPDATE_INFO):
            return  action.feedback;
        case(SUCCEEDED_UPDATE_INFO):
            return action.feedback;
        default:
            return state;
    }
}

function passChangeFeedback(state=null,action) {
    switch (action.type) {
        case(FAILED_UPDATE_PASSWORD):
            return action.feedback;
        case(SUCCEEDED_UPDATE_PASSWORD):
            return action.feedback;
        default:
            return state;
    }
}

function settingInfo(state=null,action) {
    if(action.type === PUT_SETTING_INFO){
        return action.info;
    }else{
        return state;
    }
}

function logoutFeedback(state=null,action) {
    if(action.type===PUT_LOG_OUT_FEEDBACK){
        return action.feedback;
    }else{
        return state;
    }
}

export default combineReducers({
    infoChangeFeedback,
    passChangeFeedback,
    settingInfo,
    logoutFeedback
});
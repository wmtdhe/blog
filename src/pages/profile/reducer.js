import {combineReducers} from "redux";
import {PUT_PROFILE_INFO,PUT_MORE_BLOG,PUT_FOLLOW_FEEDBACK} from "./action";

function profile(state={},action) {
    if(action.type===PUT_PROFILE_INFO){
        return action.profileData;
    }else{
        return state;
    }
}

function loadedBlog(state={},action) {
    if(action.type===PUT_MORE_BLOG){
        if(state.blogList){
            let newList = state.blogList.concat(action.blog.blogList);
            return Object.assign({},action.blog,{blogList:newList})
        }else{
            return action.blog;
        }
    }else{
        return state;
    }
}

function followFeedback(state=null,action) {
    if(action.type===PUT_FOLLOW_FEEDBACK){
        return action.feedback
    }else{
        return state;
    }
}

export default combineReducers({
    profile,
    loadedBlog,
    followFeedback
});
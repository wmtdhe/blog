import {TEST,PUT_HOMEPAGE_BLOG,PUT_USER_INFO,INSERT_BLOG} from "./action";
import {combineReducers} from "redux";


function blogList(state=null,action) {
    if(action.type===PUT_HOMEPAGE_BLOG){
        if(state && state.blogList){
            let newList = state.blogList.concat(action.blog.blogList);
            let ret = Object.assign(
                {},
                state,
                {pageIndex:parseInt(action.blog.pageIndex)},
                {
                    blogList:newList
                });
            return ret
        }
        return action.blog
    }else{
        return state;
    }
}

function userInfo(state=null,action) {
    if(action.type===PUT_USER_INFO){
        return action.info
    }else{
        return state
    }
}

function newCreatedBlog(state=[],action) {
    if(action.type===INSERT_BLOG){
        return [action.blog,...state];
    }
    return state;
}

export default combineReducers({
    blogList,
    userInfo,
    newCreatedBlog
});
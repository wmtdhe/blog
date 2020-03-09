import {combineReducers} from "redux";
export const PUSH_IN_NEW_BLOG = 'PUSH_IN_NEW_BLOG';
export const CREATE_BLOG = 'CREATE_BLOG';
export const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';

/**
 * @description
 * @param blog
 * @returns {{type: *, blog: *}}
 */
export function putNewBlog(blog) {
    return{
        type:PUSH_IN_NEW_BLOG,
        blog
    }
}

/**
 *
 * @param blogInfo
 * @returns {{type: *, blogInfo: *}}
 */
export function insertBlog(blogInfo) {
    return {
        type:CREATE_BLOG,
        blogInfo //{content, image}
    }
}

function blog(state={},action) {
    if(action.type === PUSH_IN_NEW_BLOG){
        if(state.blogList){
            let blogList = state.blogList.concat(action.blog.blogList);
            return Object.assign(
                {},
                    state,
                {pageIndex:action.blog.pageIndex},
                {
                  blogList:blogList
                })
        }else{
            return action.blog
        }
    }
    else{
        return state;
    }
}

function newCreatedBlog(state=[],action) {
    switch (action.type) {
        case(CREATE_BLOG):
            return [action.blogInfo,...state];
        default:
            return state;
    }
}

function LoginStatus(state=true,action) {
    if(action.type===UPDATE_LOGIN_STATUS){
        return action.status;
    }
    return state;
}

export default combineReducers({
    blog,
    newCreatedBlog,
    LoginStatus
})
import React, {useEffect,useState} from 'react';
import {render} from 'react-dom';
import Header from "../../components/header";
import Footer from "../../components/footer";
import BlogList from "../../components/bloglist";
import UserInfo from "../../components/user-info";
import {createStore,applyMiddleware,compose} from "redux";
import {connect, Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import {Saga,requestProfile,requestLoadMore,requestFollow,requestUnfollow} from './saga';
import '../../publics/css/main.css';
import '../../publics/css/index.css';
import '../../publics/css/profile.css';
// import getUserByCookie from '../getUserByCookie';
import {putFollowFeedback} from "./action";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancer(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(Saga);




function App(props) {
    let {getProfileInfo,blog,userInfo,loadMore,blogInfo,followFeedback,follow,unfollow} = props;
    useEffect(function () {
        let pathname = location.pathname.split('/');
        getProfileInfo(pathname[pathname.length-1]);
        // getProfileInfo('sc3840');
        if(followFeedback){
            if(followFeedback.errno===0){
                alert('success');
                putFollowFeedback(null)
            }else{
                alert('fail')
                putFollowFeedback(null)
            }
        }
    },[followFeedback,]);
    return <>
        <Header/>
        <div className='content'>
            {!blog && <div className='loading'>Loading</div>}
            {blog && blog.length===0 &&<div className='no-blog'>暂无BLOG</div>}
            {blog && blog.length!==0 && <BlogList loadMore={loadMore} createdOffset={0} blogInfo={blogInfo} blog={blog} userName={userInfo.user.userName}/>}
            <div style={{width:'30%'}}>
                {userInfo && <UserInfo userInfo={userInfo} follow={follow} unfollow={unfollow}/>}
            </div>
        </div>
        <Footer/>
    </>
}


const mapStateToProps = state=>{
    let blog=null;
    let blogInfo=null;
    if(state.profile && state.profile.blog){
        if(state.loadedBlog && state.loadedBlog.blogList){
            blog = state.profile.blog.blogList.concat(state.loadedBlog.blogList);
            blogInfo = {
                pageIndex:state.loadedBlog.pageIndex,
                pageSize:state.loadedBlog.pageSize,
                count:state.loadedBlog.count,
            }
        }else{
            blog = state.profile.blog.blogList
        }
    }
    return({
        followFeedback:state.followFeedback,
        blog:blog,
    blogInfo:blogInfo?blogInfo:state.profile.blog,
    userInfo:((state.profile && state.profile.fan && state.profile.following && state.profile.blog)?{
        fans:state.profile.fan,
        following:state.profile.following,
        user:state.profile.user,
        blogCount:state.profile.blog.count
    }:null)
    })
};

const mapDispatchToProps = dispatch=>({
    getProfileInfo:(userName)=>{
        dispatch(requestProfile(userName))
    },
    loadMore:(userName,pageIndex)=>{
        dispatch(requestLoadMore({userName,pageIndex}))
    },
    follow:(userId)=>{
        dispatch(requestFollow(userId))
    },
    unfollow:(userId)=>{
        dispatch(requestUnfollow(userId))
    }
});

let ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);

render(<Provider store={store}><ConnectedApp/></Provider>,document.getElementById('root'),function () {
   console.log('profile page')
});
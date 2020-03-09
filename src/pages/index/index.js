import React,{useState,useEffect} from 'react';
import {render} from 'react-dom';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Input from "../../components/input";
import UserInfo from "../../components/user-info";
import BlogList from "../../components/bloglist";
import {BrowserRouter as Router} from 'react-router-dom';
import '../../publics/css/main.css';
import '../../publics/css/index.css';
import {Provider,connect} from 'react-redux';
import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from 'redux-saga';
import {Saga} from "./saga";
import reducer from "./reducer";
import {requestHomeInfos,requestCreateBlog,requestMoreBlog} from "./saga";



const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancer(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(Saga);




function App(props){
    let [reply,setReply] = useState('');
    let {getHomepageBlog,} = props;
    useEffect(function () {
        getHomepageBlog();
    },[]);
    function handleReply(e,nickname,username,content) {
        setReply(`//@${username} - ${nickname} : ${content}`)
    }
    return <>
        <Router>
            <Header/>
            <div className='content'>
                <Input reply={reply} status={true} publishPost={props.publishPost}/>
                {props.userInfo && <UserInfo userInfo={props.userInfo}/>}
                {!props.blog && <div className='loading'>Loading</div>}
                {props.blog && props.blog.length===0 && <div className={'no-blog'}>暂无BLOG</div>}
                {props.blog && props.blog.length!==0 && props.blogInfo && <BlogList
                    blogInfo={props.blogInfo} createdOffset={props.createdOffset} blog={props.blog}
                    handleReply={handleReply} newCreatedBlog={props.newCreatedBlog} loadMore={props.loadMore}
                />}
            </div>
            <Footer/>
        </Router>
    </>
}

const mapStateToProps = state=>{
    let userInfo;
    if(state.userInfo && state.userInfo.user){
        userInfo = state.userInfo;
        userInfo.user.isMe = true; //index page -- default to self page
    }

    return({
        userInfo:userInfo,
        blog:state.blogList?state.blogList.blogList:[],
        blogInfo:state.blogList?{
            count:state.blogList.count,
            pageIndex:state.blogList.pageIndex,
            pageSize:5
        }:null,
        createdOffset:state.newCreatedBlog.length,
        newCreatedBlog:state.newCreatedBlog
    });
}

const mapDispatchToProps = dispatch=>({
    getHomepageBlog:()=>{
        dispatch(requestHomeInfos())
    },
    loadMore:(pageIndex,createdOffset)=>{
        dispatch(requestMoreBlog(pageIndex,createdOffset))
    },
    publishPost:(blogInfo)=>{
        dispatch(requestCreateBlog(blogInfo))
    }
});

let ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);

render(<Provider store={store}><ConnectedApp/></Provider>,document.getElementById('root'),function () {
    console.log('Home Page rendered');
});


var scrollTid;
var scrollTopTid;
let backBtn = document.createElement('div');
backBtn.innerText = 'UP';
backBtn.className = 'backBtn';
backBtn.onclick = function(e){
    if(scrollTopTid){
        return;
    }else{
        let speed = 50;
        let scrollHeight = document.body.scrollTop===0?document.documentElement.scrollTop:document.body.scrollTop;

        scrollTopTid = setInterval(function () {
            if(scrollHeight-speed<=0){
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                clearInterval(scrollTopTid);
            }else{
                document.body.scrollTop = scrollHeight-speed;
                document.documentElement.scrollTop = scrollHeight-speed;
                scrollHeight = scrollHeight-speed;
            }
        },10);
    }
};
document.body.appendChild(backBtn);

document.body.onscroll = function (e) {
        if(scrollTid){
            clearTimeout(scrollTid);
        }
        scrollTid = setTimeout(function () {
            showBtn();
        },100);
};
function showBtn() {
    let height = window.screen.height;
    if(document.body.scrollTop > height || document.documentElement.scrollTop>height){
        backBtn.style.display = 'block';
    }else{
        backBtn.style.display = 'none';
    }
}
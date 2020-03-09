import React,{useState,useEffect} from 'react';
import {render} from 'react-dom';
import Header from "../../components/header";
import Footer from "../../components/footer";
import BlogList from "../../components/bloglist";
import Input from "../../components/input";
import {createStore,applyMiddleware,compose} from "redux";
import {Provider,connect} from "react-redux";
import {Saga, requestSquareBlog, requestCreateBlog} from './saga';
import reducer from './reducer';
import createSagaMiddleware from "redux-saga";
import '../../publics/css/index.css';
import '../../publics/css/main.css';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancer(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(Saga);

function App(props) {
    useEffect(function () {
        props.getBlog(0);
    },[]);
    let [reply,setReply] = useState('');
    let {loadMore,blog,blogInfo,createdOffset,status,publishPost,newCreatedBlog} = props;
    function handleReply(e,nickname,username,content) {
        setReply(`//@${username} - ${nickname} : ${content}`)
    }
    return <>
        <Header/>
        <div className='content'>
            <Input status={status} publishPost={publishPost} reply={reply}/>
            {!blog && <div className={'loading'}></div>}
            {blog && blog.length===0 && <div className={'no-blog'}>暂无BLOG</div>}
            {blog && blog.length!==0 && <BlogList
                loadMore={loadMore} blog={blog} blogInfo={blogInfo}
                createdOffset={createdOffset} newCreatedBlog={newCreatedBlog}
                handleReply={handleReply}
            />}
        </div>
        <Footer/>
    </>
}


const mapStateToProps = state=>({
    blog:state.blog.blogList,
    blogInfo:state.blog,
    createdOffset:state.newCreatedBlog.length,
    newCreatedBlog:state.newCreatedBlog,
    status:state.LoginStatus,
});

const mapDispatchToProps = dispatch=>({
    getBlog:(pageIndex)=>{
        dispatch(requestSquareBlog(pageIndex,0))
    },
    loadMore:(pageIndex,createdOffset)=>{
        dispatch(requestSquareBlog(pageIndex,createdOffset))
    },
    publishPost:(blogInfo)=>{ //content, image
        dispatch(requestCreateBlog(blogInfo))
    }
});

let ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);

render(<Provider store={store}><ConnectedApp/></Provider>,document.getElementById('root'),function () {
   console.log('square page rendered')
});
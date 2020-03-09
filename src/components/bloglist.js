import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Avatar} from "antd";
import {CommentOutlined, UserOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';

function Blog(props) {
    let {handleReply,username,nickname,content} = props;
    return <div className='blog'>
        <div className='blog-userinfo'>
            <a href={`/profile/${props.username}`}><Avatar src={props.picture} size='large'/></a>
            <div style={{marginLeft:'1em'}}>
            <div style={{marginBottom:'0.5em'}}><a href={'/profile'}>{props.nickname}</a></div>
            <div>{props.formatedDate}</div>
            </div>
        </div>
        <div className='blog-content' dangerouslySetInnerHTML={{__html:props.formatContent}}>
        </div>
        <div className='blog-img'>
            <img src={props.img} alt=""/>
        </div>
        {handleReply && <div className='blog-function'>
            <a href="/" onClick={(e)=>{e.preventDefault();
        handleReply(e,nickname,username,content)}}>
                <CommentOutlined/> 回复</a></div>}
    </div>
}

function BlogList(props) {
    //pload -- indicate profile loadmore
    let {count, pageIndex, pageSize} = props.blogInfo;
    let {loadMore,createdOffset, newCreatedBlog, handleReply, userName} = props;
    function loadMoreBlog(e) {
        console.log('im clicked');
        if(userName){
            loadMore(userName,parseInt(pageIndex)+1);
        }else{
            loadMore(parseInt(pageIndex)+1,createdOffset);
        }

    }
    return <div className='blog-list'>
        {
            createdOffset>0 && newCreatedBlog.map(blog=>{
                return <Blog key={blog.data.id} username={blog.data.user.userName} nickname={blog.data.user.nickname} formatedDate={blog.data.createdAt}
                             content={blog.data.content} picture={blog.data.user.picture} img={blog.data.image}
                             handleReply={handleReply} formatContent={blog.data.formatContent}
                />
            })
        }
        {
            props.blog &&
                props.blog.map(blog=>{
                    return <Blog key={blog.id} username={blog.user.userName} nickname={blog.user.nickName}
                                 formatedDate={blog.createdAt} content={blog.content} picture={blog.user.picture} img={blog.image}
                                 handleReply={handleReply}  formatContent={blog.formatContent}
                    />
                })
        }
        { (pageIndex*pageSize+pageSize < count) &&
            <div className='load-more' onClick={loadMoreBlog}>
                加载更多
            </div>
        }
    </div>
}


const mapStateToProps = (state,ownProps)=>({

});
const mapDispatchToProps = (dispatch)=>({

});
export default connect(mapStateToProps,mapDispatchToProps)(BlogList);
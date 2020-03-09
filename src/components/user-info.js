import React,{useEffect, useState} from 'react';
import {connect} from 'react-redux';
import getUserByCookie from "../pages/getUserByCookie";


function FollowButton(props) {
    let {followed,follow,unfollow,userId} = props;
    function handleFollow(e) {
        let{userName} = getUserByCookie();
        if(userName){
            if(followed){
                unfollow(userId);
            }else{
                follow(userId);
            }
        }else{
            location.href = '/login';
        }

    }
    return <div className='follow-button' onClick={handleFollow}>
        {followed && <span>取消关注</span>}
        {!followed && <span>关注</span>}
    </div>
}

function UserInfo(props) {
        let {nickname,picture,userName,isMe,id} = props.userInfo.user;
        let {count:fanCount} = props.userInfo.fans;
        let {count:followingCount} = props.userInfo.following;
        let blogCount = props.userInfo.blogCount;
        let fanList = props.userInfo.fans;
        let [followed,setFollowed]=useState(false);
        let {follow,unfollow} = props;
        useEffect(function () {
            let {userName:currentUser} = getUserByCookie();
            if(fanList){
                let ret = fanList.list.some(fan=>{
                    return fan.user.userName === currentUser;
                });
                if(ret){
                    setFollowed(true);
                }else{
                    setFollowed(false)
                }
                console.log(followed);
            }
        },[props.userInfo]);
    return <div className='user-info'>
        {
            props.userInfo &&
                <>
                    <div className='avatar'>
                        <a href={`/profile/${userName}`}><img src={`${picture}`} alt="" title={`${nickname}`}/></a>
                    </div>
                    <div style={{fontWeight:'bold'}}><a href={`/profile/${userName}`}>{nickname}</a></div>
                    <div className='fan-follows'>
                        <div>
                            <span><a href={`/following/${userName}`}>{followingCount}</a></span><span>关注</span>
                        </div>
                        <div>
                            <span><a href={`/follower/${userName}`}>{fanCount}</a></span><span>粉丝</span>
                        </div>
                        <div><span><a href={`/profile/${userName}`}>{blogCount}</a></span><span>微博</span></div>
                    </div>
                    {!isMe && <FollowButton followed={followed} follow={follow} unfollow={unfollow} userId={id}/>}
                </>
        }
    </div>
}


const mapStateToProps = (state,ownProps)=>({

});

const mapDispatchToProps = (dispatch,ownProps)=>({

});

export default connect(mapStateToProps,mapDispatchToProps)(UserInfo);
import React,{useEffect,useState,createRef} from 'react';
import {render} from 'react-dom';
import Header from "../../components/header";
import Footer from "../../components/footer";
import {createStore,applyMiddleware,compose} from "redux";
import {Provider,connect} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import {Saga,requestSettingInfo,requestUpdatePassword,requestLogout,requestUpdateInfo} from './saga';
import {successUpdateInfo,successUpdatePass} from "./action";
import getUserByCookie from "../getUserByCookie";
import '../../publics/css/main.css';
import '../../publics/css/index.css';
import '../../publics/css/setting.css';
import axios from "axios";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancer(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(Saga);

const nicknameRef = createRef();
const passRef = createRef();
const newPassRef = createRef();
const avatarRef = createRef();
function App(props) {
    let {
        getSettingInfo,settingInfo,
        dispatchUpdatePassword,
        passChangeFeedback,logoutFeedback,
        logout,dispatchUpdateInfo,infoChangeFeedback,
        clearInfoFeedback,clearPassFeedback
    } = props;
    let [avatar,setAvatar] = useState('');
    let [nickname,setNickname] = useState('');
    useEffect(function () {
        if(logoutFeedback){
            alert('成功登出');
            location.href = '/';
        }
        let {userName,nickname,picture} = getUserByCookie();
        // getSettingInfo(userName);
        setNickname(nickname);
        setAvatar(picture);
        passRef.current.value='';
        newPassRef.current.value='';
        avatarRef.current.value='';
        if(passChangeFeedback){
            if(passChangeFeedback.errno===0){
                alert('密码修改成功');
                clearPassFeedback();
            }else{
                alert(passChangeFeedback.message);
                clearPassFeedback();
            }
        }
        if(infoChangeFeedback){
            if(infoChangeFeedback.errno===0){
                alert('资料修改成功');
                clearInfoFeedback();
            }else{
                alert(infoChangeFeedback.message);
                clearInfoFeedback();
            }
        }
    },[passChangeFeedback,logoutFeedback,infoChangeFeedback]);
    function handleNameChange(e) {
        setNickname(nicknameRef.current.value);
    }
    function handleLogOut(e) {
        logout()
    }
    function updatePassword(e) {
        e.preventDefault();
        let pass = passRef.current.value;
        let newPass = newPassRef.current.value;
        dispatchUpdatePassword(pass,newPass);
    }
    function updateUserInfo(e) {
        e.preventDefault();
        dispatchUpdateInfo(nickname,avatar);
    }
    function handleUpload(e) {
        let file = avatarRef.current.files[0];
        let formData = new FormData();
        formData.append('file',file);
        axios.post('http://localhost:3000/api/utils/upload',formData,{
            withCredentials:true
        })
            .then(res=>{
                // console.log(res);
                let result = res.data
                if(result.errno!==0){
                    alert(result.message);
                }else{
                    setAvatar(result.data.url)
                }
            })
            .catch(err=>console.log(err));
    }
    return <>
        <Header/>
        <div className='content'>
            <div className='setting-wrapper'>
                {
                    <div className='info-change'>
                        <form action="" id='info' onSubmit={updateUserInfo}>
                            <label htmlFor="nickname">更改昵称: </label>
                            <input type="text" id={'nickname'} value={nickname} ref={nicknameRef} onChange={handleNameChange}/>
                            <label htmlFor="picture">更改头像: </label>
                            <input type="file" id={'picture'} onChange={handleUpload} ref={avatarRef}/>
                            <div id={'preview-avatar'}>
                                <img src={avatar} alt="" />
                            </div>
                            <button id='infoBtn' type='submit' form={'info'}>修改资料</button>
                        </form>
                    </div>
                }
                <div className='password-change'>
                    <form action="/" id='password' onSubmit={updatePassword}>
                        <label htmlFor="prevPass">请输入当前密码: </label>
                        <input type="password" id='prevPass' ref={passRef}/>
                        <label htmlFor="newPass">请输入新的密码: </label>
                        <input type="password" id='newPass' ref={newPassRef}/>
                        <button id='passBtn' type='submit' form={'password'}>修改密码</button>
                    </form>
                </div>
                <button id='logout' onClick={handleLogOut}>
                    退出登录
                </button>
            </div>
        </div>
        <Footer/>
    </>
}

const mapStateToProps = state=>({
    settingInfo:state.settingInfo?state.settingInfo:null,
    passChangeFeedback:state.passChangeFeedback,
    infoChangeFeedback:state.infoChangeFeedback,
    logoutFeedback:state.logoutFeedback,
});

const mapDispatchToProps = dispatch=>({
    getSettingInfo:(userName)=>{
        dispatch(requestSettingInfo(userName));
    },
    dispatchUpdatePassword:(password,newPassword)=>{
        dispatch(requestUpdatePassword(password,newPassword))
    },
    logout:()=>{
        dispatch(requestLogout());
    },
    dispatchUpdateInfo:(nickname,picture)=>{
        dispatch(requestUpdateInfo(nickname,picture))
    },
    clearPassFeedback:()=>{
        dispatch(successUpdatePass(null))
    },
    clearInfoFeedback:()=>{
        dispatch(successUpdateInfo(null))
    }
});

const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App);

render(<Provider store={store}><ConnectedApp/></Provider>,document.getElementById('root'),function () {
    console.log('setting page')
});
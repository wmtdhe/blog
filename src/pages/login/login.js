import React,{useEffect,useState,createRef} from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {UserOutlined,LockOutlined} from "@ant-design/icons";
import Header from "../../components/header";
import Footer from "../../components/footer";
import '../../publics/css/main.css';
import '../../publics/css/login.css';
import axios from 'axios';

import getUserByCookie from '../getUserByCookie';

let userRef = createRef();
let passRef = createRef()
function LogIn(props) {
    let [msg,setMsg]=useState('');
    let [user,setUser]=useState(null);
    useEffect(function () {
        let {userName:hasUser} = getUserByCookie();
        setUser(hasUser);
    },[user]);
    function displayMsg(msg){
        setMsg(msg);
        setTimeout(function () {
            setMsg('')
        },1000)
    }
    async function handleSubmit(e) {
        e.preventDefault();
        let userName = userRef.current.value;
        let password = passRef.current.value;
        if(!userName || !password){
            displayMsg('账号密码不能为空');
            return
        }

        let data = {
            userName,
            password
        };

        let result = await axios.post('http://localhost:3000/api/user/login',data);
        console.log(result)
        if(result.data.errno===0){
            location.href = '/'
        }else{
            displayMsg(result.data.message)
        }
    }
    return (user?(<div className='logged-in'>
        {user}您已登录,请返回<a href="/">首页</a> 浏览
    </div>):(<div className='log-in-box'>
            {msg && <div className='error-msg'>{msg}</div>}
            <form action='/' onSubmit={handleSubmit}>
                <h1 style={{fontSize:'2em',marginBottom:'0.5em'}}>登录</h1>
                <div style={{marginBottom:'0.5em'}}>
                    <UserOutlined/><input type="text" placeholder="请输入用户名" name='userName' ref={userRef}/>
                </div>
                <div>
                    <LockOutlined/><input type="password" placeholder="请输入密码" name='password' ref={passRef}/>
                </div>
                <div className='login-button'>
                    <button id='login'>登录</button>
                    <a href='/register'>&gt;&gt;注册新的账号</a>
                </div>
            </form>
        </div>))
}


function App(props) {
    return <>
        <Router>
            <Header/>
            <div className='content'>
                <LogIn/>
            </div>
            <Footer/>
        </Router>
    </>
}



render(<App/>,document.getElementById('root'),function () {
    console.log('login page rendered')
});



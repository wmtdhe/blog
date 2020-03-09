import React, {useState, useEffect,createRef} from 'react';
import {render} from 'react-dom';
import Header from "../../components/header";
import Footer from "../../components/footer";
import '../../publics/css/main.css';
import '../../publics/css/register.css';
import {LockOutlined, UserOutlined, TeamOutlined} from "@ant-design/icons";
import {BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';

let userRef = createRef();
let passRef = createRef();
let rePassRef = createRef();
let genderRef = createRef();
function Register(props) {
    let [msg,setMsg] = useState('');
    let [timer,setTimer] = useState(null);
    let [existCheck,setExist] = useState(false);
    let [passCheck,setCheck] = useState(true);
    function displayMsg(msg){
        setMsg(msg);
        setTimeout(function () {
            setMsg('')
        },1000)
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if(existCheck || !passCheck){
            return;
        }
        let userName = userRef.current.value;
        let pass1 = passRef.current.value;
        let pass2 = rePassRef.current.value;
        let gender = genderRef.current.value;
        let result = await axios.post('http://localhost:3000/api/user/register',{
            userName,password:pass1,gender:parseInt(gender)
        });
        if(result.data.errno===0){
            console.log('注册成功');
            location.href = '/login';
        }else{
            displayMsg(result.data.message)
        }
    }
    function checkExist(e) {
        let userName = e.target.value;
        if(timer){
            clearTimeout(timer);
        }
        let timeId = setTimeout(async function () {
            let result = await axios.post('http://localhost:3000/api/user/isExist',{userName});
            console.log(result);
            let errno = result.data.errno;
            if(errno===0){
                setExist(true)
            }else{
                setExist(false)
            }
            setTimer(null);
        },500);
        setTimer(timeId)
    }
    function checkPass(e) {
        let pass1 = passRef.current.value;
        let pass2 = rePassRef.current.value;
        setCheck(pass1===pass2)
    }
    return <div className='register-box'>
        {msg && <div className='error-msg'>{msg}</div>}
        {existCheck && <div className='error-msg' style={{top:'calc(15vh - 1em)'}}>用户已存在</div>}
        {!passCheck && <div className='error-msg' style={{top:'calc(15vh + 1em)'}}>两次密码不一致</div>}
        <form action='/' onSubmit={handleSubmit} id='register-form'>
            <h1 style={{fontSize:'2em',marginBottom:'0.5em'}}>注册</h1>
            <div style={{marginBottom:'0.5em'}}>
                <input type="text" placeholder="请输入用户名" name='userName' ref={userRef} onInput={checkExist}/>
            </div>
            <div style={{marginBottom:'0.5em'}}>
                <input type="password" placeholder="请输入密码" name='password' ref={passRef} onInput={checkPass}/>
            </div>
            <div style={{marginBottom:'0.5em'}}>
                <input type="password" placeholder="请重新输入密码" name='password' ref={rePassRef} onInput={checkPass}/>
            </div>
            <div style={{marginBottom:'0.5em'}}>
                <select name="gender" id="gender-select" ref={genderRef}>
                    <option value={1}>男</option>
                    <option value={2}>女</option>
                    <option value={3}>保密</option>
                </select>
            </div>
            <div className='register-button'>
                <button id='register' type='submit' form='register-form'>注册</button>
                <a href='/login'>&gt;&gt;已有账号</a>
            </div>
        </form>
    </div>
}

function App(props) {
    return <>
        <Router>
        <Header/>
        <div className='content'>
            <Register/>
        </div>
        <Footer/>
        </Router>
    </>
}

render(<App/>,document.getElementById('root'),function () {
    console.log('register rendered')
});
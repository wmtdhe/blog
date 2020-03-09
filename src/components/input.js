import React, {createRef, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {requestCreateBlog} from "../pages/square/saga";
import axios from 'axios';
import Tribute from "tributejs";

const inputRef = createRef();
const imgRef = createRef();


function setCursor(el) {
    if (el.setSelectionRange) {
        el.focus();
        el.setSelectionRange(0,0);
    } else if (el.createTextRange) {
        let range = el.createTextRange();
        range.collapse(true);
        range.moveEnd('character',0);
        range.moveStart('character',0);
        range.select()
    }
}

function Input(props) {
    let [input,setInput] = useState('');
    let [imgUrl,upload] = useState('');
    let {publishPost,status} = props;
    useEffect(function () {
        setInput(props.reply);
        setTimeout(function () {
            setCursor(inputRef.current);
        },0);
        if(!status){
            let currentUrl = encodeURI(location.pathname);
            location.href = `/login?url=${currentUrl}`;
        }

        if(inputRef.current){
            axios.get('http://localhost:3000/api/user/getAtList',{withCredentials:true})
                .then(res=>{
                    console.log(res.data);
                    if(res.data.errno===0){
                        let atList = res.data.data.map(v=>{
                            return {
                                key:v,
                                value:v
                            }
                        });
                        let tribute = new Tribute({
                            values: atList,
                        });
                        tribute.attach(inputRef.current);
                    }else{
                        console.log(0)
                    }
                })
                .catch(e=>console.log(e));
        }

    },[props.reply,status]);
    function handleInput(e) {
        let value = inputRef.current.value;
        setInput(value);
    }
    function handlePost(e) {
        publishPost({
            content:inputRef.current.value,
            image:imgUrl
        });
        inputRef.current.value = '';
        imgRef.current.value = '';
        upload('');
    }
    async function uploadFile(e) {
        let file = imgRef.current.files[0];
        let formData = new FormData();
        formData.append('file',file);
        await axios.post('http://localhost:3000/api/utils/upload',formData,{
            withCredentials:true
        })
            .then(res=>{
                console.log(res);
                if(res.data.errno!==0){
                    alert(res.data.message);
                    upload('');
                }else{
                    upload(res.data.data.url)
                }
            })
            .catch(err=>console.log(err));
    }
    return(<div className='input'>
        <div className='title'>
            <img src="/public/title.png" alt=""/>
        </div>
        <textarea name="" id="textarea"  rows="4" ref={inputRef} onChange={handleInput} value={input}></textarea>
        <input type="file" id='file' accept='image/*' ref={imgRef} onChange={uploadFile}/>
        <button id='publish' className={input?'has-input':'no-input'} disabled={input?false:true} onClick={handlePost}>发布</button>
    </div>)
}

const mapDispatchToProps = dispatch=>({

});
const mapStateToProps = state=>({

});
export default connect(mapStateToProps,mapDispatchToProps)(Input);
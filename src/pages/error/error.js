import {render} from "react-dom";
import React from 'react';
import Footer from "../../components/footer";
import Header from "../../components/header";
import '../../publics/css/main.css';

function App() {

    function handleBack(){
        location.href = '/';
    }
    return <>
        <Header/>
        <div className="content error">
            服务器出错啦 <span onClick={handleBack}>返回</span>
        </div>
        <Footer/>
    </>
}

render(<App/>,document.getElementById('root'),function () {
    console.log('error page rendered')
});
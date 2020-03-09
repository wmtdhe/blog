import {render} from "react-dom";
import React from 'react';
import Footer from "../../components/footer";
import Header from "../../components/header";
import '../../publics/css/main.css';

function App() {

    function handleBack(){
        let referrer = document.referrer;
        if(referrer){
            history.back()
        }else{
            location.href = '/';
        }

    }
    return <>
        <Header/>
        <div className="content error">
            你要找的页面不见了 <span onClick={handleBack}>返回上一页</span>
        </div>
        <Footer/>
    </>
}

render(<App/>,document.getElementById('root'),function () {
    console.log('404 page rendered')
});


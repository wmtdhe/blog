import React from 'react';
import {HomeOutlined, UserOutlined, SettingOutlined, TeamOutlined} from '@ant-design/icons';


class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(<div className='header'>
            <ul>
                <li><h1><a href='/'>微博</a></h1></li>
                <li><a href='/'><HomeOutlined />首页</a></li>
                <li><a href='/profile'><UserOutlined />我的空间</a></li>
                <li><a href='/square'><TeamOutlined />广场</a></li>
                <li><a href='/setting'><SettingOutlined />设置</a></li>
            </ul>
        </div>)
    }
}

export default Header;